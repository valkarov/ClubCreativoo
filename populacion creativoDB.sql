use creativoDB


-- Insert records into the table Admins (Administrators of the Creative Club)
INSERT INTO Admins (IdAdmin, Username, Password, FirstName, LastName)
VALUES
    (2378954,'admin1', '1234', 'Alejandro', 'Gómez'),
    (2374573,'admin2', '1234', 'María', 'Martínez'),
    (2390847,'admin3', '1234', 'Carlos', 'Sánchez'),
    (1234234,'admin4', '1234', 'Laura', 'Pérez'),
    (5647343,'admin5', '1234', 'Javier', 'López');

-- Insert first and second delivery persons
INSERT INTO Delivery_Person (IdDeliveryPerson, Username, Password, Firstname, Lastname, State, Province, Canton, District, Phone, Email
) VALUES 
(1, 'd1', '1234', 'John', 'Doe', 'State1', 'Province1', 'Canton1', 'District1', '123-456-7890', 'john.doe@example.com'),
(2, 'd2', '1234', 'Jane', 'Smith', 'State2', 'Province2', 'Canton2', 'District2', '098-765-4321', 'jane.smith@example.com');



-- Insert records into the table Question (Frequently Asked Questions of the Creative Club)
INSERT INTO Question (Question, Answer)
VALUES
    ('¿Cómo puedo participar en las ferias del Club Creativo?', 'Para participar, regístrate como emprendedor en nuestro sitio web y envía tu propuesta creativa.'),
    ('¿Cuándo son las próximas ferias de arte?', 'Consulta nuestro calendario en línea para conocer las fechas de nuestras próximas ferias.'),
    ('¿Hay algún costo asociado a la participación en las ferias?', 'Sí, hay una tarifa de participación que varía según el tipo de emprendimiento y el espacio solicitado.'),
    ('¿Puedo participar como artista individual?', '¡Claro! Aceptamos participantes individuales y grupos creativos.'),
    ('¿Cómo puedo contactar al equipo del Club Creativo?', 'Puedes contactarnos a través de nuestro correo electrónico info@clubcreativo.com o llamando al 8759-0323.');

-- Insert into ENTREPRENEURSHIP
INSERT INTO ENTREPRENEURSHIP (IdEntrepreneurship, Username, Type, Name, Email, Sinpe, Phone, Province, Canton, District, State, IdType, Description, Reason)
VALUES
    (8293401, 'e7', 'Arte', 'Galería Creativa', 'galeria@example.com', '87649076', '87650938', 'San José', 'Escazú', 'Distrito1', 'Pendiente', 'Fisica', 'Prueba', ''),
    (2342355, 'e2', 'Cocina', 'Sabores Innovadores', 'sabores@example.com', '289648375', '89765903', 'Heredia', 'Belén', 'Distrito2', 'Pendiente', 'Fisica', 'Prueba', ''),
    (2346236, 'e3', 'Manualidades', 'Hecho a Mano', 'hechoamano@example.com', '70986345', '72348593', 'Cartago', 'Cartago', 'Distrito3', 'Pendiente', 'Fisica', 'Prueba', ''),
    (2356346, 'e4', 'Moda', 'Estilo Creativo', 'estilo@example.com', '88769504', '70987345', 'Alajuela', 'Alajuela', 'Distrito4', 'Pendiente', 'Fisica', 'Prueba', ''),
    (3452323, 'e5', 'Fotografía', 'Capturas Creativas', 'capturas@example.com', '61897658', '89764903', 'Puntarenas', 'Puntarenas', 'Distrito5', 'Pendiente', 'Fisica', 'Prueba', '');

-- Insertar todos los tipos de redes sociales y página web en un solo comando
INSERT INTO Social_Type(type)
VALUES 
    ('Facebook'),
    ('Tiktok'),
    ('Instagram'),
    ('Twitter'),
    ('WebPage');

