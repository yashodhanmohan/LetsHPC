'use strict';

export function routeConfig($routeProvider, $locationProvider, $mdThemingProvider) {
    'ngInject';

    // $routeProvider.otherwise({
    //     redirectTo: '/'
    // });

    $locationProvider.html5Mode(true);
}
