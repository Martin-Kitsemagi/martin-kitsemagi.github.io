function windowResizeListener($) {
	$(window).on("resize", function() {
		setHeaderHeight($);
	});
	
	$(document).ready(function() {
		$(window).trigger("resize");
    });
}

function pageNav($) {
	$(".page_nav_mobile_button, .page_nav_page_overlay").on("click", function() {
		if ($(this).parent().hasClass("page_nav_mobile")) {
			$(this).parent().removeClass("page_nav_mobile");
		} else {
			$(this).parent().addClass("page_nav_mobile");
		}
	});
}

function setHeaderHeight($) {
	var max_height = 750;
	var viewport_height = $(window).outerHeight();
	var viewport_width = $(window).outerWidth();

	if (viewport_width > viewport_height) {
		viewport_height = viewport_width;
	}

	if (viewport_height < max_height) {
		$(".header").css("height", viewport_height);
	} else {
		$(".header").css("height", max_height);
	}
}

function touchEventListeners($) {
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

jQuery(document).ready(function($) {
	windowResizeListener($);
	touchEventListeners($);
	
	pageNav($);
});