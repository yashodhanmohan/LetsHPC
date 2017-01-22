export default class CategoryService {

    /*@ngInject*/
    constructor($http) {
        this.$http = $http;
    }

    getAllCategories() {
        return this.$http
                .get('/api/category')
                .then(response => response.data);
    }

    getCategoryByID(id) {
        return this.$http
                .get(`/api/category/${id}`)
                .then(response => response.data);
    }

    getCategoriesByProblem(id) {
        return this.$http
                .get(`/api/problem/${id}/categories`)
                .then(response => response.data);
    }

    addCategory(category) {
        return this.$http
                .post(`/api/category`, category)
                .then(response => response.data);
    }

    deleteCategoryByID(id) {
        return this.$http
                .delete(`/api/category/${id}`)
                .then(response => response.data);
    }
}
