'use strict';

import angular from 'angular';
import routes from './login.routes';
import LoginController from './login.controller';

export default angular.module('yashwantProjectApp.login', [])
    .config(routes)
    .controller('LoginController', LoginController)
    .name;
