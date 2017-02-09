import _ from 'lodash';

export default class CalculatorService {

    /*@ngInject*/
    constructor() {
    }

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

        let e2eEfficiencyByProblemSize = _.mapValues(e2eSpeedup, speedup =>  speedup / nthreads);
        let algEfficiencyByProblemSize = _.mapValues(algSpeedup, speedup =>  speedup / nthreads);

        return {
            e2e: e2eEfficiencyByProblemSize,
            alg: algEfficiencyByProblemSize
        };
    }
}
