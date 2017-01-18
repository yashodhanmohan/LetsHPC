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
        if(this.add_problem.name=='' || this.add_problem.description=='' || this.selected_category._id==undefined)
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
        var lines = _.map(_.map(_.split(file_text.trim(), '\n'), function(line) { return _.split(line, ':')}), function(line) {return [line[0].trim(), line[1].trim()]});
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
        if(this.add_machine.file_text!='') {
            this.add_machine.invalid = false;
            var file_object = this.lscpu_file_text_to_object(this.add_machine.file_text);
            this.machine_service
                .add_machine(file_object);
        } else if(this.add_machine.output!='') {
            this.add_machine.invalid = false;
            var file_object = this.lscpu_file_text_to_object(this.add_machine.output);
            this.machine_service
                .add_machine(file_object);
        } else {
            this.add_machine.invalid = true;
        }
    }

}
