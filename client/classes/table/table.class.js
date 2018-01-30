import _ from 'lodash';

export default class Table {

    constructor() {
        this.CalculatorService = undefined;
        this.TableService = undefined;
        this.approaches = [];
        this.machines = [];

        this.perfFields = ["cycles","instructions","cacheReferences","cacheMisses","busCycles","L1DcacheLoads","L1DcacheLoadMisses","L1DcacheStores","dTLBLoads","dTLBLoadMisses","LLCLoads","LLCLoadMisses","LLCStores","branches","branchMisses","contextSwitches","cpuMigrations","pageFaults"]

        for(let field in this.perfFields) {
            this[this.perfFields[field]] = {
                mean: new google.visualization.DataTable(),
                median: new google.visualization.DataTable(),
                range: new google.visualization.DataTable(),
                standardDeviation: new google.visualization.DataTable()
            }
        }

        this.executionTimeData = {
            mean: new google.visualization.DataTable(),
            median: new google.visualization.DataTable(),
            range: new google.visualization.DataTable(),
            standardDeviation: new google.visualization.DataTable(),
        };
        this.speedupData = {
            mean: new google.visualization.DataTable(),
            median: new google.visualization.DataTable(),
            range: new google.visualization.DataTable(),
            standardDeviation: new google.visualization.DataTable(),
        };
        this.karpFlattData = {
            mean: new google.visualization.DataTable(),
            median: new google.visualization.DataTable(),
            range: new google.visualization.DataTable(),
            standardDeviation: new google.visualization.DataTable(),
        };
        this.efficiencyData = {
            mean: new google.visualization.DataTable(),
            median: new google.visualization.DataTable(),
            range: new google.visualization.DataTable(),
            standardDeviation: new google.visualization.DataTable(),
        };
    }

    addServices(CalculatorService, TableService) {
        this.CalculatorService = CalculatorService;
        this.TableService = TableService;
    }

    addNumber(approach, nthreads, machine, e2eOrAlg, numbers) {

        if(this.columnExists(approach, nthreads, machine, e2eOrAlg)) {
            return;
        }

        if (_.findIndex(this.approaches, aprch => { return aprch._id == approach._id }) == -1)
            this.approaches.push(approach);

        if (_.findIndex(this.machines, mchn => { return mchn._id == machine._id }) == -1)
            this.machines.push(machine);

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
        let executionTime = this.CalculatorService.executionTime(number);
        let speedup = this.CalculatorService.speedup(number, serialNumbers);
        let karpFlatt = nthreads > 1 ? this.CalculatorService.karpFlatt(number, serialNumbers, machine) : {};
        let efficiency = nthreads > 0 ? this.CalculatorService.efficiency(number, serialNumbers, nthreads) : {};

        // New perf data
        let perf = {};
        for(let field in this.perfFields) {
            perf[this.perfFields[field]] = this.CalculatorService.entity(number, this.perfFields[field]);
        }

        let approachNumber = this._approachNumber(approach) + 1;
        let machineNumber = this._machineNumber(machine) + 1;

        let label = this.TableService.getLabel(approachNumber, nthreads, machineNumber, e2eOrAlg);
        let id = this.TableService.getID(approach._id, nthreads, machine._id, e2eOrAlg);

        // Tables for perf data
        let newPerfData = {};
        for(let field in this.perfFields) {
            newPerfData[this.perfFields[field]] = _.mapValues(perf[this.perfFields[field]], statistic => {
                return this.TableService.objectToTable(statistic, 'SIZE', 'size', this.TableService.getLabel(approachNumber, nthreads, machineNumber, this.perfFields[field]), this.TableService.getID(approach._id, nthreads, machine._id, this.perfFields[field]));
            });
        }

        // Tables for new data
        let newExecutionTimeData = _.mapValues(executionTime[e2eOrAlg], statistic => {
            return this.TableService.objectToTable(statistic, 'SIZE', 'size', label, id);
        });
        let newSpeedupData = _.mapValues(speedup[e2eOrAlg], statistic => {
            return this.TableService.objectToTable(statistic, 'SIZE', 'size', label, id);
        });
        let newKarpFlattData = nthreads > 1 ? _.mapValues(karpFlatt[e2eOrAlg], statistic => {
            return this.TableService.objectToTable(statistic, 'SIZE', 'size', label, id);
        }) : {};
        let newEfficiencyData = nthreads > 0 ? _.mapValues(efficiency[e2eOrAlg], statistic => {
            return this.TableService.objectToTable(statistic, 'SIZE', 'size', label, id);
        }) : {};

        // Merge Perf data tables
        for(let field in this.perfFields) {
            _.forEach(this[this.perfFields[field]], (value, key) => {
                this[this.perfFields[field]][key] = this._mergeTable(this[this.perfFields[field]][key], newPerfData[this.perfFields[field]][key]);
            });
        }

        // Merge tables
        _.forEach(this.executionTimeData, (value, key) => {
            this.executionTimeData[key] = this._mergeTable(this.executionTimeData[key], newExecutionTimeData[key]);
        });
        _.forEach(this.speedupData, (value, key) => {
            this.speedupData[key] = this._mergeTable(this.speedupData[key], newSpeedupData[key]);
        });
        if(nthreads > 1) {
            _.forEach(this.karpFlattData, (value, key) => {
                this.karpFlattData[key] = this._mergeTable(this.karpFlattData[key], newKarpFlattData[key]);
            });
        }
        if(nthreads > 0) {
            _.forEach(this.efficiencyData, (value, key) => {
                this.efficiencyData[key] = this._mergeTable(this.efficiencyData[key], newEfficiencyData[key]);
            });
        }
    }

