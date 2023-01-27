function windowScrollListener() {
	$(document).on("scroll", function() {
		panelAnimationPaused();
	});

	function panelAnimationPaused() {
		$(".panel_animation_paused").each(function() {
			var viewport_top = $(window).scrollTop();
			var viewport_bottom = viewport_top + $(window).height();
			var animation_top = $(this).offset().top;
			var animation_bottom = animation_top + $(this).outerHeight();

			if ((animation_bottom - animation_top) <= (viewport_bottom - viewport_top)) {
				var animation_point = animation_top + ((animation_bottom - animation_top) / 2);
				
				if (viewport_top >= animation_point || viewport_bottom >= animation_point) {
					$(this).removeClass("panel_animation_paused");
				}
			} else {
				var viewport_animation_point = viewport_top + ((viewport_bottom - viewport_top) / 2);

				if (animation_top <= viewport_animation_point || animation_bottom <= viewport_animation_point) {
					$(this).removeClass("panel_animation_paused");
				}
			}
		});
	}

	panelAnimationPaused();
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

		if ($(".page_nav_alt").hasClass("page_nav_alt_active")) {
			$(".page_nav_alt").removeClass("page_nav_alt_active");
		}
    });
}

function pageNav() {
	$(".page_nav_menu_button, .page_nav_menu_close_button, .page_nav_overlay").on("click", function() {
		if ($(".page_nav_overlay").hasClass("page_nav_overlay_active")) {
			$(".page_nav_overlay").removeClass("page_nav_overlay_active");
		} else {
			$(".page_nav_overlay").addClass("page_nav_overlay_active");
		}

		if ($(".page_nav_alt").hasClass("page_nav_alt_active")) {
			$(".page_nav_alt").removeClass("page_nav_alt_active");
		} else {
			$(".page_nav_alt").addClass("page_nav_alt_active");
		}
	});
}

function textareaInputListener() {
	$("textarea").on("input change", function() {
		$(this).css("height", "auto");
		$(this).css("height", $(this).prop("scrollHeight"));
	});
}

function contactFormSubmit() {
	$(".contact_form_submit").on("click", function() {
		if ($(".contact_form")[0].checkValidity()) {
			$(".contact_form")[0].submit();

			$(".contact_form").find("input, textarea").val("");

			return false
		}

		return true
	});
}

function projectsAnimationDelay() {
    $(".projects").find("a").each(function() {
        $(this).css({
            "animation-delay": $(this).index() * 0.06 + "s"
        });
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
	textareaInputListener();
    contactFormSubmit();
    projectsAnimationDelay();
	touchEventListeners();
});
