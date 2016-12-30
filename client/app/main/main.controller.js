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
        if(this.machine_approach_view!=view) {
            // Clear chart
            this.execution_time_data.removeColumns(1, this.execution_time_data.getNumberOfColumns() - 1);
            this.speedup_data.removeColumns(1, this.speedup_data.getNumberOfColumns() - 1);
            this.refresh_chart(this.active_chart);
            // Change machine-approach view
            this.machine_approach_view = view;
        }
    }

    toggle_e2e(approach_index) {
        if(this.approaches[approach_index].plot_e2e)
            this.add_e2e_in_table(approach_index);
        else
            this.remove_e2e_from_table(approach_index);
        this.refresh_chart(this.active_chart);
    }

    toggle_alg(approach_index) {
        if(this.approaches[approach_index].plot_alg)
            this.add_alg_in_table(approach_index);
        else
            this.remove_alg_from_table(approach_index);
        this.refresh_chart(this.active_chart);
    }

    toggle_thread(approach_index, nthreads) {
        if(this.approaches[approach_index].thread_plots[nthreads].plot)
            this.add_thread_in_table(approach_index, nthreads);
        else
            this.remove_thread_from_table(approach_index, nthreads);
        this.refresh_chart(this.active_chart);
    }

    toggle_machine(approach_index, machine_id) {
        if(this.approaches[approach_index].machine_plots[machine_id].plot)
            this.add_machine_in_table(approach_index, machine_id);
        else
            this.remove_machine_from_table(approach_index, machine_id);
        this.refresh_chart(this.active_chart);
    }

    // Computation functions =============================================

    averaged_execution_time(number) {
        var e2e_execution_time_by_problem_size = {};
        var alg_execution_time_by_problem_size = {};

        var number_grouped_by_problem_size = _.groupBy(number, function(x) {
            return x.n
        });
        for (var size in number_grouped_by_problem_size) {
            var e2e_averaged_execution_time = 0;
            var alg_averaged_execution_time = 0;
            var count = 0;
            for (var i in number_grouped_by_problem_size[size]) {
                count++;
                var e2eS = parseFloat(number_grouped_by_problem_size[size][i].e2eS);
                var algS = parseFloat(number_grouped_by_problem_size[size][i].algS);
                var e2eNS = parseFloat(number_grouped_by_problem_size[size][i].e2eNS);
                var algNS = parseFloat(number_grouped_by_problem_size[size][i].algNS);

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
                var machines = response.data;
                this.machines = {};
                for (var i in machines) {
                    this.machines[machines[i]._id] = machines[i];
                }
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
                    var unique_machine_ID = _.uniq(_.map(numbers, 'machine_id'));
                    var unique_thread_counts = _.uniq(_.map(numbers, 'p'));

                    this.approaches[i].machine_plots = {};
                    this.approaches[i].thread_plots = {};
                    this.approaches[i].numbers = numbers;

                    for (var j in unique_machine_ID) {
                        this.approaches[i].machine_plots[unique_machine_ID[j]] = {
                            plot: false
                        }
                    }

                    for (var j in unique_thread_counts) {
                        this.approaches[i].thread_plots[unique_thread_counts[j]] = {
                            plot: false
                        }
                    }
                    this.approaches[i].plot_e2e = false;
                    this.approaches[i].plot_alg = false;
                });
        }
    }

    // Table related functions =============================================

    add_e2e_in_table(approach_index) {
        var approach = this.approaches[approach_index];
        for (var nthreads in approach.thread_plots) {
            if (approach.thread_plots[nthreads].plot) {
                for (var machine_id in approach.machine_plots) {
                    if (approach.machine_plots[machine_id].plot) {
                        this.add_number_in_table(approach_index, nthreads, machine_id, 'e2e');
                    }
                }
            }
        }
    }

    remove_e2e_from_table(approach_index) {
        var approach = this.approaches[approach_index], numCol = this.execution_time_data.getNumberOfColumns();
        for (var nthreads in approach.thread_plots) {
            if (approach.thread_plots[nthreads].plot) {
                for (var machine_id in approach.machine_plots) {
                    if (approach.machine_plots[machine_id].plot) {
                        for(var j = 1; j < numCol; j++) {
                            if(this.execution_time_data.getColumnId(j)==this.getID(approach_index, nthreads, machine_id, 'e2e')) {
                                this.execution_time_data.removeColumn(j);
                                this.speedup_data.removeColumn(j);
                                numCol--;
                                break;
                            }
                        }   
                    }
                }
            }
        }
    }

    add_alg_in_table(approach_index) {
        var approach = this.approaches[approach_index];
        for (var nthreads in approach.thread_plots) {
            if (approach.thread_plots[nthreads].plot) {
                for (var machine_id in approach.machine_plots) {
                    if (approach.machine_plots[machine_id].plot) {
                        this.add_number_in_table(approach_index, nthreads, machine_id, 'alg');
                    }
                }
            }
        }
    }

    remove_alg_from_table(approach_index) {
        var approach = this.approaches[approach_index], numCol = this.execution_time_data.getNumberOfColumns();
        for (var nthreads in approach.thread_plots) {
            if (approach.thread_plots[nthreads].plot) {
                for (var machine_id in approach.machine_plots) {
                    if (approach.machine_plots[machine_id].plot) {
                        for(var j = 1; j < numCol; j++) {
                            if(this.execution_time_data.getColumnId(j)==this.getID(approach_index, nthreads, machine_id, 'alg')) {
                                this.execution_time_data.removeColumn(j);
                                this.speedup_data.removeColumn(j);
                                numCol--;
                                break;
                            }
                        }   
                    }
                }
            }
        }
    }

    add_thread_in_table(approach_index, nthreads) {
        var approach = this.approaches[approach_index];
        for(var i in approach.machine_plots) {
            if(approach.machine_plots[i].plot) {
                if(approach.plot_e2e)
                    this.add_number_in_table(approach_index, nthreads, i, 'e2e');
                if(approach.plot_alg)
                    this.add_number_in_table(approach_index, nthreads, i, 'alg');
            }
        }
    }

    remove_thread_from_table(approach_index, nthreads) {
        var approach = this.approaches[approach_index], numCol = this.execution_time_data.getNumberOfColumns();
        if(approach.plot_e2e) {
            for(var i in approach.machine_plots) {
                if(approach.machine_plots[i].plot) {
                    for(var j = 1; j < numCol; j++) {
                        if(this.execution_time_data.getColumnId(j)==this.getID(approach_index, nthreads, i, 'e2e')) {
                            this.execution_time_data.removeColumn(j);
                            this.speedup_data.removeColumn(j);
                            numCol--;
                            break;
                        }
                    }
                }
            }    
        }

        if(approach.plot_alg) {
            for(var i in approach.machine_plots) {
                if(approach.machine_plots[i].plot) {
                    for(var j = 1; j < numCol; j++) {
                        if(this.execution_time_data.getColumnId(j)==this.getID(approach_index, nthreads, i, 'alg')) {
                            this.execution_time_data.removeColumn(j);
                            this.speedup_data.removeColumn(j);
                            numCol--;
                            break;
                        }
                    }
                }
            }
        }        
    }

    add_machine_in_table(approach_index, machine_id) {
        var approach = this.approaches[approach_index];
        for(var i in approach.thread_plots) {
            if(approach.thread_plots[i].plot) {
                if(approach.plot_e2e)
                    this.add_number_in_table(approach_index, i, machine_id, 'e2e');
                if(approach.plot_alg)
                    this.add_number_in_table(approach_index, i, machine_id, 'alg');
            }
        }
    }

    remove_machine_from_table(approach_index, machine_id) {
        var approach = this.approaches[approach_index], numCol = this.execution_time_data.getNumberOfColumns();
        if(approach.plot_e2e) {
            for(var i in approach.thread_plots) {
                if(approach.thread_plots[i].plot) {
                    for(var j = 1; j < numCol; j++) {
                        if(this.execution_time_data.getColumnId(j)==this.getID(approach_index, i, machine_id, 'e2e')) {
                            this.execution_time_data.removeColumn(j);
                            this.speedup_data.removeColumn(j);
                            numCol--;
                            break;
                        }
                    }
                }
            }    
        }

        if(approach.plot_alg) {
            for(var i in approach.thread_plots) {
                if(approach.thread_plots[i].plot) {
                    for(var j = 1; j < numCol; j++) {
                        if(this.execution_time_data.getColumnId(j)==this.getID(approach_index, i, machine_id, 'alg')) {
                            this.execution_time_data.removeColumn(j);
                            this.speedup_data.removeColumn(j);
                            numCol--;
                            break;
                        }
                    }
                }
            }
        }   
    }

    add_number_in_table(approach_index, nthreads, machine_id, e2e_or_alg) {
        var approach = this.approaches[approach_index];
        var number = _.filter(approach.numbers, function(number) {
            return (number.p == nthreads) && (number.machine_id == machine_id);
        });
        var serialnumbers = _.filter(approach.numbers, function(number) {
            return (number.p == 0) && (number.machine_id == machine_id);
        })
        var execution_time = this.averaged_execution_time(number);
        var speedup = this.averaged_speedup(number, serialnumbers);


        if (e2e_or_alg=='e2e') {
            var e2e_execution_time_table = this.object_to_table(execution_time.e2e, 'SIZE', 'size', this.getLabel(approach_index, nthreads, machine_id, 'e2e'), this.getID(approach_index, nthreads, machine_id, 'e2e'));
            var e2e_speedup_table = this.object_to_table(speedup.e2e, 'SIZE', 'size', this.getLabel(approach_index, nthreads, machine_id, 'e2e'), this.getID(approach_index, nthreads, machine_id, 'e2e'));

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
        } else if (e2e_or_alg=='alg') {
            var alg_execution_time_table = this.object_to_table(execution_time.alg, 'SIZE', 'size', this.getLabel(approach_index, nthreads, machine_id, 'alg'), this.getID(approach_index, nthreads, machine_id, 'alg'));
            var alg_speedup_table = this.object_to_table(speedup.alg, 'SIZE', 'size', this.getLabel(approach_index, nthreads, machine_id, 'alg'), this.getID(approach_index, nthreads, machine_id, 'alg'));

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

    // Label & ID related functions =============================================
    getLabel(approach_index, nthreads, machine_id, e2e_or_alg) {
        var part1 = '', part2 = '', part3 = '', part4 = '';
        if(e2e_or_alg=='e2e')
            part1 = 'E2E ';
        else
            part1 = 'ALG ';
        part2 = 'Appr. ' + approach_index + ' ';
        part3 = 'P ' + nthreads + ' ';
        part4 = 'M ' + this.machines[machine_id].machine_file;

        return part1 + part2 + part3 + part4;
    }

    getID(approach_index, nthreads, machine_id, e2e_or_alg, table_type) {
        var part1 = '', part2 = '', part3 = '', part4 = '';
        
        if(e2e_or_alg=='e2e')
            part1 = 'e2e_';
        else
            part1 = 'alg_';
        part2 = approach_index + '_';
        part3 = nthreads + '_';
        part4 = machine_id;

        return part1 + part2 + part3 + part4;
    }

    // Chart related functions =============================================

    chart_option_selection() {

        if (this.active_chart == 'timeseries') {
            _.merge(this.chart_options, this.execution_time_chart_options);
        }

        if (this.active_chart == 'speedup') {
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
        } else {
            var dummy_data = new google.visualization.DataTable();
            dummy_data.addColumn('number', 'd1');
            dummy_data.addColumn('number', 'd2');
            dummy_data.addRow([0, 0]);
            this.chart.draw(dummy_data, this.chart_options);
        }
    }
}
