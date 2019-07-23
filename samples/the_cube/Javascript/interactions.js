
$(document).ready(function() {
	$(".cube_interactive_front").on("click", function() {
		$(".cube_interactive").css({
			"-webkit-transform": "rotateY(225deg) rotateX(15deg) rotateZ(15deg)",
			"-moz-transform": "rotateY(225deg) rotateX(15deg) rotateZ(15deg)",
			"-o-transform": "rotateY(225deg) rotateX(15deg) rotateZ(15deg)",
			"-ms-transform": "rotateY(225deg) rotateX(15deg) rotateZ(15deg)",
			"transform": "rotateY(225deg) rotateX(15deg) rotateZ(15deg)"
		});
	});
	$(".cube_interactive_back").on("click", function() {
		$(".cube_interactive").css({
			"-webkit-transform": "rotateY(45deg) rotateX(-15deg) rotateZ(-15deg)",
			"-moz-transform": "rotateY(45deg) rotateX(-15deg) rotateZ(-15deg)",
			"-o-transform": "rotateY(45deg) rotateX(-15deg) rotateZ(-15deg)",
			"-ms-transform": "rotateY(45deg) rotateX(-15deg) rotateZ(-15deg)",
			"transform": "rotateY(45deg) rotateX(-15deg) rotateZ(-15deg)"
		});
	});
	$(".cube_interactive_top").on("click", function() {
		$(".cube_interactive").css({
			"-webkit-transform": "rotateY(135deg) rotateX(15deg) rotateZ(-285deg)",
			"-moz-transform": "rotateY(135deg) rotateX(15deg) rotateZ(-285deg)",
			"-o-transform": "rotateY(135deg) rotateX(15deg) rotateZ(-285deg)",
			"-ms-transform": "rotateY(135deg) rotateX(15deg) rotateZ(-285deg)",
			"transform": "rotateY(135deg) rotateX(15deg) rotateZ(-285deg)"
		});
	});
	$(".cube_interactive_bottom").on("click", function() {
		$(".cube_interactive").css({
			"-webkit-transform": "rotateY(135deg) rotateX(15deg) rotateZ(-105deg)",
			"-moz-transform": "rotateY(135deg) rotateX(15deg) rotateZ(-105deg)",
			"-o-transform": "rotateY(135deg) rotateX(15deg) rotateZ(-105deg)",
			"-ms-transform": "rotateY(135deg) rotateX(15deg) rotateZ(-105deg)",
			"transform": "rotateY(135deg) rotateX(15deg) rotateZ(-105deg)"
		});
	});
	$(".cube_interactive_left").on("click", function() {
		$(".cube_interactive").css({
			"-webkit-transform": "rotateY(315deg) rotateX(-15deg) rotateZ(15deg)",
			"-moz-transform": "rotateY(315deg) rotateX(-15deg) rotateZ(15deg)",
			"-o-transform": "rotateY(315deg) rotateX(-15deg) rotateZ(15deg)",
			"-ms-transform": "rotateY(315deg) rotateX(-15deg) rotateZ(15deg)",
			"transform": "rotateY(315deg) rotateX(-15deg) rotateZ(15deg)"
		});
	});
	$(".cube_interactive_right").on("click", function() {
		$(".cube_interactive").css({
			"-webkit-transform": "rotateY(135deg) rotateX(15deg) rotateZ(-15deg)",
			"-moz-transform": "rotateY(135deg) rotateX(15deg) rotateZ(-15deg)",
			"-o-transform": "rotateY(135deg) rotateX(15deg) rotateZ(-15deg)",
			"-ms-transform": "rotateY(135deg) rotateX(15deg) rotateZ(-15deg)",
			"transform": "rotateY(135deg) rotateX(15deg) rotateZ(-15deg)"
		});
	});
});

$(document).ready(function() {
	$(".sphere_interactive").on("click", function() {
		var state = $("#sphere_interactive_child").css("-webkit-animation-play-state") ||
		$("#sphere_interactive_child").css("-moz-animation-play-state") ||
		$("#sphere_interactive_child").css("-o-animation-play-state") ||
		$("#sphere_interactive_child").css("animation-play-state");
		
		if (state == "running")
			$("#sphere_interactive_child").css({
				"-webkit-animation-play-state": "paused",
				"-moz-animation-play-state": "paused",
				"-o-animation-play-state": "paused",
				"animation-play-state": "paused"
			});
		else 
			$("#sphere_interactive_child").css({
				"-webkit-animation-play-state": "running",
				"-moz-animation-play-state": "running",
				"-o-animation-play-state": "running",
				"animation-play-state": "running"
			});
	});
});

var page_stack_r = [8, 7, 6, 5, 4, 3, 2, 1];
var page_stack_l = [];

$(document).ready(function() {	
	$(".page").on("click", function() {
		var z = parseInt($(this).css("z-index"));
		
		if ($(this).hasClass("turn_page_left")) {
			if (page_stack_l.length <= 0 || z < page_stack_l[0]) return;
			
			if (page_stack_r.length > 0) {
				if (page_stack_r[0] >= z) z = page_stack_r[0] + 1;
				
				$(this).css("z-index", z);
			}
			
			page_stack_l.shift();
			page_stack_r.unshift(z);
			
			if (page_stack_l.length <= 0) {
				resetIndexes(page_stack_r);
			}
			
			$(this).removeClass("turn_page_left");
			$(this).addClass("turn_page_right");
			
			return;
		} else {
			if (page_stack_r.length <= 1 || z < page_stack_r[0]) return;

			if (page_stack_l.length > 0) {
				if (page_stack_l[0] >= z) z = page_stack_l[0] + 1;
				
				$(this).css("z-index", z);
			}
			
			page_stack_r.shift();
			page_stack_l.unshift(z);
			
			$(this).removeClass("turn_page_right");
			$(this).addClass("turn_page_left");
		}
	});
});

function resetIndexes(array) {
	var n = array.length;
	
	for (var i = 0; i < n; i++) {
		array[i] = n - i;
		
		$(".book_interactive_" + (n - i)).css("z-index", (n - i));
	}
}



