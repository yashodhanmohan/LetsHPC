import _ from 'lodash';

export default class ChartOption {

    options = {
        titlePosition: 'out',
        height: 600,
        pointShape: 'circle',
        pointsVisible: true,
        explorer: {
            keepInBounds: true,
            maxZoomOut: 1,
            actions: ['dragToZoom', 'rightClickToReset']
        },
        hAxis: {
            logScale: false,
            format: 'scientific',
            title: 'Size',
            titleTextStyle: {
                fontSize: 20
            },
            textStyle: {
                fontSize: 20
            }
        },
        vAxis: {
            logScale: false,
            titleTextStyle: {
                fontSize: 20
            },
            textStyle: {
                fontSize: 20
            }
        },
        chartArea: {
            width: '60%',
            height: '60%',
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
          //  title: 'Problem size vs. Execution time',
            hAxis: {
                title: 'Problem size',
                textStyle: {
                    fontSize: 20
                }
            },
            vAxis: {
                title: 'Execution time (s)',
                textStyle: {
                    fontSize: 20
                }
            }
        },
        speedup: {
          //  title: 'Problem size vs. Speedup',
            hAxis: {
                title: 'Problem size',
                textStyle: {
                    fontSize: 20
                }
            },
            vAxis: {
                title: 'Speedup',
                textStyle: {
                    fontSize: 20
                }
            }
        },
        karpFlatt: {
          //  title: 'Problem size vs. Karp Flatt',
            hAxis: {
                title: 'Problem size',
                textStyle: {
                    fontSize: 20
                }
            },
            vAxis: {
                title: 'Karp Flatt coefficient',
                viewWindowMode: 'explicit',
                viewWindow: {
                    min: 0,
                    max: 1
                },
                textStyle: {
                    fontSize: 20
                }
            }
        },
        efficiency: {
        //  title: 'Problem size vs. Efficiency',
            hAxis: {
                title: 'Problem size',
                textStyle: {
                    fontSize: 20
                }
            },
            vAxis: {
                title: 'Efficiency',
                viewWindowMode: 'explicit',
                viewWindow: {
                    min: 0,
                    max: 2
                },
                textStyle: {
                    fontSize: 20
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

    mergeOptions(optionsToBeMerged) {
        _.merge(this.options, optionsToBeMerged);
    }

    getOption(key) {
        return _.get(this.options, key);
    }

    getOptions() {
        return _.cloneDeep(this.options);
    }
}
