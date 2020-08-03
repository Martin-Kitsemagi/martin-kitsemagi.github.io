function windowScrollListener() {
    $(window).on("scroll", function() {
        if ($(window).scrollTop() > 0) {
            $(".page_nav").addClass("page_nav_scroll");
        } else {
            $(".page_nav").removeClass("page_nav_scroll");
        }
    });
}

function smoothScroll() {
    $("a[href^=\"#\"]").on("click", function(event) {
        var id = $(this).attr("href");

        event.preventDefault();

        $("html, body").animate({
            scrollTop: $(id).offset().top - $(".page_nav").outerHeight()
        }, 725);

        if ($(".page_nav").hasClass("page_nav_mobile_menu_show")) {
            $(".page_nav").removeClass("page_nav_mobile_menu_show");
        }
    });
}

function mobileMenu() {
    $(".page_nav_mobile_button, .page_nav_overlay").on("click", function() {
        if (!$(".page_nav").hasClass("page_nav_mobile_menu_show")) {
            $(".page_nav").addClass("page_nav_mobile_menu_show");
        } else {
            $(".page_nav").removeClass("page_nav_mobile_menu_show");
        }
    });
}

$(document).ready(function() {
    windowScrollListener();

    mobileMenu();
    smoothScroll();
});