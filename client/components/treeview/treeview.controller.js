import _ from 'lodash';

export default class TreeViewController {

    constructor() {
        if(this.item.items && this.item.items.length==1) {
            this.item.items[0].expanded = true;
        }
    }

    toggleItems(item) {
        if (item.items) {
            if (_.isArray(item.items)) {
                item.expanded = !item.expanded;
            }
        }
    };
}
