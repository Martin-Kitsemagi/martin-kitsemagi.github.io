
function windowScrollListener() {
	$(window).on("scroll", function() {
		panelsSetStyle();
		headerNavSetStyle();
		headerElementsSetStyle();
		parallaxScroll();
	});
	
	function panelsSetStyle() {
		$(".panel").each(function() {
			if ($(this).hasClass("panel_transparent"))
				if (isViewportPastPanel($(this)) || isPanelInViewport($(this))) panelSetStyle($(this));
		});
		
		function isPanelInViewport(panel) {
			if (isViewportPastPanel(panel)) return false;
			
			var viewport_top = $(window).scrollTop();
			var viewport_bottom = viewport_top + $(window).height();
			var panel_top = $(panel).offset().top;
			var panel_bottom = panel_top + $(panel).outerHeight();
			
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
			if ($(window).scrollTop() >= $(panel).offset().top + $(panel).outerHeight()) return true;
			
			return false;
		}
		
		function panelSetStyle(panel) {
			var transparent_element_delay = 105;
			
			$(panel).removeClass("panel_transparent");
			$(panel).addClass("panel_opaque");
			
			$(panel).find(".panel_element_border").find("span").each(function() {
				if ($(this).css("animation-play-state") === "paused") {
					$(this).css("animation-play-state", "running");
				}
			});
			
			$(panel).find(".panel_element_transparent").each(function(index) {
				$(this).delay(transparent_element_delay * index).queue(function() {
					$(this).removeClass("panel_element_transparent");
					$(this).addClass("panel_element_opaque");
				});
			});
		}
	}
	
	function headerNavSetStyle() {
		var scroll_from_top = 250;
		
		if ($(window).scrollTop() > scroll_from_top) {
			$("#header_nav").addClass("header_nav_scroll");
		} else {
			$("#header_nav").removeClass("header_nav_scroll");
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
			$(".parallax").css("top", $(window).scrollTop() * parallax_speed);
		}
	}
}

function windowResizeListener() {
	$(window).on("resize", function() {
		pageSetFontSize();
	});
	
	$(document).ready(function() {
		$(window).trigger("resize");
	});
	
	function pageSetFontSize() {
		var font_size = 16;
		var container_width_large = 1200;
		var page_width = 1920;
		var width_per_pixel_change = 125;
		var page = $("#page_wrapper");
		
		if ($(window).width() > page_width) {
			font_size = font_size + ($(window).width() - page_width) / width_per_pixel_change;
		} else if ($(window).width() < container_width_large) {
			font_size = font_size + ($(window).width() - container_width_large) / width_per_pixel_change;
		}
		
		if (font_size < 14) font_size = 14;

		page.css("font-size", font_size);
	}
}

function contactSetMobile() {
	if (/Mobi/.test(navigator.userAgent)) {
		$("#contact").addClass("panel_mobile");
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

function samplesView() {
	$("#samples").find(".panel_diamond").on("click", function() {
		var id = $(this).parent().parent().attr("id");
		
		if (!$("#samples_view").hasClass("samples_view_display")) {
			samplesViewOpen();
			
			$("#samples_view_wrapper").removeClass();
			$("#samples_view_wrapper").addClass(id);
			
			$(".samples_view_text").removeClass("samples_view_text_display");
			$("#" + id + "_view_text").addClass("samples_view_text_display");
		}
	});
	
	$("#samples_view_back_button").on("click", function() {
		if ($("#samples_view").hasClass("samples_view_display")) {
			samplesViewClose();
		}
	});
	
	function samplesViewOpen() {
		$("#samples_view").addClass("samples_view_display");
		$("#page_inner_wrapper").addClass("samples_view_page_display");
		$("body").addClass("samples_view_body_display");
	}
	
	function samplesViewClose() {
		$("#samples_view").removeClass();
		$("#page_inner_wrapper").removeClass("samples_view_page_display");
		$("body").removeClass("samples_view_body_display");
	}
}

$(document).ready(function() {
	windowScrollListener();
	windowResizeListener();
	textareaInputListener();
	formInputListener();
	
	samplesView();
	
	contactSetMobile();
});
