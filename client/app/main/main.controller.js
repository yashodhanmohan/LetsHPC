import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';
import _ from 'lodash';

export default class MainController {

    // Category selection menu
    categories = [];
    selected_category = '';

    // Problem selection menu 
    problems = [];
    selected_problem = '';

    // Machine comparison or Approach comparison
    machine_approach_view = 'machine';
    machines = [];
    approaches = [];

    // Data
    execution_time_data = {};
    speedup_data = {};
    karp_flatt_data = {};

    // Chart options
    chart = {};
    chart_image = {};
    chart_options = {};
    execution_time_chart_options = {};
    speedup_chart_options = {};
    karpflatt_chart_options = {};
    active_chart = '';


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
            titlePosition: 'in',
            height: 600,
            pointShape: 'circle',
            pointsVisible: true,
            explorer: {
                keepInBounds: true,
                maxZoomOut: 1
            },
            hAxis: {
                logScale: true
            },
            vAxis: {
                logScale: false
            },
            chartArea: {
                backgroundColor: {
                    stroke: '#000',
                    strokeWidth: 1
                }
            },
            crosshair: {
                color: 'black',
                trigger: 'both'
            },
            selectionMode: 'multiple'
        };

        this.execution_time_chart_options = {
            title: 'Problem size vs. Execution time',
            hAxis: {
                title: 'Problem size'
            }, 
            vAxis: {
                title: 'Execution time'
            }
        };

        this.speedup_chart_options = {
            title: 'Problem size vs. Speedup',
            hAxis: {
                title: 'Problem size'
            }, 
            vAxis: {
                title: 'Speedup'
            }
        };

        this.karpflatt_chart_options = {
            title: 'Problem size vs. Karp Flatt coefficient',
            hAxis: {
                title: 'Problem size'
            }, 
            vAxis: {
                title: 'Karp flatt coefficient'
            }
        };

        this.execution_time_data = new google.visualization.DataTable();
        this.speedup_data = new google.visualization.DataTable();
        this.karp_flatt_data = new google.visualization.DataTable();

        this.chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        google.visualization.events.addListener(this.chart, 'ready', () => {
            this.chart_image = this.chart.getImageURI();
        });

        this.active_chart = 'timeseries';

        this.refresh_chart(this.active_chart);
    }

    select_category(selected_category) {
        // If category has changed,
        if (this.selected_category != selected_category) {
            // Clear chart
            this.execution_time_data.removeColumns(1, this.execution_time_data.getNumberOfColumns() - 1);
            this.speedup_data.removeColumns(1, this.speedup_data.getNumberOfColumns() - 1);
            this.refresh_chart(this.active_chart);
            // Change selected category and fetch problems
            this.selected_category = selected_category;
            this.fetch_problems();
        }
    }

    select_problem(selected_problem) {
        // If problem has changed
        if (this.selected_problem != selected_problem) {
            // Clear chart
            this.execution_time_data.removeColumns(1, this.execution_time_data.getNumberOfColumns() - 1);
            this.speedup_data.removeColumns(1, this.speedup_data.getNumberOfColumns() - 1);
            this.refresh_chart(this.active_chart);
            // Change problem and fetch machine and approach data
            this.selected_problem = selected_problem;
            this.fetch_machine_data();
            this.fetch_approach_data();
        }
    }

    toggle_machine_approach(view) {

        this.machine_approach_view = view;
    }

    // Computation functions =============================================

    averaged_execution_time(number) {
        var e2e_execution_time_by_problem_size = {};
        var alg_execution_time_by_problem_size = {};

        var number_grouped_by_problem_size = _.groupBy(number, function(x) {
            return x.n });
        for (var size in number_grouped_by_problem_size) {
            var e2e_averaged_execution_time = 0;
            var alg_averaged_execution_time = 0;
            var count = 0;
            for (var i in number_grouped_by_problem_size[size]) {
                count++;
                var e2eS = number_grouped_by_problem_size[size][i].e2eS;
                var algS = number_grouped_by_problem_size[size][i].algS;
                var e2eNS = number_grouped_by_problem_size[size][i].e2eNS;
                var algNS = number_grouped_by_problem_size[size][i].algNS;

                e2e_averaged_execution_time += (e2eS + (e2eNS * 1e-9))
                alg_averaged_execution_time += (algS + (algNS * 1e-9))
            }
            e2e_averaged_execution_time /= count;
            alg_averaged_execution_time /= count;

            e2e_execution_time_by_problem_size[size] = e2e_averaged_execution_time;
            alg_execution_time_by_problem_size[size] = alg_averaged_execution_time;
        }

        return {
            e2e: e2e_execution_time_by_problem_size,
            alg: alg_execution_time_by_problem_size
        };
    }

    /*
    averaged_speedup(number, number_for_serial) {
        var e2e_speedup_by_problem_size = {};
        var alg_speedup_by_problem_size = {};

        var number_grouped_by_run = _.groupBy(number, function(x) {return x.run_id});
        var number_serial_grouped_by_run = _.groupBy(number_for_serial, function(x) {return x.run_id});

        var count = 0;
        for(var run in number_grouped_by_run) {
            count++;
            for(var i in number_grouped_by_run[run]) {
                count++;

                var size = number_grouped_by_run[run][i].n;

                var e2eS = number_grouped_by_run[run][i].e2eS;
                var algS = number_grouped_by_run[run][i].algS;
                var e2eNS = number_grouped_by_run[run][i].e2eNS;
                var algNS = number_grouped_by_run[run][i].algNS;

                var e2eS0 = number_serial_grouped_by_run[run][i].e2eS;
                var algS0 = number_serial_grouped_by_run[run][i].algS;
                var e2eNS0 = number_serial_grouped_by_run[run][i].e2eNS;
                var algNS0 = number_serial_grouped_by_run[run][i].algNS;

                var e2e_execution_time = e2eS + (e2eNS * 1e-9);
                var alg_execution_time = algS + (algNS * 1e-9);
                var e2e0_execution_time = e2eS0 + (e2eNS0 * 1e-9);
                var alg0_execution_time = algS0 + (algNS0 * 1e-9);

                if(e2e_speedup_by_problem_size.hasOwnProperty(size))
                    e2e_speedup_by_problem_size[size] += (e2e0_execution_time / e2e_execution_time);
                else
                    e2e_speedup_by_problem_size[size] = (e2e0_execution_time / e2e_execution_time);
                if(alg_speedup_by_problem_size.hasOwnProperty(size))
                    alg_speedup_by_problem_size[size] += (alg0_execution_time / alg_execution_time);
                else
                    alg_speedup_by_problem_size[size] = (alg0_execution_time / alg_execution_time);
            }
        }

        for(var size in e2e_speedup_by_problem_size)
            e2e_speedup_by_problem_size[size] /= count;
        for(var size in alg_speedup_by_problem_size)
            alg_speedup_by_problem_size[size] /= count;

        return {
            e2e: e2e_speedup_by_problem_size,
            alg: alg_speedup_by_problem_size
        };
    }
    */

    averaged_speedup(number, number_for_serial) {
        var e2e_speedup_by_problem_size = {};
        var alg_speedup_by_problem_size = {};

        var average_execution_time = this.averaged_execution_time(number);
        var e2e_execution_time = average_execution_time.e2e;
        var alg_execution_time = average_execution_time.alg;

        var average_execution_time0 = this.averaged_execution_time(number_for_serial);
        var e2e_execution_time0 = average_execution_time0.e2e;
        var alg_execution_time0 = average_execution_time0.alg;

        for (var size in e2e_execution_time) {
            e2e_speedup_by_problem_size[size] = e2e_execution_time0[size] / e2e_execution_time[size];
        }

        for (var size in alg_execution_time) {
            alg_speedup_by_problem_size[size] = alg_execution_time0[size] / alg_execution_time[size];
        }

        return {
            e2e: e2e_speedup_by_problem_size,
            alg: alg_speedup_by_problem_size
        };
    }

    // Data Fetching Functions =============================================
    
    fetch_problems() {
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
                        return number.p;
                    })
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


    // Table related functions =============================================

    toggle_number_in_table(approach_index, nthreads) {
        var approach = this.approaches[approach_index];
        var number = this.approaches[approach_index].numbers_by_threads[nthreads].numbers;
        var number_plotted = this.approaches[approach_index].numbers_by_threads[nthreads].plot;

        // If number has been added to table
        if (number_plotted) {
            var execution_time = this.averaged_execution_time(number);
            var speedup = this.averaged_speedup(number, this.approaches[approach_index].numbers_by_threads[0].numbers);

            var columns_from_table1 = [];
            for (var x = 0; x < this.execution_time_data.getNumberOfColumns() - 1; x++) {
                columns_from_table1.push(x + 1);
            }

            if (approach.plot_e2e) {
                var e2e_execution_time_table = this.object_to_table(execution_time.e2e, 'SIZE', 'size', 'E2E Appr. ' + approach_index + ', P ' + nthreads, 'e2e_exec_' + approach_index + '_' + nthreads);
                var e2e_speedup_table = this.object_to_table(speedup.e2e, 'SIZE', 'size', 'E2E Appr. ' + approach_index + ', P ' + nthreads, 'e2e_speedup_' + approach_index + '_' + nthreads);

                var columns_from_table1 = [];
                for (var x = 0; x < this.execution_time_data.getNumberOfColumns() - 1; x++) {
                    columns_from_table1.push(x + 1);
                }

                if (this.execution_time_data.getNumberOfColumns() < 2)
                    this.execution_time_data = e2e_execution_time_table;
                else
                    this.execution_time_data = google.visualization.data.join(this.execution_time_data, e2e_execution_time_table, 'full', [
                        [0, 0]
                    ], columns_from_table1, [1]);

                if (this.speedup_data.getNumberOfColumns() < 2)
                    this.speedup_data = e2e_speedup_table;
                else
                    this.speedup_data = google.visualization.data.join(this.speedup_data, e2e_speedup_table, 'full', [
                        [0, 0]
                    ], columns_from_table1, [1]);
            }

            if (approach.plot_alg) {
                var alg_execution_time_table = this.object_to_table(execution_time.alg, 'SIZE', 'size', 'ALG Appr. ' + approach_index + ', P ' + nthreads, 'alg_exec_' + approach_index + '_' + nthreads);
                var alg_speedup_table = this.object_to_table(speedup.alg, 'SIZE', 'size', 'ALG Appr. ' + approach_index + ', P ' + nthreads, 'alg_speedup_' + approach_index + '_' + nthreads);

                var columns_from_table1 = [];
                for (var x = 0; x < this.execution_time_data.getNumberOfColumns() - 1; x++) {
                    columns_from_table1.push(x + 1);
                }

                if (this.execution_time_data.getNumberOfColumns() < 2)
                    this.execution_time_data = alg_execution_time_table;
                else
                    this.execution_time_data = google.visualization.data.join(this.execution_time_data, alg_execution_time_table, 'full', [
                        [0, 0]
                    ], columns_from_table1, [1]);

                if (this.speedup_data.getNumberOfColumns() < 2)
                    this.speedup_data = alg_speedup_table;
                else
                    this.speedup_data = google.visualization.data.join(this.speedup_data, alg_speedup_table, 'full', [
                        [0, 0]
                    ], columns_from_table1, [1]);
            }
        }
        // If number has been removed from table
        else {
            for (var i = 0; i < this.execution_time_data.getNumberOfColumns(); i++) {
                console.log(this.execution_time_data.getColumnId(i));
                if (this.execution_time_data.getColumnId(i) == ('alg_exec_' + approach_index + '_' + nthreads)) {
                    this.execution_time_data.removeColumn(i);
                    i--;
                }
                if (this.execution_time_data.getColumnId(i) == ('e2e_exec_' + approach_index + '_' + nthreads)) {
                    this.execution_time_data.removeColumn(i);
                    i--;
                }
            }
            for (var i = 0; i < this.speedup_data.getNumberOfColumns(); i++) {
                console.log(this.speedup_data.getColumnId(i));
                if (this.speedup_data.getColumnId(i) == ('alg_speedup_' + approach_index + '_' + nthreads)) {
                    this.speedup_data.removeColumn(i);
                    i--;
                }
                if (this.speedup_data.getColumnId(i) == ('e2e_speedup_' + approach_index + '_' + nthreads)) {
                    this.speedup_data.removeColumn(i);
                    i--;
                }
            }
        }

        this.refresh_chart(this.active_chart);
    }

    object_to_table(object, keylabel, keyid, vallabel, valid) {
        var table = new google.visualization.DataTable();
        var rows = [];
        for (var key in object) {
            rows.push([parseFloat(key), parseFloat(object[key])]);
        }
        table.addColumn('number', keylabel, keyid);
        table.addColumn('number', vallabel, valid);
        table.addRows(rows);
        return table;
    }

    toggle_e2e_alg(approach_index) {
        var approach = this.approaches[approach_index];

        for (var i = 0; i < this.execution_time_data.getNumberOfColumns(); i++) {
            var id = this.execution_time_data.getColumnId(i).split('_');
            if (parseInt(id[2]) == parseInt(approach_index)) {
                this.execution_time_data.removeColumn(i);
                i -= 1;
            }
        }

        for (var i = 0; i < this.speedup_data.getNumberOfColumns(); i++) {
            var id = this.speedup_data.getColumnId(i).split('_');
            if (parseInt(id[2]) == parseInt(approach_index)) {
                this.speedup_data.removeColumn(i);
                i -= 1;
            }
        }

        for (var nthreads in approach.numbers_by_threads) {
            console.log(nthreads);
            this.toggle_number_in_table(approach_index, nthreads);
        }
    }


    // Chart related functions =============================================

    chart_option_selection() {

        if(this.active_chart=='timeseries') {
            _.merge(this.chart_options, this.execution_time_chart_options);
        }

        if(this.active_chart=='speedup') {
            _.merge(this.chart_options, this.speedup_chart_options);
        }

        // if(this.active_chart=='karpflatt') {
        //     _.merge(this.chart_options, this.karpflatt_chart_options);
        // }
    }

    refresh_chart(type) {
        if (type != this.active_chart) {
            this.active_chart = type;
        }
        var data;
        switch (this.active_chart) {
            case 'timeseries':
                data = this.execution_time_data;
                break;
            case 'speedup':
                data = this.speedup_data;
                break;
            case 'karpflatt':
                data = this.karp_flatt_data;
                break;
            default:
                data = new google.visualization.DataTable();
        }
        if (data.getNumberOfColumns() > 1) {
            this.chart_option_selection();
            this.chart.draw(data, this.chart_options);
        }
        else {
            var dummy_data = new google.visualization.DataTable();
            dummy_data.addColumn('number', 'd1');
            dummy_data.addColumn('number', 'd2');
            dummy_data.addRow([0, 0]);
            this.chart.draw(dummy_data, this.chart_options);
        }
    }
}
