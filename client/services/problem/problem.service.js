export default class ProblemService {

    static $inject = ['$http'];

    constructor($http) {
        this.$http = $http;
    }

    get_all_problems() {
        return this.$http
                .get('/api/problem')
                .then(response => response.data);
    }

    get_problem_by_ID(id) {
        return this.$http
                .get(`/api/problem/${id}`)
                .then(response => response.data);
    }

    add_problem(problem) {
        return this.$http
                .post('/api/problem/', problem);
    }
}
