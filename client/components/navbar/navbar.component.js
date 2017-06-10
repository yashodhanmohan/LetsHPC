'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
    

    isCollapsed = true;

    constructor($location, AuthService, UserService) {
        'ngInject';

        this.AuthService = AuthService;
        this.$location = $location;

        this.$location = $location;
        this.isLoggedIn = AuthService.isLoggedIn(is => is);
        this.currentUser = UserService.getUser();

        this.menu = [{
            title: 'Home',
            link: '/'
        }, {
            title: 'Comparison Tool',
            link: '/main'
        }, {
            title: 'Report Generator',
            link: '/reportgenerator'
        }, {
            title: 'Custom Data',
            link: '/customdata'
        }, {
            title: 'Data Entry',
            link: '/dataentry'
        }];
    }

    isActive(route) {
        return route === this.$location.path();
    }

    logout() {
        this.AuthService.logout();
        this.$location.url("/login");
    }
}

export default angular.module('directives.navbar', [])
    .component('navbar', {
        template: require('./navbar.html'),
        controller: NavbarComponent,
        controllerAs: 'navbar'
    })
    .name;
