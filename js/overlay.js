var page_overlay = document.getElementById("page_overlay");
var page_wrapper = document.getElementById("page_wrapper");

var page_wrapper_timeout_delay = 3750;

page_wrapper.onload = pageOverlay();

function pageOverlay() {
    if (window.sessionStorage.getItem("session") !== "active") {
        window.sessionStorage.setItem("session", "active");

        page_overlay.className = page_overlay.className + " page_overlay_active";
        page_wrapper.className = page_wrapper.className + " page_wrapper_animation_delay";

        setTimeout(function() {
            page_wrapper.className = "page_wrapper";
        }, page_wrapper_timeout_delay);
    }
}
