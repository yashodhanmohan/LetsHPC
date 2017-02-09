import ChartController from './chart.controller';
import chartTemplate from './chart.html';

export default angular.module('yashwantProjectApp.directive.chart', [])
    .component('hpcChart', {
        template: chartTemplate,
        bindings: {
            data: '<',
            options: '<',

        },
        controller: ChartController,
        controllerAs: 'chart'
    })
    .name;
