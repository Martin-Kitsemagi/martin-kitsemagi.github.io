function windowResizeListener($) {
	$(window).on("resize", function() {
        textareaResize($("textarea"));
        setHeaderHeight();
	});
	
	$(document).ready(function() {
		$(window).trigger("resize");
    });
}

function mobileNav($) {
    var clickable_area_width_percentage = 25;

    $("#page").on("click", function(event) {
        if ($(".main-header-bar-navigation").hasClass("toggle-on")) {
            if (event.pageX <= $(window).outerWidth() * clickable_area_width_percentage / 100) {
                $(".main-header-bar-navigation").removeClass("toggle-on");
                $("body").removeClass("ast-main-header-nav-open");
                $(".menu-toggle").removeClass("toggled");
            }
        }
    });
}

function wpForms($) {
    var wp_forms = $(".wpforms-form");

    wpFormsSubmitAddIcon();
    wpFromsInputOnFocus();
    wpFormsTextareaOnInput();

    function wpFormsSubmitAddIcon() {
        wp_forms.find(".wpforms-submit").each(function() {
            $(this).html(
                $(this).html() + "<i aria-hidden=\"true\" class=\"fas fa-paper-plane\"></i>"
            );
        });
    }

    function wpFromsInputOnFocus() {
        wp_forms.find("input, textarea").on("focus", function() {
            $(this).parent().addClass("label_active");
        });

        wp_forms.find("input, textarea").on("focusout", function() {
            if ($(this).val() === "") {
                $(this).parent().removeClass("label_active");
            }
        });
    }

    function wpFormsTextareaOnInput() {
        wp_forms.find("textarea").on("input change", function() {
            textareaResize($(this));
        });
    }
}

function wpFormsOnSubmit(form) {
    form.parent().parent().html(
        "<div class=\"wpforms-confirmation-container wpforms-confirmation-scroll\" id=\"wpforms-confirmation-397\"><p>Teie sõnum on edukalt saadetud! Kena päeva jätku.</p></div>"
    );
}

function textareaResize(textarea) {
	textarea.css("height", "auto");
	textarea.css("height", textarea.prop("scrollHeight"));
}

function setHeaderHeight() {
	var viewport_height = $(window).outerHeight();

	if (/Mobi/.test(navigator.userAgent)) {
		viewport_height = $(".header").outerHeight();
	}

	$(".header").css("height", viewport_height);
}

jQuery(document).ready(function($) {
    windowResizeListener($);

    mobileNav($);
    wpForms($);
});