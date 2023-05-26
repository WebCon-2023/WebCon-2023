// global variables
var winW = $(window).width();
// page only scripts
$(document).ready(function() {
    // %%%%%%%% banner owl %%%%%%%%



    var bannerOwl = $('.landing-slider');
    var bannerOwl_settings = {
        items: 1,
        loop: true,
        autoplay: true,
        mouseDrag: false,
        touchDrag: false,
        autoplayTimeout: 6000,
        nav: false,
        dots: true,
        lazyLoad: false,
        pause: false, // Boolean: Pause on hover, true or false
        pauseControls: false,
        smartSpeed: 200,
    }
    bannerOwl.owlCarousel(bannerOwl_settings);
    if (winW < 767) {
        // %%%%%%%% mobile-gif slider %%%%%%%%
        var mobGifSlie = $('.mob-gif-slider');
        var mobGifSlie_settings = {
            items: 1,
            loop: true,
            margin: 10,
            stagePadding: 30,
            nav: false,
            dots: true,
            smartSpeed: 1200,
        }
        mobGifSlie.owlCarousel(mobGifSlie_settings);
    }
    // %%%%% sticky navigation %%%%%
    function stickyCommonNav() {
        var sticky = new Waypoint.Sticky({
            element: $('.main-header')[0],
        });
    }
    // sticky nav
    stickyCommonNav();
});