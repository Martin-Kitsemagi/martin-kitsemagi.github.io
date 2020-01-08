
function windowScrollListener() {
	$(window).on("scroll", function() {
		panelsSetStyle();
		pageNavSetStyle();
		headerElementsSetStyle();
		parallaxScroll();
	});
	
	function panelsSetStyle() {
		$(".panel").find(".panel_transparent").each(function() {
			if (isViewportPastPanel($(this)) || isPanelInViewport($(this))) panelSetStyle($(this));
		});
		
		function isPanelInViewport(panel) {
			if (isViewportPastPanel(panel)) return false;
			
			var viewport_top = $(window).scrollTop();
			var viewport_bottom = viewport_top + $(window).height();
			var panel_top = panel.offset().top;
			var panel_bottom = panel_top + panel.outerHeight();
			
			var panel_height_in_viewport = 0;
			var panel_viewport_cover_percentage_required = 50;
			
			if (viewport_top <= panel_top && viewport_bottom >= panel_bottom) return true;
			if (viewport_top > panel_top && viewport_bottom < panel_bottom) return true;
			
			if (viewport_top < panel_top && viewport_bottom < panel_bottom) {
				panel_height_in_viewport = viewport_bottom - panel_top;
			}
			
			if (viewport_top > panel_top && viewport_bottom > panel_bottom) {
				panel_height_in_viewport = panel_bottom - viewport_top;
			}
			
			if ((panel_height_in_viewport / $(window).height()) * 100 >= panel_viewport_cover_percentage_required) return true;
			
			return false;
		}
		
		function isViewportPastPanel(panel) {
			if ($(window).scrollTop() >= panel.offset().top + panel.outerHeight()) return true;
			
			return false;
		}
		
		function panelSetStyle(panel) {
			var transparent_element_delay = 105;
			
			panel.removeClass("panel_transparent");
			panel.addClass("panel_opaque");
			
			$(panel).find(".panel_element_transparent").each(function(index) {
				$(this).delay(transparent_element_delay * index).queue(function() {
					$(this).removeClass("panel_element_transparent");
					$(this).addClass("panel_element_opaque");
				});
			});
		}
	}
	
	function pageNavSetStyle() {
		var scroll_from_top = 0;
		
		if ($(window).scrollTop() > scroll_from_top) {
			$("#page_nav").addClass("page_nav_scroll");
		} else {
			$("#page_nav").removeClass("page_nav_scroll");
		}
	}
	
	function headerElementsSetStyle() {
		var viewport_top = $(window).scrollTop();
		var viewport_height = $(window).outerHeight();
		
		if (/Mobi/.test(navigator.userAgent)) {
			headerElementSetStyle("#header_title", 20);
			headerElementSetStyle("#header_arrow", 50);
		}
		
		function headerElementSetStyle(id, percentage_of_height) {
			if (viewport_top > viewport_height * percentage_of_height / 100) {
				if ($(id).hasClass("header_element_opaque")) {
					$(id).removeClass("header_element_opaque");
					$(id).addClass("header_element_transparent");
				}
			} else {
				if ($(id).hasClass("header_element_transparent")) {
					$(id).removeClass("header_element_transparent");
					$(id).addClass("header_element_opaque");
				}
			}
		}
	}
	
	function parallaxScroll() {
		var parallax_speed = 0.5;
		
		if (!/Mobi/.test(navigator.userAgent) && $(window).scrollTop() < $("#header").outerHeight()) {
			$(".parallax").css("transform", "translate3d(0, " + $(window).scrollTop() * parallax_speed + "px, 0)");
		} else if (/Mobi/.test(navigator.userAgent)) {
			$(".parallax").css("transform", "translate3d(0, 0, 0)");
		}
	}
}

function windowResizeListener() {
	$(window).on("resize", function() {
		pageSetFontSize();
		setHeaderHeight();

		if (!/Mobi/.test(navigator.userAgent)) {
			if ($("#header_title").hasClass("header_element_transparent")) {
				$("#header_title").removeClass("header_element_transparent");
				$("#header_title").addClass("header_element_opaque");
			}

			if ($("#header_arrow").hasClass("header_element_transparent")) {
				$("#header_arrow").removeClass("header_element_transparent");
				$("#header_arrow").addClass("header_element_opaque");
			}
		}

		$("textarea").each(function() {
			$(this).css("height", "auto");
			$(this).css("height", $(this).prop("scrollHeight"));
		});
	});
	
	$(document).ready(function() {
		$(window).trigger("resize");
	});
	
	function pageSetFontSize() {
		var font_size = 16;
		var container_width_large = 1200;
		var page_width = 1920;
		var width_per_pixel_change = 125;
		
		if ($(window).width() > page_width) {
			font_size = font_size + ($(window).width() - page_width) / width_per_pixel_change;
		} else if ($(window).width() < container_width_large) {
			font_size = font_size + ($(window).width() - container_width_large) / width_per_pixel_change;
		}
		
		if (font_size < 14) font_size = 14;

		$("html").css("font-size", font_size);
	}
}

function textareaInputListener() {
	$("textarea").on("input change", function() {
		$(this).css("height", "auto");
		$(this).css("height", $(this).prop("scrollHeight"));
	});
}

function formInputListener() {
	$(".panel_form_input, .panel_form_textarea").on("focus", function() {
		if ($(this).siblings(".panel_form_label")) {
			$(this).parent().addClass("panel_form_label_top");
		}
	});
	
	$(".panel_form_input, .panel_form_textarea").on("focusout", function() {
		if ($(this).val() === "" && $(this).siblings(".panel_form_label")) {
			$(this).parent().removeClass("panel_form_label_top");
		}
	});
	
	$(".panel_form_input, .panel_form_textarea").on("input change", function() {
		if ($(this).val() !== "") {
			if ($(this).siblings(".panel_form_input_button")) {
				$(this).parent().addClass("panel_form_button_right");
			}
		} else {
			if ($(this).siblings(".panel_form_input_button")) {
				$(this).parent().removeClass("panel_form_button_right");
			}
		}
	});
	
	$(".panel_form_input_button").on("click", function() {
		if ($(this).siblings("input")) {
			$(this).siblings("input:first").val("").change();
			$(this).siblings("input:first").focus();
		}
		
		if ($(this).siblings("textarea")) {
			$(this).siblings("textarea:first").val("").change();
			$(this).siblings("textarea:first").focus();
		}
	});
}

$(document).ready(function() {
	windowScrollListener();
	windowResizeListener();
	textareaInputListener();
	formInputListener();
});
