import _ from 'lodash';

export default class DataEntryController {

    /*@ngInject*/
    constructor(MachineService, ProblemService, CategoryService) {
        this.machine_service = MachineService;
        this.problem_service = ProblemService;
        this.category_service = CategoryService;

        this.add_problem = {
            selected_category: {},
            description: '',
            name: '',
            invalid: false,
            invalid_hint: 'No empty fields are allowed !'
        };
        this.add_machine = {
            invalid: false,
            output: '',
            file_text: ''
        };
        this.add_approach = {
            selected_category: {},
            selected_problem: {},
            selected_machine: {},
            file: {}
        };

        this.category_service
            .get_all_categories()
            .then(response => {
                this.add_problem.categories = _.cloneDeep(response);
                this.add_approach.categories = _.cloneDeep(response);
            });

        this.machine_service
            .get_all_machines()
            .then(response => {
                this.add_approach.machines = _.cloneDeep(response);
            });

        this.student_data = [{
                "studentID": "201401414-201401417",
                "problem": "median_filtering",
                "approach": "diff_mem_alloc",
                "link": "https://db.tt/C5pzVbpCJg"
            },
            {
                "studentID": "201401103-201401086",
                "problem": "prefix_sum",
                "approach": "double_tree",
                "link": "https://db.tt/BotccgH6Tu"
            },
            {
                "studentID": "201401067-201401233",
                "problem": "trapezoidal",
                "approach": "reduction",
                "link": "https://db.tt/5coBAwoooq"
            },
            {
                "studentID": "201401106-20140114",
                "problem": "prefix_sum",
                "approach": "double_tree",
                "link": "https://db.tt/nvy0fRZ9XX"
            },
            {
                "studentID": "201401436-201401420",
                "problem": "median_filtering",
                "approach": "qsort",
                "link": "https://db.tt/NZRaDFiljp"
            },
            {
                "studentID": "201401180-201401207",
                "problem": "vector",
                "approach": "side_by_side",
                "link": "https://db.tt/7ueb4eUnfg"
            },
            {
                "studentID": "201401408-201401416",
                "problem": "image_warping",
                "approach": "collapsed_directive",
                "link": "https://db.tt/vmR4pmzE2h"
            },
            {
                "studentID": "201621007-201621004",
                "problem": "trapezoidal",
                "approach": "critical",
                "link": "https://db.tt/w5qT9j66f7"
            },
            {
                "studentID": "201401402-201401453",
                "problem": "vector",
                "approach": "static",
                "link": "https://db.tt/UrVS59DLRf"
            },
            {
                "studentID": "201401013-201401020",
                "problem": "monte_carlo",
                "approach": "rand_r_critical",
                "link": "https://db.tt/2sZFmi7rMQ"
            },
            {
                "studentID": "201401221-201401442",
                "problem": "monte_carlo",
                "approach": "own_prng",
                "link": "https://db.tt/4Vfj3T1TEn"
            },
            {
                "studentID": "201401406-201401461",
                "problem": "trapezoidal",
                "approach": "private",
                "link": "https://db.tt/icPR37bQFx"
            },
            {
                "studentID": "201401118-201401418",
                "problem": "pi_using_series",
                "approach": "reduction",
                "link": "https://db.tt/MDuOKxBSbn"
            },
            {
                "studentID": "201401434-201401435",
                "problem": "pi_using_series",
                "approach": "pow_function",
                "link": "https://db.tt/hBz3A67KmS"
            },
            {
                "studentID": "201401449-201401444",
                "problem": "monte_carlo",
                "approach": "rand_r_reduction",
                "link": "https://db.tt/VydF6pnjuf"
            },
            {
                "studentID": "201401415-201401432",
                "problem": "image_warping",
                "approach": "data_division",
                "link": "https://db.tt/iJmD3yCMJC"
            },
            {
                "studentID": "201401451-201401452",
                "problem": "filter",
                "approach": "linked_list",
                "link": "https://db.tt/ElyAm9j5Pk"
            },
            {
                "studentID": "201401003-201401025",
                "problem": "filter",
                "approach": "double_tree_prefix",
                "link": "https://db.tt/FMwULkrLCS"
            },
            {
                "studentID": "201401447-201401459",
                "problem": "monte_carlo",
                "approach": "rand",
                "link": "https://db.tt/50zGonN9n0"
            },
            {
                "studentID": "201401437-201401457",
                "problem": "pi_using_series",
                "approach": "critical",
                "link": "https://db.tt/ks1z3Q506u"
            },
            {
                "studentID": "201401100-201401424",
                "problem": "filter",
                "approach": "data_segmenting_prefix",
                "link": "https://db.tt/ELpbH1KL3Q"
            },
            {
                "studentID": "201401422-201401425",
                "problem": "vector",
                "approach": "dynamic",
                "link": "https://db.tt/GCdThimBE1"
            }
        ];
    }

