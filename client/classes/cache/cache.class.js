export default class Cache {
    constructor() {
        this.dict = {};
    }

    addKeyValue(key, value) {
        this.dict[key] = value;
    }

    removeKeyValue(key) {
        if(key in this.dict) {
            delete this.dict[key];
        }
    }

    getKeyValue(key) {
        if(key in this.dict) {
            return this.dict[key];
        } else {
            return undefined;
        }
    }

    keyExists(key) {
        if(key in this.dict) {
            return true;
        } else {
            return false;
        }
    }
}
