CREATE DATABASE Proyecto_Final;
USE Proyecto_Final;

CREATE TABLE Usuario(
idUsuario INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(80) NOT NULL,
nickname VARCHAR(45) NOT NULL UNIQUE,
pass VARCHAR(50) NOT NULL,
fecha_nacimiento DATE NOT NULL,
sexo VARCHAR(10)
);


CREATE TABLE Editorial(
idEditorial INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(45) NOT NULL UNIQUE,
imagen VARCHAR(200) NOT NULL
);

CREATE TABLE Comic(
idComic INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(200) NOT NULL UNIQUE,
year_impresion YEAR,
sinopsis VARCHAR(500) NOT NULL,
Editorial_idEditorial INTEGER UNSIGNED,
Usuario_idUsuario INTEGER UNSIGNED,
FOREIGN KEY (Editorial_idEditorial) REFERENCES Editorial(idEditorial),
FOREIGN KEY (Usuario_idUsuario) REFERENCES Usuario(idUsuario)
);

/* Insert de Editoriales por default */
INSERT INTO Editorial(nombre, imagen) 
VALUES('Marvel', 'assets/marvellogo.png');

INSERT INTO Editorial(nombre, imagen) 
VALUES('DC Comics', 'assets/dclogo.png');

INSERT INTO Editorial(nombre, imagen) 
VALUES('Image', 'assets/imagelogo.png');

/*
#	CREAR (REGISTRAR) USUARIO   
INSERT INTO Usuario(nombre, nickname, pass, fecha_nacimiento, sexo)
VALUES ('Rob', 'Robie3', '1234', '2000-05-04', 'Masculino');


select * from Usuario;

# INSERTAR NUEVO COMIC 
INSERT INTO Comic(nombre, year_impresion, sinopsis, Editorial_idEditorial, Usuario_idUsuario)
VALUES ('Nuevo', '1993', 'Algo bro', 2, 1);

INSERT INTO Comic(nombre, year_impresion, sinopsis, Editorial_idEditorial, Usuario_idUsuario)
VALUES ('Otro', '2003', 'Una sinopsis lol', 1, 1);


INSERT INTO Comic(nombre, year_impresion, sinopsis, Editorial_idEditorial, Usuario_idUsuario)
VALUES ('Spaaaiiderman 2.0', '1996', 'Weeee sinopsis', 3, 2);

# LOGIN 
SELECT nickname FROM Usuario
WHERE nickname = 'breSt12'
AND pass = '1234';

# Get all Comics
SELECT c.nombre, c.year_impresion, c.sinopsis, e.nombre as Editorial, e.imagen  as imagen, u.nickname as Usuario
FROM Comic c, Editorial e, Usuario u
WHERE c.Editorial_idEditorial = e.idEditorial
AND c.Usuario_idUsuario =  u.idUsuario;

# Update Comic 
UPDATE Comic
SET nombre = 'Spiderman 1.0', year_impresion = '1995', sinopsis = 'Editacionnnn',
Editorial_idEditorial = 1
WHERE idComic = 3;

# Get all Comics
SELECT c.nombre, c.year_impresion, c.sinopsis, e.nombre as Editorial, u.nickname as Usuario
FROM Comic c, Editorial e, Usuario u
WHERE c.Editorial_idEditorial = e.idEditorial
AND c.Usuario_idUsuario =  u.idUsuario;

# Erase a comic forevah :c
DELETE FROM Comic
WHERE idComic = 3;

# GET ALL Editoriales 
select idEditorial, nombre, imagen from Editorial;


DROP TABLE Comic;
DROP TABLE Editorial;
DROP TABLE Usuario;
*/



