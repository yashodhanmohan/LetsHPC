import _ from 'lodash';
import ChartOption from '../../classes/chartOption';
import Factory from '../../classes/factory';

export default class ReportGeneratorController {


    iImplDetF = true;
    iBCDSIF = false;
    iBCSPIF = false;

    iCoAnReF = true;
    iCoSeCoF = false;
    iCoPaCoF = false;
    iCoPaF = false;
    iThSpuF = false;
    iEstSerFraF = false;
    iTubF = false;
    iNuMAF = false;
    iNoComF = false;

    iCuBaAnF = true;
    iTCRAProcF = false;
    iTCRAProSizeF = false;
    iSCRAF = false;
    iECRAF = false;
    iKFRAF = false;

    iFuDeAnF = true;
    iMSPOF = false;
    iMWRAF = false;
    iCCRAF = false;
    iFSRAF = false;
    iSraRAF = false;
    iLBRAF = false;
    iSyncRAF = false;
    iGRAF = false;
    iScaRAF = false;

    iAddAnaF = true;
    iAOCF = false;
    iCBMBF = false;
    iADDADAF = false;
    iDFIAF = false;
    iAACF = false;


    tex_string = '';
    iBCDSI = '';
    iBCSPI = '';
    iCoSeCo = '';
    iCoPaCo = '';
    iCoPa = '';
    iThSpu = '';
    iEstSerFra = '';
    iTub = '';
    iNuMA = '';
    iNoCom = '';
    iTCRAProc = '';
    iTCRAProSize = '';
    iSCRA = '';
    iECRA = '';
    iKFRA = '';
    iMSPO = '';
    iMWRA = '';
    iCCRA = '';
    iFSRA = '';
    iSraRA = '';
    iLBRA = '';
    iSyncRA = '';
    iGRA = '';
    iScaRA = '';
    iAOC = '';
    iCBMB = '';
    iADDADA = '';
    iDFIA = '';
    iAAC = '';

    file = {};

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

    // Warning flags
    low_n = false;
    low_p = false;
    low_runs = false;
    no_serial = false;

    // Warning flag thresholds
    n_threshold = 3;
    p_threshold = 2;
    run_threshold = 2;

    initialString = `\n\\documentclass[runningheads, a4paper, oribibl]{llncs}\n\n\\setcounter{tocdepth}{3}\n\\usepackage{graphicx}\n\\graphicspath{{../images/}}\n
    \\usepackage{epstopdf}\n\\usepackage{standalone}\n\\usepackage{xcolor}\n\\usepackage{tikz}\n\\usetikzlibrary{fit}\n\\usetikzlibrary{shapes,snakes,calc}\n\n\n\n
    \\usepackage{listings, color}\n\\definecolor{dkgreen}{rgb}{0,0.6,0}\n\\definecolor{gray}{rgb}{0.5,0.5,0.5}\n\\definecolor{mauve}{rgb}{0.58,0,0.82}\n\n\n\n
    \\lstset{frame=tb,\n language=Matlab,\n aboveskip=3mm,\n belowskip=3mm,\ns howstringspaces=false,\n columns=flexible,\n basicstyle={\\small\\ttfamily},\n
    numbers=none,\n numberstyle=\\tiny\\color{gray},\n keywordstyle=\\color{blue},\n commentstyle=\\color{dkgreen},\n stringstyle=\\color{mauve},\n
    breaklines=true,\n breakatwhitespace=false,\n tabsize=2,\n numbers=left,\n numbersep=5pt,\n title=\\lstname\n}\n\n\n
    \\usepackage[section]{placeins}\n\n
    \\usepackage{amsmath,amssymb, cancel}\n
    %
    \\usepackage{url}\n\\urldef{\\mailsa}\\path|201301442@daiict.ac.in|\n\\urldef{\\mailsb}\\path|201301047@daiict.ac.in|\n
    \\newcommand{\\keywords}[1]{\\par\\addvspace\\baselineskip\n\\noindent\\keywordname\\enspace\\ignorespaces#1}\n\n\n
    \\renewcommand\\thesubsection{\\thesection(\\alph{subsection})}\n\n
    \\begin{document}\n\n\\mainmatter\n\n\\title{High Performance Computing Report}\n\n
    \\titlerunning{High Performance Computing Report}\n\n
    \\author{Author 1 ()\\\\Author 2 ()}
    %\n
    \\authorrunning{Author 1 \\& Author 2}\n
    \\institute{Institute Name\\\\\n  \\mailsa\\\\\n  \\mailsb\\\\\n}\n\n
    \\maketitle\n`;

    tImplDet = '\\section{Implementation Details}\n';
    tCoAnRe = '\\section{Complexity and Analysis Related}';
    tCuBaAn = '\\section{Curve Based Analysis}\n';
    tFuDeAn = '\\section{Further Detailed Analysis}\n';
    tAddAna = '\\section{Additional Approach Analysis}\n';

    uploadedPerfData = null;
    uploadedTimeData = null;
    perfData = false;
    numberData = false;
    threadsInPerfFile = ['1', '2', '3', '4', '0'];
    threadsInTimeFile = ['1', '2'];
    // threadsShown = [{"p":'4'}, {"p":'3'}, {"p":'2'}, {"p":'1'}, {"p":'0'}, {"p":'100'} , {"p":'200'}];
    threadsShown = ['1', '2', '3', '4', '0', '400', '500'];
    threadsCounted = false;
    selectedThreads = [];

