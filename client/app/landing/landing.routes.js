'use strict';

export default function routes($routeProvider) {
    'ngInject';
    $routeProvider.when('/landing', {
        template: require('./landing.html'),
        controller: 'LandingController',
        controllerAs: 'landing'
    });
}
