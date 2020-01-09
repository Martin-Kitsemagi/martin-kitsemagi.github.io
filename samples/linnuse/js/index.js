function windowScrollListener() {
	$(window).on("scroll", function() {
		pageNavScroll();
		panelsSetStyle();
	});
	
	function pageNavScroll() {
		var page_nav = $("#page_nav");

		if (/Mobi/.test(navigator.userAgent)) {
			if ($(window).scrollTop() > 0) {
				page_nav.addClass("page_nav_scroll_active");
			} else {
				page_nav.removeClass("page_nav_scroll_active");
			}
		}
	}

	function panelsSetStyle() {
		$(".panel_animation_paused").each(function() {
			if (isPanelInViewport($(this))) panelSetStyle($(this));
		});

		function isPanelInViewport(panel) {
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

		function panelSetStyle(panel) {
			panel.removeClass("panel_animation_paused");
		}
	}
}

function windowResizeListener() {
	$(window).on("resize", function() {
		pageSetFontSize();
		setVhElementsHeight();
		
		if (!/Mobi/.test(navigator.userAgent)) {
			if ($("#page_nav").hasClass("page_nav_scroll_active")) {
				$("#page_nav").removeClass("page_nav_scroll_active");
			}
		}

		$(".panel_form_textarea").css("height", "auto");
		$(".panel_form_textarea").css("height", $(this).prop("scrollHeight"));
    });
	
	$(document).ready(function() {
		$(window).trigger("resize");
	});
	
	function pageSetFontSize() {
        var font_size = 16;
        var min_font_size = 14;
		var page_width = 1920;
		var width_per_pixel_change = 450;
		
		if ($(window).width() > page_width) width_per_pixel_change = 85;

		font_size = font_size + ($(window).width() - page_width) / width_per_pixel_change;
		
		if (font_size < min_font_size) font_size = min_font_size;

		$("html").css("font-size", font_size);
	}
}

function pageScroll() {
	$("[class*=scroll_]").on("click", function() {
		var classes = $(this).attr("class").split(" ");
		var id = "";
		
		for (var i = 0; i < classes.length; i++) {
			var split = classes[i].split("_");

			if (split[0] === "scroll") {
				split.shift();
				id = split.join("_");

				break;
			}
		}

		if (id !== "") {
			scrollToPanel(id);
		}
	});

	$(".scroll_top").on("click", function() {
		scrollToTop();
	});
}

function scrollToPanel(id) {
	var top = 0;
	
	top = $("#" + id).offset().top;
	
	scrollTo(top);
}

function scrollToTop() {
	scrollTo(0);
}

function scrollTo(top) {
	var scroll_delay = 725;
	
	$("html, body").animate({
		scrollTop: top
	}, scroll_delay);
}

function formNotification() {
	$(".panel_form_notification_button").on("click", function() {
		$(this).parent().removeClass("panel_form_notification_opaque");
		$(this).parent().addClass("panel_form_notification_transparent");
	});
}

function formInputListener() {
	$(".panel_form_input, .panel_form_textarea").on("input change", function() {
		if ($(this).val() !== "") {
			$(this).parent().addClass("panel_form_active");
		} else {
			$(this).parent().removeClass("panel_form_active");
		}
	});
	
	$(".panel_form_textarea").on("input change", function() {
		$(this).css("height", "auto");
		$(this).css("height", $(this).prop("scrollHeight"));
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

	$(".panel_form_number_input").on("keypress paste", function(event) {
		var char = (event.keyCode ? event.keyCode : event.which);

		if ((char >= 48 && char <= 57) || char === 32 || char === 45) {
			return true;
		} else {
			return false;
		}
	});
}

function setVhElementsHeight() {
	$(".viewport_height").each(function() {
		var viewport_height = $(this).outerHeight;
		$(this).css("height", viewport_height);
	});
}

$(document).ready(function() {
	windowScrollListener();
	windowResizeListener();

	pageScroll();
	formInputListener();
	formNotification();
});
