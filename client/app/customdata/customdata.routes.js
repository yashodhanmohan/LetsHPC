'use strict';

export default function routes($routeProvider) {
    'ngInject';

    $routeProvider.when('/customdata', {
        template: require('./customdata.html'),
        controller: 'CustomDataController',
        controllerAs: 'custom'
    });
}
