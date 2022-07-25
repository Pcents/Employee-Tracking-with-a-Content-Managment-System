INSERT INTO departments (department_name)
values ('wet chemistry'),('metals'),('microbiology'),
('philately');

INSERT INTO roles (title, salary, department_id)
values ('lab tech', 100000, 1), ('chemist', 120000, 2),('microbiologist', 110000, 3),
('philatelist', 50000, 4);

INSERT INTO employee (employee_id, first_name, last_name, department_id, role_id)
values (1, 'Charles', 'Darwin', 1, 1), (1, 'Nicolas', 'Copernicus',1, 1),
(1, 'Marie', 'Curie',1, 1), (2, 'Michael', 'Faraday', 2, 2), (2, 'Rachel', 'Carson', 2, 2),
(2, 'Nikola', 'Tesla', 2, 2), (3, 'Rosalind', 'Franklin', 3, 3), (3, 'Robert', 'Hooke',3 ,3),
(4, 'David', 'Beech',4,4), (4, 'Daniel', 'Cooper',4,4), (4, 'Franklin', 'Roosevelt',4,4);