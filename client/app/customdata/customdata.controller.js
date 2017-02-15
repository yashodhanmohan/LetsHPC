import _ from 'lodash';
import ChartOption from '../../classes/chartOption';
import Factory from '../../classes/factory';

export default class CustomDataController {

    // Data
    data = {};
    dataTable = Factory.create('table');
    dataSet = false;

    // Chart options
    chartOptions = Factory.create('chartOption');
    activeChart = 'executionTime';

    // Warning flags
    lowN = false;
    lowP = false;
    lowRuns = false;
    noSerial = false;

    // Warning flag thresholds
    nThreshold = 3;
    pThreshold = 2;
    runThreshold = 2;

    /*@ngInject*/
    constructor($scope, CalculatorService, TableService) {

        $(document).ready(() => {
            window.document.title = 'Custom Data Analysis - LETs HPC';
        })
        
        this.$scope = $scope;
        this.dataTable.addServices(CalculatorService, TableService);
        this.chartOptions.setOptions(this.activeChart);
    }

    changeChartType(chartType) {
        this.activeChart = chartType;
        this.data = this.dataTable.get(chartType);
        this.chartOptions.setOptions(chartType);
    }

    setWarningFlags(fileObject) {
        let uniqueP = _.map(_.uniq(_.map(fileObject, 'p')), _.toString);
        let uniqueN = _.map(_.uniq(_.map(fileObject, 'n')), _.toString);
        let uniqueRuns = _.map(_.uniq(_.map(fileObject, 'run_id')), _.toString);

        this.lowRuns = uniqueRuns.length < this.runThreshold;
        this.lowN = uniqueN.length < this.nThreshold;
        this.lowP = uniqueP.length < this.pThreshold;
        this.noSerial = _.indexOf(uniqueP, "0") == -1;
    }

    // File related function =============================================
    readFile(files) {
        let file = files[0];
        let read = new FileReader();
        read.onload = () => {
            let fileText = read.result;
            let fileObject = this.csvToObject(fileText);
            this.setWarningFlags(fileObject);
            this.plotFile(fileObject);
            this.$scope.apply();
        }
        read.readAsText(file);
    }

    downloadDefaultData() {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.data));
        element.setAttribute('download', 'default_data.csv');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    csvToObject(fileText) {
        let lines = _.remove(_.split(fileText, '\n'), x => x != ''),
            object = [];
        _.map(lines, line => {
            let values = _.map(_.split(line, ','), x => parseFloat(x));
            if (!isNaN(values[0])) {
                object.push({
                    "n": values[0],
                    "p": values[1],
                    "run_id": values[2],
                    "algS": values[3],
                    "algNS": 0,
                    "e2eS": values[4],
                    "e2eNS": 0
                });
            }
        });
        return object;
    }

    plotFile(fileObject) {
        let uniqueP = _.map(_.uniq(_.map(fileObject, 'p')), _.toString);
        let dummyApproachID = 'dummyApproachID';
        let dummyMachineID = 'dummyMachineID';

        let approach = {
                _id: dummyApproachID,
                approach_name: 'Custom approach'
            },
            machine = {
                _id: dummyMachineID,
                model_name: 'Custom model',
                cpu_count: 2
            };

        _.forEach(fileObject, number => {
            number.machine_id = dummyMachineID;
            number.approach_id = dummyApproachID;
        });

        _.forEach(uniqueP, p => this.dataTable.addNumber(approach, parseFloat(p), machine, 'e2e', fileObject))
        _.forEach(uniqueP, p => this.dataTable.addNumber(approach, parseFloat(p), machine, 'alg', fileObject))

        this.data = _.cloneDeep(this.dataTable.get(this.activeChart));
        this.dataSet = true;
    }
}
