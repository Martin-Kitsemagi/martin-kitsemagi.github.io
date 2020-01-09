DROP TABLE menu;

CREATE TABLE menu (
    id INT NOT NULL AUTO_INCREMENT,
    image VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    price DECIMAL(5, 2) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO menu (image, name, type, text, price)
    VALUES ("images/gallery/menu/page_image_2.jpg", "Kaerapuder pähklite ja marjadega", "Dessert",
        "Praesent sed eleifend leo, a faucibus justo. Quisque sit amet maximus nisi. In eget massa commodo, cursus eros ultrices, gravida ex.",
        5.50)
;
INSERT INTO menu (image, name, type, text, price)
    VALUES ("images/gallery/menu/page_image_3.jpg", "Vürtsikas nuudlisupp lihaga", "Soup",
        "Praesent sed eleifend leo, a faucibus justo. Quisque sit amet maximus nisi. In eget massa commodo, cursus eros ultrices, gravida ex.",
        5.50)
;
INSERT INTO menu (image, name, type, text, price)
    VALUES ("images/gallery/menu/page_image_4.jpg", "Pannkoogid mee ja marjadega", "Dessert",
        "Praesent sed eleifend leo, a faucibus justo. Quisque sit amet maximus nisi. In eget massa commodo, cursus eros ultrices, gravida ex.",
        4.50)
;
INSERT INTO menu (image, name, type, text, price)
    VALUES ("images/gallery/menu/page_image_5.jpg", "Sealiha riisi ja juurviljadega", "Main course",
        "Praesent sed eleifend leo, a faucibus justo. Quisque sit amet maximus nisi. In eget massa commodo, cursus eros ultrices, gravida ex.",
        7.50)
;
INSERT INTO menu (image, name, type, text, price)
    VALUES ("images/gallery/menu/page_image_6.jpg", "Jäätisekokteil marjadega", "Drink",
        "Praesent sed eleifend leo, a faucibus justo. Quisque sit amet maximus nisi. In eget massa commodo, cursus eros ultrices, gravida ex.",
        2.50)
;
INSERT INTO menu (image, name, type, text, price)
    VALUES ("images/gallery/menu/page_image_7.jpg", "Täidetud lihapallid", "Main course",
        "Praesent sed eleifend leo, a faucibus justo. Quisque sit amet maximus nisi. In eget massa commodo, cursus eros ultrices, gravida ex.",
        6.50)
;
INSERT INTO menu (image, name, type, text, price)
    VALUES ("images/gallery/menu/page_image_9.jpg", "Kalasalat", "Salad",
        "Praesent sed eleifend leo, a faucibus justo. Quisque sit amet maximus nisi. In eget massa commodo, cursus eros ultrices, gravida ex.",
        5.00)
;
INSERT INTO menu (image, name, type, text, price)
    VALUES ("images/gallery/menu/page_image_10.jpg", "Kihiline kalaroog", "Main course",
        "Praesent sed eleifend leo, a faucibus justo. Quisque sit amet maximus nisi. In eget massa commodo, cursus eros ultrices, gravida ex.",
        7.00)
;
