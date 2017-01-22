export default class ApproachService {

    /*@ngInject*/
    constructor($http) {
        this.$http = $http;
    }

    getAllApproaches() {
        return this.$http
                .get('/api/approach')
                .then(response => response.data);
    }

    getApproachByID(id) {
        return this.$http
                .get(`/api/approach/${id}`)
                .then(response => response.data);
    }

    getApproachesByProblem(id) {
        return this.$http
                .get(`/api/problem/${id}/approaches`)
                .then(response => response.data);
    }

    getApproachByNumber(id) {
        return this.$http
                .get(`/api/number/${id}/approach`)
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
