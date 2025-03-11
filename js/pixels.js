$(function() {
    "use strict";


    $(window).on("load", function() {
        // preloader
        $("#preloader").fadeOut(1300);
        $("#preloader-status").delay(400).fadeOut("slow");

        // hero scale IN
        $(".hero-bg").addClass("hero-bg-show");

        // init animation
        $(initAnim);
    });

    // init elements and borders
    $(initFadeInText);
    $(init);

    // borders ON resize
    $(window).on("resize", function() {
        $(bordersResize);
    });

    // panels, panel elements
    $(".open-menu-content, .main-navigation-button-close").on("click", function() {
        if ($(".panel-left, .panel-right").hasClass("open")) {
            $(".panel-left, .panel-right").removeClass("open");
            $(".panel-left, .panel-right").addClass("close");
            $("h6, .titleOT, #navigation").removeClass("close");
            $("h6, .titleOT, #navigation").addClass("open");
            $("nav a").removeClass("active");
            $("#overlay").fadeOut(1600, "easeInOutQuad");
            $(".panel-left-overlay").fadeOut(1200, "easeInOutQuad");
        } else {
            $(".panel-left, .panel-right").removeClass("close");
            $(".panel-left, .panel-right").addClass("open");
            $("h6, .titleOT, #navigation").removeClass("open");
            $("h6, .titleOT, #navigation").addClass("close");
            $("nav a").addClass("active");
            $("#overlay").fadeIn(1600, "easeInOutQuad");
            $(".panel-left-overlay").fadeIn(2400, "easeInOutQuad");
        }
    });

    // countdown date
    var end = new Date("03/31/2025 11:59 PM"); // FORMAT: month/day/year time
    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var timer;

    // countdown
    function showRemaining() {
        var now = new Date();
        var distance = end - now;
        if (distance < 0) {
            clearInterval(timer);
            document.getElementById("countdown").innerHTML = "SNAPSHOT TBA";
            return;
        }
        var days = Math.floor(distance / _day);
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);
        document.getElementById("countdown").innerHTML = days + "d, ";
        document.getElementById("countdown").innerHTML += hours + "h, ";
        document.getElementById("countdown").innerHTML += minutes + "m &amp; ";
        document.getElementById("countdown").innerHTML += seconds + "s till next Pixal Holder snapshot";
    }
    timer = setInterval(showRemaining, 1000);

    // morphext
    $("#js-rotating").Morphext({
        animation: "pulse",
        separator: "|",
        speed: 4000,
        complete: function() {}
    });
    // text animation
    function initFadeInText() {
        $(".text-animation").each(function(i) {
            $(this).addClass(".text-animation" + (i + 1));
        });
    }

    // border resize
    function bordersResize() {
        $(".border-top-1, .border-top-2, .border-bottom-1, .border-bottom-2").css("width", "50%");
        var widthFramework = $(".border-top-1").width();
        var widthTop = $(".center-space-top span").width();
        var widthBottom = $(".center-space-bottom span").width();
        var calculateTop = widthFramework - (widthTop / 2) - 8;
        var calculateBottom = widthFramework - (widthBottom / 2) - 8;
        $(".border-top-1").width(calculateTop);
        $(".border-top-2").width(calculateTop);
        $(".border-bottom-1").width(calculateBottom);
        $(".border-bottom-2").width(calculateBottom);
    }

    // animations
    function initAnim() {
        $(".border-top-1, .border-top-2, .border-bottom-1, .border-bottom-2").css("width", "50%");
        $(".border-left, .border-right").css("height", "100%");
        var heightLaterals = $(".border-right").height();
        $(".border-left, .border-right").css("height", "0px");
        $(".border-left, .border-right").css("top", (heightLaterals / 2) + "px");
        var widthFramework = $(".border-top-1").width();
        var widthTop = $(".center-space-top span").width();
        var widthBottom = $(".center-space-bottom span").width();
        var calculateTop = widthFramework - (widthTop / 2) - 8;
        var calculateBottom = widthFramework - (widthBottom / 2) - 8;
        $(".border-top-1, .border-top-2, .border-bottom-1, .border-bottom-2").css("width", "0%");
        $(".border-left, .border-right").animate({
            height: heightLaterals + "px",
            top: "0px"
        }, 1600, function() {
            $(".border-left, .border-right").css({
                height: "100%"
            });
            $(".border-top-1").animate({
                width: (calculateTop - 25) + "px"
            }, 1600);
            $(".border-top-2").animate({
                width: (calculateTop - 25) + "px"
            }, 1600);
            $(".border-bottom-1").animate({
                width: (calculateBottom - 25) + "px"
            }, 1600);
            $(".border-bottom-2").animate({
                width: (calculateBottom - 25) + "px"
            }, 1600);
            $(".center-space-top, .center-space-bottom, .titleOT, nav, h6").stop(true, true).delay(500).animate({
                opacity: 1
            }, 4000);
			$("#wall-images-wrapper").stop(true, true).delay(500).animate({
                opacity: 1
            }, 1600);
        });
    }

    function init() {
        $(".center-space-top, .center-space-bottom, .titleOT, nav, h6, #wall-images-wrapper").css("opacity", "0");
        $(".border-top-1, .border-top-2, .border-bottom-1, .border-bottom-2").css("width", "0%");
        $(".border-left, .border-right").css("height", "0px");
    }


    // knowledgebank accordion
$(".knowledgebank-accordion ul li span").on("click", function() {
  $(this).parent("li").siblings("li.toggled").removeClass("toggled").children("ul").stop(true, true).slideUp();
  if (!$(this).parent().hasClass("toggled")) {
    $(this).next("ul").stop(true, true).slideDown();
    $(this).parent().addClass("toggled");
  } else {
    $(this).next("ul").stop(true, true).slideUp();
    $(this).parent().removeClass("toggled");
  }
});

    $(".hero-slider-slide").owlCarousel({
        autoPlay: true,
        navigation: true,
        pagination: false,
        transitionStyle: false,
        singleItem: true,
        items: 1,
        autoHeight: true,
        stopOnHover: false
    });
    $(".hero-slider-zoom").owlCarousel({
        autoPlay: true,
        navigation: false,
        pagination: false,
        transitionStyle: "fadeUp", // fade, backSlide, goDown, fadeUp
        singleItem: true,
        items: 1,
        autoHeight: true,
        stopOnHover: false
    });
    $(".hero-slider-split").owlCarousel({
        autoPlay: true,
        navigation: false,
        pagination: false,
        transitionStyle: false,
        singleItem: false,
        items: 2,
        itemsDesktop: [1000, 2],
        itemsDesktopSmall: [900, 2],
        itemsMobile: [680, 2],
        autoHeight: true,
        stopOnHover: false
    });

});


