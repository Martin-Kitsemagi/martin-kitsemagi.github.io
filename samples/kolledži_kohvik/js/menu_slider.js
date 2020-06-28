function menuSlider($) {
    var slider_speed = 0.75;
    var fps = 60;

    $(".menu_slider_slides_wrapper").find(".menu_slider_slides_inner_wrapper").each(function() {
        var slides_wrapper = $(this);

        slidesWrapperSetInterval();

        function slidesWrapperSetInterval() {
            if (slides_wrapper.width > slides_wrapper.viewport_width) {
                if (slides_wrapper.slide_direction === undefined) {
                    slides_wrapper.slide_direction = -1;
                }

                slides_wrapper.interval = setInterval(function() {
                    var slides_wrapper_position_left = slides_wrapper.position().left;

                    if (slides_wrapper.slide_direction === -1 && (slides_wrapper_position_left + slides_wrapper.width) <= slides_wrapper.viewport_width) {
                        slides_wrapper.slide_direction = 1;
                    } else if (slides_wrapper.slide_direction === 1 && slides_wrapper_position_left >= 0) {
                        slides_wrapper.slide_direction = -1;
                    }

                    if (slides_wrapper.slide_direction === -1) {
                        slides_wrapper.css("transform", "translate3d(" + (slides_wrapper_position_left - slider_speed) + "px, 0, 0)");
                    } else if (slides_wrapper.slide_direction === 1) {
                        slides_wrapper.css("transform", "translate3d(" + (slides_wrapper_position_left + slider_speed) + "px, 0, 0)");
                    }

                }, 1000 / fps);
            }
        }

        slides_wrapper.on("mousedown touchstart", function(event) {
            if (slides_wrapper.interval !== undefined) {
                clearInterval(slides_wrapper.interval);
                slides_wrapper.interval = undefined;
            }

            slides_wrapper.is_mousedown = true;

            slides_wrapper.x = event.clientX;
            slides_wrapper.y = event.clientY;

            if (event.type === "touchstart") {
                slides_wrapper.x = event.touches[0].clientX;
                slides_wrapper.y = event.touches[0].clientY;
            }
        });

        $(document).on("mouseup touchend touchcancel", function(event) {
            if (slides_wrapper.interval === undefined) {
                slidesWrapperSetInterval();
            }

            slides_wrapper.is_mousedown = false;
        });

        $(document).on("mousemove touchmove", function(event) {
            if ((slides_wrapper.width > slides_wrapper.viewport_width) && slides_wrapper.is_mousedown === true) {
                var x = event.clientX;
                var y = event.clientY;

                if (event.type === "touchmove") {
                    x = event.touches[0].clientX;
                    y = event.touches[0].clientY;
                }

                var slides_wrapper_position_left = slides_wrapper.position().left;
                var drag_speed = x - slides_wrapper.x;

                if (drag_speed < 0) {
                    if ((slides_wrapper_position_left + slides_wrapper.width + drag_speed) > slides_wrapper.viewport_width) {
                        slides_wrapper.css("transform", "translate3d(" + (slides_wrapper_position_left + drag_speed) + "px, 0, 0)");
                    } else {
                        slides_wrapper.css("transform", "translate3d(" + (slides_wrapper.viewport_width - slides_wrapper.width) + "px, 0, 0)");
                    }
                } else if (drag_speed > 0) {
                    if ((slides_wrapper_position_left + drag_speed) < 0) {
                        slides_wrapper.css("transform", "translate3d(" + (slides_wrapper_position_left + drag_speed) + "px, 0, 0)");
                    } else {
                        slides_wrapper.css("transform", "translate3d(0, 0, 0)");
                    }
                }

                slides_wrapper.x = x;
                slides_wrapper.y = y;
            }
        });

        $(window).on("resize", function() {
            slides_wrapper.width = slides_wrapper.outerWidth();
            slides_wrapper.viewport_width = slides_wrapper.parent().outerWidth();

            if (slides_wrapper.width <= slides_wrapper.viewport_width) {
                if (slides_wrapper.interval !== undefined) {
                    clearInterval(slides_wrapper.interval);
                    slides_wrapper.interval = undefined;
                }

                slides_wrapper.css("transform", "translate3d(0, 0, 0)");
            } else {
                if (slides_wrapper.interval === undefined) {
                    slidesWrapperSetInterval();
                }
            }
        });

        $(document).on("scroll", function() {
            if (isSlidesWrapperInViewport()) {
                if (slides_wrapper.interval === undefined) {
                    slidesWrapperSetInterval();
                }
            } else {
                if (slides_wrapper.interval !== undefined) {
                    clearInterval(slides_wrapper.interval);
                    slides_wrapper.interval = undefined;
                }
            }

            function isSlidesWrapperInViewport() {
                var viewport_top = $(window).scrollTop();
                var viewport_bottom = viewport_top + $(window).height();
                var slides_wrapper_top = slides_wrapper.offset().top;
                var slides_wrapper_bottom = slides_wrapper_top + slides_wrapper.outerHeight();

                if (viewport_top > slides_wrapper_bottom || viewport_bottom < slides_wrapper_top) return false;
                
                return true;
            }
        });
    });
}

function menuSliderSetHeight($) {
    $(".menu_slider_slides_wrapper").each(function() {
        var min_height = 0;

        $(this).find(".menu_slider_slide").each(function() {
            if ($(this).outerHeight() > min_height) min_height = $(this).outerHeight();
        });

        $(this).css("height", min_height + "px");
    });
}

