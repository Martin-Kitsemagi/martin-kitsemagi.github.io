
var nav_delay = 350;
var scroll_delay = 500;
var nav_fade_delay = 200;

$(document).ready(function() {
	$("#top_nav_drop_button").click(function() {
		toggleNavDropdown("#top_nav_drop_button");
	});
});

$(document).ready(function() {
	$("#page_wrapper").click(function() {
		if ($("#top_nav_drop_button_l").is(":visible"))
			toggleNavDropdown("#top_nav_drop_button");
	});
});

$(window).scroll(function() {
	if ($(this).scrollTop() >= 1500 && $(this).width() >= 976) {
		$("#to_top").fadeIn(nav_fade_delay);
	} else {
		$("#to_top").fadeOut(nav_fade_delay);
	}
});

function changePageLanguage(url) {
	window.location.href = url;
}

function closeNavDropdown($button) {
	if ($($button + "_l").is(":visible")) {
		setTimeout(function() {
			$($button).css("background", "#131313");
		}, nav_delay);	
		
		$($button + "_l").slideUp(nav_delay);
	}
}

function toggleNavDropdown($button) {
	if ($($button + "_l").is(":visible")) {
		setTimeout(function() {
			$($button).css("background", "#131313");
		}, nav_delay);	
		
		$($button + "_l").slideUp(nav_delay);
	} else {
		$($button).css("background", "#dc6e55");
		$($button + "_l").slideDown(nav_delay);
	}
}

function scrollToElement($element) {
	if (!/Mobi/.test(navigator.userAgent)) {
		$("html, body").animate({
			scrollTop: $($element).offset().top
		}, scroll_delay);
	} else {
		$("html, body").scrollTop($($element).offset().top);
	}
}

function scrollToTop() {
	if (!/Mobi/.test(navigator.userAgent)) {
		$('html, body').animate({
			scrollTop: 0
		}, scroll_delay);
	} else {
		$("html, body").scrollTop(0);
	}
}

