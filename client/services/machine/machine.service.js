import Cache from '../../classes/cache';
import _ from 'lodash';

export default class MachineService {

    /*@ngInject*/
    constructor($http) {
        this.$http = $http;
        this.cache = new Cache();
    }

    getAllMachines() {
        return this.$http
                .get('/api/machine')
                .then(response => response.data);
    }

    getMachineByID(id) {
        if(this.cache.keyExists(id))
            return this.cache.getKeyValue(id);
        else
            return this.$http
                .get(`api/machine/${id}`)
                .then(response => {
                    this.cache.addKeyValue(response.data._id, response.data);
                    return response;
                })
                .then(response => response.data);
    }

    getMachinesByProblem(id) {
        return this.$http
            .get(`/api/problem/${id}/machines`)
            .then(response => {
                _.map(response.data, approach => {
                    this.cache.addKeyValue(approach._id, approach);
                });
                return response;
            })
            .then(response => response.data);
    }

    getMachinesByProblemAndArchitecture(id, arch) {
        return this.$http
            .get(`/api/problem/${id}/architecture/${arch}/machines`)
            .then(response => {
                _.map(response.data, approach => {
                    this.cache.addKeyValue(approach._id, approach);
                });
                return response;
            })
            .then(response => response.data);
    }

    addMachine(machine) {
        return this.$http
                .post('api/machine', machine);
    }
}
