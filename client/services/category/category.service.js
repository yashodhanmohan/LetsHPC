import Cache from '../../classes/cache';
import _ from 'lodash';

export default class CategoryService {

    /*@ngInject*/
    constructor($http) {
        this.$http = $http;
        this.cache = new Cache();
    }

    getAllCategories() {
        return this.$http
                .get('/api/category')
                .then(response => response.data);
    }

    getCategoryByID(id) {
        if(this.cache.keyExists(id))
            return this.cache.getKeyValue(id);
        else
            return this.$http
                .get(`/api/category/${id}`)
                .then(response => {
                    this.cache.addKeyValue(response.data._id, response.data);
                    return response;
                })
                .then(response => response.data);
    }

    getCategoriesByProblem(id) {
        return this.$http
                .get(`/api/problem/${id}/categories`)
                .then(response => {
                    _.map(response.data, approach => {
                        this.cache.addKeyValue(approach._id, approach);
                    });
                    return response;
                })
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
