
var cover_fade_delay = 200;
var species_animation_delay = 1000;

var plant_species = 85;
var bird_species = 60;
var animal_species = 35;
var mushroom_species = 25;

var active_zone = false;

var foreign_lang = false;

$(window).scroll(function() {
	if ($(this).scrollTop() > ($("#park_species_wrapper").offset().top - $(this).height())) {
		if (active_zone) return;
		if (!active_zone) active_zone = true;
		
		$("#plant_species").css("width", plant_species + "%");
		$("#bird_species").css("width", bird_species + "%");
		$("#animal_species").css("width", animal_species + "%");
		$("#mushroom_species").css("width", mushroom_species + "%");
		
		animateSpeciesValue("#plant_species", plant_species);
		animateSpeciesValue("#bird_species", bird_species);
		animateSpeciesValue("#animal_species", animal_species);
		animateSpeciesValue("#mushroom_species", mushroom_species);
	} else {
		if (!active_zone) return;
		if (active_zone) active_zone = false;
		
		$("#plant_species").css("width", "0%");
		$("#bird_species").css("width", "0%");
		$("#animal_species").css("width", "0%");
		$("#mushroom_species").css("width", "0%");
	}
});

$(document).ready(function() {
	$(".park_gallery_i").click(function() {
		var img_url = $(this).css("background-image");
		var str_split = img_url.replace("\")", "").split("/");
		img_url = str_split[str_split.length - 1];
		
		
		if (!foreign_lang) $("#image_zoom_cover").html("<img src='Images/Zoom_Images/" + img_url + "' />");
		else $("#image_zoom_cover").html("<img src='../Images/Zoom_Images/" + img_url + "' />");
		$("#image_zoom_cover").fadeIn(cover_fade_delay);
	});
});

$(document).ready(function() {
	$("#image_zoom_cover").click(function() {
		$("#image_zoom_cover").fadeOut(cover_fade_delay);
	});
});

function animateSpeciesValue(id, value) {
	var start = Math.floor(parseInt($(id).css("width").replace("%", "")) / $("#park_species_wrapper").width() * 100);
	
	var valueInterval = setInterval(function() {
		start++;
		$(id + "_v").html(start);
		
		if (start >= value) {
			clearInterval(valueInterval);
			return;
		}
	}, species_animation_delay / value);
}




