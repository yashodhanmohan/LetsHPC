import _ from 'lodash';

export default class MainController {

    categories = [];
    selected_category = '';

    problems = [];
    selected_problem = '';

    selected_memory = 'shared';

    // Ready variables
    problems_ready = false;
    categories_ready = false;
    peam_data_ready = false;

    ca = {
        selected_approaches: [],
        selected_machine: {},
        selected_penv: {},

        machines: [],
        approaches: [],
        penvs: [],

        execution_time_data: {},
        speedup_data: {},
        karp_flatt_data: {},

        chart: {},
        chart_image: {},
        chart_options: {
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
        },
        execution_time_chart_options: {
            title: 'Problem size vs. Execution time',
            hAxis: {
                title: 'Problem size'
            },
            vAxis: {
                title: 'Execution time'
            }
        },
        speedup_chart_options: {
            title: 'Problem size vs. Speedup',
            hAxis: {
                title: 'Problem size'
            },
            vAxis: {
                title: 'Speedup'
            }
        },
        karpflatt_chart_options: {
            title: 'Problem size vs. Karp Flatt coefficient',
            hAxis: {
                title: 'Problem size'
            },
            vAxis: {
                title: 'Karp flatt coefficient'
            }
        },
        active_chart: 'timeseries',

        update_machines: () => {
            var selected_approach_ids = _.map(this.ca.selected_approaches, '_id');
            this.ca.machines = _.filter(_.map(_.uniq(_.map(_.filter(this.numbers, (number) => {
                return selected_approach_ids.indexOf(number.approach_id) != -1;
            }), 'machine_id')), (machine_id) => {
                return _.find(this.machines, _.matchesProperty('_id', machine_id));
            }), machine => {
                return machine != undefined;
            });
        },

        update_penvs: () => {
            var selected_approach_ids = _.map(this.ca.selected_approaches, '_id');
            this.ca.penvs = _.filter(_.map(_.uniq(_.map(_.filter(this.numbers, (number) => {
                return selected_approach_ids.indexOf(number.approach_id) != -1;
            }), 'penv_id')), (penv_id) => {
                return _.find(this.penvs, _.matchesProperty('_id', penv_id));
            }), penv => {
                return penv != undefined;
            });
        },

        set_data: () => {
            this.ca.data_set = false;
            var selected_approach_ids = _.map(this.ca.selected_approaches, '_id')

            this.ca.selected_numbers = _.filter(this.numbers, number => {
                if (selected_approach_ids.indexOf(number.approach_id) != -1 && this.ca.selected_machine._id == number.machine_id)
                    return true;
                else {
                    return false;
                }
            });

            _.forEach(this.ca.selected_approaches, (selected_approach) => {
                selected_approach.unique_thread_counts = _.map(_.uniq(_.map(_.filter(this.ca.selected_numbers, selected_number => {
                    return selected_number.approach_id == selected_approach._id;
                }), 'p')), _.toString);
                selected_approach.plot_e2e = false;
                selected_approach.plot_alg = true;
                selected_approach.last_selected_threads = [];
            });

            this.ca.data_set = true;
        },

        update_chart: (approach) => {
            for (var i in approach.last_selected_threads) {
                var nthreads = approach.last_selected_threads[i];
                this.remove_number_from_table('ca', approach._id, nthreads, this.ca.selected_machine._id, 'e2e');
                this.remove_number_from_table('ca', approach._id, nthreads, this.ca.selected_machine._id, 'alg');
            }

            for (var i in approach.selected_threads) {
                var nthreads = approach.selected_threads[i];
                if (approach.plot_e2e)
                    this.add_number_in_table('ca', approach._id, nthreads, this.ca.selected_machine._id, 'e2e');
                if (approach.plot_alg)
                    this.add_number_in_table('ca', approach._id, nthreads, this.ca.selected_machine._id, 'alg');
            }

            this.refresh_chart(this.active_chart, 'ca');

            approach.last_selected_machines = _.cloneDeep(approach.selected_machines);
            approach.last_selected_threads = _.cloneDeep(approach.selected_threads);
        }
    }

