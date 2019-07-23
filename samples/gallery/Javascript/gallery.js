
var loadDelay = 250;
var transitionDelay = 150;
var fadeDelay = 75;
var dBottom = 20;
var bBottom = 85;
var dLeft = 70;
var bLeft = 75;

var image_wrappers = ["#gallery_img_0", "#gallery_img_1", "#gallery_img_2", "#gallery_img_3", "#gallery_img_4", "#gallery_img_5"];
var image_min_wrappers = ["#gallery_min_1", "#gallery_min_2", "#gallery_min_3"];
var images = ["ales-krivec-192941.jpg", "artem-sapegin-371573.jpg", "buzz-andersen-145254.jpg", "dave-robinson-2066.jpg",
			"dustin-scarpitti-1009.jpg", "eryk-fudala-129284.jpg", "jan-schulz-webdesigner-stuttgart-99749.jpg",
			"johannes-plenio-276383.jpg", "john-dancy-183276.jpg", "marc-wieland-86482.jpg", "nathan-anderson-111801.jpg",
			"neven-krcmarek-157763.jpg", "paul-earle-39322.jpg", "paul-morris-167780.jpg", "sam-ferrara-117219.jpg",
			"simon-hattinga-verschure-5238.jpg", "steven-diaz-182829.jpg"];

var first_el = image_wrappers[0];
var last_el = image_wrappers[image_wrappers.length - 1];
var stack_position = 0;

var locked = false;
var lockInterval;

//MIN
var load_n = 6;
var loaded = 0;

var state = 0;

var modifier = "";

$(document).ready(function() {
	$(window).on("resize", function() { 
		if (($(window).width() + 17) > 976 && state == 1) {
			layoutSwitch();
			setMinImages();
			
			state = 0;
		}
		
		if (($(window).width() + 17) < 976 && state == 0) {
			layoutSwitch();
			
			state = 1;
		}
	});
});

$(document).ready(function() {
	$("#gallery_nav_grid_button").on("click", function() {
		$("#gallery_wrapper").fadeOut(loadDelay);
		$("#gallery_min_wrapper").fadeIn(loadDelay);

		$("#gallery_nav_grid_button").css("background", "#EEEEEE");
		$("#gallery_nav_photo_button").css("background", "#FAFAFA");
	});
});

$(document).ready(function() {
	$("#gallery_nav_photo_button").on("click", function() {
		$("#gallery_wrapper").fadeIn(loadDelay);
		$("#gallery_min_wrapper").fadeOut(loadDelay);

		$("#gallery_nav_grid_button").css("background", "#FAFAFA");
		$("#gallery_nav_photo_button").css("background", "#EEEEEE");
	});
});

$(document).ready(function() {
	setPhotoImages();
	setMinImages();
	
	layoutSwitch();
});

$(document).ready(function() {
	$("#gallery_wrapper").mouseenter(function() {
		$("#gallery_next").fadeIn(transitionDelay);
		$("#gallery_previous").fadeIn(transitionDelay);
	});
});

$(document).ready(function() {
	$("#gallery_wrapper").mouseleave(function() {
		$("#gallery_next").fadeOut(transitionDelay);
		$("#gallery_previous").fadeOut(transitionDelay);
	});
});

$(document).ready(function() {
	$("#gallery_full").on("click", function() {
		$("#gallery_full").fadeOut(fadeDelay);
	});
});

function layoutSwitch() {
	if (($(window).width() + 17) > 976) {
		$("#gallery_nav_grid_button").click();
	} else if (($(window).width() + 17) <= 976) {
		$("#gallery_nav_grid_button").click();
	}
}

function zoomImage($image) {
	$("#gallery_full").fadeIn(fadeDelay);
	
	var image_name = $image.split("/");
	image_name = image_name[image_name.length - 1];

	$("#gallery_full").html("<img src='" + modifier + "Images/Gallery/" + image_name + "'>");
}

function setMinImages() {
	$("#gallery_min_load").css("display", "block");
	loaded = 0;
	for (var i = 0; i < image_min_wrappers.length; i++) {
		$(image_min_wrappers[i]).html("");
	}
	
	var counter = 0;
	
	outerloop: while (counter < load_n) {
		for (var i = 0; i < image_min_wrappers.length; i++) {
			if (counter > (load_n - 1)) break outerloop;
			if (counter > (images.length - 1)) {
				$("#gallery_min_load").css("display", "none");
				break outerloop;
			}
			
			var context = $(image_min_wrappers[i]).html();
			
			$(image_min_wrappers[i]).html(context + "<div><div style='background:url(" + modifier + "Images/Gallery_resized/" + images[counter] + ");" +
				"-webkit-background-size:100% 100%;-moz-background-size:100% 100%;-o-background-size:100% 100%;background-size:100% 100%;" +
				"' onclick=\"zoomImage('" + images[counter] + "')\"></div></div>");

			counter++;
		}
	}
	
	loaded = counter;
}

function loadMoreMinImages() {
	if (loaded >= images.length) return;
	
	var base = loaded;
	var counter = loaded;
	
	outerloop: while (counter < (base + load_n)) {
		for (var i = 0; i < image_min_wrappers.length; i++) {
			if (counter > (counter + load_n - 1)) break outerloop;
			if (counter > (images.length - 1)) {
				$("#gallery_min_load").css("display", "none");
				break outerloop;
			}
			
			var location = image_min_wrappers[i];
			
			if (($(window).width() + 17) < 976) location = image_min_wrappers[image_min_wrappers.length - 1];
			
			var context = $(location).html();
			
			$(location).html(context + "<div class='minImageFade' style='display:none'><div style='background:url(" + modifier + "Images/Gallery_resized/" + images[counter] + ");" +
				"-webkit-background-size:100% 100%;-moz-background-size:100% 100%;-o-background-size:100% 100%;background-size:100% 100%;" +
				"' onclick=\"zoomImage('" + images[counter] + "')\"></div></div>");
			
			counter++;
		}
	}
	
	$(".minImageFade").fadeIn(loadDelay);
	
	loaded = counter;
}