-- Insertar información de redes sociales para cada emprendimiento
INSERT INTO Social (Username, Type, Link)
VALUES
    ('e7', 'Facebook', 'https://www.facebook.com/galeriacreativa'),
    ('e7', 'Instagram', 'https://www.instagram.com/galeriacreativa'),
    ('e2', 'Facebook', 'https://www.facebook.com/saboresinnovadores'),
    ('e2', 'Twitter', 'https://twitter.com/saboresinnovadores'),
    ('e3', 'Instagram', 'https://www.instagram.com/hechoamano'),
    ('e3', 'Tiktok', 'https://www.tiktok.com/@hechoamano'),
    ('e4', 'Facebook', 'https://www.facebook.com/estilocreativo'),
    ('e4', 'Instagram', 'https://www.instagram.com/estilocreativo'),
    ('e5', 'Instagram', 'https://www.instagram.com/capturascreativas'),
    ('e5', 'WebPage', 'https://www.capturascreativas.com');

-- Ingreso de tipo de emprendimientos
INSERT INTO Entrepreneurship_Type (type) VALUES 
    ('Comida'),
    ('Collares'),
    ('Dibujo'),
    ('Arte'),
    ('Ropa'),
    ('Decoración'),
    ('Joyería'),
    ('Tecnología'),
    ('Fotografía'),
    ('Manualidades'),
    ('Otros');


-- Insertar usuario 1
INSERT INTO Client (IdClient, Username, Password, Email, FirstName, LastName, Phone, Province, Canton, District)
VALUES 
	(1234, 'u1', '1234', 'example1@gmail.com',  'Nombre1', 'Apellido1', '123456789', 'San José', 'San José', 'San José'),
	(4321, 'u2', '1234', 'example2@gmail.com', 'Nombre2', 'Apellido2', '987654321', 'Heredia', 'Heredia', 'Heredia');

-- Insertar una fila en Entrepreneurship_Admins
INSERT INTO Entrepreneurship_Admins (IdEntrepreneurship, IdClient, state)
VALUES 
	('e5', 'u1', 'Aceptado'),
	('e2', 'u1', 'Pendiente'),
	('e3', 'u1', 'Aceptado'),
	('e7', 'u1', 'Aceptado'),
	('e2', 'u2', 'Aceptado'),
	('e4', 'u2', 'Aceptado'),
	('e5', 'u2', 'Pendiente');




-- Insertar datos en la tabla Province
INSERT INTO Province (Name) VALUES 
('San José');

-- Insertar datos en la tabla Province
INSERT INTO Province (Name) VALUES 
('Heredia');

-- Insertar datos en la tabla Canton
INSERT INTO Canton (Name, Province) VALUES
('Heredia', 'Heredia'),
('Barva', 'Heredia'),
('Santo Domingo', 'Heredia'),
('Santa Bárbara', 'Heredia'),
('San Rafael', 'Heredia');


-- Insertar datos en la tabla District
INSERT INTO Distric (Name, Canton) VALUES
('Heredia', 'Heredia'),
('Mercedes', 'Heredia'),
('San Francisco', 'Heredia'),
('Ulloa', 'Heredia'),
('Varablanca', 'Heredia'),
('Barva', 'Barva'),
('San Pedro', 'Barva'),
('San Pablo', 'Barva'),
('San Roque', 'Barva'),
('Santa Lucía', 'Barva'),
('San José de la Montaña', 'Barva'),
('Santo Domingo', 'Santo Domingo'),
('San Vicente', 'Santo Domingo'),
('San Miguel', 'Santo Domingo'),
('Paracito', 'Santo Domingo'),
('Santo Tomás', 'Santo Domingo'),
('Santa Rosa', 'Santo Domingo'),
('Santa Bárbara', 'Santa Bárbara'),
('San Juan', 'Santa Bárbara'),
('Jesús', 'Santa Bárbara'),
('Purabá', 'Santa Bárbara'),
('San Rafael', 'San Rafael'),
('San Josecito', 'San Rafael'),
('Santiago', 'San Rafael'),
('Ángeles', 'San Rafael'),
('Concepción', 'San Rafael'),
('San Isidro', 'San Rafael');


