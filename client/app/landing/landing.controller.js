import freelancer from './freelancer.min';

export default class LandingController {

    /*@ngInject*/
    constructor($http) {

        $(function() {
            $('a[href*="#"]:not([href="#"])').click(function() {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 1000);
                        return false;
                    }
                }
            });
        });

        $(document).ready(() => {
            this.resizeDiv();
            window.document.title = 'LETs HPC';
        });

        window.onresize = (event) => {
            this.resizeDiv();
        }

    }

    resizeDiv() {
        var vph = $(window).innerHeight();
        $('.landing-section-odd').css({
            minHeight: vph + 'px'
        });
        $('.landing-section-even').css({
            minHeight: vph + 'px'
        });
    }

}
