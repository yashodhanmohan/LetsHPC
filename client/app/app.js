'use strict';

import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import ngMaterial from 'angular-material';

const ngRoute = require('angular-route');
import bootstrap from '../assets/bootstrap/js/bootstrap.min.js';

import {
    routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';

// Import Angular Controller modules
import LandingController from './landing';
import AboutController from './about';
import MainController from './main';
import ReportGeneratorController from './reportgenerator';
import CustomDataController from './customdata';
import DataEntryController from './dataentry';

// Import Angular Service modules
import CategoryService from '../services/category';
import ProblemService from '../services/problem';
import MachineService from '../services/machine';
import NumberService from '../services/number';
import ApproachService from '../services/approach';
import CalculatorService from '../services/calculator';
import TableService from '../services/table';

// Import Angular components
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import util from '../components/util/util.module';
import chart from '../components/chart/chart.component';
import treeview from '../components/treeview/treeview.component';

// Other
import constants from './app.constants';
import './app.css';
import 'angular-material/angular-material.min.css';


google.load('visualization', '1', {
    packages: ['corechart']
});

angular.module('letshpc', [
        // Angular Core Modules
        ngCookies, ngAnimate, ngResource, ngSanitize, ngMaterial, ngRoute, _Auth,
        // Controllers
        LandingController, MainController, ReportGeneratorController, CustomDataController, DataEntryController, AboutController,
        // Services
        CategoryService, ProblemService, MachineService, NumberService, ApproachService, CalculatorService, TableService,
        // Components/Directives
        navbar, footer, constants, util, chart, treeview
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

        // Google Analytics pageview send event on route change
        $rootScope.$on("$routeChangeSuccess", function(event, next, current) {
            ga('send', 'pageview', $location.url());
            $rootScope.currentLink = $location.url();
        });

        // Remove loading splash screen on app bootstrap
        window.loadingScreen.finish();
    })
    .animation('.reveal-animation', function() {
        return {
            enter: function(element, done) {
                element.css('display', 'none');
                element.fadeIn(800, done);
                return function() {
                    element.stop();
                }
            },
            leave: function(element, done) {
                element.fadeOut(800, done)
                return function() {
                    element.stop();
                }
            }
        }
    });

angular.element(document)
    .ready(() => {
        angular.bootstrap(document, ['letshpc'], {
            strictDi: false
        });
    });
