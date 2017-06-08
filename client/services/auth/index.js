'use strict';

import angular from 'angular';
import constants from '../../app/app.constants';
import util from '../util';
import ngCookies from 'angular-cookies';
import {authInterceptor} from './interceptor.service';
import {routerDecorator} from './router.decorator';
import {AuthService} from './auth.service';
const ngRoute = require('angular-route');

function addInterceptor($httpProvider) {
    'ngInject';
    $httpProvider.interceptors.push('authInterceptor');
}

export default angular.module('yashwantProjectApp.service.auth', [constants, util, ngCookies, ngRoute])
    .factory('authInterceptor', authInterceptor)
    .run(routerDecorator)
    .factory('AuthService', AuthService)
    .config(['$httpProvider', addInterceptor])
    .name;
