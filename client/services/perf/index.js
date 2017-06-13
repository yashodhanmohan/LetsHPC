'use strict';

import angular from 'angular';
import PerfService from './perf.service';

export default angular.module('yashwantProjectApp.service.perf', [])
    .service('PerfService', PerfService)
    .name;
