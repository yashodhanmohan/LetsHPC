export default class ChartController {
    constructor($timeout) {
        this.id = this.guid()
        this.chart = {};
        console.log('Chart created with id '+this.id);
        $timeout(() => {
            this.chart = new google.visualization.LineChart(document.getElementById(this.id));
            this.options = this.options.getOptions();
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

    refresh() {
        this.chart.draw(this.data, this.options);
    }

    exportChart() {
        var download = document.createElement('a');
        download.href = this.chartImage;
        download.download = 'image.png';
        download.click();
    }
}
