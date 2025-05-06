-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS tienda_db;

-- Asegurar que la base de datos use la codificación de caracteres utf8mb4 para soportar emojis y caracteres especiales
ALTER DATABASE tienda_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar la base de datos tienda_db
USE tienda_db;

-- Crear la tabla de productos si no existe
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    imagen VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    npiezas INT UNSIGNED NOT NULL,
    categoria VARCHAR(50) NOT NULL -- Nuevo campo para la categoría del producto
); ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar datos de ejemplo de peluches con la categoría asignada
INSERT INTO productos (imagen, nombre, descripcion, precio, npiezas, categoria) VALUES
('aguacate.webp', 'Peluche de Aguacate Sonriente', 'Un adorable peluche con forma de aguacate feliz.', 12.99, 75, 'frutas'),
('camel.webp', 'Peluche de Camello Suave', 'Un peluche de camello muy suave y achuchable.', 18.50, 40, 'animales'),
('caracol.webp', 'Peluche de Caracol Lento', 'Un simpático peluche con forma de caracol.', 9.75, 100, 'animales'),
('chicken2.webp', 'Peluche de Gallina Curiosa', 'Una gallina de peluche con una expresión curiosa.', 14.25, 60, 'animales'),
('chicken.webp', 'Peluche de Pollito Amarillo', 'Un tierno peluche de pollito de color amarillo brillante.', 11.00, 90, 'animales'),
('cow.webp', 'Peluche de Vaca Lechecita', 'Una adorable vaca de peluche lista para abrazos.', 20.99, 35, 'animales'),
('dino.webp', 'Peluche de Dinosaurio Amigable', 'Un peluche de dinosaurio suave y amigable para todas las edades.', 16.75, 55, 'animales'),
('dog.webp', 'Peluche de Perrito Juguetón', 'Un peluche de perrito listo para jugar.', 17.00, 45, 'animales'),
('domo.webp', 'Peluche de Domo Kun', 'El divertido personaje Domo Kun en forma de peluche.', 25.00, 25, 'personajes'),
('duck.webp', 'Peluche de Pato Cuac Cuac', 'Un clásico peluche de pato amarillo.', 10.50, 80, 'animales'),
('husky.webp', 'Peluche de Husky Siberiano Nevado', 'Un peluche de husky con detalles de pelaje invernal.', 29.99, 15, 'animales'),
('kitty.webp', 'Peluche de Gatito Cariñoso', 'Un suave y mimoso peluche de gatito.', 13.50, 70, 'animales'),
('kittypull.webp', 'Peluche de Gatito Estirándose', 'Un peluche de gatito en una pose adorable de estiramiento.', 15.00, 65, 'animales'),
('lobo.webp', 'Peluche de Lobo Aullador', 'Un peluche de lobo con una expresión de aullido suave.', 27.25, 20, 'animales'),
('monkey.webp', 'Peluche de Mono Travieso', 'Un peluche de mono listo para colgarse y jugar.', 19.00, 40, 'animales'),
('own.webp', 'Peluche de Búho Sabio', 'Un peluche de búho con una mirada sabia y tranquila.', 22.50, 30, 'animales'),
('panda.webp', 'Peluche de Panda Achuchable', 'Un adorable peluche de oso panda listo para abrazos.', 21.75, 38, 'animales'),
('pingui.webp', 'Peluche de Pingüino Friolento', 'Un peluche de pingüino suave y tierno.', 16.00, 58, 'animales'),
('rabbit.webp', 'Peluche de Conejito Saltarín', 'Un peluche de conejo listo para saltar a tus brazos.', 14.50, 62, 'animales'),
('rabbitsweet.webp', 'Peluche de Conejito Dulce', 'Un dulce y adorable peluche de conejito.', 15.25, 68, 'animales'),
('shiba.webp', 'Peluche de Shiba Inu Sonriente', 'Un peluche del popular Shiba Inu con una gran sonrisa.', 26.50, 22, 'animales'),
('sleepkitty.webp', 'Peluche de Gatito Dormilón', 'Un peluche de gatito acurrucado y dormido.', 12.00, 85, 'animales'),
('tux-peluche1.webp', 'Peluche de Pingüino Elegante', 'Un pingüino de peluche con un aspecto elegante.', 23.00, 28, 'personajes');
