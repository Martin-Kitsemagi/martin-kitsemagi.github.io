function windowResizeListener($) {
	$(window).on("resize", function() {
		feedbackSliderSetHeight($);
	});
	
	$(document).ready(function() {
		$(window).trigger("resize");
    });
}

function pageNav($) {
	$(".page_nav_mobile_button, .page_nav_page_overlay").on("click", function() {
		if ($(this).parent().hasClass("page_nav_mobile")) {
			$(this).parent().removeClass("page_nav_mobile");
		} else {
			$(this).parent().addClass("page_nav_mobile");
		}
	});
}

jQuery(document).ready(function($) {
	windowResizeListener($);
	
	pageNav($);
});