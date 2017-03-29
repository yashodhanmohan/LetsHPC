import _ from 'lodash';

export default class CalculatorService {

    /*@ngInject*/
    constructor() {}

    averagedExecutionTime(number) {

        let numberGroupedByProblemSize = _.groupBy(number, 'n');

        let e2eExecutionTimeByProblemSize = _.mapValues(numberGroupedByProblemSize, numbers => {
            return _.reduce(numbers, (sum, number) => {
                return sum + (number.e2eS + (number.e2eNS * 1e-9))
            }, 0) / numbers.length;
        })

        let algExecutionTimeByProblemSize = _.mapValues(numberGroupedByProblemSize, numbers => {
            return _.reduce(numbers, (sum, number) => {
                return sum + (number.algS + (number.algNS * 1e-9))
            }, 0) / numbers.length;
        })

        return {
            e2e: e2eExecutionTimeByProblemSize,
            alg: algExecutionTimeByProblemSize
        };
    }

    averagedSpeedup(number, number_for_serial) {
        let e2eSpeedupByProblemSize = {};
        let algSpeedupByProblemSize = {};

        let averageExecutionTime = this.averagedExecutionTime(number);
        let e2eExecutionTime = averageExecutionTime.e2e;
        let algExecutionTime = averageExecutionTime.alg;

        let averageExecutionTime0 = this.averagedExecutionTime(number_for_serial);
        let e2eExecutionTime0 = averageExecutionTime0.e2e;
        let algExecutionTime0 = averageExecutionTime0.alg;

        for (let size in e2eExecutionTime) {
            e2eSpeedupByProblemSize[size] = e2eExecutionTime0[size] / e2eExecutionTime[size];
        }

        for (let size in algExecutionTime) {
            algSpeedupByProblemSize[size] = algExecutionTime0[size] / algExecutionTime[size];
        }

        return {
            e2e: e2eSpeedupByProblemSize,
            alg: algSpeedupByProblemSize
        };
    }

    averagedKarpFlatt(number, number_for_serial, machine) {
        let averageSpeedup = this.averagedSpeedup(number, number_for_serial);
        let e2eSpeedup = averageSpeedup.e2e;
        let algSpeedup = averageSpeedup.alg;
        let p = machine.cpu_count;

        let e2eKarpFlattByProblemSize = _.mapValues(e2eSpeedup, speedup => {
            return ((1 / speedup) - (1 / p)) / (1 - (1 / p));
        });

        let algKarpFlattByProblemSize = _.mapValues(algSpeedup, speedup => {
            return ((1 / speedup) - (1 / p)) / (1 - (1 / p));
        })

        return {
            e2e: e2eKarpFlattByProblemSize,
            alg: algKarpFlattByProblemSize
        };
    }

    averagedEfficiency(number, number_for_serial, nthreads) {

        let averageSpeedup = this.averagedSpeedup(number, number_for_serial);
        let e2eSpeedup = averageSpeedup.e2e;
        let algSpeedup = averageSpeedup.alg;

        nthreads = parseInt(nthreads);

        let e2eEfficiencyByProblemSize = _.mapValues(e2eSpeedup, speedup => speedup / nthreads);
        let algEfficiencyByProblemSize = _.mapValues(algSpeedup, speedup => speedup / nthreads);

        return {
            e2e: e2eEfficiencyByProblemSize,
            alg: algEfficiencyByProblemSize
        };
    }

    executionTime(numbers) {

        let numbersGroupedByProblemSize = _.mapValues(_.groupBy(numbers, 'n'), nums => this._combinedNumbers(nums));

        return {
            e2e: {
                mean: _.mapValues(_.mapValues(
                        numbersGroupedByProblemSize,
                        obj => obj.e2e),
                    arr => this._mean(arr)),
                median: _.mapValues(_.mapValues(
                        numbersGroupedByProblemSize,
                        obj => obj.e2e),
                    arr => this._median(arr)),
                range: _.mapValues(_.mapValues(
                        numbersGroupedByProblemSize,
                        obj => obj.e2e),
                    arr => this._range(arr)),
                standardDeviation: _.mapValues(_.mapValues(
                        numbersGroupedByProblemSize,
                        obj => obj.e2e),
                    arr => this._standardDeviation(arr))
            },
            alg: {
                mean: _.mapValues(_.mapValues(
                        numbersGroupedByProblemSize,
                        obj => obj.alg),
                    arr => this._mean(arr)),
                median: _.mapValues(_.mapValues(
                        numbersGroupedByProblemSize,
                        obj => obj.alg),
                    arr => this._median(arr)),
                range: _.mapValues(_.mapValues(
                        numbersGroupedByProblemSize,
                        obj => obj.alg),
                    arr => this._range(arr)),
                standardDeviation: _.mapValues(_.mapValues(
                        numbersGroupedByProblemSize,
                        obj => obj.alg),
                    arr => this._standardDeviation(arr))
            }
        }
    }