-- Insertar datos en la tabla Canton
INSERT INTO Canton (Name, Province) VALUES
('San José', 'San José'),
('Escazú', 'San José'),
('Desamparados', 'San José'),
('Puriscal', 'San José'),
('Tarrazú', 'San José'),
('Aserrí', 'San José'),
('Mora', 'San José'),
('Goicoechea', 'San José'),
('Santa Ana', 'San José'),
('Alajuelita', 'San José'),
('Vázquez de Coronado', 'San José'),
('Acosta', 'San José'),
('Tibás', 'San José'),
('Moravia', 'San José'),
('Montes de Oca', 'San José'),
('Turrubares', 'San José'),
('Dota', 'San José'),
('Curridabat', 'San José'),
('Pérez Zeledón', 'San José'),
('León Cortés Castro', 'San José');


-- Insertar datos en la tabla District
INSERT INTO Distric (Name, Canton) VALUES
('San José', 'San José'),
('Escazú', 'Escazú'),
('Desamparados', 'Desamparados'),
('Santiago', 'Desamparados'),
('San Rafael Arriba', 'Desamparados'),
('San Antonio', 'Desamparados'),
('San Cristóbal', 'Desamparados'),
('Rosario', 'Desamparados'),
('Damas', 'Desamparados'),
('San Juan de Dios', 'Desamparados'),
('Gravilias', 'Desamparados'),
('Los Guido', 'Desamparados'),
('Sánchez', 'Desamparados'),
('San Miguel', 'Desamparados'),
('San Juan', 'Desamparados'),
('San Rafael Abajo', 'Desamparados'),
('Colón', 'Puriscal'),
('Puriscal', 'Puriscal'),
('Santiago', 'Puriscal'),
('Mercedes Sur', 'Puriscal'),
('Barbacoas', 'Puriscal'),
('Grifo Alto', 'Puriscal'),
('San Rafael', 'Puriscal'),
('Candelarita', 'Puriscal'),
('Desamparaditos', 'Puriscal'),
('San Antonio', 'Puriscal'),
('Chires', 'Puriscal'),
('Aserrí', 'Aserrí'),
('Tarbaca', 'Aserrí'),
('Vuelta de Jorco', 'Aserrí'),
('San Gabriel', 'Aserrí'),
('Legua', 'Aserrí'),
('Monterrey', 'Aserrí'),
('Salitrillos', 'Aserrí'),
('San Isidro', 'Mora'),
('Colón', 'Mora'),
('Guayabo', 'Mora'),
('Tabarcia', 'Mora'),
('Piedras Negras', 'Mora'),
('Jaris', 'Mora'),
('Quitirrisí', 'Mora'),
('Ipís', 'Goicoechea'),
('Rancho Redondo', 'Goicoechea'),
('Purral', 'Goicoechea'),
('Sabanilla', 'Goicoechea'),
('Uruca', 'Goicoechea'),
('Mata Redonda', 'Goicoechea'),
('Pavas', 'Goicoechea'),
('Anselmo Llorente', 'Santa Ana'),
('Santa Ana', 'Santa Ana'),
('Salitral', 'Santa Ana'),
('Piedades', 'Santa Ana'),
('Brasil', 'Santa Ana'),
('Alajuelita', 'Alajuelita'),
('San Josecito', 'Alajuelita'),
('San Antonio', 'Alajuelita'),
('Concepción', 'Vázquez de Coronado'),
('San Isidro', 'Vázquez de Coronado'),
('San Rafael', 'Vázquez de Coronado'),
('Dulce Nombre de Jesús', 'Vázquez de Coronado'),
('Patalillo', 'Vázquez de Coronado'),
('Cascajal', 'Vázquez de Coronado'),
('San Juan', 'Acosta'),
('San Ignacio', 'Acosta'),
('Guaitil', 'Acosta'),
('Palmichal', 'Acosta'),
('Cipreses', 'Acosta'),
('San José', 'Tibás'),
('Cinco Esquinas', 'Tibás'),
('Anselmo Llorente', 'Tibás'),
('León XIII', 'Tibás'),
('Colima', 'Tibás'),
('San Juan', 'Moravia'),
('La Trinidad', 'Moravia'),
('San Vicente', 'Moravia'),
('San Jerónimo', 'Moravia'),
('San Diego', 'Moravia'),
('San Rafael', 'Moravia'),
('San Luis', 'Moravia'),
('San Pedro', 'Montes de Oca'),
('Sabanilla', 'Montes de Oca'),
('Mercedes', 'Montes de Oca'),
('San Rafael', 'Montes de Oca'),
('San Antonio', 'Montes de Oca'),
('Concepción', 'Montes de Oca'),
('San Juan de Mata', 'Turrubares'),
('San Luis', 'Turrubares'),
('Carara', 'Turrubares'),
('Copey', 'Turrubares'),
('Jardín', 'Turrubares'),
('Dota', 'Dota'),
('Santa María', 'Dota'),
('Jardín', 'Dota'),
('Copey', 'Dota'),
('San Francisco de Dos Ríos', 'Curridabat'),
('Cipreses', 'Curridabat'),
('Curridabat', 'Curridabat'),
('Granadilla', 'Curridabat'),
('Sánchez', 'Curridabat'),
('Tirrases', 'Curridabat'),
('Río Nuevo', 'Pérez Zeledón'),
('Páramo', 'Pérez Zeledón'),
('La Palma', 'Pérez Zeledón'),
('Rivas', 'Pérez Zeledón'),
('San Isidro de El General', 'Pérez Zeledón'),
('Pejibaye', 'Pérez Zeledón'),
('La Amistad', 'Pérez Zeledón'),
('Platanares', 'Pérez Zeledón'),
('Barú', 'Pérez Zeledón'),
('Cajón', 'Pérez Zeledón'),
('La Colonia', 'León Cortés Castro'),
('San Antonio', 'León Cortés Castro'),
('San Isidro', 'León Cortés Castro');