    error = false;
    errorMessage = [];
    updatedOnce = false;

    perfFields = ["cycles", "instructions", "cacheReferences", "cacheMisses", "busCycles", "L1DcacheLoads", "L1DcacheLoadMisses", "L1DcacheStores", "dTLBLoads", "dTLBLoadMisses", "LLCLoads", "LLCLoadMisses", "LLCStores", "branches", "branchMisses", "contextSwitches", "cpuMigrations", "pageFaults"]

    plotE2E = false;
    plotAlg = true;

    ca = {
        selectedApproaches: [{ "_id": "approach", "approach_name": "user approach" }],
        selectedMachine: { "_id": "machine", "machine_name": "Machine 1", "model_name": "user machine" },
        selectedPenv: {},

        machines: [],
        approaches: [],
        penvs: [],

        dataTable: Factory.create('table'),
        data: {},

        chart: {},
        chartImage: {},
        chartOptions: Factory.create('chartOption'),
        activeChart: 'executionTime',
        activeStatistic: 'mean',

        initialize: () => {

            this.ca.selectedApproaches = [{ "_id": "approach", "approach_name": "user approach" }];
            this.ca.selectedMachine = { "_id": "machine", "machine_name": "Machine 1", "model_name": "user machine" };
            this.ca.selectedPenv = {};

            this.ca.machines = [];
            this.ca.approaches = [];
            this.ca.penvs = [];

            this.ca.dataTable = Factory.create('table');
            this.ca.data = {};

            this.ca.chart = {};
            this.ca.chartImage = {};
            this.ca.chartOptions = Factory.create('chartOption');
            this.ca.activeChart = 'speedup';
            this.ca.activeStatistic = 'mean';
        },

        setData: () => {
            this.ca.dataSet = false;
            this.ca.approachSelections = {};
            this.ca.dataTable.clear();

            let selectedApproachIDs = _.map(this.ca.selectedApproaches, '_id');
            this.ca.selectedNumbers = _.filter(this.numbers, number => {
                return number != null && selectedApproachIDs.indexOf(number.approach_id) != -1 && this.ca.selectedMachine._id == number.machine_id;
            });

            _.forEach(this.ca.selectedApproaches, (selectedApproach) => {

                this.ca.approachSelections[selectedApproach._id] = {
                    uniqueThreadCounts: [],
                    plotE2E: this.plotE2E,
                    plotAlg: this.plotAlg,
                    selectedThreads: this.selectedThreads,
                    lastSelectedThreads: [],
                    _id: "approach",
                    approach_name: "user approach"
                }

                this.ca.approachSelections[selectedApproach._id].uniqueThreadCounts = _.map(_.uniq(_.map(_.filter(this.ca.selectedNumbers, selectedNumber => {
                    return selectedNumber.approach_id == selectedApproach._id;
                }), 'p')), _.toString);
            });

            this.ca.data = this.ca.dataTable.get(this.ca.activeChart);

            this.ca.dataSet = true;
        },

        updateChart: () => {
            let approachID = "approach";
            let approachSelection = this.ca.approachSelections[approachID];
            let approach = approachSelection;

            _.forEach(approachSelection.lastSelectedThreads, nthreads => {
                this.ca.dataTable.removeNumber(approach, nthreads, this.ca.selectedMachine, 'e2e');
                this.ca.dataTable.removeNumber(approach, nthreads, this.ca.selectedMachine, 'alg');
            })

            approachSelection.selectedThreads = _.cloneDeep(this.selectedThreads);
            _.forEach(approachSelection.selectedThreads, nthreads => {
                if (this.plotE2E)
                    this.ca.dataTable.addNumber(approach, nthreads, this.ca.selectedMachine, 'e2e', this.numbers);
                if (this.plotAlg)
                    this.ca.dataTable.addNumber(approach, nthreads, this.ca.selectedMachine, 'alg', this.numbers);
            })

            approachSelection.lastSelectedThreads = _.cloneDeep(approachSelection.selectedThreads);

            // Clonedeep workaround for onChanges not being fired in chart component

            this.ca.data = _.cloneDeep(this.ca.dataTable.get(this.ca.activeChart, this.ca.activeStatistic));
            //this.google_chart_object([1,2,3], this.uploadedTimeData, "speedup", "e2eS", this.mean)
        },


        changeChartType: (activeChart, activeStatistic) => {
            this.ca.activeChart = activeChart;
            this.ca.activeStatistic = activeStatistic;
            this.ca.data = this.ca.dataTable.get(activeChart, activeStatistic);
            this.ca.chartOptions.setOptions(activeChart);
            if (activeChart == "executionTime")
                this.ca.chartOptions.setOption('vAxis.title', this.camelCaseToTitle(activeStatistic) + ' of ' + this.camelCaseToTitle(activeChart) + ' (s)');
            else
                this.ca.chartOptions.setOption('vAxis.title', this.camelCaseToTitle(activeStatistic) + ' of ' + this.camelCaseToTitle(activeChart));
        }
    }

    count = 0;

    categories = [];
    selectedCategory = '';

