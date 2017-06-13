import _ from 'lodash';

export default class ChartOption {

    options = {
        titlePosition: 'in',
        height: 600,
        pointShape: 'circle',
        pointsVisible: true,
        explorer: {
            keepInBounds: true,
            maxZoomOut: 1,
            actions: ['dragToZoom', 'rightClickToReset']
        },
        hAxis: {
            logScale: true,
            format: 'scientific',
            title: 'Size',
            titleTextStyle: {
                fontSize: 20
            },
            textStyle: {
                fontSize: 15
            }
        },
        vAxis: {
            logScale: false,
            titleTextStyle: {
                fontSize: 20
            },
            textStyle: {
                fontSize: 15
            }
        },
        chartArea: {
            backgroundColor: {
                stroke: '#000',
                strokeWidth: 1
            }
        },
        crosshair: {
            color: 'black',
            trigger: 'both'
        },
        legend: {
            maxLines: 5,
            textStyle: {
                fontSize: 13
            }
        },
        selectionMode: 'multiple'
    };

    defaultOptions = {
        executionTime: {
            hAxis: {
                title: 'Problem size'
            },
            vAxis: {
                title: 'Execution time (s)'
            }
        },
        speedup: {
            hAxis: {
                title: 'Problem size'
            },
            vAxis: {
                title: 'Speedup'
            }
        },
        karpFlatt: {
            hAxis: {
                title: 'Problem size'
            },
            vAxis: {
                title: 'Karp flatt coefficient',
                viewWindowMode: 'explicit',
                viewWindow: {
                    min: 0,
                    max: 1
                }
            }
        },
        efficiency: {
            title: 'Problem size vs. Efficiency',
            hAxis: {
                title: 'Problem size'
            },
            vAxis: {
                title: 'Efficiency',
                viewWindowMode: 'explicit',
                viewWindow: {
                    min: 0,
                    max: 2
                }
            }
        }
    }

    constructor() {
        _.merge(this.options, this.defaultOptions.executionTime);
    }

    setOption(key, value) {
        _.set(this.options, key, value);
    }

    setOptions(type) {
        _.merge(this.options, this.defaultOptions[type]);
    }

    getOption(key) {
        return _.get(this.options, key);
    }

    getOptions() {
        return _.cloneDeep(this.options);
    }
}
