function menuItems($) {
    var menu_selections = $(".menu_selections");
    var menu_items_wrapper = $(".menu_items_wrapper");
    var menu_items_loading = $(".menu_items_loading");
    
    var menu_items_fetched = [];

    var menu_items_animation_delay = 50;

    function updateMenuSelections(fetch_class) {
        menu_selections.find(".menu_selection").removeClass("menu_selection_active");
        menu_selections.find(fetch_class).addClass("menu_selection_active");

        menu_selections.parents(".menu_top").find(".menu_selections_name").html(menu_selections.find(fetch_class).attr("data-selection-name"));
    }

    function updateMenuItems(fetched_class) {
        menu_items_wrapper.find(".menu_items").removeClass("menu_items_active");
        menu_items_wrapper.find(fetched_class).addClass("menu_items_active");

        menu_items_wrapper.find(fetched_class).find(".menu_item").each(function() {
            $(this).css("animation-delay", ($(this).index() * menu_items_animation_delay) + "ms");
        });
    }

    menu_selections.find(".menu_selection").on("click", function() {
        var classes = $(this).attr("class").split(" ");
		var fetch_type;
        
        if (!$(this).hasClass("menu_selection_active")) {
            for (var i = 0; i < classes.length; i++) {
                var split = classes[i].split("_");

                if (split[0] === "fetch") {
                    split.shift();
                    fetch_type = split.join("_");

                    break;
                }
            }
            
            if (fetch_type !== undefined) {
		updateMenuSelections(".fetch_" + fetch_type);    
		
		for (var i = 0; i < menu_items_fetched.length; i++) {
			if (menu_items_fetched[i] == ".fetched_" + fetch_type) {
				updateMenuItems(".fetched_" + fetch_type);
				return;
			}
		}

		menu_items_loading.removeClass("panel_loading_transparent");
		menu_items_loading.html("<div class=\"panel_loading_animation\">Laeb</div>");

		menu_items_wrapper.find(".menu_items").removeClass("menu_items_active");

		setTimeout(function() {
			menu_items_loading.addClass("panel_loading_transparent");

			updateMenuItems(".fetched_" + fetch_type);
		}, 325);

		menu_items_fetched.push(".fetched_" + fetch_type);
            }
        }
    });

    menu_items_fetched.push(".fetched_pizzas");
    menu_selections.find(".fetch_pizzas").trigger("click");
}

jQuery(document).ready(function($) {
    menuItems($);
});
