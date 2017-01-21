'use strict';

import angular from 'angular';
import routes from './about.routes';
import AboutController from './about.controller';

export default angular.module('yashwantProjectApp.about', [])
    .config(routes)
    .controller('AboutController', AboutController)
    .name;
