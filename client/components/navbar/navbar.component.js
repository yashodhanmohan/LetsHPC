'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
    

    isCollapsed = true;

    constructor($location, AuthService, UserService) {
        'ngInject';


        this.$location = $location;
        this.isLoggedIn = AuthService.isLoggedInSync;
        this.isAdmin = AuthService.isAdminSync;
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
        }, {
            title: this.currentUser.name,
            link: '#'
        }];
    }

    isActive(route) {
        return route === this.$location.path();
    }
}

export default angular.module('directives.navbar', [])
    .component('navbar', {
        template: require('./navbar.html'),
        controller: NavbarComponent,
        controllerAs: 'navbar'
    })
    .name;
