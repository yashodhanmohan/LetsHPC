'use strict';

const ngRoute = require('angular-route');
import angular from 'angular';
import bootstrap from 'bootstrap';
import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

import {routeConfig} from './app.config';

// Import Angular Controller modules
import AboutController from './about';
import DiscussionBoardController from './discussionboard';
import CustomDataController from './customdata';
import DataEntryController from './dataentry';
import LandingController from './landing';
import LoginController from './login';
import MainController from './main';
import ReportGeneratorController from './reportgenerator';
import DocumentsController from './documents';

// Import Angular Service modules
import ApproachService from '../services/approach';
import AuthService from '../services/auth';
import CalculatorService from '../services/calculator';
import CategoryService from '../services/category';
import MachineService from '../services/machine';
import NumberService from '../services/number';
import PerfService from '../services/perf';
import ProblemService from '../services/problem';
import TableService from '../services/table';
import UserService from '../services/user';
import UtilService from '../services/util';

// Import Angular components
import btorfs_multiselect from '../assets/angular-bootstrap-multiselect/js/angular-bootstrap-multiselect.min';
import chart from '../components/chart/chart.component';
import footer from '../components/footer/footer.component';
import navbar from '../components/navbar/navbar.component';

// Other
import constants from './app.constants';
import './app.css';


google.load('visualization', '1', {
    packages: ['corechart']
});

angular.module('yashwantProjectApp', [
        // Angular Core Modules
        ngCookies, ngAnimate, ngResource, ngSanitize, ngRoute,
        // Controllers
        LandingController, MainController, ReportGeneratorController, CustomDataController, DataEntryController, AboutController, LoginController, DiscussionBoardController,DocumentsController,
        // Services
        CategoryService, ProblemService, MachineService, NumberService, PerfService, ApproachService, UserService, CalculatorService, TableService, UtilService, AuthService,
        // Components/Directives
        navbar, footer, constants, 'btorfs.multiselect', chart
    ])
    .config(routeConfig)
    .run(function($rootScope, $location, AuthService) {
        'ngInject';

        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$stateChangeStart', function(event, next) {
            AuthService.isLoggedIn(function(loggedIn) {
                console.log(loggedIn);
                if (!loggedIn) {
                    $location.url(`/login?redirect=${$location.url()=='/login'?'#':$location.url().substr(1) }`);
                }
            });
        });

        // Google Analytics pageview send event on route change
        $rootScope.$on("$routeChangeSuccess", function(event, next, current) {
            ga('send', 'pageview', $location.url());
        });

        // Remove loading splash screen on app bootstrap
        window.loadingScreen.finish();
    });

angular.element(document)
    .ready(() => {
        angular.bootstrap(document, ['yashwantProjectApp'], {
            strictDi: false
        });
    });
