import Cache from '../../classes/cache';

export default class UserService {
    /*@ngInject*/
    constructor($http, $window) {
        this.$http = $http;
        this.$window = $window;
    }

    cacheUser(user) {
        this.$window.localStorage.user = JSON.stringify(user);
    }

    getUser() {
        if(this.$window.localStorage.user) {
            return JSON.parse(this.$window.localStorage.user);
        } else {
            return {};
        }
    }

    removeUser() {
        if(this.$window.localStorage.user) {
            delete this.$window.localStorage.user;
        }
    }

}
