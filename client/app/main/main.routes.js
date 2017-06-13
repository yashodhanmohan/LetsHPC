'use strict';

export default function routes($routeProvider) {
    'ngInject';

    $routeProvider.when('/new', {
        template: require('./new.html'),
        controller: 'MainController',
        controllerAs: 'main'
    });

        $routeProvider.when('/main', {
        template: require('./main.html'),
        controller: 'MainController',
        controllerAs: 'main'
    });
}
