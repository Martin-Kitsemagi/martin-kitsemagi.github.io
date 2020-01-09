function pageNavMobile() {
    var page_nav = $("#page_nav");
    var page_mobile_nav = $("#page_nav_mobile")

    page_nav.find(".page_nav_mobile_button").on("click", function() {
        if (!page_mobile_nav.hasClass("page_nav_mobile_active")) {
            $(this).addClass("page_nav_mobile_button_active");

            page_nav.addClass("page_nav_active");
            page_mobile_nav.addClass("page_nav_mobile_active");
        } else {
            $(this).removeClass("page_nav_mobile_button_active");

            page_nav.removeClass("page_nav_active");
            page_mobile_nav.removeClass("page_nav_mobile_active");
        }
    });
}

$(document).ready(function() {
    pageNavMobile();
});