    cm = {
        selected_approach: {},
        selected_machines: [],
        selected_penv: {},

        machines: [],
        approaches: [],
        penvs: [],

        execution_time_data: {},
        speedup_data: {},
        karp_flatt_data: {},

        chart: {},
        chart_image: {},
        chart_options: {
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
        },
        execution_time_chart_options: {
            title: 'Problem size vs. Execution time',
            hAxis: {
                title: 'Problem size'
            },
            vAxis: {
                title: 'Execution time'
            }
        },
        speedup_chart_options: {
            title: 'Problem size vs. Speedup',
            hAxis: {
                title: 'Problem size'
            },
            vAxis: {
                title: 'Speedup'
            }
        },
        karpflatt_chart_options: {
            title: 'Problem size vs. Karp Flatt coefficient',
            hAxis: {
                title: 'Problem size'
            },
            vAxis: {
                title: 'Karp flatt coefficient'
            }
        },
        active_chart: 'timeseries',

        update_approaches: () => {
            var selected_machine_ids = _.map(this.cm.selected_machines, '_id');
            this.cm.approaches = _.filter(_.map(_.uniq(_.map(_.filter(this.numbers, (number) => {
                return selected_machine_ids.indexOf(number.machine_id) != -1;
            }), 'approach_id')), (approach_id) => {
                return _.find(this.approaches, _.matchesProperty('_id', approach_id));
            }), approach => {
                return approach != undefined;
            });
        },

        update_penvs: () => {
            var selected_machine_ids = _.map(this.ca.selected_machines, '_id');
            this.ca.penvs = _.filter(_.map(_.uniq(_.map(_.filter(this.numbers, (number) => {
                return selected_machine_ids.indexOf(number.machine_id) != -1;
            }), 'penv_id')), (penv_id) => {
                return _.find(this.penvs, _.matchesProperty('_id', penv_id));
            }), penv => {
                return penv != undefined;
            });
        },

        set_data: () => {
            this.cm.data_set = false;
            var selected_machine_ids = _.map(this.cm.selected_machines, '_id')

            this.cm.selected_numbers = _.filter(this.numbers, number => {
                if (selected_machine_ids.indexOf(number.machine_id) != -1 && this.cm.selected_approach._id == number.approach_id)
                    return true;
                else {
                    return false;
                }
            });

            _.forEach(this.cm.selected_machines, (selected_machine) => {
                selected_machine.unique_thread_counts = _.map(_.uniq(_.map(_.filter(this.cm.selected_numbers, selected_number => {
                    return selected_number.machine_id == selected_machine._id;
                }), 'p')), _.toString);
                selected_machine.plot_e2e = false;
                selected_machine.plot_alg = true;
                selected_machine.last_selected_threads = [];
            });

            this.cm.data_set = true;
        },

        update_chart: (machine) => {
            for (var i in machine.last_selected_threads) {
                var nthreads = machine.last_selected_threads[i];
                this.remove_number_from_table('cm', this.cm.selected_approach._id, nthreads, machine._id, 'e2e');
                this.remove_number_from_table('cm', this.cm.selected_approach._id, nthreads, machine._id, 'alg');
            }

            for (var i in machine.selected_threads) {
                var nthreads = machine.selected_threads[i];
                if (machine.plot_e2e)
                    this.add_number_in_table('cm', this.cm.selected_approach._id, nthreads, machine._id, 'e2e');
                if (machine.plot_alg)
                    this.add_number_in_table('cm', this.cm.selected_approach._id, nthreads, machine._id, 'alg');
            }

            this.refresh_chart(this.cm.active_chart, 'cm');

            machine.last_selected_machines = _.cloneDeep(machine.selected_approaches);
            machine.last_selected_threads = _.cloneDeep(machine.selected_threads);
        }
    }


    /*@ngInject*/
    constructor($http) {

        this.$http = $http;

        this.selection = [];

        // Fetch categories
        this.categories_ready = false;
        this.$http.get('/api/category').then((response) => {
            this.categories = response.data;
            this.categories_ready = true;
        }, (error) => {
            console.log(error);
        });

        this.ca.execution_time_data = new google.visualization.DataTable();
        this.ca.speedup_data = new google.visualization.DataTable();
        this.ca.karp_flatt_data = new google.visualization.DataTable();

        this.cm.execution_time_data = new google.visualization.DataTable();
        this.cm.speedup_data = new google.visualization.DataTable();
        this.cm.karp_flatt_data = new google.visualization.DataTable();

        this.data_fetch_complete = false;
        this.active_chart = 'timeseries';

        this.compare = '';
        this.activate_tooltip();
    }

