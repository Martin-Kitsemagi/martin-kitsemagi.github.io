<?php
    if (!empty($_SERVER["HTTP_X_REQUESTED_WITH"]) && strtolower($_SERVER["HTTP_X_REQUESTED_WITH"]) == "xmlhttprequest") {
        if ($_SERVER["REQUEST_METHOD"] == "GET") {
            include_once(__DIR__ . "/../../../htdocs_includes/linnuse/php/menu_fetch.php");
            exit();
        }

        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            include_once(__DIR__ . "/../../../htdocs_includes/linnuse/php/contact.php");
            exit();
        }
    }
?>