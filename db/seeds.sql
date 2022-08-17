INSERT INTO departments (department_name)
values 
('wet chemistry'),
('metals'),
('microbiology'),
('philately');

INSERT INTO roles (title, salary, department_id)
values 
('lab tech', 100000, 1), 
('chemist', 120000, 2),
('microbiologist', 110000, 3),
('philatelist', 50000, 4);

INSERT INTO employee (first_name, last_name, manager, role_id)
values 
('Charles', 'Darwin', null, 1), 
('Nicolas', 'Copernicus',1, 1),
('Marie', 'Curie',1, 1), 
('Michael', 'Faraday', null, 2), 
('Rachel', 'Carson', 4, 2),
('Nikola', 'Tesla', 4, 2), 
('Rosalind', 'Franklin', null, 3), 
('Robert', 'Hooke',7 ,3),
('David', 'Beech',null,4), 
('Daniel', 'Cooper',9,4), 
('Franklin', 'Roosevelt',9,4);
