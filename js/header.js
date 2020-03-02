function navMobile() {
	$("#page_nav_mobile").on("click", function() {
		if ($("#page_nav").hasClass("page_nav_active")) {
			$("#page_nav").removeClass("page_nav_active");
		} else {
			$("#page_nav").addClass("page_nav_active");
		}
	});

	$("#page_nav_overlay").on("click", function() {
		if ($("#page_nav").hasClass("page_nav_active")) {
			$("#page_nav").removeClass("page_nav_active");
		}
	});
}

function navTheme() {
	$("#page_nav_theme").on("click", function() {
		if ($("#page_wrapper").hasClass("page_wrapper_theme")) {
			$("#page_wrapper").removeClass("page_wrapper_theme");
		} else {
			$("#page_wrapper").addClass("page_wrapper_theme");
		}
	});
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
			
			if ($("#page_nav").hasClass("page_nav_active")) {
				$("#page_nav").removeClass("page_nav_active");
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

$(document).ready(function() {
	navMobile();
	navTheme();
	navPage();
});