window.addEvent("domready", function() {
    var imagewall = [
        ["img/toppixals/1.webp", [
            ["img/toppixals/1.webp"]
        ]],
        ["img/toppixals/2.webp", [
            ["img/toppixals/2.webp"]
        ]],
        ["img/toppixals/3.webp", [
            ["img/toppixals/3.webp"]
        ]],
        ["img/toppixals/4.webp", [
            ["img/toppixals/4.webp"]
        ]],
        ["img/toppixals/5.webp", [
            ["img/toppixals/5.webp"]
        ]],
        ["img/toppixals/6.webp", [
            ["img/toppixals/6.webp"]
        ]],
        ["img/toppixals/7.webp", [
            ["img/toppixals/7.webp"]
        ]],
        ["img/toppixals/8.webp", [
            ["img/toppixals/8.webp"]
        ]],
        ["img/toppixals/9.webp", [
            ["img/toppixals/9.webp"]
        ]],
        ["img/toppixals/10.webp", [
            ["img/toppixals/10.webp"]
        ]],
        ["img/toppixals/11.webp", [
            ["img/toppixals/11.webp"]
        ]],
        ["img/toppixals/12.webp", [
            ["img/toppixals/12.webp"]
        ]],
		["img/toppixals/13.webp", [
            ["img/toppixals/13.webp"]
        ]],
        ["img/toppixals/14.webp", [
            ["img/toppixals/14.webp"]
        ]],
        ["img/toppixals/15.webp", [
            ["img/toppixals/15.webp"]
        ]],
        ["img/toppixals/16.webp", [
            ["img/toppixals/16.webp"]
        ]],
        ["img/toppixals/17.webp", [
            ["img/toppixals/17.webp"]
        ]],
        ["img/toppixals/18.webp", [
            ["img/toppixals/18.webp"]
        ]],
        ["img/toppixals/19.webp", [
            ["img/toppixals/19.webp"]
        ]],
        ["img/toppixals/20.webp", [
            ["img/toppixals/20.webp"]
        ]],
        ["img/toppixals/21.webp", [
            ["img/toppixals/21.webp"]
        ]],
        ["img/toppixals/22.webp", [
            ["img/toppixals/22.webp"]
        ]],
        ["img/toppixals/23.webp", [
            ["img/toppixals/23.webp"]
        ]],
        ["img/toppixals/24.webp", [
            ["img/toppixals/24.webp"]
        ]],
        ["img/toppixals/25.webp", [
            ["img/toppixals/25.webp"]
        ]],
        ["img/toppixals/26.webp", [
            ["img/toppixals/26.webp"]
        ]],
        ["img/toppixals/27.webp", [
            ["img/toppixals/27.webp"]
        ]],
        ["img/toppixals/28.webp", [
            ["img/toppixals/28.webp"]
        ]],
        ["img/toppixals/29.webp", [
            ["img/toppixals/29.webp"]
        ]],
        ["img/toppixals/30.webp", [
            ["img/toppixals/30.webp"]
        ]],
        ["img/toppixals/31.webp", [
            ["img/toppixals/31.webp"]
        ]],
        ["img/toppixals/32.webp", [
            ["img/toppixals/32.webp"]
        ]],
        ["img/toppixals/33.webp", [
            ["img/toppixals/33.webp"]
        ]],
        ["img/toppixals/34.webp", [
            ["img/toppixals/34.webp"]
        ]],
        ["img/toppixals/35.webp", [
            ["img/toppixals/35.webp"]
        ]],
        ["img/toppixals/36.webp", [
            ["img/toppixals/36.webp"]
        ]],
        ["img/toppixals/37.webp", [
            ["img/toppixals/37.webp"]
        ]]
    ];
    var maxLength = 32;
    var wallFluid = new Wall("wall", {
        "draggable": true,
		"slideshow": true, // options: true, false
        "speed": 1000,
        "showDuration": 4000,
        "transition": Fx.Transitions.Quad.easeOut,
        "inertia": true,
        "autoposition": true,
        "width": 257,
        "height": 257,
        "rangex": [-100, 100],
        "rangey": [-100, 100],
        callOnUpdate: function(items) {
            var root = Math.ceil(Math.sqrt(maxLength));
            document.id("wall").setStyle("margin-left", 0);
            var i = 0;
            (function() {
                try {
                    var position = ((Math.abs(items[i].y) % root) * root) + (Math.abs(items[i].x) % root);
                    if (position > maxLength) {
                        position = Math.floor(Math.random() * maxLength);
                    }
                    var file = imagewall[position][0];
                    var img = new Element("img[src=" + file + "]");
                    img.inject(items[i].node).fade("hide").fade("in");
                    var list = new Element("ul");
                    list.setProperty("class", "slideshow")
                    for (var j = 0; j < imagewall[position][1].length; j++) {
                        var slide = new Element("li");
                        new Element("img", {
                            src: imagewall[position][1][j][0]
                        }).inject(slide);
                        var desc = new Element("span", {
                            html: imagewall[position][1][j][1]
                        });
                        var div = new Element("div");
                        div.setProperty("class", "wall-item-description");
                        desc.inject(div);
                        div.inject(slide);
                        slide.inject(list);
                    }
                    list.inject(items[i].node);
                    var stop = false;
                    var firstSlide = true;
                    items[i].node.addEvents({
                        mouseenter: function(event) {
                            list.getChildren("li").setStyles({
                                "visibility": "hidden",
                                "opacity": 0
                            });
                            stop = false;
                            if (imagewall[position][1].length) {
                                (function(item) {
                                    item.fade("in");
                                    if (firstSlide) {
                                        delay = 1000;
                                        firstSlide = false;
                                    } else {
                                        delay = 2000;
                                    }
                                    if (item.getNext("li") != null) {
                                        var tmpslide = arguments.callee;
                                        (function() {
                                            item.fade("out");
                                            if (!stop) tmpslide(item.getNext("li"));
                                        }).delay(delay);
                                    } else if (item.getSiblings("li").length > 0) {
                                        var tmpslide = arguments.callee;
                                        (function() {
                                            item.fade("out");
                                            if (!stop) tmpslide(item.getSiblings("li").pop());
                                        }).delay(delay);
                                    }
                                })(new Element(list.getFirst("li")));
                                img.fade("out");
                            }
                            return false;
                        },
                        mouseleave: function() {
                            stop = true;
                            firstSlide = true;
                            if (imagewall[position][1].length) {
                                list.getChildren("li").fade("out");
                                img.fade("in");
                            }
                        }
                    });
                    i++;
                    if (i < items.length) {
                        var tmp = arguments.callee;
                        (function() {
                            tmp();
                        }).delay(1);
                    } else {}
                } catch (e) {}
            })();
        }
    });
    window.setTimeout(function() {
        wallFluid.initWall();
    }, 500);
});
