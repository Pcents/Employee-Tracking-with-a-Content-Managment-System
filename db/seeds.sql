INSERT INTO departments (department_name)
values ('wet chemistry'),('metals'),('microbiology'),
('philately');

INSERT INTO roles (title, salary, department_id)
values ('lab tech', 100000, 1), ('chemist', 120000, 2),('microbiologist', 110000, 3),
('philatelist', 50000, 4);

INSERT INTO employee (first_name, last_name, department_id, role_id)
values ('Charles', 'Darwin', 1, 1), ('Nicolas', 'Copernicus',1, 1),
('Marie', 'Curie',1, 1), ('Michael', 'Faraday', 2, 2), ('Rachel', 'Carson', 2, 2),
('Nikola', 'Tesla', 2, 2), ('Rosalind', 'Franklin', 3, 3), ('Robert', 'Hooke',3 ,3),
('David', 'Beech',4,4), ('Daniel', 'Cooper',4,4), ('Franklin', 'Roosevelt',4,4);

-- manager id?