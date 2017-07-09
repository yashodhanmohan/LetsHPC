import _ from 'lodash';

export default class DataEntryController {

    /*@ngInject*/
    constructor(MachineService, ProblemService, CategoryService) {

        $(document).ready(() => {
            window.document.title = 'Data Entry - LETs HPC';
        })
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
            .getAllCategories()
            .then(response => {
                this.add_problem.categories = _.cloneDeep(response);
                this.add_approach.categories = _.cloneDeep(response);
            });

        this.machine_service
            .getAllMachines()
            .then(response => {
                this.add_approach.machines = _.cloneDeep(response);
            });

        this.student_data = [{
                "studentID": "201401403-201401421",
                "problem": "matrix_multiplication",
                "approach": "transpose",
                "codeLink": "https://db.tt/ISAzbeRGWk",
                "plotLink": "https://db.tt/tDg4mGcjHt",
                "logLink": "https://db.tt/N7Geun2HDD"
            },
            {
                "studentID": "201401433-201401439",
                "problem": "reduction",
                "approach": "tree",
                "codeLink": "https://db.tt/I2O1GkfEmL",
                "plotLink": "https://db.tt/orBdjSdqsc",
                "logLink": "https://db.tt/EYRNZ2vl3C"
            },
            {
                "studentID": "201401414-201401417",
                "problem": "median_filtering",
                "approach": "diff_mem_alloc",
                "codeLink": "https://db.tt/MEV4qXkfhh",
                "plotLink": "https://db.tt/w3LKvz2IkV",
                "logLink": "https://db.tt/HD9h8GfGsQ"
            },
            {
                "studentID": "201401103-201401086",
                "problem": "prefix_sum",
                "approach": "double_tree",
                "codeLink": "https://db.tt/neVZBWVBuQ",
                "plotLink": "https://db.tt/m7r4S3usk0",
                "logLink": "https://db.tt/kzjh4CANPw"
            },
            {
                "studentID": "201401067-201401233",
                "problem": "trapezoidal",
                "approach": "reduction",
                "codeLink": "https://db.tt/oT4Oppj0RU",
                "plotLink": "https://db.tt/wf25Bt9k8o",
                "logLink": "https://db.tt/ABXDUx6gL9"
            },
            {
                "studentID": "201401106-20140114",
                "problem": "prefix_sum",
                "approach": "double_tree",
                "codeLink": "https://db.tt/aHh50GKreL",
                "plotLink": "https://db.tt/L3I9O9VMOM",
                "logLink": "https://db.tt/kgbnNcyE3c"
            },
            {
                "studentID": "201401436-201401420",
                "problem": "median_filtering",
                "approach": "qsort",
                "codeLink": "https://db.tt/DLYKlsdpPW",
                "plotLink": "https://db.tt/oY55TYdBXI",
                "logLink": "https://db.tt/bD6rHvGziH"
            },
            {
                "studentID": "201401180-201401207",
                "problem": "vector",
                "approach": "side_by_side",
                "codeLink": "https://db.tt/sQt4XSmEfF",
                "plotLink": "https://db.tt/cx6IaVv4fQ",
                "logLink": "https://db.tt/tQGL1VgTnz"
            },
            {
                "studentID": "201401222-201401409",
                "problem": "redution",
                "approach": "data_segmenting",
                "codeLink": "https://db.tt/eMcAb3CByg",
                "plotLink": "https://db.tt/7SpCrPiAkk",
                "logLink": "https://db.tt/FCvisp4YaZ"
            },
            {
                "studentID": "201401408-201401416",
                "problem": "image_warping",
                "approach": "collapsed_directive",
                "codeLink": "https://db.tt/n2t1oAo5u9",
                "plotLink": "https://db.tt/sqxBhLbKI9",
                "logLink": "https://db.tt/idV5UUfurd"
            },
            {
                "studentID": "201621007-201621004",
                "problem": "trapezoidal",
                "approach": "critical",
                "codeLink": "https://db.tt/YY0wl8t8Ak",
                "plotLink": "https://db.tt/RcIg2UBITr",
                "logLink": "https://db.tt/ZDQKClGHyh"
            },
            {
                "studentID": "201401402-201401453",
                "problem": "vector",
                "approach": "static",
                "codeLink": "https://db.tt/reNkDXl3lb",
                "plotLink": "https://db.tt/oMaPNY1iRG",
                "logLink": "https://db.tt/9GB007u5di"
            },
            {
                "studentID": "201401013-201401020",
                "problem": "monte_carlo",
                "approach": "rand_r_critical",
                "codeLink": "https://db.tt/KCz7PrsyzE",
                "plotLink": "https://db.tt/gf8rmPRxQO",
                "logLink": "https://db.tt/VJ2AD3JRED"
            },
            {
                "studentID": "201401221-201401442",
                "problem": "monte_carlo",
                "approach": "own_prng",
                "codeLink": "https://db.tt/DwMDu0gXZh",
                "plotLink": "https://db.tt/lfP7zbCx4d",
                "logLink": "https://db.tt/WQpWN3ESMS"
            },
            {
                "studentID": "201401443-20140456",
                "problem": "reduction",
                "approach": "segment_tree",
                "codeLink": "https://db.tt/CGQZTeeOmf",
                "plotLink": "https://db.tt/E87ihU82OO",
                "logLink": "https://db.tt/wXakgnnR5T"
            },
            {
                "studentID": "201401056-201401105",
                "problem": "matrix_multiplication",
                "approach": "outermost",
                "codeLink": "https://db.tt/b72KtWzx1j",
                "plotLink": "https://db.tt/cu4ZYUkgOn",
                "logLink": "https://db.tt/erRyWHVXOM"
            },
            {
                "studentID": "201401406-201401461",
                "problem": "trapezoidal",
                "approach": "private",
                "codeLink": "https://db.tt/hFIPlPioWq",
                "plotLink": "https://db.tt/tc2rL5DJ31",
                "logLink": "https://db.tt/iS4bZ7lmNR"
            },
            {
                "studentID": "201401118-201401418",
                "problem": "pi_using_series",
                "approach": "reduction",
                "codeLink": "https://db.tt/gwUMlZIIwQ",
                "plotLink": "https://db.tt/xCxRoOdPLp",
                "logLink": "https://db.tt/9sk06j1afc"
            },
            {
                "studentID": "201401434-201401435",
                "problem": "pi_using_series",
                "approach": "pow_function",
                "codeLink": "https://db.tt/b4iAH6ljIt",
                "plotLink": "https://db.tt/wDcgfCehZV",
                "logLink": "https://db.tt/tAVZvvx4Pl"
            },
            {
                "studentID": "201401449-201401444",
                "problem": "monte_carlo",
                "approach": "rand_r_reduction",
                "codeLink": "https://db.tt/KKuN0xyj3c",
                "plotLink": "https://db.tt/hpDXazlFJD",
                "logLink": "https://db.tt/ADWF4GuSI9"
            },
            {
                "studentID": "201401415-201401432",
                "problem": "image_warping",
                "approach": "data_division",
                "codeLink": "https://db.tt/oYCj8RkmTF",
                "plotLink": "https://db.tt/Y6RfyNIwwH",
                "logLink": "https://db.tt/SFwIFuSbAg"
            },
            {
                "studentID": "201401451-201401452",
                "problem": "filter",
                "approach": "linked_list",
                "codeLink": "https://db.tt/0zLShZTLdj",
                "plotLink": "https://db.tt/pqJOVVz3Yc",
                "logLink": "https://db.tt/CD4CXRBHTd"
            },
            {
                "studentID": "201401407-201401448",
                "problem": "matrix_multiplication",
                "approach": "block",
                "codeLink": "https://db.tt/1gyR1YK5XR",
                "plotLink": "https://db.tt/PqfhQR8hft",
                "logLink": "https://db.tt/Vhe42YhDod"
            },
            {
                "studentID": "201401003-201401025",
                "problem": "filter",
                "approach": "double_tree_prefix",
                "codeLink": "https://db.tt/aHWapjmBkx",
                "plotLink": "https://db.tt/TfETpFLShX",
                "logLink": "https://db.tt/lISY7hYqbA"
            },
            {
                "studentID": "201401447-201401459",
                "problem": "monte_carlo",
                "approach": "rand",
                "codeLink": "https://db.tt/4hmEJ4IQye",
                "plotLink": "https://db.tt/J4H7qYXPPg",
                "logLink": "https://db.tt/p3heXpYxTo"
            },
            {
                "studentID": "201401437-201401457",
                "problem": "pi_using_series",
                "approach": "critical",
                "codeLink": "https://db.tt/LRzXnfL1Qr",
                "plotLink": "https://db.tt/KHw4u5XJ5L",
                "logLink": "https://db.tt/sYAiANUope"
            },
            {
                "studentID": "201401098-201401428",
                "problem": "matrix_multiplication",
                "approach": "middle",
                "codeLink": "https://db.tt/OJBPX0FBcH",
                "plotLink": "https://db.tt/sRFKSAUXgD",
                "logLink": "https://db.tt/5OvmXbkZev"
            },
            {
                "studentID": "201401100-201401424",
                "problem": "filter",
                "approach": "data_segmenting_prefix",
                "codeLink": "https://db.tt/zpySp2Cf3s",
                "plotLink": "https://db.tt/EdXPHmVD2b",
                "logLink": "https://db.tt/kGdhxWIvtE"
            },
            {
                "studentID": "201401422-201401425",
                "problem": "vector",
                "approach": "dynamic",
                "codeLink": "https://db.tt/87aVPDRD50",
                "plotLink": "https://db.tt/XAJaj9W3nG",
                "logLink": "https://db.tt/tPSS4DhtOW"
            }
        ];

    }

    select_category(category, section) {
        section.selected_category = category;
        // this.category_service
        //     .get_problems_by_category(section.selected_category._id)
        //     .then(response => {
        //         section.problems = response;
        //     });
    }

    submit_problem() {
        if (this.add_problem.name == '' || this.add_problem.description == '' || this.selected_category._id == undefined)
            this.add_problem.invalid = true;
        else {
            this.add_problem.invalid = false;
            // this.problem_service
            //     .add_problem({
            //         category_id: this.add_problem.selected_category._id,
            //         name: this.add_problem.name,
            //         desc: this.add_problem.description
            //     });
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
            // this.machine_service
            //     .add_machine(file_object);
        } else if (this.add_machine.output != '') {
            this.add_machine.invalid = false;
            var file_object = this.lscpu_file_text_to_object(this.add_machine.output);
            // this.machine_service
            //     .add_machine(file_object);
        } else {
            this.add_machine.invalid = true;
        }
    }

    

}