    speedup(numbers, serialNumbers) {
        
        // Assuming numbers of one thread count and 0 thread count are given as arguments

        let serialNumbersGroupedBySize = _.groupBy(serialNumbers, 'n');
        let serialNumbersGroupedBySizeRunID = _.mapValues(serialNumbersGroupedBySize, arr => _.groupBy(arr, 'run_id'));

        let numbersGroupedBySize = _.groupBy(numbers, 'n');
        let numbersGroupedBySizeRunID = _.mapValues(numbersGroupedBySize, arr => _.groupBy(arr, 'run_id'));

        let speedupsGroupedBySize = {};

        _.forEach(numbersGroupedBySizeRunID, (value1, key1) => {
            speedupsGroupedBySize[key1] = {e2e: [], alg: []};
            _.forEach(value1, (value2, key2) => {
                
                if( serialNumbersGroupedBySizeRunID[key1] !== undefined && 
                    serialNumbersGroupedBySizeRunID[key1][key2] !== undefined &&
                    numbersGroupedBySizeRunID[key1] !== undefined &&
                    numbersGroupedBySizeRunID[key1][key2] !== undefined) {

                    let pNumber = numbersGroupedBySizeRunID[key1][key2][0];
                    let serialNumber = serialNumbersGroupedBySizeRunID[key1][key2][0];


                    let e2e = (serialNumber.e2eS + serialNumber.e2eNS * 1e-9) / (pNumber.e2eS + pNumber.e2eNS * 1e-9);
                    let alg = (serialNumber.algS + serialNumber.algNS * 1e-9) / (pNumber.algS + pNumber.algNS * 1e-9);
                    
                    speedupsGroupedBySize[key1].e2e.push(e2e);
                    speedupsGroupedBySize[key1].alg.push(alg);

                }
            });
        });

        let speedups = {
            alg: {
                mean: {},
                median: {},
                range: {},
                standardDeviation: {}
            },
            e2e: {
                mean: {},
                median: {},
                range: {},
                standardDeviation: {}
            }
        }

        _.forEach(speedupsGroupedBySize, (value, key) => {
            speedups.alg.mean[key] = this._mean(value.alg);
            speedups.alg.median[key] = this._median(value.alg);
            speedups.alg.range[key] = this._range(value.alg);
            speedups.alg.standardDeviation[key] = this._standardDeviation(value.alg);

            speedups.e2e.mean[key] = this._mean(value.e2e);
            speedups.e2e.median[key] = this._median(value.e2e);
            speedups.e2e.range[key] = this._range(value.e2e);
            speedups.e2e.standardDeviation[key] = this._standardDeviation(value.e2e);
        });

        return speedups;

    }

    karpFlatt(numbers, serialNumbers, machine) {

        // Assuming numbers of one thread count and 0 thread count are given as arguments

        let p = machine.cpu_count;

        let serialNumbersGroupedBySize = _.groupBy(serialNumbers, 'n');
        let serialNumbersGroupedBySizeRunID = _.mapValues(serialNumbersGroupedBySize, arr => _.groupBy(arr, 'run_id'));

        let numbersGroupedBySize = _.groupBy(numbers, 'n');
        let numbersGroupedBySizeRunID = _.mapValues(numbersGroupedBySize, arr => _.groupBy(arr, 'run_id'));

        let karpFlattsGroupedBySize = {};

        _.forEach(numbersGroupedBySizeRunID, (value1, key1) => {
            karpFlattsGroupedBySize[key1] = {e2e: [], alg: []};
            _.forEach(value1, (value2, key2) => {

                if( serialNumbersGroupedBySizeRunID[key1] !== undefined && 
                    serialNumbersGroupedBySizeRunID[key1][key2] !== undefined &&
                    numbersGroupedBySizeRunID[key1] !== undefined &&
                    numbersGroupedBySizeRunID[key1][key2] !== undefined) {

                    let pNumber = numbersGroupedBySizeRunID[key1][key2][0];
                    let serialNumber = serialNumbersGroupedBySizeRunID[key1][key2][0];

                    let e2eSpeedup = (serialNumber.e2eS + serialNumber.e2eNS * 1e-9) / (pNumber.e2eS + pNumber.e2eNS * 1e-9)
                    let algSpeedup = (serialNumber.algS + serialNumber.algNS * 1e-9) / (pNumber.algS + pNumber.algNS * 1e-9)

                    let e2eKarpFlatt =  ((1 / e2eSpeedup) - (1 / p)) / (1 - (1 / p));
                    let algKarpFlatt =  ((1 / algSpeedup) - (1 / p)) / (1 - (1 / p));

                    karpFlattsGroupedBySize[key1].e2e.push(e2eKarpFlatt);
                    karpFlattsGroupedBySize[key1].alg.push(algKarpFlatt);

                }
            });
        });

        let karpFlatts = {
            alg: {
                mean: {},
                median: {},
                range: {},
                standardDeviation: {}
            },
            e2e: {
                mean: {},
                median: {},
                range: {},
                standardDeviation: {}
            }
        }

        _.forEach(karpFlattsGroupedBySize, (value, key) => {
            karpFlatts.alg.mean[key] = this._mean(value.alg);
            karpFlatts.alg.median[key] = this._median(value.alg);
            karpFlatts.alg.range[key] = this._range(value.alg);
            karpFlatts.alg.standardDeviation[key] = this._standardDeviation(value.alg);

            karpFlatts.e2e.mean[key] = this._mean(value.e2e);
            karpFlatts.e2e.median[key] = this._median(value.e2e);
            karpFlatts.e2e.range[key] = this._range(value.e2e);
            karpFlatts.e2e.standardDeviation[key] = this._standardDeviation(value.e2e);
        });

        return karpFlatts;
    }

