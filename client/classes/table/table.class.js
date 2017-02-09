import _ from 'lodash';

export default class Table {

    constructor() {
        this.CalculatorService = undefined;
        this.TableService = undefined;

        this.executionTimeData = new google.visualization.DataTable();
        this.speedupData = new google.visualization.DataTable();
        this.karpFlattData = new google.visualization.DataTable();
        this.efficiencyData = new google.visualization.DataTable();
    }

    addServices(CalculatorService, TableService) {
        this.CalculatorService = CalculatorService;
        this.TableService = TableService;
    }

    addNumber(approach, nthreads, machine, e2eOrAlg, numbers) {

        if(this.columnExists(approach, nthreads, machine, e2eOrAlg)) {
            return;
        }

        nthreads = parseInt(nthreads);

        let serialNumbers = _.filter(numbers, {
            'p': 0,
            'machine_id': machine._id,
            'approach_id': approach._id
        });
        let number = _.filter(numbers, {
            'p': nthreads,
            'machine_id': machine._id,
            'approach_id': approach._id
        });

        // New data
        let executionTime = this.CalculatorService.averagedExecutionTime(number);
        let speedup = this.CalculatorService.averagedSpeedup(number, serialNumbers);
        let karpFlatt = nthreads > 1 ? this.CalculatorService.averagedKarpFlatt(number, serialNumbers, machine) : {};
        let efficiency = nthreads > 0 ? this.CalculatorService.averagedEfficiency(number, serialNumbers, nthreads) : {};

        // Tables for new data
        let newExecutionTimeData = this.TableService.objectToTable(executionTime[e2eOrAlg], 'SIZE', 'size', this.TableService.getLabel(approach, nthreads, machine, e2eOrAlg), this.TableService.getID(approach._id, nthreads, machine._id, e2eOrAlg));
        let newSpeedupData = this.TableService.objectToTable(speedup[e2eOrAlg], 'SIZE', 'size', this.TableService.getLabel(approach, nthreads, machine, e2eOrAlg), this.TableService.getID(approach._id, nthreads, machine._id, e2eOrAlg));
        let newKarpFlattData = nthreads > 1 ? this.TableService.objectToTable(karpFlatt[e2eOrAlg], 'SIZE', 'size', this.TableService.getLabel(approach, nthreads, machine, e2eOrAlg), this.TableService.getID(approach._id, nthreads, machine._id, e2eOrAlg)) : {};
        let newEfficiencyData = nthreads > 0 ? this.TableService.objectToTable(efficiency[e2eOrAlg], 'SIZE', 'size', this.TableService.getLabel(approach, nthreads, machine, e2eOrAlg), this.TableService.getID(approach._id, nthreads, machine._id, e2eOrAlg)) : {};

        let columnsFromTable = _.range(1, this.executionTimeData.getNumberOfColumns());
        if (this.executionTimeData.getNumberOfColumns() < 2)
            this.executionTimeData = newExecutionTimeData;
        else
            this.executionTimeData = google.visualization.data.join(this.executionTimeData, newExecutionTimeData, 'full', [
                [0, 0]
            ], columnsFromTable, [1]);

        if (this.speedupData.getNumberOfColumns() < 2)
            this.speedupData = newSpeedupData;
        else
            this.speedupData = google.visualization.data.join(this.speedupData, newSpeedupData, 'full', [
                [0, 0]
            ], columnsFromTable, [1]);

        if (nthreads > 1) {
            let columnsFromTable = _.range(1, this.karpFlattData.getNumberOfColumns());
            if (this.karpFlattData.getNumberOfColumns() < 2)
                this.karpFlattData = newKarpFlattData;
            else
                this.karpFlattData = google.visualization.data.join(this.karpFlattData, newKarpFlattData, 'full', [
                    [0, 0]
                ], columnsFromTable, [1]);
        }

        if (nthreads > 0) {
            let columnsFromTable = _.range(1, this.efficiencyData.getNumberOfColumns());
            if (this.efficiencyData.getNumberOfColumns() < 2)
                this.efficiencyData = newEfficiencyData;
            else
                this.efficiencyData = google.visualization.data.join(this.efficiencyData, newEfficiencyData, 'full', [
                    [0, 0]
                ], columnsFromTable, [1]);
        }
    }

    removeNumber(approach, nthreads, machine, e2eOrAlg) {

        let numSpeedCol = this.speedupData.getNumberOfColumns();
        let numExecCol = this.executionTimeData.getNumberOfColumns();
        let numKarpCol = this.karpFlattData.getNumberOfColumns();
        let numEffiCol = this.efficiencyData.getNumberOfColumns();

        for (let j = 1; j < numSpeedCol; j++) {
            if (this.speedupData.getColumnId(j) == this.TableService.getID(approach._id, nthreads, machine._id, e2eOrAlg)) {
                this.speedupData.removeColumn(j);
                break;
            }
        }

        for (let j = 1; j < numExecCol; j++) {
            if (this.executionTimeData.getColumnId(j) == this.TableService.getID(approach._id, nthreads, machine._id, e2eOrAlg)) {
                this.executionTimeData.removeColumn(j);
                break;
            }
        }

        for (let j = 1; j < numKarpCol; j++) {
            if (this.karpFlattData.getColumnId(j) == this.TableService.getID(approach._id, nthreads, machine._id, e2eOrAlg)) {
                this.karpFlattData.removeColumn(j);
                break;
            }
        }

        for (let j = 1; j < numEffiCol; j++) {
            if (this.efficiencyData.getColumnId(j) == this.TableService.getID(approach._id, nthreads, machine._id, e2eOrAlg)) {
                this.efficiencyData.removeColumn(j);
                break;
            }
        }

        if(this.executionTimeData.getNumberOfColumns() < 2) {
            this.clear();
        }
    }

    get(type) {
        switch(type) {
            case 'executionTime': return this.executionTimeData;
                break;
            case 'speedup': return this.speedupData;
                break;
            case 'karpFlatt': return this.karpFlattData;
                break;
            case 'efficiency': return this.efficiencyData;
                break;
        }
    }

    clear() {
        this.executionTimeData = new google.visualization.DataTable();
        this.speedupData = new google.visualization.DataTable();
        this.karpFlattData = new google.visualization.DataTable();
        this.efficiencyData = new google.visualization.DataTable();
    }

    columnExists(approach, nthreads, machine, e2eOrAlg) {
        let numExecCol = this.executionTimeData.getNumberOfColumns();
        for (let j = 1; j < numExecCol; j++) {
            if (this.executionTimeData.getColumnId(j) == this.TableService.getID(approach._id, nthreads, machine._id, e2eOrAlg)) {
                return true;
            }
        }
        return false;
    }
}
