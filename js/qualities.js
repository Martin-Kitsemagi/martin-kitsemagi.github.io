function qualitiesSlider() {
    
    var qualities_slides = $("#qualities_slides");
    var qualities_slide_width = qualities_slides.outerWidth() / qualities_slides.find(".col-4").length;

    qualities_slides.current_slide = $(".qualities_slides_nav_active").index();

    qualities_slides.on("mousedown touchstart", function(event) {
        qualities_slides.is_mousedown = true;

        qualities_slides.x = event.clientX;

        if (event.type === "touchstart") {
            qualities_slides.x = event.touches[0].clientX;
        }
    });

    $(document).on("mouseup touchend touchcancel", function(event) {
        qualities_slides.is_mousedown = false;
    });

    $(document).on("mousemove touchmove", function(event) {
        if (qualities_slides.hasClass("qualities_slides_active") && qualities_slides.is_mousedown === true) {
            var x = event.clientX;

            if (event.type === "touchmove") {
                x = event.touches[0].clientX;
            }

            var qualities_slides_position_left = qualities_slides.position().left;
            var drag_speed = (x - qualities_slides.x) * 1.25;
            
            if (drag_speed < 0) {
                if ((qualities_slides_position_left + qualities_slides.outerWidth() + drag_speed) > qualities_slide_width) {
                    qualities_slides.css("transform", "translate3d(" + (qualities_slides_position_left + drag_speed) + "px, 0, 0)");
                } else {
                    qualities_slides.css("transform", "translate3d(" + (qualities_slide_width - qualities_slides.outerWidth()) + "px, 0, 0)");
                }
            } else if (drag_speed > 0) {
                if ((qualities_slides_position_left + drag_speed) < 0) {
                    qualities_slides.css("transform", "translate3d(" + (qualities_slides_position_left + drag_speed) + "px, 0, 0)");
                } else {
                    qualities_slides.css("transform", "translate3d(0, 0, 0)");
                }
            }

            var qualities_slides_scroll_index = Math.round(Math.abs(qualities_slides_position_left) / qualities_slide_width);

            if (qualities_slides_scroll_index !== qualities_slides.current_slide) {
                $(".qualities_slides_nav").removeClass("qualities_slides_nav_active");
                $(".qualities_slides_nav").eq(qualities_slides_scroll_index).addClass("qualities_slides_nav_active");

                qualities_slides.current_slide = qualities_slides_scroll_index;
            };

            qualities_slides.x = x;

            qualities_slides.addClass("qualities_slides_scroll");
        }
    });

    $(".qualities_slides_nav").on("click", function() {
        qualities_slides.removeClass("qualities_slides_scroll");

        $(".qualities_slides_nav").removeClass("qualities_slides_nav_active");
        $(this).addClass("qualities_slides_nav_active");

        qualities_slides.css("transform", "translate3d(" + (-qualities_slides.outerWidth() * ($(this).index() / qualities_slides.find(".col-4").length)) + "px, 0, 0)");

        qualities_slides.current_slide = $(this).index();
    });
}

$(document).ready(function() {
    qualitiesSlider();
});
