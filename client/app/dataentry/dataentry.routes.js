'use strict';

export default function routes($routeProvider) {
    'ngInject';

    $routeProvider.when('/dataentry', {
        template: require('./dataentry.html'),
        controller: 'DataEntryController',
        controllerAs: 'dataentry'
    })
    .when('/dataentry/projects', {
        template: require('./projects.html')
    });


}
