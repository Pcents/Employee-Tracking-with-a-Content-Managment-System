DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR (30)
);

CREATE TABLE roles (
    roles_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR (30),
    salary DECIMAL,
    department_id  INT,

    FOREIGN KEY (department_id)
REFERENCES departments(department_id)
ON DELETE SET NULL
);

CREATE TABLE employee (
    employee_id INT,
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    department_id INT,
    roles_id INT,

    FOREIGN KEY (roles_id)
    REFERENCES roles(roles_id)
    ON DELETE SET NULL
);

    -- FOREIGN KEY (department_id),
    -- REFERENCES department(department_id)
    -- ON DELETE SET NULL

-- foreign key manager and need manager table?