function setPhotoImages() {
	$(first_el).html("<img src=" + modifier + "Images/Gallery_resized/" + images[images.length - 1] + ">");
	
	for (var i = 1; i < image_wrappers.length; i++) {
		$(image_wrappers[i]).html("<div style='background:url(" + modifier + "Images/Gallery_resized/" + images[i - 1] + ");" +
			"-webkit-background-size:100% 100%;-moz-background-size:100% 100%;-o-background-size:100% 100%;background-size:100% 100%;" +
			"' onclick=\"zoomImage('" + images[i - 1] + "')\"></div>");
	}
}

function galleryNext() {
	if (locked) return;
	else locked = true;
	
	for (var i = 0; i < image_wrappers.length; i++) {
		var left = parseInt($(image_wrappers[i]).css("left").slice(0, -2));
		var bottom = parseInt($(image_wrappers[i]).css("bottom").slice(0, -2));
		var z = parseInt($(image_wrappers[i]).css("z-index"));
		
		if (image_wrappers[i] != first_el) {
			$(image_wrappers[i]).css("z-index", z + 1);
			
			if (image_wrappers[i] == last_el) {
				$(image_wrappers[i]).fadeIn(fadeDelay);
				
				$(image_wrappers[i]).css("left", (bLeft + ((image_wrappers.length - 3) * dLeft)) + "px");
				$(image_wrappers[i]).css("bottom", (bBottom + ((image_wrappers.length - 3) * dBottom)) + "px");
				continue;
			}
			
			$(image_wrappers[i]).css("left", (left - dLeft) + "px");
			$(image_wrappers[i]).css("bottom", (bottom - dBottom) + "px");
			
			if (left == bLeft) galleryPutLast(image_wrappers[i]);
		}
	}
}

function galleryPutLast($element) {
	$($element).fadeOut(fadeDelay);
	
	var last_left =  bLeft + ((image_wrappers.length - 2) * dLeft);
	var last_bottom = bBottom + ((image_wrappers.length - 2) * dBottom);
	
	$(first_el).html($($element).html());
	
	stack_position = (stack_position + 1) % (images.length);
	
	var new_index = (stack_position + (image_wrappers.length - 2)) % (images.length);
	if (new_index < 0) new_index = new_index + images.length;
	
	setTimeout(function() {
		$($element).css("left", last_left + "px");
		$($element).css("bottom", last_bottom + "px");
		$($element).css("z-index", "1");
		
		setTimeout(function() {
			$($element).html	("<div style='background:url(" + modifier + "Images/Gallery_resized/" + images[new_index] + ");" +
				"-webkit-background-size:100% 100%;-moz-background-size:100% 100%;-o-background-size:100% 100%;background-size:100% 100%;" +
				"' onclick=\"zoomImage('" + images[new_index] + "')\"></div>");
			last_el = $element;
			
			locked = false;
		}, transitionDelay);
	}, transitionDelay - fadeDelay);
}

function galleryPutFirst($element) {
	$($element).fadeOut(fadeDelay);
	
	$(last_el).html($($element).html());
	
	stack_position = (stack_position - 1) % (images.length);
	
	var new_index = (stack_position - 1) % (images.length);
	if (new_index < 0) new_index = new_index + (images.length);
	
	setTimeout(function() {
		$($element).css("left", (bLeft - dLeft) + "px");
		$($element).css("bottom", (bBottom - dBottom) + "px");
		$($element).css("z-index", image_wrappers.length);
		
		setTimeout(function() {
			$($element).html("<div style='background:url(" + modifier + "Images/Gallery_resized/" + images[new_index] + ");" +
				"-webkit-background-size:100% 100%;-moz-background-size:100% 100%;-o-background-size:100% 100%;background-size:100% 100%;" +
				"' onclick=\"zoomImage('" + images[new_index] + "')\"></div>");
			first_el = $element;
			
			locked = false;
		}, transitionDelay);
	}, transitionDelay - fadeDelay);
}

function galleryPrevious() {
	if (locked) return;
	else locked = true;
	
	for (var i = 0; i < image_wrappers.length; i++) {
		var left = parseInt($(image_wrappers[i]).css("left").slice(0, -2));
		var bottom = parseInt($(image_wrappers[i]).css("bottom").slice(0, -2));
		var z = parseInt($(image_wrappers[i]).css("z-index"));
		
		if (image_wrappers[i] != last_el) {
			$(image_wrappers[i]).css("z-index", z - 1);
			
			if (image_wrappers[i] == first_el) {
				$(image_wrappers[i]).fadeIn(fadeDelay);
				
				$(image_wrappers[i]).css("left", bLeft + "px");
				$(image_wrappers[i]).css("bottom", bBottom + "px");
				continue;
			}
			
			$(image_wrappers[i]).css("left", (left + dLeft) + "px");
			$(image_wrappers[i]).css("bottom", (bottom + dBottom) + "px");
			
			if (left == bLeft + ((image_wrappers.length - 3) * dLeft)) galleryPutFirst(image_wrappers[i]);
		}
	}
}
	
