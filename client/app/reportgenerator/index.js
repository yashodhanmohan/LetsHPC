'use strict';

import angular from 'angular';
import routes from './reportgenerator.routes';
import ReportGeneratorController from './reportgenerator.controller';

export default angular.module('yashwantProjectApp.reportgenerator', [])
    .config(routes)
    .controller('ReportGeneratorController', ReportGeneratorController)
    .name;
