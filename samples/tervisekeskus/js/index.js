function windowScrollListener() {
	$(document).on("scroll", function() {
	});
}

function windowResizeListener() {
}

function smoothScroll() {
    $("a[href^=\"#\"]").on("click", function(event) {
        var id = $(this).attr("href");

        event.preventDefault();

        $("html, body").animate({
            scrollTop: $(id).offset().top
        }, 725);

        if ($(".page_nav_overlay").hasClass("page_nav_overlay_active")) {
			$(".page_nav_overlay").removeClass("page_nav_overlay_active");
		}

		if ($(".page_nav").hasClass("page_nav_mobile_nav_active")) {
			$(".page_nav").removeClass("page_nav_mobile_nav_active");
		}
    });
}

function pageNav() {
	$(".page_nav_mobile_button, .page_nav_mobile_nav_button, .page_nav_overlay").on("click", function() {
		if ($(".page_nav_overlay").hasClass("page_nav_overlay_active")) {
			$(".page_nav_overlay").removeClass("page_nav_overlay_active");
		} else {
			$(".page_nav_overlay").addClass("page_nav_overlay_active");
		}

		if ($(".page_nav").hasClass("page_nav_mobile_nav_active")) {
			$(".page_nav").removeClass("page_nav_mobile_nav_active");
		} else {
			$(".page_nav").addClass("page_nav_mobile_nav_active");
		}
	});
}

function touchEventListeners() {
    $.event.special.touchstart = {
        setup: function(_, ns, handle) {
            if (ns.includes("noPreventDefault")) {
                this.addEventListener("touchstart", handle, {passive: false});
            } else {
                this.addEventListener("touchstart", handle, {passive: true});
            }
        }
    };
}

$(document).ready(function() {
	windowScrollListener();
	windowResizeListener();

	smoothScroll();
	pageNav();
});
