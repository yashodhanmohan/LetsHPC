'use strict';

export default function routes($routeProvider) {
    'ngInject';

    $routeProvider.when('/login', {
        template: require('./login.html'),
        controller: 'LoginController',
        controllerAs: 'login'
    });
}
