var popup_function;

function windowScrollListener() {
	$(window).on("scroll", function() {
		panelsSetStyle();
		headerSetAnimation();
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
			var transparent_element_delay = 75;
			
			$(panel).removeClass("panel_transparent");
			$(panel).addClass("panel_opaque");
			
			$(panel).find(".panel_element_transparent").each(function(index) {
				$(this).delay(transparent_element_delay * index).queue(function() {
					$(this).removeClass("panel_element_transparent");
					$(this).addClass("panel_element_opaque");
				});
			});
		}
	}
	
	function headerSetAnimation() {
		if ($(window).scrollTop() > $("#header").outerHeight()) {
			header_bubbles.stopBubblesAnimation();
		} else {
			header_bubbles.startBubblesAnimation();
		}
	}
}

function windowResizeListener() {
	$(window).on("resize", function() {
		pageSetFontSize();
	});
	
	function pageSetFontSize() {
		var font_size = 16;
		var container_width_large = 1200;
		var page_width = 1920;
		var width_per_pixel_change = 150;
		var page = $("#page_wrapper");
		
		if ($(window).width() > page_width) {
			page.css("font-size", font_size + ($(window).width() - page_width) / width_per_pixel_change);
		} else if ($(window).width() < container_width_large) {
			page.css("font-size", font_size + ($(window).width() - container_width_large) / width_per_pixel_change);
		} else {
			page.css("font-size", font_size);
		}
	}
}

function textareaInputListener() {
	$(".panel_form_textarea").on("input", function() {
		$(this).css("height", "auto");
		$(this).css("height", $(this).prop("scrollHeight"));
	});
}

function pagePopup() {
	$("#page_popup_close").on("click", function() {
		popup_function = undefined;
		
		pagePopupClose();
	});
	
	$("#page_popup_button").on("click", function() {
		if (popup_function !== undefined) {
			popup_function();
		}
	});
}

function pagePopupOpen(title, text, button_text) {
	$("#page_popup_title").html(title);
	$("#page_popup_text").html(text);
	$("#page_popup_button").html(button_text);
	
	$("#page_popup").addClass("page_popup_visible");
}

function pagePopupClose() {
	$("#page_popup").removeClass("page_popup_visible");
}

$(document).ready(function() {
	windowScrollListener();
	windowResizeListener();
	textareaInputListener();
	
	pagePopup();
});
