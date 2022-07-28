SELECT
employee.employee_id AS ID, employee.first_name AS first_name, employee.last_name AS last_name, roles.title as title, departments.department_name AS department, roles.salary AS salary, employee.manager as manager
FROM employee
LEFT JOIN roles ON employee.role_id = roles.role_id
INNER JOIN departments ON roles.department_id = departments.department_id;

SELECT
  roles.role_id AS ID, roles.title AS title, departments.department_name AS department, roles.salary AS salary
FROM roles
JOIN departments ON roles.department_id = departments.department_id;
    