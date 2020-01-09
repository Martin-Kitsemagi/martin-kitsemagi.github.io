<?php
    $current_page = basename(htmlspecialchars($_SERVER["PHP_SELF"], ENT_QUOTES));

    if ($current_page == "menüü.php") {
        echo "<div class=\"menu_page_header page_header\">
            <div class=\"page_header_background\">
                <h2 class=\"panel_title_large\">Menüü</h2>
            </div>
        </div>";
    }
?>
<div id="menu" class="menu panel">
    <div class="panel_row panel_row_column">

        <?php
            if ($current_page == "index.php") {
                echo "<h2 class=\"panel_title_large\">Menüü</h2>";

                echo "<div id=\"menu_selections\" class=\"menu_selections no_text_select\">
                        <div class=\"menu_selection fetch_main_courses\">Praed</div>
                        <div class=\"menu_selection fetch_soups\">Supid</div>
                        <div class=\"menu_selection fetch_salads\">Salatid</div>
                        <div class=\"menu_selection fetch_desserts\">Magustoidud</div>
                        <div class=\"menu_selection fetch_drinks\">Joogid</div>
                    </div>

                    <div id=\"menu_items_wrapper\" class=\"menu_items_wrapper\">
                </div>";
            } elseif ($current_page == "menüü.php") {
                echo "<div class=\"menu_items_wrapper page_gallery\">";

                include_once(__DIR__ . "/../../../htdocs_includes/linnuse/php/menu_large_fetch.php");
                
                echo "</div>";
            }
        ?>
    </div>
</div>