    select_category(category, section) {
        section.selected_category = category;
        this.category_service
            .get_problems_by_category(section.selected_category._id)
            .then(response => {
                section.problems = response;
            });
    }

    submit_problem() {
        if (this.add_problem.name == '' || this.add_problem.description == '' || this.selected_category._id == undefined)
            this.add_problem.invalid = true;
        else {
            this.add_problem.invalid = false;
            this.problem_service
                .add_problem({
                    category_id: this.add_problem.selected_category._id,
                    name: this.add_problem.name,
                    desc: this.add_problem.description
                });
        }
    }

    read_machine_file(files) {
        var file = files[0];
        var filereader = new FileReader();
        filereader.onload = () => {
            this.add_machine.file_text = filereader.result;
            this.add_machine.output = this.add_machine.file_text;
        }
        filereader.readAsText(file);
    }

    lscpu_file_text_to_object(file_text) {
        var lines = _.map(_.map(_.split(file_text.trim(), '\n'), function(line) {
            return _.split(line, ':')
        }), function(line) {
            return [line[0].trim(), line[1].trim()]
        });
        var object = {};
        _.forEach(lines, function(line) {
            object[line[0]] = line[1];
        });
        var response_object = {
            machine_file: 'xasdjhjfn',
            architecture: object['Architecture'],
            cpu_opmode: object['CPU op-mode(s)'],
            byte_order: object['Byte Order'],
            cpu_count: parseInt(object['CPU(s)']),
            threads_per_core: parseInt(object['Thread(s) per core']),
            cores_per_socket: parseInt(object['Core(s) per socket']),
            socket_count: parseInt(object['Socket(s)']),
            numa_node_count: parseInt(object['NUMA node(s)']),
            vendor_id: object['Vendor ID'],
            cpu_family: object['CPU family'],
            model: object['Model'],
            model_name: object['Model name'],
            stepping: parseInt(object['Stepping']),
            cpu_mhz: parseFloat(object['CPU MHz']),
            cpu_max_mhz: parseFloat(object['CPU max MHz']),
            cpu_min_mhz: parseFloat(object['CPU min MHz']),
            bogomips: parseFloat(object['BogoMIPS']),
            virtualization: object['Virtualization'],
            L1d_cache: object['L1d cache'],
            L1i_cache: object['L1i cache'],
            L2_cache: object['L2 cache'],
            L3_cache: object['L3 cache'],
            flags: object['Flags']
        };
        return response_object;
    }

    submit_machine() {
        if (this.add_machine.file_text != '') {
            this.add_machine.invalid = false;
            var file_object = this.lscpu_file_text_to_object(this.add_machine.file_text);
            this.machine_service
                .add_machine(file_object);
        } else if (this.add_machine.output != '') {
            this.add_machine.invalid = false;
            var file_object = this.lscpu_file_text_to_object(this.add_machine.output);
            this.machine_service
                .add_machine(file_object);
        } else {
            this.add_machine.invalid = true;
        }
    }

}
