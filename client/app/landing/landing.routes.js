'use strict';

export default function routes($routeProvider) {
    'ngInject';

    $routeProvider.when('/', {
        template: require('./landing.html'),
        controller: 'LandingController',
        controllerAs: 'landing'
    });
}
