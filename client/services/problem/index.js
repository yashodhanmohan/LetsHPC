'use strict';

import angular from 'angular';
import ProblemService from './problem.service';

export default angular.module('yashwantProjectApp.service.problem', [])
    .service('ProblemService', ProblemService)
    .name;
