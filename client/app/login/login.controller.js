export default class LoginController {

    /*@ngInject*/
    constructor($location, AuthService) {
        this.AuthService = AuthService;
        this.$location = $location;

        this.username = '';
        this.password = '';
    }

    signin() {
      
        this.AuthService
            .login(this.username, this.password, (err, user) => {
                if(user) {
                    this.$location.url(`/${this.$location.search().redirect}`)
                }
            })
    }
}
