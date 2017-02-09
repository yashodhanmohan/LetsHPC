'use strict';

import angular from 'angular';
import CalculatorService from './calculator.service';

export default angular.module('yashwantProjectApp.service.calculator', [])
    .service('CalculatorService', CalculatorService)
    .name;
