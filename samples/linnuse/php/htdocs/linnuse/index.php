<!DOCTYPE html>
<html lang="et">
<head>
    <?php include_once(__DIR__ . "/../../htdocs_includes/linnuse/php/meta.php"); ?>

    <link href="https://fonts.googleapis.com/css?family=Great+Vibes|Rubik&display=swap" rel="stylesheet">
    <link href="css/fontawesome_free_5.9.0/css/all.min.css" rel="stylesheet" type="text/css">

    <link href="css/index.css" rel="stylesheet" type="text/css">
    <link href="css/header.css" rel="stylesheet" type="text/css">
    <link href="css/about_us.css" rel="stylesheet" type="text/css">
    <link href="css/menu.css" rel="stylesheet" type="text/css">
    <link href="css/services.css" rel="stylesheet" type="text/css">
    <link href="css/staff.css" rel="stylesheet" type="text/css">
    <link href="css/contact.css" rel="stylesheet" type="text/css">
    <link href="css/footer.css" rel="stylesheet" type="text/css">

    <script src="js/jquery/jquery-3.4.1.min.js" defer></script>

    <script src="js/index.js" defer></script>
    <script src="js/nav.js" defer></script>
    <script src="js/gallery.js" defer></script>
    <script src="js/header.js" defer></script>
    <script src="js/menu.js" defer></script>
    <script src="js/staff.js" defer></script>
    <script src="js/contact.js" defer></script>
</head>
<body>
    <div id="page_overlay" class="page_overlay">
        <div class="page_overlay_icon_wrapper">
            <span class="page_overlay_icon">Linnuse</span>
        </div>
    </div>

    <div id="page_wrapper" class="page_wrapper">
        <script src="js/overlay.js"></script>

        <?php include_once(__DIR__ . "/../../htdocs_includes/linnuse/panels/nav.php"); ?>

        <div class="page_inner_wrapper">
           <?php include_once(__DIR__ . "/../../htdocs_includes/linnuse/panels/header.php"); ?>

           <?php include_once(__DIR__ . "/../../htdocs_includes/linnuse/panels/about_us.php"); ?>
           <?php include_once(__DIR__ . "/../../htdocs_includes/linnuse/panels/menu.php"); ?>
           <?php include_once(__DIR__ . "/../../htdocs_includes/linnuse/panels/services.php"); ?>
           <?php include_once(__DIR__ . "/../../htdocs_includes/linnuse/panels/staff.php"); ?>
           <?php include_once(__DIR__ . "/../../htdocs_includes/linnuse/panels/contact.php"); ?>
        </div>

        <?php include_once(__DIR__ . "/../../htdocs_includes/linnuse/panels/footer.php"); ?>
    </div>
</body>
</html>