'use strict';

export default function routes($routeProvider) {
    'ngInject';

    $routeProvider.when('/main', {
        template: require('./main.html'),
        controller: 'MainController',
        controllerAs: 'main'
    });
}