    problems = [];
    selectedProblem = '';

    selectedMemory = 'shared';

    // Ready variables
    problemsReady = false;
    categoriesReady = false;
    peamDataReady = true;

    options_func = null;

    constructor($http, $scope, $q, CalculatorService, TableService) {
        window.document.title = 'Report Generator - LETs HPC';
        this.iBCDSI = '';
        this.iBCSPI = '';
        this.iCoSeCo = '';
        this.iCoPaCo = '';
        this.iCoPa = '';
        this.iThSpu = '';
        this.iEstSerFra = '';
        this.iTub = '';
        this.iNuMA = '';
        this.iNoCom = '';
        this.iTCRAProc = '';
        this.iTCRAProSize = '';
        this.iSCRA = '';
        this.iECRA = '';
        this.iKFRA = '';
        this.iMSPO = '';
        this.iMWRA = '';
        this.iCCRA = '';
        this.iFSRA = '';
        this.iSraRA = '';
        this.iLBRA = '';
        this.iSyncRA = '';
        this.iGRA = '';
        this.iScaRA = '';
        this.iAOC = '';
        this.iCBMB = '';
        this.iADDADA = '';
        this.iDFIA = '';
        this.iAAC = '';

        this.tex_string = `\n\\documentclass[runningheads, a4paper, oribibl]{llncs}\n\n\\setcounter{tocdepth}{3}\n\\usepackage{graphicx}\n\\graphicspath{{../images/}}\n\\usepackage{epstopdf}\n\\usepackage{standalone}\n\\usepackage{xcolor}\n\\usepackage{tikz}\n\\usetikzlibrary{fit}\n\\usetikzlibrary{shapes,snakes,calc}\n\n\n\n\\usepackage{listings, color}\n\n\\definecolor{dkgreen}{rgb}{0,0.6,0}\n\\definecolor{gray}{rgb}{0.5,0.5,0.5}\n\\definecolor{mauve}{rgb}{0.58,0,0.82}\n\n\n\n\\lstset{frame=tb,\n  language=Matlab,\n  aboveskip=3mm,\n  belowskip=3mm,\n  showstringspaces=false,\n  columns=flexible,\n  basicstyle={\\small\\ttfamily},\n  numbers=none,\n  numberstyle=\\tiny\\color{gray},\n  keywordstyle=\\color{blue},\n  commentstyle=\\color{dkgreen},\n  stringstyle=\\color{mauve},\n  breaklines=true,\n  breakatwhitespace=false,\n  tabsize=2,\n  numbers=left,\n  numbersep=5pt,\n  title=\\lstname\n}\n\n\n\n\\usepackage[section]{placeins}\n\n\\usepackage{amsmath,amssymb, cancel}\n%\n\\usepackage{url}\n\\urldef{\\mailsa}\\path|201301442@daiict.ac.in|\n\\urldef{\\mailsb}\\path|201301047@daiict.ac.in|\n\\newcommand{\\keywords}[1]{\\par\\addvspace\\baselineskip\n\\noindent\\keywordname\\enspace\\ignorespaces#1}\n\n\n\\renewcommand\\thesubsection{\\thesection(\\alph{subsection})}\n\n\n\\begin{document}\n\n\\mainmatter\n\n\\title{High Performance Computing Report}\n\n\\titlerunning{High Performance Computing Report}\n\n\\author{Author 1 ()\\\\Author 2 ()}%\n%\n\\authorrunning{Author 1 \\& Author 2}\n\\institute{Institute Name\\\\\n  \\mailsa\\\\\n  \\mailsb\\\\\n}\n\n\\maketitle\n\\section{Implementation Details}\n\\subsection{Brief and clear description about the Serial implementation}\n${this.iBCDSI}\n\\subsection{Brief and clear description about the implementation of the approach (Parallelization Strategy, Mapping of computation to threads)}\n${this.iBCSPI}\n\\section{Complexity and Analysis}\n\\subsection{Complexity of serial code}\n${this.iCoSeCo}\n\\subsection{Complexity of parallel code (split as needed into work, step, etc.) }\n${this.iCoPaCo}\n\\subsection{Cost of Parallel Algorithm}\n${this.iCoPa}\n\\subsection{Theoretical Speedup (using asymptotic analysis, etc.)}\n${this.iThSpu}\n\\subsection{Estimated Serial Fraction }\n${this.iEstSerFra}\n\\subsection{Tight upper bound based on Amdahl\'s Law}\n${this.iTub}\n\\subsection{Number of memory accesses}\n${this.iNuMA}\n\\subsection{Number of computations}\n${this.iNoCom}\n\n\\section{Curve Based Analysis}\n\\subsection{Time Curve related analysis (as no. of processor increases)}\n${this.iTCRAProc}\n\\subsection{Time Curve related analysis (as problem size increases, also for serial)}\n${this.iTCRAProSize}\n\\subsection{Speedup Curve related analysis (as problem size and no. of processors increase)}\n${this.iSCRA}\n\\subsection{Efficiency Curve related analysis}\n${this.iECRA}\n\\subsection{Karp-Flatt metric related analysis}\n${this.iKFRA}\n\n\\section{Further Detailed Analysis}\n\\subsection{Major serial and parallel overheads}\n${this.iMSPO}\n\\subsection{Memory wall related analysis}\n${this.iMWRA}\n\\subsection{Cache coherence related analysis}\n${this.iCCRA}\n\\subsection{False sharing related analysis}\n${this.iFSRA}\n\\subsection{Scheduling related analysis}\n${this.iSraRA}\n\\subsection{Load balance analysis}\n${this.iLBRA}\n\\subsection{Synchronisation related analysis}\n${this.iSyncRA}\n\\subsection{Granularity related analysis}\n${this.iGRA}\n\\subsection{Scalability related analysis}\n${this.iScaRA}\n\n\\section{Additional Approach Analysis}\n\\subsection{Analysis of any other concepts/factors you think were important in your problem-approach combination}\n${this.iAOC}\n\\subsection{Further details (Code balance , machine balance analysis, how much of peak performance achieved in terms of \\%)}\n${this.iCBMB}\n\\subsection{Advantages/Disadvantages of your approach}\n${this.iADDADA}\n\\subsection{Difficulties faced while implementing this approach}\n${this.iDFIA}\n\\subsection{Additional Comments}\n${this.iAAC}\n\n\\end{document}\n\n`;

        this.$q = $q;
        this.CalculatorService = CalculatorService;
        this.TableService = TableService;

        this.ca.initialize();
        this.ca.dataTable.addServices(CalculatorService, TableService);

        this.options_func = function () {
            return $q(function (resolve, reject) {
                $timeout(function () {
                    resolve([
                        $scope.searchFilter + '1',
                        $scope.searchFilter + '2'
                    ])
                }, 1000);
            });
        }
        $scope.$watch(() => {
            return {
                p: this.uploadedPerfData,
                n: this.uploadedTimeData
            }
        }, newVal => {
            this.threadsShown = angular.copy(this.threadsShown);
        }, true);

        this.activateTooltip();

    }

