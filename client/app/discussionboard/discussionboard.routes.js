'use strict';

export default function routes($routeProvider) {
    'ngInject';
    $routeProvider.when('/discussionboard', {
        template: require('./discussionboard.html'),
        controller: 'DiscussionBoardController',
        controllerAs: 'discussionboard'
    });
}
