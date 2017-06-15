import freelancer from './freelancer.min';

export default class LandingController {

    /*@ngInject*/
    constructor($http) {

        $(function() {
            $('.navbar-nav-link-button').bind('click',function(event){
                var $anchor = $(this);

                $('html, body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset().top
                }, 1500,'easeInOutExpo');
                event.preventDefault();
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
