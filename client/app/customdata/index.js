'use strict';

import angular from 'angular';
import routes from './customdata.routes';
import CustomDataController from './customdata.controller';

export default angular.module('yashwantProjectApp.customdata', [])
    .config(routes)
    .controller('CustomDataController', CustomDataController)
    .name;
