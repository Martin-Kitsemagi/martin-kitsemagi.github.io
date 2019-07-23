
var popupHideMargin = -300;
var message_base_height = 0;

$(document).ready(function() {
	$("#contact_message").on("input", function() {
		if (message_base_height == 0) 
			message_base_height = $("#contact_message").outerHeight();
		
		if ($("#contact_message").prop("scrollHeight") >= message_base_height) {
			$("#contact_message").css("height", message_base_height + "px");
			
			if ($("#contact_message").prop("clientHeight") < $("#contact_message").prop("scrollHeight")) {
				$("#contact_message").css("height", $("#contact_message").prop("scrollHeight") + "px");
			}
		}
	});
});	

function onlyNumbers(event) {
	var key = event.which || event.keyCode;
	
	if ([48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 13, 8].indexOf(key) == -1) {
		event.preventDefault();
	}
}

function contactPopoutClose() {
	$("#contact_popout").css("bottom", popupHideMargin + "px");
}

function messageSuccess() {
	$("#contact_name").val("");
	$("#contact_email").val("");
	$("#contact_phone").val("");
	$("#contact_message").val("");
	
	$("#message_success").css("display", "inline-block");
	$("#message_fail").css("display", "none");
	
	$("#contact_popout").css("bottom", "0");
}

function messageFail() {
	$("#message_success").css("display", "none");
	$("#message_fail").css("display", "inline-block");
	
	$("#contact_popout").css("bottom", "0");
}