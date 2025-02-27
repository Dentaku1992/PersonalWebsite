function parallaxInit() {
    $("#clients").parallax("50%", .3)
}
function slide(e) {
    var t = $("#carousel_ul li").outerWidth();
    if (e == "left") {
        var n = parseInt($("#carousel_ul").css("left")) + t
    } else {
        var n = parseInt($("#carousel_ul").css("left")) - t
    }
    $("#carousel_ul:not(:animated)").animate({left: n}, 1500, "easeInOutCubic", function () {
        if (e == "left") {
            $("#carousel_ul li:first").before($("#carousel_ul li:last"))
        } else {
            $("#carousel_ul li:last").after($("#carousel_ul li:first"))
        }
        $("#carousel_ul").css({left: "-249px"})
    })
}
$(window).load(function () {
    $("#intro-loader").delay(1e3).fadeOut();
    $(".mask").delay(1e3).fadeOut("slow")
});
$(document).ready(function () {
    $(".item_top").each(function () {
        $(this).appear(function () {
            $(this).delay(200).animate({opacity: 1, top: "0px"}, 1e3)
        })
    });
    $(".item_bottom").each(function () {
        $(this).appear(function () {
            $(this).delay(200).animate({opacity: 1, bottom: "0px"}, 1e3)
        })
    });
    $(".item_left").each(function () {
        $(this).appear(function () {
            $(this).delay(200).animate({opacity: 1, left: "0px"}, 1e3)
        })
    });
    $(".item_right").each(function () {
        $(this).appear(function () {
            $(this).delay(200).animate({opacity: 1, right: "0px"}, 1e3)
        })
    });
    $(".item_fade_in").each(function () {
        $(this).appear(function () {
            $(this).delay(250).animate({opacity: 1, right: "0px"}, 1500)
        })
    });
    processLine.init();
    $("#left_scroll a").attr({href: 'javascript:slide("left");'});
    $("#right_scroll a").attr({href: 'javascript:slide("right");'});
    if (!/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent || navigator.vendor || window.opera)) {
        $(".clients").waypoint(function () {
            $("#carousel_ul").children().each(function (e) {
                $(this).delay(300 * e).animate({opacity: "1", marginTop: "0"}, 300)
            })
        }, {offset: "85%"})
    } else {
        $(".clients #carousel_ul").children().css({opacity: "1", marginTop: "0"})
    }
    $(".slider_container").flexslider({directionNav: true, controlNav: false});
    var e = e || {}, t = $("#portfolio-items"), n = $("#portfolio-filter");
    e.fullWidth = function () {
        $(window).load(function () {
            t.isotope({
                animationEngine: "best-available",
                animationOptions: {duration: 250, easing: "easeInOutSine", queue: false}
            })
        });
        n.find("a").click(function (e) {
            var r = $(this).data("cat");
            n.find("a").removeClass("active");
            $(this).addClass("active");
            if (r !== "*") {
                r = "." + r
            }
            t.isotope({filter: r});
            return false
        })
    };
    e.ajax = function () {
        function e() {
            var e = "", s = $("#portfolio-ajax"), o = $("#portfolio-wrap"), u = "#!projects/", a = u.length, f;
            t.find("a").click(function () {
                window.location.hash = $(this).attr("href");
                return false
            });
            $("#portfolio-wrap").bind("keydown", function (e) {
                if (e.keyCode == 37) {
                    $(".single-portfolio").remove();
                    window.location.hash = $("#portfolio-items .current").next().find("a").attr("href");
                    return false
                } else if (e.keyCode == 39) {
                    $(".single-portfolio").remove();
                    window.location.hash = $("#portfolio-items .current").prev().find("a").attr("href");
                    return false
                } else if (e.keyCode == 27) {
                    $("#portfolio-wrap").fadeOut("100", function () {
                        $(".single-portfolio").remove()
                    });
                    history.pushState("", document.title, window.location.pathname);
                    window.location.hash = "#_";
                    return false
                }
            });
            $(window).bind("hashchange", function () {
                e = window.location.hash;
                f = e.replace(/[#\!]/g, "");
                if (e.substr(0, a) == u) {
                    if (o.is(":hidden")) {
                        o.slideDown("3000", function () {
                        })
                    }
                    o.niceScroll({cursorcolor: "#666", cursorwidth: 6, cursorborder: 0, cursorborderradius: 0});
                    o.append('<div id="preloader"></div>');
                    s.load(f + " .single-portfolio", function (e, t, u) {
                        if (t == "success") {
                            setTimeout(function () {
                                $(".slider_container").flexslider({directionNav: true, controlNav: false});
                                $(".single-portfolio .media-container").fitVids();
                                o.find("#preloader").remove()
                            }, 300)
                        }
                        if (t == "error") {
                            s.html('<div class="row pad-top pad-bottom"><div class="col-md-12 pad-top pad-bottom"><div class="alert-message error"><p>The Content cannot be loaded.</p></div></div></div>');
                            o.find("#preloader").remove()
                        }
                        n();
                        r();
                        i()
                    });
                    $("#portfolio-items article").removeClass("current");
                    $("#portfolio-items a[href='" + e + "']").parent().addClass("current");
                    var t = $("#portfolio-items").find("article.current").index();
                    var l = $("#portfolio-items article").length - 1;
                    if (t == l) {
                        jQuery("#next-project").addClass("disabled");
                        jQuery("#prev-project").removeClass("disabled")
                    } else if (t == 0) {
                        jQuery("#prev-project").addClass("disabled");
                        jQuery("#next-project").removeClass("disabled")
                    } else {
                        jQuery("#prev-project, #next-project").removeClass("disabled")
                    }
                } else if (e == "") {
                    $("#portfolio-wrap").fadeOut("100", function () {
                        $(".single-portfolio").remove()
                    })
                }
            });
            $(window).trigger("hashchange")
        }

        function n() {
            $("#close-project").on("click", function () {
                $("#portfolio-wrap").fadeOut("100", function () {
                    $(".single-portfolio").remove()
                });
                history.pushState("", document.title, window.location.pathname);
                window.location.hash = "#_";
                return false
            })
        }

        function r() {
            $("#next-project").on("click", function () {
                $(".single-portfolio").remove();
                window.location.hash = $("#portfolio-items .current").next().find("a").attr("href");
                return false
            })
        }

        function i() {
            $("#prev-project").on("click", function () {
                $(".single-portfolio").remove();
                window.location.hash = $("#portfolio-items .current").prev().find("a").attr("href");
                return false
            })
        }

        if (t.length) {
            e()
        }
    };
    e.fullWidth();
    e.ajax();
    $(function () {
        $(".chart").appear(function () {
            $(".chart").easyPieChart({
                easing: "easeOutBounce",
                barColor: "#474D5D",
                size: "150",
                lineWidth: 15,
                animate: 2e3,
                /*onStep: function (e, t, n) {
                    $(this.el).find(".percent").text(Math.round(n))
                }*/
            })
        })
    });
    $(".skillBar li").each(function () {
        $(this).appear(function () {
            $(this).animate({opacity: 1, left: "0px"}, 2e3);
            var e = $(this).find("span").attr("data-width");
            $(this).find("span").animate({width: e + "%"}, 2200, "easeOutBounce")
        })
    });
    $(".validate").validate();
    var r = $("#contactform");
    var i = $("#contactForm_submit");
    var s = $(".form-respond");
    $(document).on("submit", "#contactform", function (e) {
        e.preventDefault();
        $.ajax({
            url: "sendemail.php", type: "POST", dataType: "html", data: r.serialize(), beforeSend: function () {
                s.fadeOut();
                i.html("Sending....")
            }, success: function (e) {
                r.fadeOut(300);
                s.html(e).fadeIn(1e3);
                setTimeout(function () {
                    s.html(e).fadeOut(300);
                    $("#name, #email, #message").val("");
                    r.fadeIn(1800)
                }, 4e3)
            }, error: function (e) {
                console.log(e)
            }
        })
    });
    jQuery(".nav a").on("click", function () {
        jQuery("#my-nav").removeClass("in").addClass("collapse")
    });
    jQuery(document).scroll(function () {
        var e = jQuery(document).scrollTop();
        var t = jQuery("#home").outerHeight();
        if (jQuery("#home").length > 0) {
            var n = jQuery("#home").offset().top
        }
        if (e >= t - 100) {
            jQuery(".navbar").addClass("minified")
        } else {
            jQuery(".navbar").removeClass("minified")
        }
        if (e > n + 40) {
            jQuery(".navbar-transparent").addClass("darken")
        } else {
            jQuery(".navbar-transparent").removeClass("darken")
        }
        if (e >= t - 100) {
            jQuery(".scrolltotop").addClass("show-to-top")
        } else {
            jQuery(".scrolltotop").removeClass("show-to-top")
        }
    });
    $(window).scroll(function () {
        if ($(window).scrollTop() > 400) {
            $("#back-top").fadeIn(200)
        } else {
            $("#back-top").fadeOut(200)
        }
    });
    $("#back-top").click(function () {
        $("html, body").stop().animate({scrollTop: 0}, 1500, "easeInOutExpo")
    })
});
$(function () {
    $(".nav li a").bind("click", function (e) {
        var t = $(this);
        $("html, body").stop().animate({scrollTop: $(t.attr("href")).offset().top - 70}, 2e3, "easeInOutExpo");
        e.preventDefault()
    })
});
$(function () {
    $("a.scroll").bind("click", function (e) {
        var t = $(this);
        $("html, body").stop().animate({scrollTop: $(t.attr("href")).offset().top - 70}, 2e3, "easeInOutExpo");
        e.preventDefault()
    })
});
$(document).ready(function () {
    if (jQuery(".tp-banner").length) {
        jQuery(".tp-banner").show().revolution({
            dottedOverlay: "twoxtwo",
            delay: 16e3,
            startwidth: 1170,
            startheight: 700,
            hideThumbs: 200,
            navigationType: "none",
            touchenabled: "on",
            onHoverStop: "on",
            swipe_velocity: .7,
            swipe_min_touches: 1,
            swipe_max_touches: 1,
            drag_block_vertical: false,
            keyboardNavigation: "off",
            navigationHAlign: "center",
            navigationVAlign: "bottom",
            navigationHOffset: 0,
            navigationVOffset: 20,
            shadow: 0,
            fullWidth: "off",
            fullScreen: "on",
            spinner: "spinner4",
            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,
            shuffle: "off",
            autoHeight: "off",
            forceFullWidth: "off",
            hideThumbsOnMobile: "off",
            hideNavDelayOnMobile: 1500,
            hideBulletsOnMobile: "off",
            hideArrowsOnMobile: "off",
            hideThumbsUnderResolution: 0,
            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            startWithSlide: 0,
            fullScreenOffsetContainer: ".header"
        })
    }
});
$(window).bind("load", function () {
    if (!onMobile)parallaxInit()
});
var onMobile = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    onMobile = true
}
$(function () {
    "use strict";
    $(".number-counters").appear(function () {
        $(".number-counters [data-to]").each(function () {
            var e = $(this).attr("data-to");
            $(this).delay(6e3).countTo({from: 50, to: e, speed: 3e3, refreshInterval: 50})
        })
    })
});
var mySwiper = new Swiper(".swiper-testimonial", {
    mode: "horizontal",
    loop: true,
    speed: 400,
    autoplay: 5e3,
    autoResize: true,
    pagination: ".pagination-testimonial",
    paginationClickable: true
});
var auto_slide = 1;
var hover_pause = 1;
var key_slide = 1;
var auto_slide_seconds = 5e3;
$("#carousel_ul li:first").before($("#carousel_ul li:last"));
if (auto_slide == 1) {
    var timer = setInterval('slide("right")', auto_slide_seconds);
    $("#hidden_auto_slide_seconds").val(auto_slide_seconds)
}
if (hover_pause == 1) {
    $("#carousel_ul").hover(function () {
        clearInterval(timer)
    }, function () {
        timer = setInterval('slide("right")', auto_slide_seconds)
    })
}
if (key_slide == 1) {
    $(document).bind("keypress", function (e) {
        if (e.keyCode == 37) {
            slide("left")
        } else if (e.keyCode == 39) {
            slide("right")
        }
    })
}
var processLine = {
    el: ".process-node", init: function () {
        processLine.bind()
    }, bind: function () {
        $(window).scroll(function () {
            processLine.check()
        })
    }, check: function () {
        $(processLine.el).each(function () {
            if ($(this).offset().top < $(window).scrollTop() + $(window).height() - 200) {
                $(this).closest("li").addClass("active").find(".line").addClass("active");
                $(this).addClass("active")
            } else {
                $(this).removeClass("active");
                $(this).closest("li").removeClass("active").find(".line").removeClass("active")
            }
        })
    }
};
$(window).load(function () {
    $("body").scrollspy({target: ".navbar", offset: 95})
})