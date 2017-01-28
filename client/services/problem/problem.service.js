import Cache from '../../classes/cache';
import _ from 'lodash';

export default class ProblemService {

    /*@ngInject*/
    constructor($http) {
        this.$http = $http;
        this.cache = new Cache();
    }

    getAllProblems() {
        return this.$http
                .get('/api/problem')
                .then(response => response.data);
    }

    getProblemByID(id) {
        if(this.cache.keyExists(id))
            return this.cache.getKeyValue(id);
        else
            return this.$http
                .get(`/api/problem/${id}`)
                .then(response => {
                    this.cache.addKeyValue(response.data._id, response.data);
                    return response;
                })
                .then(response => response.data);
    }

    getProblemsByCategory(id) {
        return this.$http
                .get(`/api/category/${id}/problems`)
                .then(response => {
                    _.map(response.data, approach => {
                        this.cache.addKeyValue(approach._id, approach);
                    });
                    return response;
                })
                .then(response => response.data);
    }

    getProblemByApproach(id) {
        return this.$http
                .get(`/api/approach/${id}/problem`)
                .then(response => {
                    this.cache.addKeyValue(response.data._id, response.data);
                    return response;
                })
                .then(response => response.data);
    }

    addProblem(problem) {
        return this.$http
                .post('/api/problem/', problem);
    }
}
