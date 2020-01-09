<?php
    include_once(__DIR__ . "/../database/variables/database_variables.php");
    
    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        $fetch_type = htmlspecialchars($_GET["type"], ENT_QUOTES);
        $fetch_db_type = str_replace("_", " ", substr($fetch_type, 0, -1));

        $db_types = array("main course", "soup", "salad", "dessert", "drink");

        if (in_array($fetch_db_type, $db_types)) {
            try {
                $db_connection = new PDO("mysql:host=" . $db_servername . ";dbname=" . $db_name . ";charset=utf8", $db_username, $db_password);
                $db_connection -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $db_connection -> prepare($MENU_GET_WHERE_TYPE);
                $stmt -> bindParam(":fetch_type", $fetch_db_type, PDO::PARAM_STR);
                $stmt -> execute();
                
                $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
                if (count($result) > 0) {
                    $n = 0;

                    echo "<div class=\"menu_items fetched_" . $fetch_type . " page_gallery\">";

                    foreach ($result as $row) {
                        echo "<div class=\"menu_item\">
                            <div class=\"page_gallery_image\">
                                <div class=\"page_gallery_image_overlay\">
                                    <span>Vaata Suurelt</span>
                                </div>
                                <img class=\"menu_item_image\" src=\"" . htmlspecialchars($row["image"], ENT_QUOTES) . "\" alt=\"" . ucfirst($fetch_type) . "_image_" . $n++ . "\">
                            </div>
                            <p class=\"menu_item_name\">" . htmlspecialchars($row["name"], ENT_QUOTES) . "</p>
                            <p class=\"menu_item_text panel_text\">" . htmlspecialchars($row["text"], ENT_QUOTES) . "</p>
                            <p class=\"menu_item_price\">" . htmlspecialchars($row["price"], ENT_QUOTES) . "&euro;</p>
                        </div>";
                    }

                    echo "</div>";
                }
            } catch(PDOException $PDO_error) {
                //echo "Error: " . $PDO_error -> getMessage();
            }
        }
    }
?>
