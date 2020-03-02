
function windowScrollListener() {
	$(window).on("scroll", function() {
		panelsSetStyle();
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
			panel.removeClass("panel_transparent");
			panel.addClass("panel_opaque");
		}
	}
}

function windowResizeListener() {
	$(window).on("resize", function() {
		pageSetFontSize();

		$("textarea").each(function() {
			$(this).css("height", "auto");
			$(this).css("height", $(this).prop("scrollHeight"));
		});

		if (!/Mobi/.test(navigator.userAgent)) {
			if ($("#header").outerHeight() < $(window).outerHeight()) {
				$("#header").css("height", $(window).outerHeight());
			}
		}

		if ($(window).outerWidth() < 991.98) {
			$("#qualities_slides").addClass("qualities_slides_active");
		} else {
			$("#qualities_slides").removeClass("qualities_slides_active");
			$("#qualities_slides").css("transform", "none");
		}

		if ($(window).outerWidth() > 767.98) {
			if ($("#page_nav").hasClass("page_nav_active")) {
				$("#page_nav").removeClass("page_nav_active");
			}
		}
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
