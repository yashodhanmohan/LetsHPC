import _ from 'lodash';

export default class TableService {

    /*@ngInject*/
    constructor() {
    }

    getID(approachID, nthreads, machineID, e2eOrAlg) {
        return `${e2eOrAlg}_${approachID}_${nthreads}_${machineID}`;
    }

    getLabel(approach, nthreads, machine, e2eOrAlg) {
        return `${e2eOrAlg.toUpperCase()} for ${approach.approach_name} - ${nthreads} threads @ ${machine.model_name}`;
    }

    objectToTable(object, keylabel, keyid, vallabel, valid) {
        let table = new google.visualization.DataTable();
        let rows = _.reduce(object, (result, value, key) => {
            result.push([parseFloat(key), parseFloat(value)]);
            return result;
        }, []);
        table.addColumn('number', keylabel, keyid);
        table.addColumn('number', vallabel, valid);
        table.addRows(rows);
        return table;
    }

}
