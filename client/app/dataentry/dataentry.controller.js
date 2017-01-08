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
        }
        filereader.readAsText(file);
    }

    lscpu_file_text_to_object(file_text) {
        var lines = _.map(_.map(_.split(file_text.trim(), '\n'), function(line) { return _.split(line, ':')}), function(line) {return [line[0].trim(), line[1].trim()]});
        var object = {
            machine_file: 'xasdjhjfn',
            architecture: lines[0][1],
            cpu_opmode: lines[1][1],
            byte_order: lines[2][1],
            cpu_count: parseInt(lines[3][1]),
            threads_per_core: parseInt(lines[5][1]),
            cores_per_socket: parseInt(lines[6][1]),
            socket_count: parseInt(lines[7][1]),
            numa_node_count: parseInt(lines[8][1]),
            vendor_id: lines[9][1],
            cpu_family: lines[10][1],
            model: lines[11][1],
            model_name: lines[12][1],
            stepping: parseInt(lines[13][1]),
            cpu_mhz: parseFloat(lines[14][1]),
            cpu_max_mhz: parseFloat(lines[15][1]),
            cpu_min_mhz: parseFloat(lines[16][1]),
            bogomips: parseFloat(lines[17][1]),
            virtualization: lines[18][1],
            L1d_cache: lines[19][1],
            L1i_cache: lines[20][1],
            L2_cache: lines[21][1],
            L3_cache: lines[22][1],
            flags: lines[23][1]
        };
        return object;
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
