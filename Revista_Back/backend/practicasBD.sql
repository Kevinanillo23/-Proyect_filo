CREATE DATABASE filco;

USE filco;

CREATE TABLE users (
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    id INT AUTO_INCREMENT,
    PRIMARY KEY (id)
);
INSERT INTO users (firstname, lastname, email, username, password) VALUES
('Juan', 'Pérez', 'juanperez@example.com', 'juanp', '1234'),
('María', 'López', 'marialopez@example.com', 'marial', '1234'),
('Kevin','Anillo','kevin2000urba@gmail.com','kevin23','1234');
