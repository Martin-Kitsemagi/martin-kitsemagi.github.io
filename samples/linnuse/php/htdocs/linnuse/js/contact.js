function contactSubmit() {
    var contact_form_scroll_top = $("#contact_form_scroll_top");
    var contact_form = $("#contact_form");
    var contact_form_notification = contact_form.find("#contact_form_notification");

    function submitContactForm(form_values) {
        $.ajax({
            url: "php/ajax.php",
            type: "POST",
            data: form_values,
            dataType: "json",
            
            success: function(result) {
                updateNotification();

                if (result.notification_type === "success") {
                    contact_form_notification.addClass("panel_form_notification_success");
                    contact_form_notification.find(".panel_form_notification_icon").html("<i class=\"fas fa-check\"></i>");
                    
                    resetForm();
                } else if (result.notification_type === "error") {
                    contact_form_notification.addClass("panel_form_notification_error");
                }

                updateNotificationText(result.notification_text);
                scrollTo(contact_form_scroll_top.offset().top);
            }
        });
    }

    function resetForm() {
        contact_form[0].reset();
    
        contact_form.find(".panel_form_input_wrapper, .panel_form_textarea_wrapper").removeClass("panel_form_active");
    }

    function updateNotification() {
        contact_form_notification.addClass("panel_form_notification_opaque");
        contact_form_notification.removeClass("panel_form_notification_transparent panel_form_notification_error panel_form_notification_success");
    }

    function updateNotificationText(text) {
        contact_form_notification.find(".panel_form_notification_text").html(text);
    }

    contact_form.submit(function(event) {
        event.preventDefault();

        submitContactForm($(this).serialize());
    });
}

function contactSubmitParameter() {
    var contact_form_scroll_top = $("#contact_form_scroll_top");
    var contact_form = $("#contact_form");
    var contact_form_subject = contact_form.find("#contact_form_subject");

    var subject = getContactSubjectParameter();

    if (subject !== undefined) {
        contact_form_subject.val(subject);
        contact_form_subject.parent().addClass("panel_form_active");

        scrollTo(contact_form_scroll_top.offset().top);
    }

    function getContactSubjectParameter() {
        var url_parameters = window.location.search.substring(1);
        url_parameters = decodeURIComponent(url_parameters).split("&");
        
        for (var i = 0; i < url_parameters.length; i++) {
            var parameter_split = url_parameters[i].split("=");

            if (parameter_split.length === 2 && parameter_split[0] === "subject") {
                return parameter_split[1];
            }
        }
    }
}

$(document).ready(function() {
    contactSubmitParameter();
    contactSubmit();
});
