'use strict';

import angular from 'angular';
import {UtilService} from './util.service';

export default angular.module('yashwantProjectApp.service.util', [])
  .factory('UtilService', UtilService)
  .name;
