'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {

    currentNavItem = '';

    menu = [
        {
            route: '/',
            text: 'Home'
        },
        {
            route: '/main',
            text: 'Comparison Tool'
        },
        {
            route: '/reportgenerator',
            text: 'Report Generator'
        },
        {
            route: '/customdata',
            text: 'Analyze Custom Data'
        },
        {
            route: '/dataentry',
            text: 'Data Entry'
        }
    ];

    isCollapsed = true;

    constructor($location, Auth) {
        'ngInject';

        this.$location = $location;
        this.isLoggedIn = Auth.isLoggedInSync;
        this.isAdmin = Auth.isAdminSync;
        this.getCurrentUser = Auth.getCurrentUserSync;

        this.currentNavItem = this.$location.path();
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