    select_category(selected_category) {
        // If category has changed,
        if (this.selected_category != selected_category) {
            this.selected_category = selected_category;
            this.problems_ready = false;
            this.fetch_problems()
                .then(() => {
                    this.problems_ready = true;
                });
        }
    }

    select_problem(selected_problem) {
        // If problem has changed
        if (this.selected_problem != selected_problem) {
            this.selected_problem = selected_problem;
            this.data_fetch_complete = false;
            this.fetch_machine_data();
        }
    }

    get_problem_data() {
        this.peam_data_ready = false;
        this.$http
            .get(`/api/number/problem/${this.selected_problem._id}`)
            .then((response) => {
                this.numbers = response.data;
                this.approach_ids = _.uniq(_.map(this.numbers, _.property('approach_id')));
                this.machine_ids = _.uniq(_.map(this.numbers, _.property('machine_id')));
                this.penv_ids = _.uniq(_.map(this.numbers, _.property('penv_id')));
                // Fetch approaches by approach id
                this.approaches = [];
                this.approach_ids.map((approach_id) => {
                    this.$http
                        .get(`/api/approach/${approach_id}`)
                        .then(response => {
                            this.approaches.push(response.data);
                        })
                });
                // Fetch machines by machine id
                this.machines = [];
                this.machine_ids.map((machine_id) => {
                    this.$http
                        .get(`/api/machine/${machine_id}`)
                        .then(response => {
                            this.machines.push(response.data);
                        })
                });
                // Fetch penv by penv id
                // this.penvs = [];
                // this.penv_ids.map((penv_id) => {
                //     if(penv!=undefined)
                //         this.$http
                //             .get(`/api/penv/${penv_id}`)
                //             .then(response => {
                //                 this.penvs.push(response.data);
                //             });
                // });
                this.peam_data_ready = true;
                this.ca.chart = new google.visualization.LineChart(document.getElementById('ca_chart_div'));
                this.cm.chart = new google.visualization.LineChart(document.getElementById('cm_chart_div'));
                google.visualization.events.addListener(this.ca.chart, 'ready', () => {
                    this.ca.chart_image = chart.getImageURI();
                });
                google.visualization.events.addListener(this.cm.chart, 'ready', () => {
                    this.cm.chart_image = chart.getImageURI();
                });
            })
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

    averaged_karp_flatt(number, number_for_serial, machine) {
        var e2e_karp_flatt_by_problem_size = {};
        var alg_karp_flatt_by_problem_size = {};

        var average_speedup = this.averaged_speedup(number, number_for_serial);
        var e2e_speedup = average_speedup.e2e;
        var alg_speedup = average_speedup.alg;
        var p = machine.cpu_count;

        for(var problem_size in e2e_speedup) {
            e2e_karp_flatt_by_problem_size[problem_size] = ((1/e2e_speedup[problem_size]) - (1/p)) / (1 - (1/p));
        }

        for(var problem_size in alg_speedup) {
            alg_karp_flatt_by_problem_size[problem_size] = ((1/alg_speedup[problem_size]) - (1/p)) / (1 - (1/p));
        }

        return {
            e2e: e2e_karp_flatt_by_problem_size,
            alg: alg_karp_flatt_by_problem_size
        };
    }

    // Data Fetching Functions =============================================

    fetch_problems() {
        return this.$http
            .get('/api/category/' + this.selected_category._id + '/problem')
            .then((response) => {
                this.problems = response.data;
            }, (error) => {
                console.log(error);
            });
    }

    fetch_machine_data() {
        return this.$http
            .get('/api/machine')
            .then((response) => {
                var machines = response.data;
                this.machines = {};
                for (var i in machines) {
                    this.machines[machines[i]._id] = machines[i];
                }
                this.ro_machines = _.cloneDeep(this.machines);
                this.fetch_approach_data();
            }, (error) => {
                console.log(error);
            });
    }

    fetch_approach_data() {
        return this.$http
            .get('/api/problem/' + this.selected_problem._id + '/approach')
            .then((response) => {
                var approaches = response.data;
                this.approaches = {};
                for (var i in approaches) {
                    this.approaches[approaches[i]._id] = approaches[i];
                }
                this.ro_approaches = _.cloneDeep(this.approaches);
                this.fetch_number_data();
            }, (error) => {
                console.log(error);
            });
    }

    fetch_number_data() {

        this.$http
            .get('/api/problem/' + this.selected_problem._id + '/number')
            .then((response) => {
                var numbers = response.data;
                var numbers_grouped_by_approach_id = _.groupBy(numbers, 'approach_id');
                var numbers_grouped_by_machine_id = _.groupBy(numbers, 'machine_id');

                for (var i in this.approaches) {
                    var nums = numbers_grouped_by_approach_id[i];
                    var unique_machine_ID = _.map(_.uniq(_.map(nums, 'machine_id')), function(t) {
                        return t.toString();
                    });
                    var unique_thread_counts = _.map(_.uniq(_.map(nums, 'p')), function(t) {
                        return t.toString()
                    });

                    this.approaches[i].numbers = nums;
                    this.approaches[i].unique_thread_counts = unique_thread_counts;
                    this.approaches[i].unique_machine_ID = unique_machine_ID;
                    this.approaches[i].unique_machines = [];
                    this.approaches[i].selected_machines = [];
                    this.approaches[i].selected_threads = [];
                    this.approaches[i].last_selected_machines = [];
                    this.approaches[i].last_selected_threads = [];

                    for (var j in unique_machine_ID) {
                        this.approaches[i].unique_machines.push(this.ro_machines[unique_machine_ID[j]]);
                    }

                    this.approaches[i].plot_e2e = false;
                    this.approaches[i].plot_alg = false;
                }

                for (var i in this.machines) {
                    var nums = numbers_grouped_by_machine_id[i];
                    var unique_approach_ID = _.map(_.uniq(_.map(nums, 'approach_id')), function(t) {
                        return t.toString();
                    });
                    var unique_thread_counts = _.map(_.uniq(_.map(nums, 'p')), function(t) {
                        return t.toString()
                    });

                    this.machines[i].numbers = nums;
                    this.machines[i].unique_thread_counts = unique_thread_counts;
                    this.machines[i].unique_approach_ID = unique_approach_ID;
                    this.machines[i].unique_approaches = [];
                    this.machines[i].selected_approaches = [];
                    this.machines[i].selected_threads = [];
                    this.machines[i].last_selected_approaches = [];
                    this.machines[i].last_selected_threads = [];

                    for (var j in unique_approach_ID) {
                        this.machines[i].unique_approaches.push(this.ro_approaches[unique_approach_ID[j]]);
                    }

                    this.machines[i].plot_e2e = false;
                    this.machines[i].plot_alg = false;
                }
            });
        this.data_fetch_complete = true;
    }

    // Table related functions =============================================

    add_number_in_table(basis, approach_id, nthreads, machine_id, e2e_or_alg) {
        var number = _.filter(this.numbers, function(number) {
            return (number.p == nthreads)
                && (number.machine_id == machine_id)
                && (number.approach_id == approach_id);
        });
        var serialnumbers = _.filter(this.numbers, function(number) {
            return (number.p == 0)
                && (number.machine_id == machine_id)
                && (number.approach_id == approach_id);
        })
        var execution_time = this.averaged_execution_time(number);
        var speedup = this.averaged_speedup(number, serialnumbers);
        var karp_flatt = {};
        if(parseInt(nthreads) > 1)
            karp_flatt = this.averaged_karp_flatt(number, serialnumbers, _.find(this.machines, {_id: machine_id}));

        var execution_time_data = this[basis].execution_time_data;
        var speedup_data = this[basis].speedup_data;
        var karp_flatt_data = this[basis].karp_flatt_data;

        if (e2e_or_alg == 'e2e') {
            var e2e_execution_time_table = this.object_to_table(execution_time.e2e, 'SIZE', 'size', this.getLabel(approach_id, nthreads, machine_id, 'e2e'), this.getID(approach_id, nthreads, machine_id, 'e2e'));
            var e2e_speedup_table = this.object_to_table(speedup.e2e, 'SIZE', 'size', this.getLabel(approach_id, nthreads, machine_id, 'e2e'), this.getID(approach_id, nthreads, machine_id, 'e2e'));
            var e2e_karp_flatt_table = {};
            if(parseInt(nthreads) > 1)
                e2e_karp_flatt_table = this.object_to_table(karp_flatt.e2e, 'SIZE', 'size', this.getLabel(approach_id, nthreads, machine_id, 'e2e'), this.getID(approach_id, nthreads, machine_id, 'e2e'));

            var columns_from_table1 = [];
            for (var x = 0; x < this[basis].execution_time_data.getNumberOfColumns() - 1; x++) {
                columns_from_table1.push(x + 1);
            }

            if (this[basis].execution_time_data.getNumberOfColumns() < 2)
                this[basis].execution_time_data = e2e_execution_time_table;
            else
                this[basis].execution_time_data = google.visualization.data.join(this[basis].execution_time_data, e2e_execution_time_table, 'full', [
                    [0, 0]
                ], columns_from_table1, [1]);

            if (speedup_data.getNumberOfColumns() < 2)
                this[basis].speedup_data = e2e_speedup_table;
            else
                this[basis].speedup_data = google.visualization.data.join(this[basis].speedup_data, e2e_speedup_table, 'full', [
                    [0, 0]
                ], columns_from_table1, [1]);

            if(parseInt(nthreads) > 1) {
                var columns_from_table = [];
                for (var x = 0; x < karp_flatt_data.getNumberOfColumns() - 1; x++) {
                    columns_from_table.push(x + 1);
                }
                if (karp_flatt_data.getNumberOfColumns() < 2)
                    this[basis].karp_flatt_data = e2e_karp_flatt_table;
                else
                    this[basis].karp_flatt_data = google.visualization.data.join(this[basis].karp_flatt_data, e2e_karp_flatt_table, 'full', [
                        [0, 0]
                    ], columns_from_table, [1]);
            }

        } else if (e2e_or_alg == 'alg') {
            var alg_execution_time_table = this.object_to_table(execution_time.alg, 'SIZE', 'size', this.getLabel(approach_id, nthreads, machine_id, 'alg'), this.getID(approach_id, nthreads, machine_id, 'alg'));
            var alg_speedup_table = this.object_to_table(speedup.alg, 'SIZE', 'size', this.getLabel(approach_id, nthreads, machine_id, 'alg'), this.getID(approach_id, nthreads, machine_id, 'alg'));
            var alg_karp_flatt_table = {};
            if(parseInt(nthreads) > 1)
                alg_karp_flatt_table = this.object_to_table(karp_flatt.alg, 'SIZE', 'size', this.getLabel(approach_id, nthreads, machine_id, 'alg'), this.getID(approach_id, nthreads, machine_id, 'alg'));

            var columns_from_table1 = [];
            for (var x = 0; x < execution_time_data.getNumberOfColumns() - 1; x++) {
                columns_from_table1.push(x + 1);
            }

            if (this[basis].execution_time_data.getNumberOfColumns() < 2)
                this[basis].execution_time_data = alg_execution_time_table;
            else
                this[basis].execution_time_data = google.visualization.data.join(this[basis].execution_time_data, alg_execution_time_table, 'full', [
                    [0, 0]
                ], columns_from_table1, [1]);

            if (speedup_data.getNumberOfColumns() < 2)
                this[basis].speedup_data = alg_speedup_table;
            else
                this[basis].speedup_data = google.visualization.data.join(this[basis].speedup_data, alg_speedup_table, 'full', [
                    [0, 0]
                ], columns_from_table1, [1]);

            if(parseInt(nthreads) > 1) {
                var columns_from_table = [];
                for (var x = 0; x < karp_flatt_data.getNumberOfColumns() - 1; x++) {
                    columns_from_table.push(x + 1);
                }
                if (karp_flatt_data.getNumberOfColumns() < 2)
                    this[basis].karp_flatt_data = alg_karp_flatt_table;
                else
                    this[basis].karp_flatt_data = google.visualization.data.join(this[basis].karp_flatt_data, alg_karp_flatt_table, 'full', [
                        [0, 0]
                    ], columns_from_table, [1]);
            }
        }
    }

    remove_number_from_table(basis, approach_id, nthreads, machine_id, e2e_or_alg) {
        var execution_time_data = this[basis].execution_time_data;
        var speedup_data = this[basis].speedup_data;
        var karp_flatt_data = this[basis].karp_flatt_data;

        var numSpeedCol = speedup_data.getNumberOfColumns();
        var numExecCol = execution_time_data.getNumberOfColumns();
        var numKarpCol = karp_flatt_data.getNumberOfColumns();
        for (var j = 1; j < numSpeedCol; j++) {
            if (speedup_data.getColumnId(j) == this.getID(approach_id, nthreads, machine_id, e2e_or_alg)) {
                speedup_data.removeColumn(j);
                numSpeedCol--;
                break;
            }
        }

        for (var j = 1; j < numExecCol; j++) {
            if (execution_time_data.getColumnId(j) == this.getID(approach_id, nthreads, machine_id, e2e_or_alg)) {
                execution_time_data.removeColumn(j);
                numExecCol--;
                break;
            }
        }

        for (var j = 1; j < numKarpCol; j++) {
            if (karp_flatt_data.getColumnId(j) == this.getID(approach_id, nthreads, machine_id, e2e_or_alg)) {
                karp_flatt_data.removeColumn(j);
                numKarpCol--;
                break;
            }
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
    getLabel(approach_id, nthreads, machine_id, e2e_or_alg) {
        var part1 = '',
            part2 = '',
            part3 = '',
            part4 = '';
        if (e2e_or_alg == 'e2e')
            part1 = 'E2E ';
        else
            part1 = 'ALG ';
        part2 = 'for ' + _.find(this.approaches, {
            _id: approach_id
        }).approach_name + ' - ';
        part3 = nthreads + ' threads ';
        part4 = '@ ' + _.find(this.machines, {
            _id: machine_id
        }).model_name;

        return part1 + part2 + part3 + part4;
    }

    getID(approach_id, nthreads, machine_id, e2e_or_alg, table_type) {
        var part1 = '',
            part2 = '',
            part3 = '',
            part4 = '';

        if (e2e_or_alg == 'e2e')
            part1 = 'e2e_';
        else
            part1 = 'alg_';
        part2 = approach_id + '_';
        part3 = nthreads + '_';
        part4 = machine_id;

        return part1 + part2 + part3 + part4;
    }

    // Chart related functions =============================================

    chart_option_selection(basis) {

        if (this[basis].active_chart == 'timeseries') {
            _.merge(this[basis].chart_options, this[basis].execution_time_chart_options);
        }

        if (this[basis].active_chart == 'speedup') {
            _.merge(this[basis].chart_options, this[basis].speedup_chart_options);
        }

        if(this[basis].active_chart=='karpflatt') {
            _.merge(this[basis].chart_options, this[basis].karpflatt_chart_options);
        }
    }

    refresh_chart(type, basis) {
        if (type != this[basis].active_chart) {
            this[basis].active_chart = type;
        }
        var data;
        var execution_time_data = this[basis].execution_time_data;
        var speedup_data = this[basis].speedup_data;
        var karp_flatt_data = this[basis].karp_flatt_data;

        switch (this[basis].active_chart) {
            case 'timeseries':
                data = execution_time_data;
                break;
            case 'speedup':
                data = speedup_data;
                break;
            case 'karpflatt':
                data = karp_flatt_data;
                break;
            default:
                data = new google.visualization.DataTable();
        }
        this[basis].chart = new google.visualization.LineChart(document.getElementById(basis + '_chart_div'));
        if (data.getNumberOfColumns() > 1) {
            this.chart_option_selection(basis);
            this[basis].chart.draw(data, this[basis].chart_options);
        } else {
            var dummy_data = new google.visualization.DataTable();
            dummy_data.addColumn('number', 'd1');
            dummy_data.addColumn('number', 'd2');
            dummy_data.addRow([0, 0]);
            this[basis].chart.draw(dummy_data, this[basis].chart_options);
        }
    }

    export_chart(basis) {
        var download = document.createElement('a');
        // download.href = this[basis].chart_image;
        download.href = this[basis].chart.getImageURI();
        download.download = 'image.png';
        download.click();
    }

    activate_tooltip() {
        $(function() {
            $('[data-toggle="tooltip"]').tooltip()
        });
    }
}
