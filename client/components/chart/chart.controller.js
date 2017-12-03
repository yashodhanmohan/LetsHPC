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
            'vAxis.logScale': false,
            'hAxis.textStyle.fontSize': 20,
            'vAxis.textStyle.fontSize': 20
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

        this.options.mergeOptions(this.userOptions);

        if(empty)
            this.chart.draw(dummyData, this.options.getOptions());
        else if(this.data.data === undefined)
            this.chart.draw(dummyData, this.options.getOptions());
        else {
            this.options.mergeOptions({
                title: this.data.legend
            });
            this.chart.draw(this.data.data, this.options.getOptions());
        }
    }

    exportChart() {
        let download = document.createElement('a');
        download.href = this.chartImage;

        var chartName = "image";
        console.log(this.metric)
        if (this.statistic != null && this.metric != null)
        	chartName = this.statistic + "_" + this.metric

        console.log(this.statistic + "_" + this.metric);
        download.download = chartName + '.png';
        download.click();
    }
}
