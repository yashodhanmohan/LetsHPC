'use strict';

export function AuthService($location, $http, $cookies, $q, appConfig, UtilService, UserService) {
    'ngInject';

    let safeCb = UtilService.safeCb;

    let Auth = {
        login(email, password, callback) {
            return $http
            .post('/auth/local', {email, password})
            .then(res => {
                $cookies.put('token', res.data.token);
                UserService.cacheUser(res.data.user);
                return res.data.user;
            })
            .then(user => {
                safeCb(callback)(null, user);
                return user;
            })
            .catch(err => {
                this.logout();
                safeCb(callback)(err.data);
                return $q.reject(err.data);
            });
        },

        logout() {
            $cookies.remove('token');
            UserService.removeUser();
        },

        isLoggedIn(callback) {
            callback(!!$cookies.get('token'))
        },

        /**
         * Get auth token
         *
         * @return {String} - a token string used for authenticating
         */
        getToken() {
            return $cookies.get('token');
        }
    };

    return Auth;
}
