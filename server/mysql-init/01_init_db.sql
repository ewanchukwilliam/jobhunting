CREATE DATABASE IF NOT EXISTS JobHunting;
USE JobHunting;
CREATE TABLE IF NOT EXISTS applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
		date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    offer VARCHAR(255),
    description TEXT
);
CREATE TABLE IF NOT EXISTS postings (
    id INT AUTO_INCREMENT PRIMARY KEY,
		date VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    section TEXT,
		contact VARCHAR(255),
    UNIQUE KEY unique_title_company (title, company)
);
