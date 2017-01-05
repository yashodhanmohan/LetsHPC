'use strict';

import angular from 'angular';
import routes from './landing.routes';
import LandingController from './landing.controller';

export default angular.module('yashwantProjectApp.landing', ['ngRoute'])
    .config(routes)
    .controller('LandingController', LandingController)
    .name;
