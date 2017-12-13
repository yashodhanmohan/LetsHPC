export default class DiscussionBoardController {

    /*@ngInject*/
    constructor($http) {

        $(function() {
            $('.discussionboard-nav-link-button').bind('click',function(event){
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
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });

        window.onresize = (event) => {
            this.resizeDiv();
        }
    }

    resizeDiv() {
        var vph = $(window).innerHeight();
        $('.discussionboard-section-odd').css({
            minHeight: vph + 'px'
        });
        $('.discussionboard-section-even').css({
            minHeight: vph + 'px'
        });
    }

}
