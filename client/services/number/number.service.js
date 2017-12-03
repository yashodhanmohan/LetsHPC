export default class NumberService {

    /*@ngInject*/
    constructor($http) {
        this.$http = $http;
    }

    getAllNumbers() {
        return this.$http
                .get('/api/number')
                .then(response => response.data);
    }

    getNumberByID(id) {
        return this.$http
                .get(`/api/number/${id}`)
                .then(response => response.data);
    }

    getNumbersByProblem(id) {
        return this.$http
            .get(`/api/problem/${id}/numbers`)
            .then(response => response.data);
    }

    getNumbersByProblemAndArchitecture(id, arch) {
        return this.$http
            .get(`/api/problem/${id}/architecture/${arch}/numbers`)
            .then(response => response.data);
    }

    getNumbersByApproach(id) {
        return this.$http
                .get(`/api/approach/${id}/numbers`)
                .then(response => response.data);
    }

    addNumber(number) {
        return this.$http
                .post(`/api/number`, number)
                .then(response => response.data);
    }

    deleteNumberByID(id) {
        return this.$http
                .delete(`/api/number/${id}`)
                .then(response => response.data);
    }
}
