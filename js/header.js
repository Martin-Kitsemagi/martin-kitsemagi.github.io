function navMobile() {
	$("#page_nav_mobile").on("click", function(event) {
		if ($("#page_mobile_nav").hasClass("page_mobile_nav_active")) {
			navMobileClose();
		} else {
			navMobileOpen();
		}
		
		event.stopPropagation();
	});
}

function navMobileOpen() {
	$("#page_mobile_nav").addClass("page_mobile_nav_active");
	$("#page_nav").addClass("page_nav_active");
	$("#page_nav_mobile").addClass("page_nav_mobile_animate");
}

function navMobileClose() {
	$("#page_mobile_nav").removeClass("page_mobile_nav_active");
	$("#page_nav").removeClass("page_nav_active");
	$("#page_nav_mobile").removeClass("page_nav_mobile_animate");
}

function navPage() {
	$("[class*=scroll_]").on("click", function() {
		var classes = $(this).attr("class").split(" ");
		var id;
		
		for (var i = 0; i < classes.length; i++) {
			if (classes[i].substring(0, 7) === "scroll_") {
				id = "#" + classes[i].substring(7, classes[i].length);
				break;
			}
		}
		
		if (id !== undefined) {
			if (id === "#header") {
				scrollToTop();
			} else {
				scrollToPanel(id);
			}
			
			if ($(this).hasClass("page_mobile_nav_element") || $(this).hasClass("page_nav_icon")) {
				navMobileClose();
			}
		}
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
	var viewport_height = $(window).outerHeight();

	if (/Mobi/.test(navigator.userAgent)) {
		viewport_height = $("#header").outerHeight();
	}

	$("#header").css("height", viewport_height);
}

$(document).ready(function() {
	navMobile();
	navPage();
});
