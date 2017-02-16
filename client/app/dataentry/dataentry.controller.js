import _ from 'lodash';

export default class DataEntryController {

    /*@ngInject*/
    constructor(MachineService, ProblemService, CategoryService) {

        this.MachineService = MachineService;
        this.ProblemService = ProblemService;
        this.CategoryService = CategoryService;

        this.addProblem = {
            selected_category: {},
            description: '',
            name: '',
            invalid: false,
            invalid_hint: 'No empty fields are allowed !'
        };
        this.addMachine = {
            invalid: false,
            output: '',
            file_text: ''
        };
        this.addApproach = {
            selected_category: {},
            selected_problem: {},
            selected_machine: {},
            file: {}
        };

        this.CategoryService
            .getAllCategories()
            .then(response => {
                this.addProblem.categories = _.cloneDeep(response);
                this.addApproach.categories = _.cloneDeep(response);
            });

        this.MachineService
            .getAllMachines()
            .then(response => {
                this.addApproach.machines = _.cloneDeep(response);
            });

        this.studentData = [{
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

        this.trialTree = {
            title: 'Institute',
            expanded: true,
            items: [
                {
                    title: 'DAIICT',
                    expanded: false,
                    items: [{
                        title: 'Year',
                        expanded: false,
                        items: [
                            {
                                title: '2013',
                                expanded: false,
                                items: []
                            },
                            {
                                title: '2014',
                                expanded: false,
                                items: [{
                                    title: 'Courses',
                                    expanded: false,
                                    items: [
                                        {
                                            title: 'CS301',
                                            expanded: false,
                                            table: this.studentData
                                        },
                                        {
                                            title: 'CS302',
                                            expanded: false
                                        }
                                    ]
                                }]
                            }
                        ]
                    }]
                },
                {
                    title: 'Institute 2',
                    expanded: false,
                }
            ]
        }
    }

    selectCategory(category, section) {
        section.selected_category = category;
    }

    submitProblem() {
        if (this.addProblem.name == '' || this.addProblem.description == '' || this.selected_category._id == undefined)
            this.addProblem.invalid = true;
        else {
            this.addProblem.invalid = false;
        }
    }

    readMachineFile(files) {
        var file = files[0];
        var filereader = new FileReader();
        filereader.onload = () => {
            this.addMachine.fileText = filereader.result;
            this.addMachine.output = this.addMachine.fileText;
        }
        filereader.readAsText(file);
    }

    lscpuFileTextToObject(fileText) {
        var lines = _.map(_.map(_.split(fileText.trim(), '\n'), function(line) {
            return _.split(line, ':')
        }), function(line) {
            return [line[0].trim(), line[1].trim()]
        });
        var object = {};
        _.forEach(lines, function(line) {
            object[line[0]] = line[1];
        });
        var responseObject = {
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
        return responseObject;
    }

    submitMachine() {
        if (this.addMachine.fileText != '') {
            this.addMachine.invalid = false;
            var fileObject = this.lscpuFileTextToObject(this.addMachine.fileText);
        } else if (this.addMachine.output != '') {
            this.addMachine.invalid = false;
            var fileObject = this.lscpuFileTextToObject(this.addMachine.output);
        } else {
            this.addMachine.invalid = true;
        }
    }

}
