'use strict';

import angular from 'angular';
import NumberService from './number.service';

export default angular.module('yashwantProjectApp.service.number', [])
    .service('NumberService', NumberService)
    .name;