-- Insertar datos en la tabla Province
INSERT INTO Province (Name) VALUES 
('Cartago');

-- Insertar datos en la tabla Canton
INSERT INTO Canton (Name, Province) VALUES
('Cartago', 'Cartago'),
('Paraíso', 'Cartago'),
('La Unión', 'Cartago'),
('Jiménez', 'Cartago'),
('Turrialba', 'Cartago');


-- Insertar datos en la tabla District
INSERT INTO Distric (Name, Canton) VALUES
('Oriental', 'Cartago'),
('Occidental', 'Cartago'),
('Carmen', 'Cartago'),
('San Nicolás', 'Cartago'),
('Agua Caliente', 'Cartago'),
('Guadalupe', 'Paraíso'),
('Santa Lucía', 'Paraíso'),
('Corralillo', 'Paraíso'),
('Tierra Blanca', 'Paraíso'),
('Cot', 'La Unión'),
('Cipreses', 'La Unión'),
('Santa Rosa', 'La Unión'),
('Zurquí', 'La Unión'),
('Pejibaye', 'Jiménez'),
('Juan Viñas', 'Jiménez'),
('Tucurrique', 'Jiménez'),
('Turrialba', 'Turrialba'),
('La Suiza', 'Turrialba'),
('Peralta', 'Turrialba'),
('Santa Cruz', 'Turrialba'),
('Santa Teresita', 'Turrialba');



-- Insertar datos en la tabla Province
INSERT INTO Province (Name) VALUES 
('Alajuela');

