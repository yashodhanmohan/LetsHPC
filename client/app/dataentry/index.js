'use strict';

import angular from 'angular';
import routes from './dataentry.routes';
import CategoryService from '../../services/category';
import ProblemService from '../../services/problem';
import DataEntryController from './dataentry.controller';

export default angular.module('yashwantProjectApp.dataentry', [])
    .config(routes)
    .controller('DataEntryController', DataEntryController)
    .name;
