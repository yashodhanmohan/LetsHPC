import _ from 'lodash';

export default class ChartOption {
    constructor() {
        this.options = {
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
        }
    }

    setOption(key, value) {
        this.options[key] = value;
    }

    setOptions(options) {
        _.merge(this.options, options);
    }

    getOption(key) {
        return this.options[key];
    }

    getOptions() {
        return _.cloneDeep(this.options);
    }
}
