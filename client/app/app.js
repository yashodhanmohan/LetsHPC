'use strict';

import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
const ngRoute = require('angular-route');
import bootstrap from '../assets/bootstrap/js/bootstrap.min.js'

import {
    routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';

// Import Angular Controller modules
import landing from './landing';
import main from './main';
import reportgenerator from './reportgenerator';
import customdata from './customdata';
import dataentry from './dataentry';

// Import Angular Service modules
import category_service from '../services/category';
import problem_service from '../services/problem';
import machine_service from '../services/machine';

// Import Angular components
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import util from '../components/util/util.module';

// Other
import btorfs_multiselect from '../assets/angular-bootstrap-multiselect/js/angular-bootstrap-multiselect.min';
import constants from './app.constants';
import './app.css';


google.load('visualization', '1', {
    packages: ['corechart']
});

angular.module('yashwantProjectApp', [
        // Angular Core Modules
        ngCookies, ngAnimate, ngResource, ngSanitize, ngRoute, _Auth,
        // Controllers
        landing, main, reportgenerator, customdata, dataentry,
        // Services
        category_service, problem_service, machine_service,
        // Components/Directives
        navbar, footer, constants, util, 'btorfs.multiselect'
    ])
    .config(routeConfig)
    .run(function($rootScope, $location, Auth) {
        'ngInject';
        // Redirect to login if route requires auth and you're not logged in

        $rootScope.$on('$stateChangeStart', function(event, next) {
            Auth.isLoggedIn(function(loggedIn) {
                if (next.authenticate && !loggedIn) {
                    $location.path('/login');
                }
            });
        });
    });

angular.element(document)
    .ready(() => {
        angular.bootstrap(document, ['yashwantProjectApp'], {
            strictDi: false
        });
    });
