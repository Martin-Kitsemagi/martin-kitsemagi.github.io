<?php
    $current_page = basename(htmlspecialchars($_SERVER["PHP_SELF"], ENT_QUOTES));
?>
<div class="about_us panel">
    <div class="panel_row">
        <div class="about_us_text panel_column">
            <h2 class="panel_title">Meist</h2>

            <?php

                if ($current_page == "index.php") {
                    echo "<p class=\"panel_text\">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse tincidunt erat ac mauris elementum sollicitudin.
                        Sed mattis mi et ante convallis, sed blandit quam auctor.
                        Vivamus vel eros ante. Quisque cursus diam est, pretium congue felis ornare ut.
                        Sed tincidunt venenatis ex, sit amet consectetur nunc sagittis non.
                        Cras pharetra non ex vitae condimentum.
                        <br><br>
                        Proin eu hendrerit massa. Nulla vitae sagittis mi.
                        Ut sed interdum ex, a laoreet lorem.
                        Duis aliquam justo sit amet nulla fringilla, sit amet congue metus lobortis.
                        In aliquam justo lacus, in gravida nunc congue vitae.
                        Praesent sed eleifend leo, a faucibus justo. Quisque sit amet maximus nisi.
                        In eget massa commodo, cursus eros ultrices, gravida ex.
                        Suspendisse id facilisis erat. Etiam auctor accumsan ultricies.
                        Sed semper, tellus at bibendum aliquet, leo diam facilisis ex, quis posuere dolor orci non orci.
                    </p>
                    <a class=\"panel_text_link\" href=\"meist\">Loe Rohkem</a>";
                } elseif ($current_page == "meist.php") {
                    echo "<p class=\"panel_text\">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse tincidunt erat ac mauris elementum sollicitudin.
                        Sed mattis mi et ante convallis, sed blandit quam auctor.
                        Vivamus vel eros ante. Quisque cursus diam est, pretium congue felis ornare ut.
                        Sed tincidunt venenatis ex, sit amet consectetur nunc sagittis non.
                        Cras pharetra non ex vitae condimentum.
                        <br><br>
                        Proin eu hendrerit massa. Nulla vitae sagittis mi.
                        Ut sed interdum ex, a laoreet lorem.
                        Duis aliquam justo sit amet nulla fringilla, sit amet congue metus lobortis.
                        In aliquam justo lacus, in gravida nunc congue vitae.
                        Praesent sed eleifend leo, a faucibus justo. Quisque sit amet maximus nisi.
                        In eget massa commodo, cursus eros ultrices, gravida ex.
                        Suspendisse id facilisis erat. Etiam auctor accumsan ultricies.
                        Sed semper, tellus at bibendum aliquet, leo diam facilisis ex, quis posuere dolor orci non orci.
                        <br><br>
                        Sed mattis mi et ante convallis, sed blandit quam auctor.
                        Vivamus vel eros ante. Quisque cursus diam est, pretium congue felis ornare ut.
                        Sed tincidunt venenatis ex, sit amet consectetur nunc sagittis non.
                        Cras pharetra non ex vitae condimentum.
                        Duis aliquam justo sit amet nulla fringilla, sit amet congue metus lobortis.
                        In aliquam justo lacus, in gravida nunc congue vitae.
                        Praesent sed eleifend leo, a faucibus justo. Quisque sit amet maximus nisi.
                        In eget massa commodo, cursus eros ultrices, gravida ex.
                        Suspendisse id facilisis erat. Etiam auctor accumsan ultricies.
                        <br><br>
                        Cras pharetra non ex vitae condimentum.
                        Duis aliquam justo sit amet nulla fringilla, sit amet congue metus lobortis.
                        In aliquam justo lacus, in gravida nunc congue vitae.
                    </p>";
                }
            ?>
        </div>
        <div class="about_us_images panel_column">
            <div class="about_us_images_wrapper page_gallery">
                <?php
                    $dir_path = __DIR__ . "/../../../htdocs/linnuse/images/gallery/about_us/";
                    $image_path = "images/gallery/about_us/";
                    $n = 0;
                    
                    $images_per_column = 3;
                    $max_image_count = 5;

                    if (is_dir($dir_path)) {
                        if ($dir = opendir($dir_path)) {
                            while (($file = readdir($dir)) !== false) {
                                $file_extension = htmlspecialchars(pathinfo($file, PATHINFO_EXTENSION), ENT_QUOTES);
                                $file_basename = htmlspecialchars(pathinfo($file, PATHINFO_BASENAME), ENT_QUOTES);
                                
                                if ($file_extension === "jpg") {
                                    $n++;

                                    if ($n > $max_image_count) {
                                        break;
                                    }
                                    
                                    if (($n % $images_per_column) === 1 || $n === 1) echo "<div class=\"about_us_images_column_wrapper\">";

                                    echo "<div class=\"page_gallery_image\">
                                        <div class=\"page_gallery_image_overlay\">
                                            <span>Vaata Suurelt</span>
                                        </div>
                                        <img src=\"" . $image_path . $file_basename . "\" alt=\"About_us_image_" . $n . "\">
                                        </div>";

                                    if (($n % $images_per_column) === 0 || $n === $max_image_count) echo "</div>";
                                }
                            }
                        }
                    }
                ?>
            </div>
            <a class="panel_button_highlight" href="galerii">
                Vaata Galeriid<i class="fas fa-long-arrow-alt-right"></i>
            </a>
        </div>
    </div>
</div>