-- Insertar datos en la tabla Canton
INSERT INTO Canton (Name, Province) VALUES
('Alajuela', 'Alajuela'),
('San Ramón', 'Alajuela'),
('Grecia', 'Alajuela'),
('San Mateo', 'Alajuela'),
('Atenas', 'Alajuela'),
('Naranjo', 'Alajuela'),
('Palmares', 'Alajuela'),
('Poás', 'Alajuela'),
('Orotina', 'Alajuela'),
('San Carlos', 'Alajuela'),
('Zarcero', 'Alajuela'),
('Valverde Vega', 'Alajuela'),
('Upala', 'Alajuela'),
('Los Chiles', 'Alajuela'),
('Guatuso', 'Alajuela');

-- Insertar datos en la tabla District
INSERT INTO Distric (Name, Canton) VALUES
('Alajuela', 'Alajuela'),
('San José', 'Alajuela'),
('Carrizal', 'Alajuela'),
('San Antonio', 'Alajuela'),
('Guácima', 'Alajuela'),
('San Isidro', 'Alajuela'),
('Sabanilla', 'Alajuela'),
('San Rafael', 'Alajuela'),
('Río Segundo', 'Alajuela'),
('Desamparados', 'Alajuela'),
('Turrucares', 'Alajuela'),
('Tambor', 'Alajuela'),
('Garita', 'Alajuela'),
('Sarapiquí', 'Alajuela'),
('Alegría', 'San Ramón'),
('San Juan', 'San Ramón'),
('San Rafael', 'San Ramón'),
('San Isidro', 'San Ramón'),
('Ángeles', 'San Ramón'),
('Alfaro', 'Grecia'),
('Puente de Piedra', 'Grecia'),
('San José', 'Grecia'),
('San Roque', 'Grecia'),
('Tacares', 'Grecia'),
('Monserrat', 'San Mateo'),
('Coyolar', 'San Mateo'),
('Desmonte', 'San Mateo'),
('San Mateo', 'San Mateo'),
('Concepción', 'Atenas'),
('San José', 'Atenas'),
('Jesús', 'Atenas'),
('Mercedes', 'Atenas'),
('San Isidro', 'Atenas'),
('San Juan', 'Naranjo'),
('San José', 'Naranjo'),
('Cirrí Sur', 'Naranjo'),
('Rosario', 'Naranjo'),
('Palmares', 'Palmares'),
('Zaragoza', 'Palmares'),
('Buenos Aires', 'Palmares'),
('Santiago', 'Palmares'),
('San Pedro', 'Poás'),
('San Juan', 'Poás'),
('San Rafael', 'Poás'),
('Carrillos', 'Poás'),
('Mastate', 'Orotina'),
('Coyolar', 'Orotina'),
('Hacienda Vieja', 'Orotina'),
('La Ceiba', 'Orotina'),
('Pital', 'San Carlos'),
('La Fortuna', 'San Carlos'),
('La Tigra', 'San Carlos'),
('La Palmera', 'San Carlos'),
('Venado', 'San Carlos'),
('San Carlos', 'San Carlos'),
('Zarcero', 'Zarcero'),
('Laguna', 'Zarcero'),
('Tapezco', 'Zarcero'),
('Guadalupe', 'Valverde Vega'),
('Palmira', 'Valverde Vega'),
('Buenavista', 'Valverde Vega'),
('Sarchí Norte', 'Valverde Vega'),
('Delicias', 'Valverde Vega'),
('San José', 'Upala'),
('Upala', 'Upala'),
('Aguas Claras', 'Upala'),
('San José', 'Los Chiles'),
('Caño Negro', 'Los Chiles'),
('El Amparo', 'Los Chiles'),
('San Jorge', 'Los Chiles'),
('San Rafael', 'Los Chiles'),
('Katira', 'Guatuso'),
('San José', 'Guatuso'),
('San Antonio', 'Guatuso'),
('San Lorenzo', 'Guatuso'),
('Santa Rita', 'Guatuso');


