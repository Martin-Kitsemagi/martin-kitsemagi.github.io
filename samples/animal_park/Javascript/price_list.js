
var table_active_zone = false;

var table_max_height = 500;
var table_min_height = 75;

$(window).scroll(function() {
	if ($(this).scrollTop() > ($("#price_list_table").offset().top - $(this).height())) {
		if (table_active_zone) return;
		if (!table_active_zone) table_active_zone = true;
		
		$("#price_list_table").css("max-height", table_max_height + "px");
	} else {
		if (!table_active_zone) return;
		if (table_active_zone) table_active_zone = false;

		$("#price_list_table").css("max-height", table_min_height + "px");
	}
});




