CREATE DATABASE IF NOT EXISTS JobHunting;
USE JobHunting;
CREATE TABLE IF NOT EXISTS applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
		date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    offer VARCHAR(255),
    description TEXT,
		FOREIGN KEY ( user_id ) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE 
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

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
		username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
		UNIQUE KEY unique_email (email)
);

CREATE TABLE IF NOT EXISTS friends (
    user_id1 INT,
    user_id2 INT,
    PRIMARY KEY (user_id1, user_id2),
    FOREIGN KEY (user_id1) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id2) REFERENCES users(id) ON DELETE CASCADE
);

