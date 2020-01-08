function menuItems() {
    var menu_selections = $("#menu_selections");
    var menu_items_wrapper = $("#menu_items_wrapper");

    function updateMenuSelections(fetch_class) {
        menu_selections.find(".menu_selection").removeClass("menu_selection_active");
        menu_selections.find(fetch_class).addClass("menu_selection_active");
    }

    function updateMenuItems(fetched_class) {
        menu_items_wrapper.find(".menu_items").removeClass("menu_items_active");
        menu_items_wrapper.find(fetched_class).addClass("menu_items_active");
    }

    $(".menu_selection").on("click", function() {
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
                updateMenuItems(".fetched_" + fetch_type);
                
                updateMenuSelections(".fetch_" + fetch_type);
            }
        }
    });

    menu_selections.find(".fetch_main_courses").trigger("click");
}

$(document).ready(function() {
    menuItems();
});
