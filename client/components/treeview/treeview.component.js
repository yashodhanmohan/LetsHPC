import TreeViewController from './treeview.controller';
import treeviewTemplate from './treeview.html';

export default angular.module('yashwantProjectApp.directive.treeview', [])
    .component('treeview', {
        template: treeviewTemplate,
        bindings: {
            item: '<'
        },
        controller: TreeViewController,
        controllerAs: 'treeview'
    })
    .name;
