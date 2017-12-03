export default class PerfService {

    /*@ngInject*/
    constructor($http) {
        this.$http = $http;
    }

    getAllPerfs() {
        return this.$http
                .get('/api/perf')
                .then(response => response.data);
    }

    getPerfByID(id) {
        return this.$http
                .get(`/api/perf/${id}`)
                .then(response => response.data);
    }

    getPerfsByProblem(id) {
        return this.$http
            .get(`/api/problem/${id}/perfs`)
            .then(response => response.data);
    }

    getPerfsByProblemAndArchitecture(id, arch) {
        return this.$http
            .get(`/api/problem/${id}/architecture/${arch}/perfs`)
            .then(response => response.data);
    }

    getPerfsByApproach(id) {
        return this.$http
                .get(`/api/approach/${id}/perfs`)
                .then(response => response.data);
    }

    addPerf(number) {
        return this.$http
                .post(`/api/perf`, number)
                .then(response => response.data);
    }

    deletePerfByID(id) {
        return this.$http
                .delete(`/api/perf/${id}`)
                .then(response => response.data);
    }
}
