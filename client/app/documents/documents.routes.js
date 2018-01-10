'use strict';

export default function routes($routeProvider) {
    'ngInject';

    $routeProvider.when('/documents/terminologies', {
        template: require('./terminologies.html')
    })
    .when('/documents/readings', {
        template: require('./readings.html')
    })
    .when('/documents/publications', {
        template: require('./publications.html')
    })
    .when('/documents/links', {
        template: require('./links.html')
    });

}
