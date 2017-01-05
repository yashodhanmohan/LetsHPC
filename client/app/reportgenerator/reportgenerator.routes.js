'use strict';

export default function routes($routeProvider) {
    'ngInject';

    $routeProvider.when('/reportgenerator', {
        template: require('./reportgenerator.html'),
        controller: 'ReportGeneratorController',
        controllerAs: 'report'
    });
}