    generate_report() {
        let download = document.createElement('a');

        let tBCDSI = `\\subsection{Brief and clear description about the Serial implementation}\n${this.iBCDSI}\n`;
        let tBCSPI = `\\subsection{Brief and clear description about the implementation of the approach (Parallelization Strategy, Mapping of computation to threads)}\n${this.iBCSPI}\n`;

        let tCoSeCo = `\\subsection{Complexity of serial code}\n${this.iCoSeCo}\n`;
        let tCoPaCo = `\\subsection{Complexity of parallel code (split as needed into work, step, etc.) }\n${this.iCoPaCo}\n`;
        let tCoPa = `\\subsection{Cost of Parallel Algorithm}\n${this.iCoPa}\n`;
        let tThSpu = `\\subsection{Theoretical Speedup (using asymptotic analysis, etc.)}\n${this.iThSpu}\n`;
        let tEstSerFra = `\\subsection{Estimated Serial Fraction }\n${this.iEstSerFra}\n`;
        let tTub = `\\subsection{Tight upper bound based on Amdahl\'s Law}\n${this.iTub}\n`;
        let tNuMA = `\\subsection{Number of memory accesses}\n${this.iNuMA}\n`;
        let tNoCom = `\\subsection{Number of computations}\n${this.iNoCom}\n\n`;

        let tTCRAProc = `\\subsection{Time Curve related analysis (as no. of processor increases)}\n${this.iTCRAProc}\n`;
        let tTCRAProSize = `\\subsection{Time Curve related analysis (as problem size increases, also for serial)}\n${this.iTCRAProSize}\n`;
        let tSCRA = `\\subsection{Speedup Curve related analysis (as problem size and no. of processors increase)}\n${this.iSCRA}\n`;
        let tECRA = `\\subsection{Efficiency Curve related analysis}\n${this.iECRA}\n`;
        let tKFRA = `\\subsection{Karp-Flatt metric related analysis}\n${this.iKFRA}\n\n`;

        let tMSPO = `\\subsection{Major serial and parallel overheads}\n${this.iMSPO}\n`;
        let tMWRA = `\\subsection{Memory wall related analysis}\n${this.iMWRA}\n`;
        let tCCRA = `\\subsection{Cache coherence related analysis}\n${this.iCCRA}\n`;
        let tFSRA = `\\subsection{False sharing related analysis}\n${this.iFSRA}\n`;
        let tSraRA = `\\subsection{Scheduling related analysis}\n${this.iSraRA}\n`;
        let tLBRA = `\\subsection{Load balance analysis}\n${this.iLBRA}\n`;
        let tSyncRA = `\\subsection{Synchronisation related analysis}\n${this.iSyncRA}\n`;
        let tGRA = `\\subsection{Granularity related analysis}\n${this.iGRA}\n`;
        let tScaRA = `\\subsection{Scalability related analysis}\n${this.iScaRA}\n\n`;

        let tAOC = `\\subsection{Analysis of any other concepts/factors you think were important in your problem-approach combination}\n${this.iAOC}\n`;
        let tCBMB = `\\subsection{Further details (Code balance , machine balance analysis, how much of peak performance achieved in terms of \\%)}\n${this.iCBMB}\n`;
        let tADDADA = `\\subsection{Advantages/Disadvantages of your approach}\n${this.iADDADA}\n`;
        let tDFIA = `\\subsection{Difficulties faced while implementing this approach}\n${this.iDFIA}\n`;
        let tAAC = `\\subsection{Additional Comments}\n${this.iAAC}\n\n`;

        let END = `\\end{document}\n\n`;
        if(!this.iImplDetF)
        {
            tImplDet = '';
            tBCDSI = '';
            tBCSPI = '';
        }
        if(!this.iBCDSIF)
        tBCDSI = '';
        if(!this.iBCSPIF)
        tBCSPI = '';

        if(!this.iCoAnReF)
        {
            tCoAnRe = '';
            tCoSeCo = '';
            tCoPaCo = '';
            tCoPa = '';
            tThSpu = '';
            tEstSerFra = '';
            tTub = '';
            tNuMA = '';
            tNoCom = '';
        }
        if(!this.iCoSeCo)
        tCoSeCo = '';
        if(!this.iCoPaCoF)
        tCoPaCo = '';
        if(!this.iCoPaF)
        tCoPa = '';
        if(!this.iThSpuF)
        tThSpu = '';
        if(!this.iEstSerFraF)
        tEstSerFra = '';
        if(!this.iTubF)
        tTub = '';
        if(!this.iNuMAF)
        tNuMA = '';
        if(!this.iNoComF)
        tNoCom = '';

        if(!this.iCuBaAnF){
            tCuBaAn = '';
            tTCRAProc = '';
            tTCRAProSize = '';
            tSCRA = '';
            tECRA = '';
            tKFRA = '';
        }
        if(!this.iTCRAProcF)
        tTCRAProc = '';
        if(!this.iTCRAProSizeF)
        tTCRAProSize = '';
        if(!this.iSCRAF)
        tSCRA = '';
        if(!this.iECRAF)
        tECRA = '';
        if(!this.iKFRAF)
        tKFRA = '';

        if(!this.iFuDeAnF){
            tFuDeAn = '';
            tMSPO = '';
            tMWRA = '';
            tCCRA = '';
            tFSRA = '';
            tSraRA = '';
            tLBRA = '';
            tSyncRA = '';
            tGRA = '';
            tScaRA = '';
        }
        if(!this.iMSPOF)
        tMSPO = '';
        if(!this.iMWRAF)
        tMWRA = '';
        if(!this.iCCRAF)
        tCCRA = '';
        if(!this.iFSRAF)
        tFSRA = '';
        if(!this.iSraRAF)
        tSraRA = '';
        if(!this.iLBRAF)
        tLBRA = '';
        if(!this.iSyncRAF)
        tSyncRA = '';
        if(!this.iGRAF)
        tGRA = '';
        if(!this.iScaRAF)
        tScaRA = '';

        if(!this.iAddAnaF){
            tAddAna = '';
            tAOC = '';
            tCBMB = '';
            tADDADA = '';
            tDFIA = '';
            tAAC = '';
        }
        if(!this.iAOCF)
        tAOC = '';
        if(!this.iCBMBF)
        tCBMB = '';
        if(!this.iADDADAF)
        tADDADA = '';
        if(!this.iDFIAF)
        tDFIA = '';
        if(!this.iAACF)
        tAAC = '';


        this.tex_string = `${this.initialString}

        ${this.tImplDet}${tBCDSI}${tBCSPI}
        ${this.tCoAnRe}${tCoSeCo}${tCoPaCo}${tCoPa}${tThSpu}${tEstSerFra}${tTub}${tNuMA}${tNoCom}
        ${this.tCuBaAn}${tTCRAProc}${tTCRAProSize}${tSCRA}${tECRA}${tKFRA}
        ${this.tFuDeAn}${tMSPO}${tMWRA}${tCCRA}${tFSRA}${tSraRA}${tLBRA}${tSyncRA}${tGRA}${tScaRA}
        ${this.tAddAna}${tAOC}${tCBMB}${tADDADA}${tDFIA}${tAAC}

        ${END}`;






        download.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.tex_string);
        download.download = 'report.tex';
        download.click();

