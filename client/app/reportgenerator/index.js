'use strict';

import angular from 'angular';
import routes from './reportgenerator.routes';
import ReportGeneratorController from './reportgenerator.controller';

export default angular.module('yashwantProjectApp.reportgenerator', ['yashwantProjectApp.auth', 'ngRoute'])
    .config(routes)
    .controller('ReportGeneratorController', ReportGeneratorController)
    .name;
