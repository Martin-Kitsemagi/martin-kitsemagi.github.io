<div class="gallery panel">
    <div class="panel_row panel_row_column">
        <h2 class="panel_title_large">Galerii</h2>

        <div class="gallery_images page_gallery">
            <?php
                $dir_path = __DIR__ . "/../../../htdocs/linnuse/images/small/";
                $image_path = "images/small/";

                $image_columns = 4;
                $images = array();

                if (is_dir($dir_path)) {
                    if ($dir = opendir($dir_path)) {
                        while (($file = readdir($dir)) !== false) {
                            $file_extension = htmlspecialchars(pathinfo($file, PATHINFO_EXTENSION), ENT_QUOTES);
                            $file_basename = htmlspecialchars(pathinfo($file, PATHINFO_BASENAME), ENT_QUOTES);
                            
                            if ($file_extension === "jpg") {
                                array_push($images, $file_basename);
                            }
                        }
                    }
                }

                $images_count = count($images);

                if ($images_count > 0) {
                    $total_columns = 1;
                    $images_per_column = 1;
                    $image_index = 0;

                    if (($images_count / $image_columns) > 1) {
                        $total_columns = $image_columns;

                        $images_per_column = round($images_count / $image_columns);
                    } else {
                        $total_columns = $images_count;
                    }

                    for ($i = 0; $i < $total_columns; $i++) {
                        echo "<div class=\"gallery_images_column\">";
                        
                        if ($i == ($total_columns - 1)) {
                            $images_per_column = $images_count - (($total_columns - 1) * $images_per_column);
                        }

                        for ($j = 0; $j < $images_per_column; $j++) {
                            $image_index = (($total_columns - 1) * $i) + $j;

                            echo "<div class=\"gallery_image\">
                                <div class=\"page_gallery_image\">
                                    <div class=\"page_gallery_image_overlay\">
                                        <span>Vaata Suurelt</span>
                                    </div>
                                    <img src=\"" . $image_path . $images[$image_index] . "\" alt=\"Gallery_image_" . ($image_index + 1) . "\">
                                </div>
                            </div>";
                        }

                        echo "</div>";
                    }
                }
            ?>
        </div>
    </div>
</div>
