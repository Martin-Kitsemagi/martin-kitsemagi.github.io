function staffSlider() {
    var slides = $(".staff_slider").children(".staff_slide");
    var slides_count = slides.length;

    var slider_navs = $(".staff_slider_nav").children(".staff_slide_nav");

    if (slides_count > 0) {
        var current_slide_index = 0;
        var previous_slide_index;
        var slider_interval;
        var slider_interval_delay = 25000;

        updateSlidesClasses();
        updateSliderNavsClasses();
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

            updateSliderNavsClasses();
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

            updateSliderNavsClasses();
            setSliderInterval();
        }

        function slideTo(slide_index) {
            if (slide_index !== current_slide_index) {
                previous_slide_index = current_slide_index;
                current_slide_index = slide_index;

                updateSlidesClasses();

                if (slide_index > previous_slide_index) {
                    slideLeft();
                } else {
                    slideRight();
                }

                updateSliderNavsClasses();
                setSliderInterval();
            }
        }

        function updateSlidesClasses() {
            slides.removeClass("staff_slide_active staff_slide_left staff_slide_right staff_slide_previous staff_slide_next");
            slides.eq(current_slide_index).addClass("staff_slide_active");
        }

        function updateSliderNavsClasses() {
            slider_navs.removeClass("staff_slide_nav_active");
            slider_navs.eq(current_slide_index).addClass("staff_slide_nav_active");
        }

        function slideLeft() {
            slides.eq(previous_slide_index).addClass("staff_slide_left");

            slides.eq(current_slide_index).addClass("staff_slide_active");
            slides.eq(current_slide_index).addClass("staff_slide_next");
        }

        function slideRight() {
            slides.eq(previous_slide_index).addClass("staff_slide_right");

            slides.eq(current_slide_index).addClass("staff_slide_active");
            slides.eq(current_slide_index).addClass("staff_slide_previous");
        }

        function setSliderInterval() {
            clearInterval(slider_interval);

            slider_interval = setInterval(function() {
                nextSlide();
            }, slider_interval_delay);
        }

        $(".staff_slider_button_previous").on("click", function() {
            previousSlide();
        });

        $(".staff_slider_button_next").on("click", function() {
            nextSlide();
        });

        $(".staff_slide_nav").on("click", function() {
            slideTo($(this).index());
        });
    }
}

$(document).ready(function() {
    staffSlider();
});
