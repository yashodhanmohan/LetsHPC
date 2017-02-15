import _ from 'lodash';

export default class ChartController {
    constructor($timeout) {
        this.id = this.guid()
        this.chart = {};
        this.userOptions = {
            'hAxis.viewWindow.min': undefined,
            'vAxis.viewWindow.min': undefined,
            'hAxis.viewWindow.max': undefined,
            'vAxis.viewWindow.max': undefined,
            'hAxis.logScale': false,
            'vAxis.logScale': false
        }
        $timeout(() => {
            this.chart = new google.visualization.LineChart(document.getElementById(this.id));
            google.visualization.events.addListener(this.chart, 'ready', () => {
                this.chartImage = this.chart.getImageURI();
            });
        })
    }

    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    $onChanges(changesObj) {
        this.refresh();
    }

    refresh(empty = false) {

        let dummyData = google.visualization.arrayToDataTable([
            [' ', ' '],
            ['', 0],
        ]);

        _.forEach(this.userOptions, (value, key) => {
            if(value != undefined && value != '') {
                this.options.setOption(key, value)
            }
        });

        if(empty)
            this.chart.draw(dummyData, this.options.getOptions());
        else if(this.data.getNumberOfColumns() < 2)
            this.chart.draw(dummyData, this.options.getOptions());
        else
            this.chart.draw(this.data, this.options.getOptions());
    }

    exportChart() {
        let download = document.createElement('a');
        download.href = this.chartImage;
        download.download = 'image.png';
        download.click();
    }
}
