//initializing
(function($) {
    "use strict";

    // Sticky Navbar
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 50) {
            $(".sticky").addClass("nav-sticky");
        } else {
            $(".sticky").removeClass("nav-sticky");
        }

    });

    // Smooth Link
    $('.nav-item a, .mouse-down a').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 0
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    // Magnific Popup
    $('.video-play-icon').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    //Scrollspy
    $("#navbarCollapse").scrollspy({
        offset: 70
    });

    $("#navbarCollapse").scrollspy({
        offset: -1000
    });

    // Loader
    $(window).on('load', function () {
        $('#status').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
    });

    //jQuery countdown plugin
    $('#clock').countdown('2024/10/12').on('update.countdown', function(event) {
        var _DateInput = '' +
            '<div><span>%-d</span> Day%!d</div>' +
            '<div><span>%H</span> Hours</div>' +
            '<div><span>%M</span> Minutes</div>' +
            '<div><span>%S</span> Seconds</div>';
        var $this = $(this).html(event.strftime(_DateInput));
    });

    // Jquery typed
    $(".element").each(function(){
        var $this = $(this);
        $this.typed({
        strings: $this.attr('data-elements').split(','),
        typeSpeed: 50, // typing speed
        backDelay: 3500 // pause before backspacing
        });
    });

    function JavaBlink() {
 var blinks = document.getElementsByTagName('JavaBlink');
 for (var i = blinks.length - 1; i >= 0; i--) {
    var s = blinks[i];
    s.style.visibility = (s.style.visibility === 'visible') ? 'hidden' : 'visible';
 }
 window.setTimeout(JavaBlink, 500);
}
if (document.addEventListener) document.addEventListener("DOMContentLoaded", JavaBlink, false);
else if (window.addEventListener) window.addEventListener("load", JavaBlink, false);
else if (window.attachEvent) window.attachEvent("onload", JavaBlink);
else window.onload = JavaBlink;


        $("#market-rate").owlCarousel({
            items : 4,
            itemsDesktop : [1199,5],
            itemsDesktopSmall : [991,3],
            itemsTablet: [767,2],
            itemsMobile : [575,1],
            pagination : false,
            autoPlay : true,
            slideSpeed : 900,
            rewind : true,
            loop : true,
            nav : false,
            dots : false,
            margin : 30,
            autoplayTimeout : 69,
            autoplayHoverPause : true,
            lazyLoad : true
        });
        (function ($) {
            var owl = $("#market-rate");
            owl.owlCarousel();

            // Custom Navigation Events
            $(".next-roadmap").click(function(){
                owl.trigger('owl.next');
            })
            $(".prev-roadmap").click(function(){
                owl.trigger('owl.prev');
            })
        } )(jQuery);


    $("#owl-roadmap").owlCarousel({
        items : 4,
        itemsDesktop : [1199,4],
        itemsDesktopSmall : [991,3],
        itemsTablet: [767,2],
        itemsMobile : [575,1],
        pagination : false,
        autoPlay : true,
        slideSpeed : 600
    });
    (function ($) {
        var owl = $("#owl-roadmap");
        owl.owlCarousel();

        // Custom Navigation Events
        $(".next-roadmap").click(function(){
            owl.trigger('owl.next');
        })
        $(".prev-roadmap").click(function(){
            owl.trigger('owl.prev');
        })
    } )(jQuery);



})(jQuery);
