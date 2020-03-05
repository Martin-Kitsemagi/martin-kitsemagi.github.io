function qualitiesSlider() {
    
    var qualities_slides = $("#qualities_slides");

    qualities_slides.current_slide = $(".qualities_slides_nav_active").index();

    qualities_slides.on("mousedown touchstart", function(event) {
        qualities_slides.is_mousedown = true;

        qualities_slides.x = event.clientX;
        qualities_slides.y = event.clientY;

        if (event.type === "touchstart") {
            qualities_slides.x = event.touches[0].clientX;
            qualities_slides.y = event.touches[0].clientY;
        }

        qualities_slides.slide_width = qualities_slides.outerWidth() / qualities_slides.find(".col-4").length;
    });

    $(document).on("mouseup touchend touchcancel", function() {
        qualities_slides.is_mousedown = false;

        if (qualities_slides.position().left !== (-qualities_slides.slide_width * qualities_slides.current_slide)) {
            qualities_slides.removeClass("qualities_slides_scroll");

            qualities_slides.css("transform", "translate3d(" + (-qualities_slides.slide_width * qualities_slides.current_slide) + "px, 0, 0)");
        }
    });

    $(document).on("mousemove touchmove", function(event) {
        if (qualities_slides.hasClass("qualities_slides_active") && qualities_slides.is_mousedown === true) {
            var x = event.clientX;
            var y = event.clientY;

            if (event.type === "touchmove") {
                x = event.touches[0].clientX;
                y = event.touches[0].clientY;
            }

            if (Math.abs(y - qualities_slides.y) < 10) {
                var qualities_slides_position_left = qualities_slides.position().left;
                var drag_speed = (x - qualities_slides.x) * 1.25;
                
                if (drag_speed < 0) {
                    if ((qualities_slides_position_left + qualities_slides.outerWidth() + drag_speed) > qualities_slides.slide_width) {
                        qualities_slides.css("transform", "translate3d(" + (qualities_slides_position_left + drag_speed) + "px, 0, 0)");
                    } else {
                        qualities_slides.css("transform", "translate3d(" + (qualities_slides.slide_width - qualities_slides.outerWidth()) + "px, 0, 0)");
                    }
                } else if (drag_speed > 0) {
                    if ((qualities_slides_position_left + drag_speed) < 0) {
                        qualities_slides.css("transform", "translate3d(" + (qualities_slides_position_left + drag_speed) + "px, 0, 0)");
                    } else {
                        qualities_slides.css("transform", "translate3d(0, 0, 0)");
                    }
                }

                var qualities_slides_scroll_index = Math.round(Math.abs(qualities_slides_position_left) / qualities_slides.slide_width);

                if (qualities_slides_scroll_index !== qualities_slides.current_slide) {
                    $(".qualities_slides_nav").removeClass("qualities_slides_nav_active");
                    $(".qualities_slides_nav").eq(qualities_slides_scroll_index).addClass("qualities_slides_nav_active");

                    qualities_slides.current_slide = qualities_slides_scroll_index;
                };

                qualities_slides.addClass("qualities_slides_scroll");
            }
            
            qualities_slides.x = x;
            qualities_slides.y = y;
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

function touchEventListeners() {
    $.event.special.touchstart = {
        setup: function(_, ns, handle) {
            if (ns.includes("noPreventDefault")) {
                this.addEventListener("touchstart", handle, {passive: false});
            } else {
                this.addEventListener("touchstart", handle, {passive: true});
            }
        }
    };
}

$(document).ready(function() {
    touchEventListeners();

    qualitiesSlider();
});
