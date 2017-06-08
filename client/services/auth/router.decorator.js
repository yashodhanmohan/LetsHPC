'use strict';

export function routerDecorator($rootScope, $location, AuthService) {
    'ngInject';

    $rootScope.$on('$routeChangeStart', function(event, next) {
        if (!next.authenticate) {
            return;
        }
        if (typeof next.authenticate === 'string') {
            AuthService.hasRole(next.authenticate)
                .then(has => {
                    if (has) {
                        return;
                    }

                    event.preventDefault();
                    return Auth.isLoggedIn()
                        .then(is => {
                            $location.path(is ? '/' : '/login');
                        });
                });
        } else {
            AuthService.isLoggedIn()
                .then(is => {
                    if (is) {
                        return;
                    }

                    event.preventDefault();
                    $location.path('/login');
                });
        }
    });
}
