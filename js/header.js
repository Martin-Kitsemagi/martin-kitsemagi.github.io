
function navMobile() {
	$("#header_nav_mobile").on("click", function(event) {
		if ($("#page_nav").hasClass("page_nav_mobile")) {
			navMobileClose();
		} else {
			navMobileOpen();
		}
		
		event.stopPropagation();
	});
	
	$("#page_inner_wrapper").on("click", function() {
		navMobileClose();
	});
}

function navMobileOpen() {
	$("#page_nav").addClass("page_nav_mobile");
	$("#page_inner_wrapper").addClass("page_inner_wrapper_mobile");
	$("#header_nav_mobile").addClass("header_nav_mobile_animate");
}

function navMobileClose() {
	$("#page_nav").removeClass("page_nav_mobile");
	$("#page_inner_wrapper").removeClass("page_inner_wrapper_mobile");
	$("#header_nav_mobile").removeClass("header_nav_mobile_animate");
}

function navPage() {
	$(".page_nav_element").on("click", function() {
		if ($(this).attr("id") !== undefined) {
			scrollToPanel("#" + $(this).attr("id").replace("_nav", ""));
		}
		
		navMobileClose();
	});
}

function scrollToPanel(id) {
	var top = 0;
	
	top = $(id).offset().top;
	
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

function setHeaderHeight() {
	if (/Mobi/.test(navigator.userAgent)) {
		var viewport_height = $("#header").outerHeight();
		$("#header").css("height", viewport_height);
	}
}

$(document).ready(function() {
	setHeaderHeight();
	
	navMobile();
	navPage();
});
