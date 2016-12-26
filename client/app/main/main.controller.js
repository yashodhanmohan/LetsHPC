import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export default class MainController {

    selected_category = '';
    selected_problem = '';
    categories = [];
    problems = [];
    machines = [];
    approaches = [];
    compare_machines = true;
    compare_approaches = false;
    data = {};
    chart = {};
    chart_image = {};
    chart_options = {};
    graph_type = 'timeseries';


    /*@ngInject*/
    constructor($http) {
        this.$http = $http;

        // Fetch categories
        this.$http.get('/api/category/').then((response)=>{
            this.categories = response.data;
        }, (error)=>{
            console.log(error);
        });

        this.get_approach_data()
        this.chart_options = {
            title:'Number of threads vs time',
            titlePosition: 'in',
            height: 500,
            curveType: 'function',
            pointShape: 'circle',
            pointsVisible: true,
            explorer: {
                keepInBounds: true,
                maxZoomOut: 1
            },
            hAxis: {
                title: 'Number of threads',
                logScale: false
            },
            vAxis: {
                title: 'Execution time',
                logScale: false
            },
            chartArea: {
                backgroundColor: {
                    stroke: '#3F51B5',
                    strokeWidth: '1'
                }    
            }    
        };
        
        this.chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        google.visualization.events.addListener(this.chart, 'ready', () => {
            this.chart_image = this.chart.getImageURI();
        });
        this.plot_graph();
    }

    // Select category of problems
    select_category(selected_category) {
        this.selected_category = selected_category;
        this.fetch_problems();
    }

    // Select problem whose solutions you want to compare
    select_problem(selected_problem) {
        this.selected_problem = selected_problem;
        this.fetch_machine_approach_data();
    }

    machine_approach_view_change(view) {
        if(view=='machine') {
            this.compare_machines = true;
            this.compare_approaches = false;
        } else {
            this.compare_approaches = true;
            this.compare_machines = false;
        }
    }

    fetch_problems() {
        // Fetch problems corresponding to category
        this.$http.get('/api/Problems/').then((response)=>{
            this.problems = response.data;
        }, (error)=>{
            console.log(error);
        });
    }

    fetch_machine_approach_data() {
        
        // Fetch problems corresponding to category
        this.$http.get('/api/Machines/').then((response)=>{
            this.machines = response.data;
        }, (error)=>{
            console.log(error);
        });

        // Fetch problems corresponding to category
        this.$http.get('/api/Apmaps/').then((response)=>{
            this.approaches = response.data;
        }, (error)=>{
            console.log(error);
        });
    }

    plot_graph(x) {
        var graph_data = new google.visualization.DataTable();
        if (x==undefined) {
            graph_data.addColumn('number', 'nthreads');
            graph_data.addColumn('number', 'Time');
            graph_data.addRows(this.data)
            this.chart.draw(graph_data, this.chart_options);
        } else if (x=='timeseries') {
            graph_data.addColumn('number', 'nthreads');
            graph_data.addColumn('number', 'Time');
            graph_data.addRows(this.data)
            this.chart_options.title = 'Number of threads vs execution time';
            this.chart.draw(graph_data, this.chart_options);   
        } else if (x=='karpflatt') {
            graph_data.addColumn('number', 'nthreads');
            graph_data.addColumn('number', 'Karp Flatt Metric');
            var karp_flatt_data = this.get_karp_flatt_data();
            graph_data.addRows(karp_flatt_data);
            this.chart_options.title = 'Number of threads vs Karp Flatt coefficient';
            this.chart.draw(graph_data, this.chart_options);
        } else if (x=='speedup') {
            graph_data.addColumn('number', 'nthreads');
            graph_data.addColumn('number', 'Speedup');
            var speedup_data = this.get_speedup_data();
            graph_data.addRows(speedup_data);
            this.chart_options.title = 'Number of threads vs Speedup';
            this.chart.draw(graph_data, this.chart_options);
        }
    }

    // Populates main data file with [nthreads, time] pairs
    get_approach_data() {
        this.data = []
        for(var i=0; i<33; i++) {
            var x = (5.4 - 4*Math.exp(-Math.pow((i-16), 2)/81)) + Math.random();
            this.data.push([i, x])
        }
    }

    // Generate and return speedup data from time series data
    get_speedup_data() {
        var data = [];
        for(var i in this.data) {
            var speedup = this.data[0][1]/this.data[i][1];
            data.push([this.data[i][0], speedup]);
        }
        return data;
    }

    // Generate and return Karp Flatt indices from time series data
    get_karp_flatt_data() {
        var data = [];
        var speedup_data = this.get_speedup_data();
        for(var i in this.data) {
            if(this.data[i][0]>1) {
                var e = ((1.0/speedup_data[i][1]) - (1.0/this.data[i][0])) / (1 - (1.0/this.data[i][0]));
                data.push([this.data[i][0], e]);
            }
        }
        return data;
    }

    change_graph(graph_type) {
        this.graph_type = graph_type;
        this.plot_graph(graph_type);
    }


}
