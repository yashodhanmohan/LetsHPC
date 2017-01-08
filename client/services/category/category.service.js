export default class CategoryService {

    static $inject = ['$http'];

    constructor($http) {
        this.$http = $http;
    }

    get_all_categories() {
        return this.$http
                .get('/api/category')
                .then(response => response.data);
    }

    get_category_by_ID(id) {
        return this.$http
                .get(`api/category/${id}`)
                .then(response => response.data);
    }

    get_problems_by_category(id) {
        return this.$http
                .get(`api/category/${id}/problem`)
                .then(response => response.data);
    }
}
