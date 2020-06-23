function pageGallery($) {
    var page_gallery_nav = $(".page_gallery_nav");
    var images = [];
    var current_image_index = 0;

    function nextImage() {
        if (images.length > 1) {
            if ((current_image_index + 1) < images.length) {
                current_image_index++;
            } else {
                current_image_index = 0;
            }

            addImage(current_image_index);
        }
    }

    function previousImage() {
        if (images.length > 1) {
            if ((current_image_index - 1) < 0) {
                current_image_index = (images.length - 1);
            } else {
                current_image_index--;
            }

            addImage(current_image_index);
        }
    }

    function addImage(index) {
        if (images.length > index) {
            page_gallery_nav.find(".page_gallery_nav_name").html(
                images.eq(index).attr("data-name")
            );

            page_gallery_nav.find(".page_gallery_nav_image").html(
                "<img src=\"" + images.eq(index).attr("data-full") + "\" alt=\"gallery_nav_image\">"
            );

            updateText();
        }
    }

    function updateText() {
        page_gallery_nav.find(".page_gallery_nav_text").html((current_image_index + 1) + "/" + images.length);
    }

    $(document).on("click", ".page_gallery_image", function() {
        images = $(this).parents(".page_gallery").find(".page_gallery_image");
        current_image_index = images.index($(this));

        page_gallery_nav.removeClass("page_gallery_nav_transparent");
        page_gallery_nav.addClass("page_gallery_nav_opaque");

        addImage(current_image_index);
    });

    $(".page_gallery_nav_button_close, .page_gallery_nav_overlay").on("click", function() {
        page_gallery_nav.removeClass("page_gallery_nav_opaque");
        page_gallery_nav.addClass("page_gallery_nav_transparent");
    });

    $(".page_gallery_nav_button_next").on("click", function() {
        nextImage();
    });

    $(".page_gallery_nav_button_previous").on("click", function() {
        previousImage();
    });
}

jQuery(document).ready(function($) {
    pageGallery($);
});