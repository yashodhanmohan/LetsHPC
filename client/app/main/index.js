'use strict';

import angular from 'angular';
import routes from './main.routes';
import MainController from './main.controller';

export default angular.module('yashwantProjectApp.main', ['yashwantProjectApp.auth', 'ngRoute'])
    .config(routes)
    .controller('MainController', MainController)
    .name;
