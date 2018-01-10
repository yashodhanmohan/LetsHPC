'use strict';

import angular from 'angular';
import routes from './documents.routes';
import DocumentsController from './documents.controller';

export default angular.module('yashwantProjectApp.documents', [])
    .config(routes)
    .controller('DocumentsController', DocumentsController)
    .name;