'use strict';

import angular from 'angular';
import UserService from './user.service';

export default angular.module('yashwantProjectApp.service.user', [])
    .service('UserService', UserService)
    .name;
