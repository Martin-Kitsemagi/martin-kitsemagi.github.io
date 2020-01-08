function samplesSelections() {
    var samples = $("#samples");
    var samples_selections = samples.find(".samples_selection");
    var samples_rows = samples.find(".samples_row");

    samples_selections.on("click", function() {
        samples_selections.removeClass("samples_selection_active");
        $(this).addClass("samples_selection_active");

        var selection_classes = $(this).attr("class").split(" ");

        for (var i = 0; i < selection_classes.length; i++) {
            var split = selection_classes[i].split("_");

            if (split.length > 1 && split[0] === "selection") {
                samples_rows.removeClass("samples_row_active");

                if (split[1] === "all") {
                    samples_rows.addClass("samples_row_active");
                } else {
                    samples.find(".selection_" + split[1]).addClass("samples_row_active");
                }

                break;
            }
        }
    });
}

$(document).ready(function() {
    samplesSelections();
});