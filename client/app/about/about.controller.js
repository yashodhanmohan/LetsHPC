export default class AboutController {

    /*@ngInject*/
    constructor($http) {

        $(function() {
            $('.about-nav-link-button').bind('click',function(event){
                var $anchor = $(this);

                $('html, body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset().top
                }, 1500,'easeInOutExpo');
                /*
                if you don't want to use the easing effects:
                $('html, body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset().top
                }, 1000);
                */
                event.preventDefault();
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
