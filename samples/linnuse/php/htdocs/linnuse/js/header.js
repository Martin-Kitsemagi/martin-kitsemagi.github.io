function headerSlider() {
    var slides = $(".header_slides").children(".header_slide");
    var slides_count = slides.length;

    if (slides_count > 0) {
        var current_slide_index = 0;
        var previous_slide_index;
        var slider_interval;
        var slider_interval_delay = 7000;

        updateSlidesClasses();
        updateSliderText();
        setSliderInterval();

        function nextSlide() {
            previous_slide_index = current_slide_index;

            if ((current_slide_index + 1) < slides_count) {
                current_slide_index++;
            } else {
                current_slide_index = 0;
            }
            
            updateSlidesClasses();
            slideLeft();

            updateSliderText();
            setSliderInterval();
        }

        function previousSlide() {
            previous_slide_index = current_slide_index;

            if ((current_slide_index - 1) < 0) {
                current_slide_index = (slides_count - 1);
            } else {
                current_slide_index--;
            }

            updateSlidesClasses();
            slideRight();

            updateSliderText();
            setSliderInterval();
        }

        function updateSliderText() {
            $(".header_slider_text").html(((current_slide_index + 1) < 10) ? "0" + (current_slide_index + 1) : (current_slide_index + 1));
            $(".header_slider_nav_text").html((current_slide_index + 1) + "/" + slides_count);
        }

        function updateSlidesClasses() {
            slides.removeClass("header_slide_active header_slide_left header_slide_right header_slide_previous header_slide_next");
            slides.eq(current_slide_index).addClass("header_slide_active");
        }

        function slideLeft() {
            slides.eq(previous_slide_index).addClass("header_slide_left");

            slides.eq(current_slide_index).addClass("header_slide_active");
            slides.eq(current_slide_index).addClass("header_slide_next");
        }

        function slideRight() {
            slides.eq(previous_slide_index).addClass("header_slide_right");

            slides.eq(current_slide_index).addClass("header_slide_active");
            slides.eq(current_slide_index).addClass("header_slide_previous");
        }

        function setSliderInterval() {
            clearInterval(slider_interval);

            slider_interval = setInterval(function() {
                nextSlide();
            }, slider_interval_delay);
        }

        $(".header_slider_button_previous").on("click", function() {
            previousSlide();
        });

        $(".header_slider_button_next").on("click", function() {
            nextSlide();
        });
    }
}

$(document).ready(function() {
    headerSlider();
});