    efficiency(numbers, serialNumbers, nthreads) {
        // Assuming numbers of one thread count and 0 thread count are given as arguments

        nthreads = parseInt(nthreads);

        let serialNumbersGroupedBySize = _.groupBy(serialNumbers, 'n');
        let serialNumbersGroupedBySizeRunID = _.mapValues(serialNumbersGroupedBySize, arr => _.groupBy(arr, 'run_id'));

        let numbersGroupedBySize = _.groupBy(numbers, 'n');
        let numbersGroupedBySizeRunID = _.mapValues(numbersGroupedBySize, arr => _.groupBy(arr, 'run_id'));

        let efficienciesGroupedBySize = {};

        _.forEach(numbersGroupedBySizeRunID, (value1, key1) => {
            efficienciesGroupedBySize[key1] = {e2e: [], alg: []};
            _.forEach(value1, (value2, key2) => {

                if( serialNumbersGroupedBySizeRunID[key1] !== undefined && 
                    serialNumbersGroupedBySizeRunID[key1][key2] !== undefined &&
                    numbersGroupedBySizeRunID[key1] !== undefined &&
                    numbersGroupedBySizeRunID[key1][key2] !== undefined) {

                    let pNumber = numbersGroupedBySizeRunID[key1][key2][0];
                    let serialNumber = serialNumbersGroupedBySizeRunID[key1][key2][0];

                    let e2eSpeedup = (serialNumber.e2eS + serialNumber.e2eNS * 1e-9) / (pNumber.e2eS + pNumber.e2eNS * 1e-9)
                    let algSpeedup = (serialNumber.algS + serialNumber.algNS * 1e-9) / (pNumber.algS + pNumber.algNS * 1e-9)

                    let e2eEfficiency =  e2eSpeedup / nthreads;
                    let algEfficiency =  algSpeedup / nthreads;

                    efficienciesGroupedBySize[key1].e2e.push(e2eEfficiency);
                    efficienciesGroupedBySize[key1].alg.push(algEfficiency);

                }
            });
        });

        let efficiencies = {
            alg: {
                mean: {},
                median: {},
                range: {},
                standardDeviation: {}
            },
            e2e: {
                mean: {},
                median: {},
                range: {},
                standardDeviation: {}
            }
        }

        _.forEach(efficienciesGroupedBySize, (value, key) => {
            efficiencies.alg.mean[key] = this._mean(value.alg);
            efficiencies.alg.median[key] = this._median(value.alg);
            efficiencies.alg.range[key] = this._range(value.alg);
            efficiencies.alg.standardDeviation[key] = this._standardDeviation(value.alg);

            efficiencies.e2e.mean[key] = this._mean(value.e2e);
            efficiencies.e2e.median[key] = this._median(value.e2e);
            efficiencies.e2e.range[key] = this._range(value.e2e);
            efficiencies.e2e.standardDeviation[key] = this._standardDeviation(value.e2e);
        });

        return efficiencies;
    }

    _combinedNumbers(numbers) {

        let e2e = _.map(numbers, number => number.e2eS + number.e2eNS * 1e-9);
        let alg = _.map(numbers, number => number.algS + number.algNS * 1e-9);

        return {
            alg: alg,
            e2e: e2e
        }
    }

    _mean(numbers) {
        return _.reduce(numbers, (sum, number) => sum + number, 0) / numbers.length;
    }

    _median(numbers) {
        return numbers.sort()[_.floor(numbers.length / 2)];
    }

    _range(numbers) {
        let sortedNumbers = numbers.sort();
        return sortedNumbers[sortedNumbers.length - 1] - sortedNumbers[0];
    }

    _standardDeviation(numbers) {
        let mean = this._mean(numbers);
        return Math.sqrt(_.sum(_.map(_.map(
                numbers,
                number => number - mean),
            number => number * number)) / numbers.length);
    }
}
