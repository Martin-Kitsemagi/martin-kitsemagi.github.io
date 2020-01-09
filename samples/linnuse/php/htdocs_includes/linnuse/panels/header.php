<div class="header panel viewport_height no_text_select">
    <div class="panel_row">
        <div class="header_title_wrapper">
            <h1 class="header_title">Linnuse</h1>
            
            <p class="header_title_text">Parim valik põhjamaiseid maitseid</p>
            <p class="header_title_text"><b>Avatud E &mdash; L 09:00-19:00</b></p>

            <div class="header_title_button scroll_menu panel_button">
                Vaata Menüüd <i class="fas fa-long-arrow-alt-right"></i>
            </div>
        </div>

        <div class="header_svg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
				<polygon points="0, 100 0, 0 100, 100">
			</svg>
        </div>

        <div class="header_arrow">
            <span></span><span></span>
        </div>

        <div class="header_slider">
            <div class="header_slider_text"></div>
            <div class="header_slides_wrapper page_gallery">
                <div class="header_slides">
                    <?php
                        $dir_path = __DIR__ . "/../../../htdocs/linnuse/images/gallery/header/";
                        $image_path = "images/gallery/header/";
                        $n = 0;

                        if (is_dir($dir_path)) {
                            if ($dir = opendir($dir_path)) {
                                while (($file = readdir($dir)) !== false) {
                                    $file_extension = htmlspecialchars(pathinfo($file, PATHINFO_EXTENSION), ENT_QUOTES);
                                    $file_basename = htmlspecialchars(pathinfo($file, PATHINFO_BASENAME), ENT_QUOTES);
                                    
                                    if ($file_extension === "jpg") {
                                        echo "<div class=\"header_slide page_gallery_image\">
                                            <div class=\"page_gallery_image_overlay\">
                                                <span>Vaata Suurelt</span>
                                            </div>
                                            <img src=\"" . $image_path . $file_basename . "\" alt=\"Header_image_" . $n++ . "\">
                                            </div>";
                                    }
                                }
                            }
                        }
                    ?>
                </div>
                <div class="header_slider_nav">
                    <div class="header_slider_button_previous"><i class="fas fa-chevron-left"></i></div>
                    <p class="header_slider_nav_text"></p>
                    <div class="header_slider_button_next"><i class="fas fa-chevron-right"></i></div>
                </div>
            </div>
        </div>

        <div class="header_social_media">
            <p class="header_social_media_text">Sotsiaalmeedia</p>
            <a href="" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-f"></i></a>
            <a href="" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter"></i></a>
            <a href="" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i></a>
        </div>
    </div>
</div>
