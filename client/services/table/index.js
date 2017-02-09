'use strict';

import angular from 'angular';
import TableService from './table.service';

export default angular.module('yashwantProjectApp.service.table', [])
    .service('TableService', TableService)
    .name;
