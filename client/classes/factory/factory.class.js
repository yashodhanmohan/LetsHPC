export default class Factory {
    constructor() {
        this.unitLibrary = {};
    }

    register(unitName, unitClass) {
        this.unitLibrary[unitName] = unitClass;
    }

    create(unitName) {
        return new this.unitLibrary[unitName];
    }
}
