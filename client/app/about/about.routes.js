'use strict';

export default function routes($routeProvider) {
    'ngInject';
    $routeProvider.when('/about', {
        template: require('./about.html'),
        controller: 'AboutController',
        controllerAs: 'about'
    });
}
