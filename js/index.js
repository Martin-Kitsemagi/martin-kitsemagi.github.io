function windowScrollListener() {
	$(document).on("scroll", function() {
		panelAnimationPaused();
		headerScrollPaused();
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

	function headerScrollPaused() {
		var top = 0;

		if (($("#header").outerHeight() - $(window).height()) > 0) {
			top = $("#header").outerHeight() - $(window).height();
		}

		if ($(window).scrollTop() > top) {
			if (!$(".header_scroll").hasClass("header_scroll_paused")) {
				$(".header_scroll").addClass("header_scroll_paused");
			}
		} else {
			if ($(".header_scroll").hasClass("header_scroll_paused")) {
				$(".header_scroll").removeClass("header_scroll_paused");
			}
		}
	}

	panelAnimationPaused();
	headerScrollPaused();
}

function windowResizeListener() {
	var window_width = $(window).width();

	$(window).on("resize", function() {
		if (window_width !== $(window).width()) {
			window_width = $(window).width();

			setHeaderHeight();
		}
	});
	
	function setHeaderHeight() {
		$("#header").css("height", $(window).height());
	}

	setHeaderHeight();
}

function smoothScroll() {
    $("a[href^=\"#\"]").on("click", function(event) {
        var id = $(this).attr("href");

        event.preventDefault();

        $("html, body").animate({
            scrollTop: $(id).offset().top
        }, 725);

        if ($(".page_nav").hasClass("page_nav_menu_open")) {
            $(".page_nav").removeClass("page_nav_menu_open");
        }
    });
}

function pageNav() {
	$(".page_nav_menu_button, .page_nav_menu_close_button, .page_nav_overlay").on("click", function() {
		if ($(".page_nav").hasClass("page_nav_menu_open")) {
			$(".page_nav").removeClass("page_nav_menu_open");
		} else {
			$(".page_nav").addClass("page_nav_menu_open");
		}
	});
}

function iconsSlider() {
	$(".technologies_icons_inner_wrapper").each(function() {
		var icons_slider = $(this);

		icons_slider.speed_modifier = 1;

		if (/Mobi/.test(navigator.userAgent)) {
			icons_slider.speed_modifier = 1.25;
		}

		icons_slider.on("mousedown touchstart", function(event) {
			if (icons_slider.outerWidth() > $(".container").outerWidth()) {
				icons_slider.is_mousedown = true;
				
				icons_slider.x = event.clientX;

				if (event.type === "touchstart") {
					icons_slider.x = event.touches[0].clientX;
				}
			}
		});
	
		$(document).on("mouseup touchend touchcancel", function() {
			if (icons_slider.is_mousedown === true) {
				icons_slider.is_mousedown = false;

				var icons_slider_position_left = icons_slider.position().left;

				if (icons_slider_position_left > 0 || (icons_slider_position_left + icons_slider.outerWidth()) < $(".container").outerWidth()) {
					if (icons_slider_position_left > 0) {
						icons_slider.css("transform", "translate3d(0, 0, 0)");
					} else {
						icons_slider.css("transform", "translate3d(" + ($(".container").outerWidth() - icons_slider.outerWidth()) + "px, 0, 0)");
					}

					icons_slider.css("transition", "transform 0.3s ease");

					icons_slider.timeout = setTimeout(function() {
						icons_slider.css("transition", "none");
						icons_slider.timeout = undefined;
					}, 300);
				}
			}
		});
	
		$(document).on("mousemove touchmove", function(event) {
			if (icons_slider.is_mousedown === true && icons_slider.timeout === undefined) {
				var x = event.clientX;
	
				if (event.type === "touchmove") {
					x = event.touches[0].clientX;
				}
	
				var icons_slider_position_left = icons_slider.position().left;
				var drag_speed = (x - icons_slider.x) * icons_slider.speed_modifier;

				icons_slider.css("transform", "translate3d(" + (icons_slider_position_left + drag_speed) + "px, 0, 0)");

				icons_slider.x = x;
			}
		});
	});
}

function textareaInputListener() {
	$("textarea").css({
		"overflow": "hidden",
		"resize": "none"
	});

	$("textarea").on("input change", function() {
		$(this).css("height", "auto");
		$(this).css("height", $(this).prop("scrollHeight"));
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
	iconsSlider();
	textareaInputListener();
	touchEventListeners();
});
