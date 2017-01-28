import Cache from '../../classes/cache';
import _ from 'lodash';

export default class ApproachService {

    /*@ngInject*/
    constructor($http) {
        this.$http = $http;
        this.cache = new Cache();
    }

    getAllApproaches() {
        return this.$http
                .get('/api/approach')
                .then(response => response.data);
    }

    getApproachByID(id) {
        if(this.cache.keyExists(id))
            return this.cache.getKeyValue(id);
        else
            return this.$http
                .get(`/api/approach/${id}`)
                .then(response => {
                    this.cache.addKeyValue(response.data._id, response.data);
                    return response;
                })
                .then(response => response.data);
    }

    getApproachesByProblem(id) {
        return this.$http
                .get(`/api/problem/${id}/approaches`)
                .then(response => {
                    _.map(response.data, approach => {
                        this.cache.addKeyValue(approach._id, approach);
                    });
                    return response;
                })
                .then(response => response.data);
    }

    getApproachByNumber(id) {
        return this.$http
                .get(`/api/number/${id}/approach`)
                .then(response => {
                    this.cache.addKeyValue(response.data._id, response.data);
                    return response;
                })
                .then(response => response.data);
    }

    addApproach(approach) {
        return this.$http
                .post(`/api/approach`, category)
                .then(response => response.data);
    }

    deleteApproachByID(id) {
        return this.$http
                .delete(`/api/approach/${id}`)
                .then(response => response.data);
    }
}
