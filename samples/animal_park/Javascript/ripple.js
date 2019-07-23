
var button_timer;
var button_animation_time = 325;
var explode_scale = 0.8;

var button_hold_interval = null;

$(document).ready(function() {
	$(".ripple_effect").on("mousedown", function(event) {
		var posX = $(this).offset().left;
		var posY = $(this).offset().top;
		var buttonWidth = $(this).width();
		var buttonHeight = $(this).height();
		
		if ($(this).prev().is("span")) {
			if ($(this).find("i")) {
				$(this).find("i").prepend("<div class='ripple'></div>");
			} else {
				$(this).prepend("<div class='ripple'></div>");
			}
		} else $(this).prepend("<span class='ripple'></span>");

		if (buttonWidth >= buttonHeight) {
			buttonHeight = buttonWidth;
		} else {
			buttonWidth = buttonHeight; 
		}

		var x = event.pageX - posX - (buttonWidth / 2);
		var y = event.pageY - posY - (buttonHeight / 2);

		$(".ripple").css({
			width: buttonWidth,
			height: buttonHeight,
			top: y + "px",
			left: x + "px"
		}).addClass("rippleExpandEffect");
		
		button_timer = new Date().getTime();
		
		if (button_hold_interval == null) {
			button_hold_interval = setInterval(function() {
				if (new Date().getTime() - button_timer >= button_animation_time) {
					if ($(".ripple").is(".rippleExpandEffect")) $(".ripple").removeClass("rippleExpandEffect");
					
					$(".ripple").addClass("rippleShrinkEffect");
					
					removeInterval();
				}
			}, button_animation_time);
		}
	});
});

function removeInterval() {
	if (button_hold_interval == null) return;
	
	clearInterval(button_hold_interval);
	button_hold_interval = null;
}

function removeRipple() {
	removeInterval();

	if ($(".ripple").is(".rippleExpandEffect") || $(".ripple").is(".rippleShrinkEffect")) {
		if ($(".ripple").is(".rippleExpandEffect")) $(".ripple").removeClass("rippleExpandEffect");
		if ($(".ripple").is(".rippleShrinkEffect")) $(".ripple").removeClass("rippleShrinkEffect");
		
		var animation_scale = 0;
		var time_elapsed = new Date().getTime() - button_timer;
		
		if (time_elapsed >= button_animation_time) animation_scale = explode_scale;
		else animation_scale = (time_elapsed / button_animation_time) * explode_scale;
		
		$(".ripple").css("transform", "scale(" + animation_scale +")");

		$(".ripple").addClass("rippleExplodeEffect");
		
		setTimeout(function() {
			$(".ripple").remove();
		}, button_animation_time - 100);
	}
}

$(document).ready(function() {
	$(".ripple_effect").on("mouseup", function() {
		removeRipple();
		$(this).blur();
	});
});

$(document).ready(function() {
	$(".ripple_effect").on("mouseleave", function() {
		removeRipple();
		$(this).blur();
	});
});


