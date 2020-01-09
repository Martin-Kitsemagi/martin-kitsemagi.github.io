<?php
    include_once(__DIR__ . "/../database/variables/database_variables.php");
    
    $menu_db_types = array("main course", "soup", "salad", "dessert", "drink");
    $menu_types = array("Praed", "Supid", "Salatid", "Magustoidud", "Joogid");

    try {
        $db_connection = new PDO("mysql:host=" . $db_servername . ";dbname=" . $db_name . ";charset=utf8", $db_username, $db_password);
        $db_connection -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $db_connection -> prepare($MENU_GET_WHERE_TYPE);

        for ($i = 0; $i < count($menu_db_types); $i++) {
            $menu_db_type = $menu_db_types[$i];

            $stmt -> bindParam(":fetch_type", $menu_db_type, PDO::PARAM_STR);
            $stmt -> execute();
            
            $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
            if (count($result) > 0) {
                $n = 0;
                
                echo "<p class=\"menu_items_name\">" . $menu_types[$i] . "</p>";
                echo "<div class=\"menu_items\">";

                foreach ($result as $row) {
                    echo "<div class=\"menu_item\">
                        <div class=\"page_gallery_image\">
                            <div class=\"page_gallery_image_overlay\">
                                <span>Vaata Suurelt</span>
                            </div>
                            <img class=\"menu_item_image\" src=\"" . htmlspecialchars($row["image"], ENT_QUOTES) .
                                "\" alt=\"" . str_replace(" ", "_", ucfirst($menu_db_type)) . "_image_" . $n++ . "\">
                        </div>
                        <p class=\"menu_item_name\">" . htmlspecialchars($row["name"], ENT_QUOTES) . "</p>
                        <p class=\"menu_item_text panel_text\">" . htmlspecialchars($row["text"], ENT_QUOTES) . "</p>
                        <p class=\"menu_item_price\">" . htmlspecialchars($row["price"], ENT_QUOTES) . "&euro;</p>
                    </div>";
                }

                echo "</div>";
            }
        }
    } catch(PDOException $PDO_error) {
        //echo "Error: " . $PDO_error -> getMessage();
    }
?>
