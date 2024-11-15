CREATE DATABASE IF NOT EXISTS JobHunting;
USE JobHunting
CREATE TABLE IF NOT EXISTS applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    offer VARCHAR(255),
    description TEXT,
    userid CHAR(36)
);

CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    login_token VARCHAR(1024),
    refresh_token VARCHAR(1024),
    unique_id CHAR(36) DEFAULT uuid() COMMENT 'DEFAULT_GENERATED',
);