    removeNumber(approach, nthreads, machine, e2eOrAlg) {

        let numSpeedCol = this.speedupData.mean.getNumberOfColumns();
        let numExecCol = this.executionTimeData.mean.getNumberOfColumns();
        let numKarpCol = this.karpFlattData.mean.getNumberOfColumns();
        let numEffiCol = this.efficiencyData.mean.getNumberOfColumns();

        let perfCols = {};
        for(let field in this.perfFields) {
            perfCols[this.perfFields[field]] = this[this.perfFields[field]].mean.getNumberOfColumns();
        }

        _.forEach(this.speedupData, (value, key) => {
            for (let j = 1; j < numSpeedCol; j++) {
                if (this.speedupData[key].getColumnId(j) == this.TableService.getID(approach._id, nthreads, machine._id, e2eOrAlg)) {
                    this.speedupData[key].removeColumn(j);
                    break;
                }
            }
        })

        _.forEach(this.executionTimeData, (value, key) => {
            for (let j = 1; j < numExecCol; j++) {
                if (this.executionTimeData[key].getColumnId(j) == this.TableService.getID(approach._id, nthreads, machine._id, e2eOrAlg)) {
                    this.executionTimeData[key].removeColumn(j);
                    break;
                }
            }
        });

        _.forEach(this.karpFlattData, (value, key) => {
            for (let j = 1; j < numKarpCol; j++) {
                if (this.karpFlattData[key].getColumnId(j) == this.TableService.getID(approach._id, nthreads, machine._id, e2eOrAlg)) {
                    this.karpFlattData[key].removeColumn(j);
                    break;
                }
            }
        });

        _.forEach(this.efficiencyData, (value, key) => {
            for (let j = 1; j < numEffiCol; j++) {
                if (this.efficiencyData[key].getColumnId(j) == this.TableService.getID(approach._id, nthreads, machine._id, e2eOrAlg)) {
                    this.efficiencyData[key].removeColumn(j);
                    break;
                }
            }
        });

        for(let field in this.perfFields) {
            _.forEach(this[this.perfFields[field]], (value, key) => {
                for(let j = 1; j < perfCols[field]; j++) {
                    if(this[this.perfFields[field]][key].getColumnId(j) == this.TableService.getID(approach._id, nthreads, machine._id, this.perfFields[field])) {
                        this[this.perfFields[field]][key].removeColumn(j);
                        break;
                    }
                }
            })
        }

        if(this.executionTimeData.mean.getNumberOfColumns() < 2) {
            this.clear();
        }
    }

    get(metricType, statisticType) {
        let data = {
            legend: this.getTableLegend(),
            data: undefined
        };
        switch(metricType) {
            case 'executionTime': data.data = this.executionTimeData[statisticType];
                break;
            case 'speedup': data.data = this.speedupData[statisticType];
                break;
            case 'karpFlatt': data.data = this.karpFlattData[statisticType];
                break;
            case 'efficiency': data.data = this.efficiencyData[statisticType];
                break;
            default: data.data = this[metricType][statisticType];
                break;
        }
        return data;
    }

    clear() {

        for(let field in this.perfFields) {
            this[this.perfFields[field]] = {
                mean: new google.visualization.DataTable(),
                median: new google.visualization.DataTable(),
                range: new google.visualization.DataTable(),
                standardDeviation: new google.visualization.DataTable()
            }
        }

        this.executionTimeData = {
            mean: new google.visualization.DataTable(),
            median: new google.visualization.DataTable(),
            range: new google.visualization.DataTable(),
            standardDeviation: new google.visualization.DataTable(),
        };
        this.speedupData = {
            mean: new google.visualization.DataTable(),
            median: new google.visualization.DataTable(),
            range: new google.visualization.DataTable(),
            standardDeviation: new google.visualization.DataTable(),
        };
        this.karpFlattData = {
            mean: new google.visualization.DataTable(),
            median: new google.visualization.DataTable(),
            range: new google.visualization.DataTable(),
            standardDeviation: new google.visualization.DataTable(),
        };
        this.efficiencyData = {
            mean: new google.visualization.DataTable(),
            median: new google.visualization.DataTable(),
            range: new google.visualization.DataTable(),
            standardDeviation: new google.visualization.DataTable(),
        };
    }

    columnExists(approach, nthreads, machine, e2eOrAlg) {
        let numExecCol = this.executionTimeData.mean.getNumberOfColumns();
        for (let j = 1; j < numExecCol; j++) {
            if (this.executionTimeData.mean.getColumnId(j) == this.TableService.getID(approach._id, nthreads, machine._id, e2eOrAlg)) {
                return true;
            }
        }
        return false;
    }

    _mergeTable(oldTable, newTable) {
        let columnsFromTable = _.range(1, oldTable.getNumberOfColumns());
        if (oldTable.getNumberOfColumns() < 2)
            return newTable;
        else
            return google.visualization.data.join(oldTable, newTable, 'full', [
                [0, 0]
            ], columnsFromTable, [1]);
    }

    _approachNumber(approach) {
        return _.findIndex(this.approaches, aprch => { return aprch._id == approach._id; });
    }

    _machineNumber(machine) {
        return _.findIndex(this.machines, mchn => { return mchn._id == machine._id; });
    }

    getApproaches() {
        return this.approaches;
    }

    getMachines() {
        return this.machines;
    }

    getTableLegend() {
        let legendString = ``;
        for(let i in this.approaches) {
            let approach = this.approaches[i];
            let approachNumber = this._approachNumber(approach) + 1;
            legendString += `APR${approachNumber}: ${approach.approach_name}, `;
        }
        for(let i in this.machines) {
            let machine = this.machines[i];
            let machineNumber = this._machineNumber(machine) + 1;
            legendString += `MCN${machineNumber}: ${machine.model_name}, `
        }
        return legendString;
    }
}