function menuSelectionsSlider($) {
    $(".menu_selections_wrapper").find(".menu_selections").each(function() {
        var menu_selection = $(this);
        var menu_selection_selections = menu_selection.find(".menu_selection");
        var menu_selection_nav = menu_selection.parents(".menu_top").siblings(".menu_top_nav").first();

        menu_selection.position_left = menu_selection.position().left;

        menu_selection.on("mousedown touchstart", function(event) {
            menu_selection.is_mousedown = true;
            menu_selection.scroll = false;

            menu_selection.x = event.clientX;
            menu_selection.y = event.clientY;

            if (event.type === "touchstart") {
                menu_selection.x = event.touches[0].clientX;
                menu_selection.y = event.touches[0].clientY;
            }
        });

        $(document).on("mouseup touchend touchcancel", function() {
            menu_selection.is_mousedown = false;

            menu_selection.removeClass("menu_selections_scroll");
        });

        $(document).on("mousemove touchmove", function(event) {
            if ((menu_selection.width > menu_selection.viewport_width) && menu_selection.is_mousedown === true) {
                var x = event.clientX;
                var y = event.clientY;
    
                if (event.type === "touchmove") {
                    x = event.touches[0].clientX;
                    y = event.touches[0].clientY;
                }
    
                var drag_speed = (x - menu_selection.x) * 1.25;
                
                if (drag_speed < 0) {
                    if ((menu_selection.position_left + menu_selection.width + drag_speed) > menu_selection.viewport_width) {
                        menu_selection.css("transform", "translate3d(" + (menu_selection.position_left + drag_speed) + "px, 0, 0)");

                        menu_selection_nav.find(".menu_top_nav_button").removeClass("menu_top_nav_button_no_select");
                    } else {
                        menu_selection.css("transform", "translate3d(" + (menu_selection.viewport_width - menu_selection.width) + "px, 0, 0)");

                        menu_selection_nav.find(".menu_top_nav_right").addClass("menu_top_nav_button_no_select");
                    }
                } else if (drag_speed > 0) {
                    if ((menu_selection.position_left + drag_speed) < 0) {
                        menu_selection.css("transform", "translate3d(" + (menu_selection.position_left + drag_speed) + "px, 0, 0)");

                        menu_selection_nav.find(".menu_top_nav_button").removeClass("menu_top_nav_button_no_select");
                    } else {
                        menu_selection.css("transform", "translate3d(0, 0, 0)");

                        menu_selection_nav.find(".menu_top_nav_left").addClass("menu_top_nav_button_no_select");
                    }
                }

                menu_selection.addClass("menu_selections_scroll");

                menu_selection.position_left = menu_selection.position().left;

                menu_selection.scroll = true;
                
                menu_selection.x = x;
                menu_selection.y = y;
            }
        });

        menu_selection_selections.on("click", function(event) {
            if (menu_selection.scroll === true) {
                event.stopImmediatePropagation();
            }
        });

        menu_selection_nav.find(".menu_top_nav_button").on("click", function() {
            if (menu_selection.width > menu_selection.viewport_width) {
                menu_selection_nav.find(".menu_top_nav_button").removeClass("menu_top_nav_button_no_select");
                menu_selection.removeClass("menu_selections_scroll");
                
                if ($(this).hasClass("menu_top_nav_right")) {
                    for (var i = 0; i < menu_selection_selections.length; i++) {
                        var selection_position_left = -menu_selection_selections.eq(i).position().left;
                        
                        if (selection_position_left < menu_selection.position_left) {
                            if (selection_position_left > (menu_selection.viewport_width - menu_selection.width)) {
                                menu_selection.css("transform", "translate3d(" + selection_position_left + "px, 0, 0)");

                                menu_selection.position_left = selection_position_left;
                            } else {
                                $(this).addClass("menu_top_nav_button_no_select");

                                menu_selection.css("transform", "translate3d(" + (menu_selection.viewport_width - menu_selection.width) + "px, 0, 0)");

                                menu_selection.position_left = menu_selection.viewport_width - menu_selection.width;
                            }

                            break;
                        }
                    }
                }

                if ($(this).hasClass("menu_top_nav_left")) {
                    for (var i = menu_selection_selections.length; i > 0; i--) {
                        var selection_position_left = -menu_selection_selections.eq(i - 1).position().left;
                        
                        if (selection_position_left > menu_selection.position_left) {
                            if (selection_position_left < 0) {
                                menu_selection.css("transform", "translate3d(" + selection_position_left + "px, 0, 0)");

                                menu_selection.position_left = selection_position_left;
                            } else {
                                $(this).addClass("menu_top_nav_button_no_select");

                                menu_selection.css("transform", "translate3d(0, 0, 0)");

                                menu_selection.position_left = 0;
                            }

                            break;
                        }
                    }
                }
            }
        });

        $(window).on("resize", function() {
            menu_selection.width = menu_selection.get(0).scrollWidth;
            menu_selection.viewport_width = menu_selection.parent().outerWidth();

            if (menu_selection.width <= menu_selection.viewport_width) {
                menu_selection_nav.find(".menu_top_nav_button").addClass("menu_top_nav_button_no_select");

                menu_selection.css("transform", "translate3d(0, 0, 0)");

                menu_selection.position_left = 0;
            } else {
                menu_selection_nav.find(".menu_top_nav_button").removeClass("menu_top_nav_button_no_select");

                if (menu_selection.position_left >= 0) {
                    menu_selection_nav.find(".menu_top_nav_left").addClass("menu_top_nav_button_no_select");
                }
            }
        });
    });
}

jQuery(document).ready(function($) {
    menuSlider($);
    menuSliderSetHeight($);
    menuSelectionsSlider($);
});