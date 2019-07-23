
var newsletter_active_zone;

$(window).scroll(function() {
	if ($(this).scrollTop() > ($("#newsletter_inner_wrapper").offset().top - $(this).height())) {
		if (newsletter_active_zone) return;
		if (!newsletter_active_zone) newsletter_active_zone = true;
		
		$("#newsletter_inner_wrapper").css("opacity", "1");
	} else {
		if (!newsletter_active_zone) return;
		if (newsletter_active_zone) newsletter_active_zone = false;

		$("#newsletter_inner_wrapper").css("opacity", "0");
	}
});
