DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR (30)
);

CREATE TABLE roles (
id INT PRIMARY KEY,
title VARCHAR (30),
salary DECIMAL,
FOREIGN KEY (department_id)
REFERENCES department(id)
);

CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    role_id INT,
    FOREIGN KEY ()
)

-- foreign key manager and need manager table?