function servicesLargeScrollIndexParameter() {
    var services_large = $("#services_large");
    var services_types = services_large.find(".services_types").find(".services_type");
    var services_types_count = services_types.length;
    
    var service_index = getServicesLargeScrollIndexParameter();

    if (service_index !== undefined) {
        if (services_types_count > 0 && service_index >= 0 && service_index < services_types_count) {
            var service = services_types.eq(service_index);
        
            scrollTo(service.offset().top);
        }
    }

    function getServicesLargeScrollIndexParameter() {
        var url_parameters = window.location.search.substring(1);
        url_parameters = decodeURIComponent(url_parameters).split("&");
        
        for (var i = 0; i < url_parameters.length; i++) {
            var parameter_split = url_parameters[i].split("=");

            if (parameter_split.length === 2 && parameter_split[0] === "scroll_index") {
                if (!isNaN(parameter_split[1])) {
                    return parameter_split[1];
                }
            }
        }
    }
}

$(document).ready(function() {
    servicesLargeScrollIndexParameter();
});