-- Insertar datos en la tabla Province
INSERT INTO Province (Name) VALUES 
('Puntarenas');

-- Insertar datos en la tabla Canton
INSERT INTO Canton (Name, Province) VALUES
('Puntarenas', 'Puntarenas'),
('Esparza', 'Puntarenas'),
('Buenos Aires', 'Puntarenas'),
('Montes de Oro', 'Puntarenas'),
('Osa', 'Puntarenas'),
('Aguirre', 'Puntarenas'),
('Golfito', 'Puntarenas'),
('Coto Brus', 'Puntarenas'),
('Parrita', 'Puntarenas'),
('Corredores', 'Puntarenas');

-- Insertar datos en la tabla District
INSERT INTO Distric (Name, Canton) VALUES
('Puntarenas', 'Puntarenas'),
('Chomes', 'Puntarenas'),
('Lepanto', 'Puntarenas'),
('Paquera', 'Puntarenas'),
('Manzanillo', 'Puntarenas'),
('Guacimal', 'Puntarenas'),
('Barranca', 'Puntarenas'),
('Monteverde', 'Puntarenas'),
('Isla del Coco', 'Puntarenas'),
('Cóbano', 'Puntarenas'),
('Espíritu Santo', 'Esparza'),
('San Juan Grande', 'Esparza'),
('Macacona', 'Esparza'),
('San Rafael', 'Esparza'),
('San Jerónimo', 'Esparza'),
('Boruca', 'Buenos Aires'),
('Buenos Aires', 'Buenos Aires'),
('Volcán', 'Buenos Aires'),
('Potrero Grande', 'Buenos Aires'),
('Bijagual', 'Montes de Oro'),
('Miramar', 'Montes de Oro'),
('La Unión', 'Montes de Oro'),
('Aguabuena', 'Montes de Oro'),
('Ciudad Cortés', 'Osa'),
('Palmar', 'Osa'),
('Sierpe', 'Osa'),
('Bahía Ballena', 'Osa'),
('Pavón', 'Osa'),
('Puerto Cortés', 'Aguirre'),
('Palmar Norte', 'Aguirre'),
('Sierpe', 'Aguirre'),
('Golfito', 'Golfito'),
('Puerto Jiménez', 'Golfito'),
('Guaycará', 'Golfito'),
('Pavón', 'Golfito'),
('San Vito', 'Coto Brus'),
('Sabalito', 'Coto Brus'),
('Agua Buena', 'Coto Brus'),
('Limoncito', 'Coto Brus'),
('Parrita', 'Parrita'),
('Damitas', 'Parrita'),
('Juntas', 'Parrita'),
('Macacona', 'Parrita'),
('La Cuesta', 'Corredores'),
('Paso Canoas', 'Corredores'),
('Laurel', 'Corredores'),
('Ciudad Neily', 'Corredores');


-- Insertar datos en la tabla Province
INSERT INTO Province (Name) VALUES 
('Guanacaste');

-- Insertar datos en la tabla Canton
INSERT INTO Canton (Name, Province) VALUES
('Liberia', 'Guanacaste'),
('Nicoya', 'Guanacaste'),
('Santa Cruz', 'Guanacaste'),
('Bagaces', 'Guanacaste'),
('Carrillo', 'Guanacaste'),
('Cañas', 'Guanacaste'),
('Abangares', 'Guanacaste'),
('Tilarán', 'Guanacaste'),
('Nandayure', 'Guanacaste'),
('La Cruz', 'Guanacaste'),
('Hojancha', 'Guanacaste');

