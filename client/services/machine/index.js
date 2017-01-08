'use strict';

import angular from 'angular';
import MachineService from './machine.service';

export default angular.module('yashwantProjectApp.service.machine', [])
    .service('MachineService', MachineService)
    .name;
