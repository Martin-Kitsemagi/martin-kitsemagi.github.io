
var nav_delay = 350;
var scroll_delay = 500;
var nav_fade_delay = 200;

var nav_active = false;
var search_active = false;

var video_playing = false;

$(document).ready(function() {
	$("#top_header_text").css("left", "10%");
	
	$("#top_media_f").css("margin-left", "0");
	$("#top_media_t").css("margin-left", "0");
	$("#top_media_i").css("margin-left", "0");
	$("#top_media_v").css("margin-left", "0");
	$("#top_media_y").css("margin-left", "0");
	
	$("#top_nav_search_button").css("width", $("#top_nav_search_button").height() + "px");
	
	if ($(window).width() > 1280) {
		videoPlay();
	}
});

$(document).ready(function() {
	$("#top_nav_wrapper").on({
		mouseenter: function() {
			if ($("#top_header_video").css("display") == "block") {
				$("#top_header_video").css("-webkit-filter", "blur(10px)");
				$("#top_header_video").css("-moz-filter", "blur(10px)");
				$("#top_header_video").css("-ms-filter", "blur(10px)");
				$("#top_header_video").css("-o-filter", "blur(10px)");
				$("#top_header_video").css("filter", "blur(10px)");
			}
		},
		mouseleave: function() {
			if ($("#top_header_video").css("display") == "block") {
				$("#top_header_video").css("-webkit-filter", "blur(0px)");
				$("#top_header_video").css("-moz-filter", "blur(0px)");
				$("#top_header_video").css("-ms-filter", "blur(0px)");
				$("#top_header_video").css("-o-filter", "blur(0px)");
				$("#top_header_video").css("filter", "blur(0px)");
			}
		}
	});
});

$(document).ready(function() {
	$(".top_nav_side_button").click(function() {
		toggleNavSide(".top_nav_side_button");
	});
});

$(document).ready(function() {
	$("#top_nav_search_button").click(function() {
		toggleSearch();
	});
});

function videoPlay() {
	if (video_playing) return;
	
	document.getElementById("top_header_video").play();
	
	video_playing = true;
}

function videoPause() {
	if (!video_playing) return;
	
	document.getElementById("top_header_video").pause();
	
	video_playing = false;
}

$(document).ready(function() {
	$("#top_nav_side_cover").click(function() {
		$("#top_nav_side_cover").fadeOut(nav_fade_delay);
		toggleNavSide(".top_nav_side_button");
	});
});

$(window).on("resize", function() {
	if ($(window).width() < 1280) {
		$("#top_nav_wrapper").css("width", "100%");
		$("#top_nav_wrapper").css("height", "50px");
		$("#top_nav_wrapper").css("position", "fixed");
		$("#top_nav_wrapper").css("top", "0");
		
		$("#top_nav_wrapper").css("line-height", "50px");
		
		$("#top_nav_search_button").css("width", "50px");
		
		videoPause();
	} else {
		videoPlay();
	}
});


$(window).scroll(function() {
	if ($(this).scrollTop() > $("#top_header_wrapper").height()) {
		$("#top_header_text").css("left", "-100%");
		
		$("#top_media_f").css("margin-left", "500%");
		$("#top_media_t").css("margin-left", "500%");
		$("#top_media_i").css("margin-left", "500%");
		$("#top_media_v").css("margin-left", "500%");
		$("#top_media_y").css("margin-left", "500%");
	}
	
	if ($(this).scrollTop() < $("#top_header_text").offset().top) {
		$("#top_header_text").css("left", "10%");
	}
	
	if ($(this).scrollTop() < $("#top_header_media").offset().top) {
		$("#top_media_f").css("margin-left", "0");
		$("#top_media_t").css("margin-left", "0");
		$("#top_media_i").css("margin-left", "0");
		$("#top_media_v").css("margin-left", "0");
		$("#top_media_y").css("margin-left", "0");
	}
	
	if ($(this).scrollTop() > 0 && $(this).width() >= 1280) {
		$("#top_nav_wrapper").css("width", "100%");
		$("#top_nav_wrapper").css("height", "50px");
		$("#top_nav_wrapper").css("position", "fixed");
		$("#top_nav_wrapper").css("top", "0");
		
		$("#top_nav_wrapper").css("line-height", "50px");
		
		$("#top_nav_search_button").css("width", "50px");
		
		if ($(this).scrollTop() > $("#top_header_wrapper").height()) videoPause();
		else videoPlay();
		
	} else if ($(this).scrollTop() <= 0 && $(this).width() >= 1280) {
		$("#top_nav_wrapper").css("width", "1280px");
		$("#top_nav_wrapper").css("height", "75px");
		$("#top_nav_wrapper").css("position", "absolute");
		$("#top_nav_wrapper").css("top", "100px");
		
		$("#top_nav_wrapper").css("line-height", "75px");
		
		$("#top_nav_search_button").css("width", "75px");
	}
});

function changePageLanguage(url) {
	window.location.href = url;
}

function toggleNavSide($button) {
	if (nav_active) {
		$("#top_nav_side_cover").fadeOut(nav_fade_delay);
	} else {
		$("#top_nav_side_cover").fadeIn(nav_fade_delay);
	}
	
	nav_active = !nav_active;
	
	$("#top_nav_side_wrapper").animate({width: "toggle"}, nav_delay);
}

function toggleSearch() {
	if (search_active) {
		$("#top_nav_search_button").css("background", "transparent");
		$("#top_nav_search_button_i").css("color", "#1a1a1a");
		
		$("#top_nav_search_wrapper").slideUp(nav_delay);
	} else {
		$("#top_nav_search_button").css("background", "#f05e5c");
		$("#top_nav_search_button_i").css("color", "#FAFAFA");
		
		$("#top_nav_search_wrapper").slideDown(nav_delay);
	}
	
	search_active = !search_active;
}

function scrollToElement($element) {
	if (!/Mobi/.test(navigator.userAgent)) {
		$("html, body").animate({
			scrollTop: $($element).offset().top
		}, scroll_delay);
	} else {
		$("html, body").scrollTop($($element).offset().top);
	}
	
	if (nav_active) toggleNavSide(".top_nav_side_button");
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

