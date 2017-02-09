import freelancer from './freelancer.min';

export default class AboutController {

    /*@ngInject*/
    constructor($http) {
        $(function() {
            $('a[href*="#"]:not([href="#"])').click(function() {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    console.log(target);
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
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });

        window.onresize = (event) => {
            this.resizeDiv();
        }
    }

    resizeDiv() {
        var vph = $(window).innerHeight();
        $('.about-section-odd').css({
            minHeight: vph + 'px'
        });
        $('.about-section-even').css({
            minHeight: vph + 'px'
        });
    }

}
