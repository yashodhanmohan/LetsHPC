export default class MachineService {

    /*@ngInject*/
    constructor($http) {
        this.$http = $http;
    }

    getAllMachines() {
        return this.$http
                .get('/api/machine')
                .then(response => response.data);
    }

    getMachineByID(id) {
        return this.$http
                .get(`api/machine/${id}`)
                .then(response => response.data);
    }

    getMachinesByProblem(id) {
        return this.$http
                .get(`/api/problem/${id}/machines`)
                .then(response => response.data);
    }

    addMachine(machine) {
        return this.$http
                .post('api/machine', machine);
    }
}
