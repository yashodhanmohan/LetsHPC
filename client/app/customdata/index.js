'use strict';

import angular from 'angular';
import routes from './customdata.routes';
import CustomDataController from './customdata.controller';

export default angular.module('yashwantProjectApp.customdata', ['yashwantProjectApp.auth', 'ngRoute'])
    .config(routes)
    .controller('CustomDataController', CustomDataController)
    .name;
