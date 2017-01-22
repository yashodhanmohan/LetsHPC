export default class ProblemService {

    /*@ngInject*/
    constructor($http) {
        this.$http = $http;
    }

    getAllProblems() {
        return this.$http
                .get('/api/problem')
                .then(response => response.data);
    }

    getProblemByID(id) {
        return this.$http
                .get(`/api/problem/${id}`)
                .then(response => response.data);
    }

    getProblemsByCategory(id) {
        return this.$http
                .get(`/api/category/${id}/problems`)
                .then(response => response.data);
    }

    getProblemByApproach(id) {
        return this.$http
                .get(`/api/approach/${id}/problem`)
                .then(response => response.data);
    }

    addProblem(problem) {
        return this.$http
                .post('/api/problem/', problem);
    }
}
