import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';
import _ from 'lodash';

export default class MainController {

    selected_category = '';
    selected_problem = '';
    categories = [];
    problems = [];
    machines = [];
    approaches = [];
    machine_approach_view = 'machine';
    plotted_lines = [];
    data = {};
    chart = {};
    chart_image = {};
    chart_options = {};
    graph_type = 'timeseries';


    /*@ngInject*/
    constructor($http) {
        this.$http = $http;

        // Fetch categories
        this.$http.get('/api/category').then((response)=>{
            this.categories = response.data;
        }, (error)=>{
            console.log(error);
        });

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
    }

    // Select category of problems
    select_category(selected_category) {
        this.selected_category = selected_category;
        this.fetch_problems();
    }

    // Select problem whose solutions you want to compare
    select_problem(selected_problem) {
        this.selected_problem = selected_problem;
        this.fetch_machine_data();
        this.fetch_approach_data();
    }

    machine_approach_view_change(view) {
        
        this.machine_approach_view = view;
    }

    fetch_problems() {
        // Fetch problems corresponding to category
        this.$http.get('/api/category/'+this.selected_category._id+'/problem').then((response)=>{
            this.problems = response.data;
        }, (error)=>{
            console.log(error);
        });
    }

    fetch_machine_approach_data() {
        this.$http.get('/api/machine').then((response) => {
            this.machines = response.data;
        }, (error) => {
            console.log(error);
        });
    }

    fetch_machine_approach_data() {
        this.$http.get('/api/problem/'+this.selected_problem._id+'/approach').then((response) => {
            this.approaches = response.data;
            this.fetch_number_data();
        }, (error)=>{
            console.log(error);
        });
    }

    fetch_number_data() {
        for(var i in this.approaches) {
            this.$http.get('/api/approach/'+this.approaches[i]._id+'/number').then((response) => {
                var numbers = response.data;
                var numbers_grouped_by_thread_count = _.groupBy(numbers, function(number) {return number.p;})
                this.approaches[i].numbers_by_threads = numbers_grouped_by_thread_count;
                for(var j in this.approaches[i].numbers_by_threads) {
                    this.approaches[i].numbers_by_threads[j] = {
                        numbers: this.approaches[i].numbers_by_threads[j],
                        plot: false
                    };
                }
            });
        }
    }

    add_number_to_plot_data(plot, approach_index, nthreads) {
        if (this.approaches[approach_index].numbers_by_threads[nthreads].plot==true) {
            this.plotted_lines.push({
                approach_index: approach_index,
                nthreads: nthreads
            });
            this.plot_graph();
        }
        else {
            this.plotted_lines = _.reject(this.plotted_lines, function(plotted) {
                return (plotted.approach_index == approach_index) && (plotted.nthreads == nthreads)
            });
        }

    }

    plot_graph() {
        var common_x_coordinates = [];
        for(var l in this.plotted_lines) {
            var approach_index = this.plotted_lines[l].approach_index;
            var nthreads = this.plotted_lines[l].nthreads;
            var series = this.approaches[approach_index].numbers_by_threads[nthreads].numbers;
            var series_numbers = _.map(series, _.property('n'));
            var series_values = _.map(series, _.property('e2eNS'));
            console.log(series_numbers);
            console.log(series_values);
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
