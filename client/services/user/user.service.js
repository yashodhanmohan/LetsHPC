import Cache from '../../classes/cache';

export default class UserService {
    /*@ngInject*/
    constructor($http, $window) {
        this.$http = $http;
        this.$window = $window;
    }

    cacheUser(user) {
        this.$window.sessionStorage.user = JSON.stringify(user);
    }

    getUser() {
        if(this.$window.sessionStorage.user) {
            return JSON.parse(this.$window.sessionStorage.user);
        } else {
            return {};
        }
    }

    removeUser() {
        if(this.$window.sessionStorage.user) {
            delete this.$window.sessionStorage.user;
        }
    }

}
