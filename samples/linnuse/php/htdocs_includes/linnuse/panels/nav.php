<?php
    $current_page = basename(htmlspecialchars($_SERVER["PHP_SELF"], ENT_QUOTES));
?>
<div id="page_nav" class="page_nav no_text_select">
    <a class="page_nav_icon" href="">Linnuse</a>

    <div class="page_nav_elements_wrapper">
        <a class="page_nav_element <?php if ($current_page == "meist.php") echo "page_nav_element_active"; ?>" href="meist">Meist</a>
        <a class="page_nav_element <?php if ($current_page == "menüü.php") echo "page_nav_element_active"; ?>" href="menüü">Menüü</a>
        <a class="page_nav_element <?php if ($current_page == "galerii.php") echo "page_nav_element_active"; ?>" href="galerii">Galerii</a>
        <a class="page_nav_element <?php if ($current_page == "teenused.php") echo "page_nav_element_active"; ?>" href="teenused">Teenused</a>
        <a class="page_nav_element <?php if ($current_page == "kontakt.php") echo "page_nav_element_active"; ?>" href="kontakt">Kontakt</a>
    </div>

    <div class="page_nav_mobile_button">
        <div class="page_nav_mobile_button_inner_wrapper">
            <div class="page_nav_mobile_button_top"></div>
            <div class="page_nav_mobile_button_middle"></div>
            <div class="page_nav_mobile_button_bottom"></div>
        </div>
    </div>
</div>

<div id="page_nav_mobile" class="page_nav_mobile no_text_select">
    <div class="page_nav_mobile_elements">
        <a class="page_nav_mobile_element <?php if ($current_page == "meist.php") echo "page_nav_mobile_element_active"; ?>" href="meist">Meist</a>
        <a class="page_nav_mobile_element <?php if ($current_page == "menüü.php") echo "page_nav_mobile_element_active"; ?>" href="menüü">Menüü</a>
        <a class="page_nav_mobile_element <?php if ($current_page == "galerii.php") echo "page_nav_mobile_element_active"; ?>" href="galerii">Galerii</a>
        <a class="page_nav_mobile_element <?php if ($current_page == "teenused.php") echo "page_nav_mobile_element_active"; ?>" href="teenused">Teenused</a>
        <a class="page_nav_mobile_element <?php if ($current_page == "kontakt.php") echo "page_nav_mobile_element_active"; ?>" href="kontakt">Kontakt</a>
    </div>

    <div class="page_nav_mobile_social_media">
        <p>Sotsiaalmeedia</p>
        <a href="" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-f"></i></a>
        <a href="" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter"></i></a>
        <a href="" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i></a>
    </div>
</div>

<div id="page_gallery_nav" class="page_gallery_nav">
    <div class="page_gallery_nav_button">
        <div></div><div></div>
    </div>
    <div class="page_gallery_nav_text"></div>
    <div class="page_gallery_nav_image"></div>
    <div class="page_gallery_nav_button_previous"><i class="fas fa-chevron-left"></i></div>
    <div class="page_gallery_nav_button_next"><i class="fas fa-chevron-right"></i></div>
</div>
