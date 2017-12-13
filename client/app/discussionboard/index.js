'use strict';

import angular from 'angular';
import routes from './discussionboard.routes';
import DiscussionBoardController from './discussionboard.controller';

export default angular.module('yashwantProjectApp.discussionboard', [])
    .config(routes)
    .controller('DiscussionBoardController', DiscussionBoardController)
    .name;
