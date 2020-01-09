<?php
    $first_name = "";
    $last_name = "";
    $email = "";
    $phone_number = "";
    $subject = "";
    $message = "";

    $to = "";
    $headers = "MIME-Version: 1.0" . "\r\n" . "Content-type:text/html;charset=UTF-8" . "\r\n";

    function check_input($input_value) {
        $input_value = trim($input_value);
        $input_value = stripslashes($input_value);
        $input_value = htmlspecialchars($input_value, ENT_QUOTES);

        return $input_value;
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $first_name = check_input($_POST["first_name"]);
        $last_name = check_input($_POST["last_name"]);
        $email = check_input($_POST["email"]);
        $phone_number = check_input($_POST["phone_number"]);
        $subject = check_input($_POST["subject"]);
        $message = check_input($_POST["message"]);

        if (empty($first_name) || empty($last_name) || empty($email) || empty($subject) || empty($message)) {
            exit(json_encode(array("notification_type" => "error", "notification_text" => "Üks või enam * märgitud välja on tühi")));
        }

        if (!preg_match("/^[a-zA-Z -]*$/", $first_name)) {
            exit(json_encode(array("notification_type" => "error", "notification_text" => "Eesnimi sisaldab keelatud sümboleid või numbreid. 
                Eesnimi võib sisaldada: suuri-, väikesi tähti, tühikuid ning \"-\""
            )));
        }

        if (!preg_match("/^[a-zA-Z -]*$/", $last_name)) {
            exit(json_encode(array("notification_type" => "error", "notification_text" => "Perekonnanimi sisaldab keelatud sümboleid või numbreid. 
                Perekonnanimi võib sisaldada: suuri-, väikesi tähti, tühikuid ning \"-\""
            )));
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            exit(json_encode(array("notification_type" => "error", "notification_text" => "Vale e-posti aadressi formaat")));
        }

        if (!empty($phone_number) && !preg_match("/^[0-9 -]*$/", $phone_number)) {
            exit(json_encode(array("notification_type" => "error", "notification_text" => "Telefoninumber sisaldab keelatud sümboleid või tähti. 
                Telefoninumber võib sisaldada: numbreid, tühikuid ning \"-\""
            )));
        }
        
        if (!empty($phone_number) && (count(preg_split("/\d/", $phone_number)) - 1) < 7) {
            exit(json_encode(array("notification_type" => "error", "notification_text" => "Telefoninumber sisaldab vähem kui 7 numbrit")));
        }
    }

    $message = $message . "\r\n" .
        "Saatja: " . $first_name . " " . $last_name . "\r\n" .
        "Saatja email: " . $email . "\r\n"
    ;

    if (!empty($phone_number)) {
        $message = $message .
            "Saatja telefoninumber: " . $phone_number . "\r\n";
    }

    $message = wordwrap($message, 70);

    //mail($to, $subject, $message, $headers);

    echo json_encode(array("notification_type" => "success", "notification_text" => "Teie sõnum on saadetud! Kena päeva jätku"));
?>
