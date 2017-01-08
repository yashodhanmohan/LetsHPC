export default class MachineService {

    static $inject = ['$http'];

    constructor($http) {
        this.$http = $http;
    }

    get_all_machines() {
        return this.$http
                .get('/api/machine')
                .then(response => response.data);
    }

    get_machine_by_ID(id) {
        return this.$http
                .get(`api/machine/${id}`)
                .then(response => response.data);
    }

    add_machine(machine) {
        return this.$http
                .post('api/machine', machine);
    }
}
