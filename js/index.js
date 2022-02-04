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
	$(".technologies_icons").each(function() {
		var icons_slider = $(this).find(".technologies_icons_inner_wrapper").first();

		icons_slider.nav = $(this).siblings(".technologies_icons_nav").first();

		icons_slider.icons = icons_slider.find(".technologies_icon");

		icons_slider.speed_modifier = 1;
		icons_slider.speed = 0;
		icons_slider.pos_left = 0;

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

				clearIconsSliderInterval();
			}
		});
	
		$(document).on("mouseup touchend touchcancel", function() {
			if (icons_slider.is_mousedown === true) {
				icons_slider.is_mousedown = false;

				if (icons_slider.pos_left > 0 || (icons_slider.pos_left + icons_slider.outerWidth()) < $(".container").outerWidth()) {
					setIconsSliderTransition();

					if (icons_slider.pos_left > 0) {
						setIconsSliderPosition(0);
					} else {
						setIconsSliderPosition($(".container").outerWidth() - icons_slider.outerWidth());
					}
				} else if (Math.abs(icons_slider.speed) > 1.25 && icons_slider.drag_interval === undefined) {
					icons_slider.drag_interval = setInterval(function() {
						icons_slider.speed -= icons_slider.speed * 0.125;
						
						if (Math.abs(icons_slider.speed) >= 1.25) {
							if (icons_slider.pos_left + icons_slider.speed > 0) {
								setIconsSliderPosition(0);
								clearIconsSliderInterval();
							} else if (icons_slider.pos_left + icons_slider.outerWidth() + icons_slider.speed < $(".container").outerWidth()) {
								setIconsSliderPosition($(".container").outerWidth() - icons_slider.outerWidth());
								clearIconsSliderInterval();
							} else {
								setIconsSliderPosition(icons_slider.pos_left + icons_slider.speed);
							}
						} else {
							clearIconsSliderInterval();
						}
					}, 1000 / 60);
				}
			}
		});
	
		$(document).on("mousemove touchmove", function(event) {
			if (icons_slider.is_mousedown === true && icons_slider.timeout === undefined) {
				var x = event.clientX;
	
				if (event.type === "touchmove") {
					x = event.touches[0].clientX;
				}

				var drag_speed = (x - icons_slider.x) * icons_slider.speed_modifier;

				icons_slider.speed = drag_speed

				setIconsSliderPosition(icons_slider.pos_left + drag_speed);
				setIconsSliderNavScroll();

				icons_slider.x = x;
			}
		});

		function setIconsSliderPosition(pos_left) {
			icons_slider.css("transform", "translate3d(" + pos_left + "px, 0, 0)");
	
			icons_slider.pos_left = pos_left;
		}
	
		function clearIconsSliderInterval() {
			if (icons_slider.drag_interval !== undefined) {
				clearInterval(icons_slider.drag_interval);
				icons_slider.drag_interval = undefined;

				setIconsSliderNavScroll();
			}
		}

		function setIconsSliderTransition() {
			if (icons_slider.timeout === undefined) {
				icons_slider.css("transition", "transform 0.3s ease");
	
				icons_slider.timeout = setTimeout(function() {
					icons_slider.css("transition", "none");
					icons_slider.timeout = undefined;
				}, 300);
			}
		}
	
		function setIconsSliderNavScroll() {
			if (icons_slider.nav !== undefined) {
				if (icons_slider.pos_left >= 0) {
					icons_slider.nav.find(".technologies_icons_nav_left").removeClass("technologies_icons_nav_scroll");
				} else if ((icons_slider.pos_left + icons_slider.outerWidth()) <= $(".container").outerWidth()) {
					icons_slider.nav.find(".technologies_icons_nav_right").removeClass("technologies_icons_nav_scroll");
				} else {
					icons_slider.nav.find(".technologies_icons_nav_left, .technologies_icons_nav_right").addClass("technologies_icons_nav_scroll");
				}
			}
		}

		if (icons_slider.nav !== undefined) {
			icons_slider.nav.find(".technologies_icons_nav_left").on("click", function() {
				if (icons_slider.icons !== undefined && $(this).hasClass("technologies_icons_nav_scroll")) {
					for (var i = icons_slider.icons.length - 1; i >= 0; i--) {
						if ((icons_slider.pos_left + icons_slider.icons.eq(i).position().left) < 0) {
							setIconsSliderTransition();
							setIconsSliderPosition(-icons_slider.icons.eq(i).position().left);
							setIconsSliderNavScroll();

							break;
						} 
					}
				}
			});

			icons_slider.nav.find(".technologies_icons_nav_right").on("click", function() {
				if (icons_slider.icons !== undefined && $(this).hasClass("technologies_icons_nav_scroll")) {
					for (var i = 0; i < icons_slider.icons.length; i++) {
						if ((icons_slider.pos_left + icons_slider.icons.eq(i).position().left + icons_slider.icons.eq(i).outerWidth()) > $(".container").outerWidth()) {
							setIconsSliderTransition();
							setIconsSliderPosition(-(icons_slider.icons.eq(i).position().left + icons_slider.icons.eq(i).outerWidth() - $(".container").outerWidth()));
							setIconsSliderNavScroll();

							break;
						} 
					}
				}
			});
		}

		$(window).on("resize", function() {
			if (icons_slider.outerWidth() > $(".container").outerWidth()) {
				if (icons_slider.pos_left > 0 || (icons_slider.pos_left + icons_slider.outerWidth()) < $(".container").outerWidth()) {
					if (icons_slider.pos_left > 0) {
						setIconsSliderPosition(0);
					} else {
						setIconsSliderPosition($(".container").outerWidth() - icons_slider.outerWidth());
					}

					setIconsSliderNavScroll();
				}
			} else {
				if (icons_slider.pos_left !== 0) {
					setIconsSliderPosition(0);
					
					icons_slider.nav.find(".technologies_icons_nav_left").removeClass("technologies_icons_nav_scroll");
					icons_slider.nav.find(".technologies_icons_nav_right").addClass("technologies_icons_nav_scroll");
				}
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
	contactFormSubmit();
	touchEventListeners();
});
