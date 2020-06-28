function feedbackSlider($) {
    var slider_interval = 7500;

    $(".feedback_slider_slides_wrapper").each(function() {
        var feedback_slider = $(this);
        var feedback_slider_slides = feedback_slider.find(".feedback_slider_slides_inner_wrapper");
        var feedback_slider_nav = feedback_slider.siblings(".feedback_slider_slides_nav_wrapper").first();
        var feedback_slider_slide_navs = feedback_slider_nav.find(".feedback_slider_slide_nav");

        feedback_slider.current_slide = 0;

        feedbackSliderSetInterval();

        function feedbackSliderSetInterval() {
            if (feedback_slider_slide_navs.length > 1) {
                feedback_slider.interval = setInterval(function() {
                    feedback_slider.current_slide++;

                    if (feedback_slider.current_slide >= feedback_slider_slide_navs.length) {
                        feedback_slider.current_slide = 0;
                    }

                    feedback_slider_slide_navs.eq(feedback_slider.current_slide).trigger("click");
                }, slider_interval);
            }
        }

        feedback_slider_slide_navs.on("click", function() {
            var slide_index = $(this).index();
            
            feedback_slider_slides.css("transform", "translate3d(" + -(slide_index / feedback_slider_slide_navs.length * 100) + "%, 0, 0)");
    
            feedback_slider_slide_navs.removeClass("feedback_slider_slide_nav_active");
            $(this).addClass("feedback_slider_slide_nav_active");
            
            feedback_slider.current_slide = slide_index;

            clearInterval(feedback_slider.interval);
            feedbackSliderSetInterval();
        });

        $(window).on("resize", function() {
            var min_height = 0;

            feedback_slider.find(".feedback_slider_slide").each(function() {
                if ($(this).outerHeight() > min_height) {
                    min_height = $(this).outerHeight();
                }
                
                feedback_slider.css("height", min_height + "px");
            });
        });
    });
}

jQuery(document).ready(function($) {
    feedbackSlider($);
});