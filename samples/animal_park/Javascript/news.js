
var slider_pos = 0;
var slider_delta = 1000;
var slider_max;

var slider_page = 1;
var slider_page_max = 3;
var slider_page_interval = null;
var slider_page_interval_timer = 10000;

var reset_slider = false;

var holiday_end = new Date("12/24/2017 10:0 AM");
var second = 1000;
var minute = second * 60;
var hour = minute * 60;
var day = hour * 24;
var countdown_interval;
var timer_lang;

$(document).ready(function() {
	slider_max = $("#news_l").width() - slider_delta;
	
	$("#news_bubble" + slider_page).css("background", "#FAFAFA");
	
	setInactivePageInterval();
});

$(window).on("resize", function() {
	if ($(window).width() < 1280) {
		if (reset_slider) {
			$("#news_l").css("left", "0px");
			
			if (slider_page_interval != null) {
				clearInterval(slider_page_interval);
				slider_page_interval = null;
			}
			
			reset_slider = false;
		}
	} else {
		if (!reset_slider) {
			switchNewsPage(1);
			
			slider_max = $("#news_l").width() - slider_delta;
			
			setInactivePageInterval();
			
			reset_slider = true;
		}
	}
});

$(document).ready(function() {
	$("#news_slider").on({
		mouseenter: function() {
			if (slider_page_interval != null) {
				clearInterval(slider_page_interval);
				slider_page_interval = null;
			}
		},
		mouseleave: function() {
			setInactivePageInterval();
		}
	});
});

$(document).ready(function() {
	$("#slider_btn_left").click(function() {
		if (slider_pos < 0 && slider_page > 1) {
			slider_pos += slider_delta;
			slider_page--;
			
			updateSlider();
		}
	});
});

$(document).ready(function() {
	$("#slider_btn_right").click(function() {
		if (slider_pos < slider_max && slider_page < slider_page_max) {
			slider_pos -= slider_delta;
			slider_page++;
			
			updateSlider();
		}
	});
});

function switchNewsPage(page) {
	if (page == slider_page || page < 1 || page > slider_page_max) return;
	
	if (page > slider_page) slider_pos -= slider_delta * (page - slider_page);
	else if (page < slider_page) slider_pos += slider_delta * (slider_page - page);
	
	slider_page = page;
	
	updateSlider();
}

function updateSlider() {
	if ($(window).width() < 1280) return;

	$("#news_l").css("left", slider_pos + "px");
	
	for (var i = 1; i <= slider_page_max; i++) {
		$("#news_bubble" + i).css("background", "transparent");
	}
	
	$("#news_bubble" + slider_page).css("background", "#FAFAFA");
	$("#news_slider_page").html(slider_page + "/" + slider_page_max);
}

function setInactivePageInterval() {
	if (slider_page_interval != null) return;
	
	slider_page_interval = setInterval(function() {
		var new_page = slider_page + 1;
		
		if (new_page > slider_page_max) new_page = 1;
		
		switchNewsPage(new_page);
	}, slider_page_interval_timer);
}

$(document).ready(function() {
	timerUpdate();
	
	countdown_interval = setInterval(function() {
		timerUpdate();
	}, 1000);
});

function timerUpdate() {
	var current_time = new Date();
	var time_left = holiday_end.getTime() - current_time.getTime();
	
	if (time_left < 0) {
		clearInterval(countdown_interval);
		$("#timer_active").css("display", "none");
		$("#timer_inactive").css("display", "block");
		
		return;
	}
	
	var days_left = Math.floor(time_left / day);
	var hours_left = Math.floor((time_left % day) / hour);
	var minutes_left = Math.floor((time_left % hour) / minute);
	var seconds_left = Math.floor((time_left % minute) / second);
	
	if (days_left < 10) days_left = "0" + days_left;
	if (hours_left < 10) hours_left = "0" + hours_left;
	if (minutes_left < 10) minutes_left = "0" + minutes_left;
	if (seconds_left < 10) seconds_left = "0" + seconds_left;
	
	if (timer_lang == "et")
		$("#countdown_timer").html("<b>Pühade sooduspakkumine kestab - </b>" +
			days_left + " Päeva " + hours_left + " Tundi " + minutes_left + " Minutit " + seconds_left + " Sekundit");
	else if (timer_lang == "en")
		$("#countdown_timer").html("<b>Holiday discount offer lasts for another - </b>" +
			days_left + " Days " + hours_left + " Hours " + minutes_left + " Minutes " + seconds_left + " Seconds");
}

function setTimerLang(language) {
	if (timer_lang == null) timer_lang = language;
}