        download.href = this.chart_image;
        download.download = 'image.png';
        download.click();
    }

    clear_report() {
        this.iBCDSI = '';
        this.iBCSPI = '';
        this.iCoSeCo = '';
        this.iCoPaCo = '';
        this.iCoPa = '';
        this.iThSpu = '';
        this.iEstSerFra = '';
        this.iTub = '';
        this.iNuMA = '';
        this.iNoCom = '';
        this.iTCRAProc = '';
        this.iTCRAProSize = '';
        this.iSCRA = '';
        this.iECRA = '';
        this.iKFRA = '';
        this.iMSPO = '';
        this.iMWRA = '';
        this.iCCRA = '';
        this.iFSRA = '';
        this.iSraRA = '';
        this.iLBRA = '';
        this.iSyncRA = '';
        this.iGRA = '';
        this.iScaRA = '';
        this.iAOC = '';
        this.iCBMB = '';
        this.iADDADA = '';
        this.iDFIA = '';
        this.iAAC = '';

        let tBCDSI = `\\subsection{Brief and clear description about the Serial implementation}\n${this.iBCDSI}\n`;
        let tBCSPI = `\\subsection{Brief and clear description about the implementation of the approach (Parallelization Strategy, Mapping of computation to threads)}\n${this.iBCSPI}\n`;

        let tCoSeCo = `\\subsection{Complexity of serial code}\n${this.iCoSeCo}\n`;
        let tCoPaCo = `\\subsection{Complexity of parallel code (split as needed into work, step, etc.) }\n${this.iCoPaCo}\n`;
        let tCoPa = `\\subsection{Cost of Parallel Algorithm}\n${this.iCoPa}\n`;
        let tThSpu = `\\subsection{Theoretical Speedup (using asymptotic analysis, etc.)}\n${this.iThSpu}\n`;
        let tEstSerFra = `\\subsection{Estimated Serial Fraction }\n${this.iEstSerFra}\n`;
        let tTub = `\\subsection{Tight upper bound based on Amdahl\'s Law}\n${this.iTub}\n`;
        let tNuMA = `\\subsection{Number of memory accesses}\n${this.iNuMA}\n`;
        let tNoCom = `\\subsection{Number of computations}\n${this.iNoCom}\n\n`;

        let tTCRAProc = `\\subsection{Time Curve related analysis (as no. of processor increases)}\n${this.iTCRAProc}\n`;
        let tTCRAProSize = `\\subsection{Time Curve related analysis (as problem size increases, also for serial)}\n${this.iTCRAProSize}\n`;
        let tSCRA = `\\subsection{Speedup Curve related analysis (as problem size and no. of processors increase)}\n${this.iSCRA}\n`;
        let tECRA = `\\subsection{Efficiency Curve related analysis}\n${this.iECRA}\n`;
        let tKFRA = `\\subsection{Karp-Flatt metric related analysis}\n${this.iKFRA}\n\n`;

        let tMSPO = `\\subsection{Major serial and parallel overheads}\n${this.iMSPO}\n`;
        let tMWRA = `\\subsection{Memory wall related analysis}\n${this.iMWRA}\n`;
        let tCCRA = `\\subsection{Cache coherence related analysis}\n${this.iCCRA}\n`;
        let tFSRA = `\\subsection{False sharing related analysis}\n${this.iFSRA}\n`;
        let tSraRA = `\\subsection{Scheduling related analysis}\n${this.iSraRA}\n`;
        let tLBRA = `\\subsection{Load balance analysis}\n${this.iLBRA}\n`;
        let tSyncRA = `\\subsection{Synchronisation related analysis}\n${this.iSyncRA}\n`;
        let tGRA = `\\subsection{Granularity related analysis}\n${this.iGRA}\n`;
        let tScaRA = `\\subsection{Scalability related analysis}\n${this.iScaRA}\n\n`;

        let tAOC = `\\subsection{Analysis of any other concepts/factors you think were important in your problem-approach combination}\n${this.iAOC}\n`;
        let tCBMB = `\\subsection{Further details (Code balance , machine balance analysis, how much of peak performance achieved in terms of \\%)}\n${this.iCBMB}\n`;
        let tADDADA = `\\subsection{Advantages/Disadvantages of your approach}\n${this.iADDADA}\n`;
        let tDFIA = `\\subsection{Difficulties faced while implementing this approach}\n${this.iDFIA}\n`;
        let tAAC = `\\subsection{Additional Comments}\n${this.iAAC}\n\n`;

        let END = `\\end{document}\n\n`;

        this.tex_string = `${this.initialString}
        ${this.tImplDet}${tBCDSI}${tBCSPI}
        ${this.tCoAnRe}${tCoSeCo}${tCoPaCo}${tCoPa}${tThSpu}${tEstSerFra}${tTub}${tNuMA}${tNoCom}
        ${this.tCuBaAn}${tTCRAProc}${tTCRAProSize}${tSCRA}${tECRA}${tKFRA}
        ${this.tFuDeAn}${tMSPO}${tMWRA}${iCCRA}${tFSRA}${tSraRA}${tLBRA}${tSyncRA}${tGRA}${tScaRA}
        ${this.tAddAna}${tAOC}${tCBMB}${tADDADA}${tDFIA}${tAAC}
        ${END}`;

    }

    // File related function =============================================

    download_default_data() {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.data));
        element.setAttribute('download', 'default_data.csv');

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    check_for_errors() {

        if(this.perfData && this.numberData) {
            let all_n_time =  _.map(_.uniq(_.map(_.filter(this.uploadedTimeData, selectedNumber => {
                return selectedNumber;
            }), 'n')), _.toString);
            let all_n_perf =  _.map(_.uniq(_.map(_.filter(this.uploadedPerfData, selectedNumber => {
                return selectedNumber;
            }), 'n')), _.toString);;
            let all_p_time =  _.map(_.uniq(_.map(_.filter(this.uploadedTimeData, selectedNumber => {
                return selectedNumber;
            }), 'p')), _.toString);;
            let all_p_perf =  _.map(_.uniq(_.map(_.filter(this.uploadedPerfData, selectedNumber => {
                return selectedNumber;
            }), 'p')), _.toString);;

            //Check both have same n
            if(all_n_time.length!=all_n_perf.length) {
                this.error = true;
                this.errorMessage.push("The problem sizes in the perf file and the time file do not correspond.");
            }
            else {
                for(let i=0; i<all_n_time.length; i++) {
                    if(all_n_perf.indexOf(all_n_time[i]) == -1) {
                        this.error = true;
                        this.errorMessage.push("The problem sizes in the perf file and the time file do not correspond.");
                    }
                }
            }

            if(all_p_time.length!=all_p_perf.length) {
                this.error = true;
                this.errorMessage.push("The processors in the perf data file and the time data file do not correspond.");
            }
            else {
                for(let i=0; i<all_p_time.length; i++) {
                    if(all_p_perf.indexOf(all_p_time[i]) == -1) {
                        this.error = true;
                        this.errorMessage.push("The processors in the perf data file and the time data file do not correspond.");
                    }
                }
            }



        }

    }

    read_file(files, numbers) {
        let file = files[0];
        let read = new FileReader();

        let file_object;

        read.onload = () => {
            let file_text = read.result;
            //console.log(file_text);
            if (numbers)
            {
                this.uploadedTimeData = this.file_to_object_number(file_text);
                this.numberData = true;
                this.threadsCounted = true;
                this.threadsInTimeFile  = _.map(_.uniq(_.map(_.filter(this.uploadedTimeData, selectedNumber => {
                    return selectedNumber;
                }), 'p')), _.toString);

                if(!this.uploadedPerfData)
                this.threadsShown = angular.copy(this.threadsInTimeFile);


            }
            else
            {
                this.uploadedPerfData = this.file_to_object_perf(file_text);
                this.perfData = true;
                this.threadsCounted = true;
                this.threadsInPerfFile = _.map(_.uniq(_.map(_.filter(this.uploadedPerfData, selectedNumber => {
                    return selectedNumber;
                }), 'p')), _.toString);

                if(!this.uploadedTimeData)
                this.threadsShown = angular.copy(this.threadsInPerfFile);

            }

            this.check_for_errors();
            this.getProblemData(this.uploadedTimeData, this.uploadedPerfData);
            //console.log(file_object);
            //return file_object;
            //this.set_warning_flags(file_object);
            //this.plot_file(file_object);
        }
        read.readAsText(file);
    }

    getProblemData(numberFile, perfFile) {
        this.peamDataReady = false;

        let numberFetch = numberFile;
        let perfFetch = perfFile;


        this.$q.all([numberFetch, perfFetch])
        .then(() => {
            //console.log(numberFetch);
            //console.log(perfFetch);
            this.numbers = _.concat(numberFetch, perfFetch);
            this.peamDataReady = true;
            if(!this.updatedOnce) {
                this.ca.setData();
                this.updatedOnce = true;
            }
            console.log("Chart Updated");
            this.ca.updateChart();
            google.visualization.events.addListener(this.ca.chart, 'ready', () => {
                this.ca.chartImage = chart.getImageURI();
            });
            // google.visualization.events.addListener(this.cm.chart, 'ready', () => {
            //    this.cm.chartImage = chart.getImageURI();
            //});
        });
    }

    file_to_object_number(file_text) {
        let lines = _.remove(_.split(file_text, '\n'), function(x) {
            return x != ""
        }),
        object = [];

        if (lines[0].split(",").length!=5) {
            alert("The file is not in the right format. Kindly upload the proper file.");
            setTimeout(location.reload.bind(location));
        }
        for (let i in lines) {
            let line = _.map(_.split(lines[i], ','), (x) => {
                return parseFloat(x)
            });
            if(!isNaN(line[0])) {
                let number = {
                    "n": line[0],
                    "p": line[1],
                    "run_id": line[2],
                    "algS": line[3],
                    "algNS": 0,
                    "e2eS": line[4],
                    "e2eNS": 0,
                    "approach_id" : "approach",
                    "machine_id" : "machine"
                };
                object.push(number);
            }
        }
        this.set_warning_flags(object);
        return object;
    }

    comparator(a,b) {
        return a - b;
    }

    median(l) {
        l.sort(this.comparator);
        return l[Math.floor(l.length/2)];
    }

    mean(l) {
        let sum = 0;
        for(let i=0; i<l.length; i++)
        sum+=l[i]
        return sum/l.length;
    }

    range(l) {
        l.sort(this.comparator);
        return l[l.length-1] - l[0];
    }

    std_dev(l) {
        let m = this.mean(l);
        let sum = 0;
        for(let i =0; i<l.length; i++)
        sum+= Math.pow((l[i]-m),2);
        sum = sum/l.length
        return Math.pow(sum, 0.5)
    }

    google_chart_object(all_p, data, plotFor, parameter, statistic) {
        let chartObject = [];
        let allData = {};
        let serial_data = {};
        let all_n = _.map(_.uniq(_.map(_.filter(data, selectedNumber => {
            return selectedNumber;
        }), 'n')), _.toString);
        for(let i = 0; i < all_n.length; i++) {
            allData[all_n[i]] = {};
            for (let j = 0; j < all_p.length; j++) {
                let number = _.filter(data, {
                    'n' : parseInt(all_n[i]),
                    'p': all_p[j]
                });
                let specific_array = [];
                for(let k=0; k<number.length; k++)
                specific_array.push(number[k][parameter])
                //if (statistic === "mean")
                allData[all_n[i]][all_p[j]] = statistic(specific_array)

            }
        }

        if (plotFor === "speedup" || plotFor === "karpflatt" || plotFor === "efficiency") {
            for(let i=0; i<all_n.length; i++) {
                let number = _.filter(data, {
                    'n' : parseInt(all_n[i]),
                    'p': 0
                });
                let specific_array = [];
                for(let j=0; j<number.length; j++)
                specific_array.push(number[j][parameter])
                serial_data[all_n[i]] = statistic(specific_array);
            }
        }

        if (plotFor === "speedup") {
            for(let i=0; i<all_n.length; i++) {
                for(let j=0; j<all_p.length; j++) {
                    allData[all_n[i]][all_p[j]] = serial_data[all_n[i]]/ allData[all_n[i]][all_p[j]];
                }
            }
        }
        else if(plotFor === "efficiency") {
            for(let i=0; i<all_n.length; i++) {
                for(let j=0; j<all_p.length; j++) {
                    allData[all_n[i]][all_p[j]] = (serial_data[all_n[i]]/ allData[all_n[i]][all_p[j]])/all_p[j];
                }
            }
        }
        else if (plotFor === "karpflatt") {
            for(let i=0; i<all_n.length; i++) {
                for(let j=0; j<all_p.length; j++) {
                    allData[all_n[i]][all_p[j]] = (allData[all_n[i]][all_p[j]]/serial_data[all_n[i]] - 1/all_p[j])/(1 - 1/all_p[j]);
                }
            }
        }
        let test = new google.visualization.DataTable();
        test.addColumn('number', 'problem_size');
        for (let j=0; j<all_p.length; j++)                       //  addColumn(type, label, id) label and id are optional, all values are initially set to null
        test.addColumn('number', all_p[j] + ' threads data');
        for (let i=0; i<all_n.length; i++) {
            let testObject = []
            testObject.push(parseInt(all_n[i]));
            for(let j=0; j<all_p.length; j++)
            testObject.push(allData[all_n[i]][all_p[j]]);
            test.addRows([testObject]);

        }
        this.ca.data = _.cloneDeep(test);
    }

    file_to_object_perf(file_text) {
        let lines = _.remove(_.split(file_text, '\n'), function(x) {
            return x != ""
        }),
        object = [];
        let perfMap = {
            "problem_name" : "problem_name",
            "problem_approach" : "problem_approach",
            "n" : "n",
            "p" : "p",
            "run_id" : "run_id",
            "cycles":"cycles",
            "instructions" : "instructions",
            "cache-references" : "cacheReferences",
            "cache-misses" : "cacheMisses",
            "bus-cycles" : "busCycles",
            "L1-dcache-loads" : "L1DcacheLoads",
            "L1-dcache-load-misses" : "L1DcacheLoadMisses",
            "L1-dcache-stores" : "L1DcacheStores",
            "dTLB-loads" : "dTLBLoads",
            "dTLB-load-misses" : "dTLBLoadMisses",
            "LLC-loads" : "LLCLoads",
            "LLC-load-misses" : "LLCLoadMisses",
            "LLC-stores" : "LLCStores",
            "branches" : "branches",
            "branch-misses" : "branchMisses",
            "context-switches" : "contextSwitches",
            "cpu-migrations" : "cpuMigrations",
            "page-faults" : "pageFaults"
        };

        let perfIndexMap = [];
        let header = lines[0].split(",");
        let incrementer = 0;
        if(header.length==5 && header.indexOf("algS")!=-1 && header.indexOf("e2eS")!=-1) {
            alert("It looks like you have uploaded the time file instead of the perf file. Please check again");
            setTimeout(location.reload.bind(location));
        }
        if (header[0] === "problem_name")
        incrementer+=2

        for(let i = 0; i < header.length; i++) {
            perfIndexMap.push(perfMap[header[i]]);
        }

        for (let i in lines) {
            let line = _.map(_.split(lines[i], ','), (x) => {
                return parseFloat(x)
            });
            if(!isNaN(line[incrementer])) {
                let number = {}
                for (let k =incrementer; k<line.length; k++) {
                    number[perfIndexMap[k]] = parseFloat(line[k]);
                    //console.log(perfIndexMap[k]);
                }
                number["approach_id"] = "approach";
                number["machine_id"]= "machine";
                object.push(number);
            }
        }
        //        console.log(object);
        return object;
    }

    set_warning_flags(file_object) {
        let unique_p = _.map(_.uniq(_.map(file_object, 'p')), function(t) {
            return t.toString()
        });
        let unique_n = _.map(_.uniq(_.map(file_object, 'n')), function(t) {
            return t.toString()
        });
        let unique_runs = _.map(_.uniq(_.map(file_object, 'run_id')), function(t) {
            return t.toString()
        });

        if (unique_runs.length < this.run_threshold) {
            this.low_runs = true;
        }
        if (unique_n.length < this.n_threshold) {
            this.low_n = true;
        }
        if (unique_p.length < this.p_threshold) {
            this.low_p = true;
        }
        if (_.indexOf(unique_p, "0") == -1) {
            this.no_serial = true;
        }
    }

    export_chart() {
        let download = document.createElement('a');
        download.href = this.chart_image;
        download.download = 'image.png';
        download.click();
    }

    activateTooltip() {
        $(function() {
            $('[data-toggle="tooltip"]').tooltip()
        });
    }

    reload(forceGet) {
        location.reload(forceGet);
    }

    camelCaseToTitle(str) {
        return str
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, function(str){ return str.toUpperCase(); });
    }
}
