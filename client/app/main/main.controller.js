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
        this.$http.get('/api/category').then((response) => {
            this.categories = response.data;
        }, (error) => {
            console.log(error);
        });

        this.chart_options = {
            title: 'Number of threads vs time',
            titlePosition: 'in',
            height: 600,
            // curveType: 'function',
            pointShape: 'circle',
            pointsVisible: true,
            explorer: {
                keepInBounds: true,
                maxZoomOut: 1
            },
            hAxis: {
                title: 'Problem size',
                logScale: true
            },
            vAxis: {
                title: 'Execution time',
                logScale: false
            },
            chartArea: {
                backgroundColor: {
                    stroke: '#3F51B5',
                    strokeWidth: '1'
                },
            }
        };

        this.data = new google.visualization.DataTable();

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
        this.$http
            .get('/api/category/' + this.selected_category._id + '/problem')
            .then((response) => {
                this.problems = response.data;
            }, (error) => {
                console.log(error);
            });
    }

    fetch_machine_data() {
        this.$http
            .get('/api/machine')
            .then((response) => {
                this.machines = response.data;
            }, (error) => {
                console.log(error);
            });
    }

    fetch_approach_data() {
        this.$http
            .get('/api/problem/' + this.selected_problem._id + '/approach')
            .then((response) => {
                this.approaches = response.data;
                this.fetch_number_data();
            }, (error) => {
                console.log(error);
            });
    }

    fetch_number_data() {
        for (var i in this.approaches) {
            this.$http
                .get('/api/approach/' + this.approaches[i]._id + '/number')
                .then((response) => {
                    var numbers = response.data;
                    var numbers_grouped_by_thread_count = _.groupBy(numbers, function(number) {
                        return number.p; })
                    this.approaches[i].numbers_by_threads = numbers_grouped_by_thread_count;
                    for (var j in this.approaches[i].numbers_by_threads) {
                        this.approaches[i].numbers_by_threads[j] = {
                            numbers: this.approaches[i].numbers_by_threads[j],
                            plot: false
                        };
                    }
                });
            this.approaches[i].plot_e2e = false;
            this.approaches[i].plot_alg = true;
        }
    }

    change_e2e_alg(approach_index) {
        var approach = this.approaches[approach_index];
        for(var i=0; i< this.data.getNumberOfColumns(); i += 1) {
            var id = this.data.getColumnId(i).split('_');
            if(parseInt(id[1])==parseInt(approach_index)) {
                this.data.removeColumn(i);
                i -= 1;
            } else if(parseInt(id[1])==parseInt(approach_index)) {
                this.data.removeColumn(i);
                i -= 1;
            }
        }

        for(var nthreads in approach.numbers_by_threads) {
            this.change_plot(approach_index, nthreads);
        }
    }

    change_plot(approach_index, nthreads) {
        var approach = this.approaches[approach_index];
        var numbers = approach.numbers_by_threads[nthreads].numbers;

        if (approach.numbers_by_threads[nthreads].plot == true) {
            var numbers_grouped_by_problem_size = _.groupBy(numbers, function(number) {
                return number.n });
            var data = [];
            for (var size in numbers_grouped_by_problem_size) {
                if (numbers_grouped_by_problem_size.hasOwnProperty(size)) {
                    var e2e = 0,
                        alg = 0,
                        count = 0;
                    var numbers_of_problem_size = numbers_grouped_by_problem_size[size];
                    for (var x in numbers_of_problem_size) {
                        count += 1
                        e2e += (numbers_of_problem_size[x].e2eS) + (numbers_of_problem_size[x].e2eNS * Math.pow(10, -9));
                        alg += (numbers_of_problem_size[x].algS) + (numbers_of_problem_size[x].algNS * Math.pow(10, -9));
                    }
                    if (count != 0) {
                        e2e /= count;
                        alg /= count;
                    }
                    if (this.approaches[approach_index].plot_e2e == true && this.approaches[approach_index].plot_alg == true)
                        data.push([parseInt(size), e2e, alg]);
                    else if (this.approaches[approach_index].plot_e2e == true)
                        data.push([parseInt(size), e2e]);
                    else if (this.approaches[approach_index].plot_alg == true)
                        data.push([parseInt(size), alg]);
                    else
                        data.push([parseInt(size)]);
                }
            }
            var data_table = new google.visualization.DataTable();

            data_table.addColumn('number', 'size', 'size');
            if (this.approaches[approach_index].plot_e2e == true) {
                this.approaches[approach_index].plot_e2e_index = data_table.addColumn('number', 'E2E for Approach '+(approach_index+1)+', thread count '+nthreads, 'e2e_' + approach_index + '_' + nthreads);
            }
            if (this.approaches[approach_index].plot_alg == true) {
                this.approaches[approach_index].plot_alg_index = data_table.addColumn('number', 'ALG for Approach '+(approach_index+1)+', thread count '+nthreads, 'alg_' + approach_index + '_' + nthreads);
            }
            data_table.addRows(data);
            if (this.data.getNumberOfColumns() == 0) {
                this.data = data_table;
            } else {
                var columns_from_data = [],
                    columns_from_data_table = [];
                for (var x = 0; x < this.data.getNumberOfColumns() - 1; x += 1) {
                    columns_from_data.push(x + 1);
                }
                for (var x = 0; x < data_table.getNumberOfColumns() - 1; x += 1) {
                    columns_from_data_table.push(x + 1);
                }
                this.data = google.visualization.data.join(this.data, data_table, 'full', [
                    [0, 0]
                ], columns_from_data, columns_from_data_table);
            }
        } else {
            for(var i = 0; i < this.data.getNumberOfColumns(); i += 1) {
                if(this.data.getColumnId(i)==('e2e_' + approach_index + '_' + nthreads)) {
                    this.data.removeColumn(i);
                    break;
                }
            }
            for(var i = 0; i < this.data.getNumberOfColumns(); i += 1) {
                if(this.data.getColumnId(i)==('alg_' + approach_index + '_' + nthreads)) {
                    this.data.removeColumn(i);
                    break;
                }
            }
        }

        this.refresh_chart();
    }

    refresh_chart() {
        if(this.data.getNumberOfColumns()>1)
            this.chart.draw(this.data, this.chart_options);
        else {
            var dummy_data = new google.visualization.DataTable();
            dummy_data.addColumn('number', 'd1');
            dummy_data.addColumn('number', 'd2');
            dummy_data.addRow([0, 0]);
            this.chart.draw(dummy_data, this.chart_options);
        }
    }
}
