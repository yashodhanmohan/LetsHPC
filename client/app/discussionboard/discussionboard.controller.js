export default class DiscussionBoardController {

    src = 'https://groups.google.com/forum/embed/?place=forum/lets-hpc' +
    '&showsearch=true&showpopout=true&showtabs=false' +
    '&parenturl=' + encodeURIComponent(window.location.href);

    googleGroupSrc = '';

    /*@ngInject*/
    constructor($sce) {
        this.googleGroupSrc = $sce.trustAsResourceUrl(this.src);
    }
}