-- Insertar datos en la tabla District
INSERT INTO Distric (Name, Canton) VALUES
('Liberia', 'Liberia'),
('Cañas Dulces', 'Liberia'),
('Mayorga', 'Liberia'),
('Nacascolo', 'Liberia'),
('Curubandé', 'Liberia'),
('Nicoya', 'Nicoya'),
('Mansion', 'Nicoya'),
('San Antonio', 'Nicoya'),
('Quebrada Honda', 'Nicoya'),
('Sámara', 'Nicoya'),
('Belén de Nosarita', 'Nicoya'),
('Santa Cruz', 'Santa Cruz'),
('Bolsón', 'Santa Cruz'),
('Veintisiete de Abril', 'Santa Cruz'),
('Tempate', 'Santa Cruz'),
('Cartagena', 'Santa Cruz'),
('Cuajiniquil', 'Santa Cruz'),
('Bagaces', 'Bagaces'),
('Fortuna', 'Bagaces'),
('Mogote', 'Bagaces'),
('Río Naranjo', 'Bagaces'),
('La Garita', 'Bagaces'),
('Filadelfia', 'Carrillo'),
('Palmira', 'Carrillo'),
('Sardinal', 'Carrillo'),
('Belén', 'Carrillo'),
('Santa Rosa', 'Carrillo'),
('Liberia', 'Cañas'),
('Cañas', 'Cañas'),
('Palmira', 'Cañas'),
('San Miguel', 'Cañas'),
('Bebedero', 'Cañas'),
('Porozal', 'Cañas'),
('Las Juntas', 'Abangares'),
('Sierra', 'Abangares'),
('San Juan', 'Abangares'),
('Colorado', 'Abangares'),
('Canjel', 'Abangares'),
('Tilarán', 'Tilarán'),
('Quebrada Grande', 'Tilarán'),
('Tronadora', 'Tilarán'),
('Libano', 'Tilarán'),
('Tierras Morenas', 'Tilarán'),
('Carmona', 'Nandayure'),
('Santa Rita', 'Nandayure'),
('Zapotillal', 'Nandayure'),
('San Pablo', 'Nandayure'),
('Porvenir', 'Nandayure'),
('La Cruz', 'La Cruz'),
('Santa Cecilia', 'La Cruz'),
('La Garita', 'La Cruz'),
('Santa Elena', 'La Cruz'),
('Cuajiniquil', 'La Cruz'),
('Hojancha', 'Hojancha'),
('Monte Romo', 'Hojancha'),
('Puerto Carrillo', 'Hojancha'),
('Huacas', 'Hojancha'),
('Matambú', 'Hojancha');



-- Insertar datos en la tabla Province
INSERT INTO Province (Name) VALUES 
('Limón');

-- Insertar datos en la tabla Canton
INSERT INTO Canton (Name, Province) VALUES
('Limón', 'Limón'),
('Pococí', 'Limón'),
('Siquirres', 'Limón'),
('Talamanca', 'Limón'),
('Matina', 'Limón');

-- Insertar datos en la tabla District
INSERT INTO Distric (Name, Canton) VALUES
('Limón', 'Limón'),
('Valle La Estrella', 'Limón'),
('Liverpool', 'Limón'),
('Matama', 'Limón'),
('Río Blanco', 'Limón'),
('Guápiles', 'Pococí'),
('Jiménez', 'Pococí'),
('La Rita', 'Pococí'),
('Roxana', 'Pococí'),
('Cariari', 'Pococí'),
('Siquirres', 'Siquirres'),
('Pacuarito', 'Siquirres'),
('Florida', 'Siquirres'),
('Alegría', 'Siquirres'),
('La Colonia', 'Siquirres'),
('Bratsi', 'Talamanca'),
('Sixaola', 'Talamanca'),
('Cahuita', 'Talamanca'),
('Telire', 'Talamanca'),
('Matina', 'Matina'),
('Bataán', 'Matina'),
('Carrandi', 'Matina'),
('Guácimo', 'Matina'),
('Guadalupe', 'Matina'),
('Santa Rosa', 'Matina');
