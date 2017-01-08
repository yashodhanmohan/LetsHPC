'use strict';

import angular from 'angular';
import CategoryService from './category.service';

export default angular.module('yashwantProjectApp.service.category', [])
    .service('CategoryService', CategoryService)
    .name;
