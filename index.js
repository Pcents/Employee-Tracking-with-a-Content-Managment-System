const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Swordfish007!",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);
// menu to view departments, roles, employees
// should i just call the tables here?
const promptDB = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "databases",
        message: "What would you like to view?",
        choices: [
          "Departments",
          "Roles",
          "Employees",
          "Add Department, Role, or Employee",
          "Update Employee Information",
          "Quit",
        ],
      },
    ])
    .then((choices) => {
      switch (choices.databases) {
        case "Departments":
          db.query("SELECT * FROM employee_db.employee;");
          tableDept();
          break;
        case "Roles":
          tableRoles();
          break;
        case "Employees":
          tableEmployees();
          break;
        case "Add Department, Role, or Employee":
          promptAdd();
          break;
        case "Update Employee Information":
          promptUpdate();
          break;
        case "Quit":
          "Good Bye";
      }
    });
};
// add department, add role, add employee, update employee role
const promptAdd = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "add",
        message: "What would you like to add?",
        choices: ["Departments", "Roles", "Employees"],
      },
    ])
    .then((choices) => {
      switch (choices.add) {
        case "Departments":
          addDepartment();
          break;
        case "Roles":
          addRoles();
          break;
        case "Employees":
          addEmployees();
          break;
      }
    });
};
// add dept->name of dept-create
const addDepartment = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What department would you like to add?",
      },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO employee_db.departments (department_name) VALUES ?",
        [answer.department],
        (err, res) => {
          if (err) {
            console.log(err);
          }
          console.log(res);
        }
      );
      promptDB();
    });
};
// add role->name, salary, dept-create
const addRoles = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "What title would you like to add?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary?",
      },
      // department id?
    ])
    .then((answers) => {
      console.log(answers);
      db.query(
        "INSERT INTO employee_db.roles (title, salary) VALUES ?",
        [answers.role, answers.salary],
        (err, res) => {
          if (err) {
            console.log(err);
          }
          console.log(res);
        }
      );
      promptDB();
    });
};
// add emp->name, role, manager-create
const addEmployees = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "emp_id",
        message: "What is the employee ID number?",
      },
      {
        type: "input",
        name: "first_name",
        message: "What their first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What their last name?",
      },
      {
        type: "input",
        name: "manager",
        message: "Who is their manager?",
      },
      // department id?
      // role id?
    ])
    .then((answers) => {
      console.log(answers);
      db.query(
        "INSERT INTO employee_db.employee (first_name, last_name, manager) VALUES ?",
        [
          answers.emp_id,
          answers.last_name,
          answers.first_name,
          answers.manager,
        ],
        (err, res) => {
          if (err) {
            console.log(err);
          }
          console.log(res);
        }
      );
      promptDB();
    });
};

// .then((answer) => {
//   // view all dept->dept name and ids
//   // sequelize.connect(function err {
//   // if (err) throw err;

//   const deptAdd = "INSERT INTO departments (department_name) VALUES ?";
//   const params = answer.department;
//   db.query(deptAdd, params, (err, success) => {
//     if (err) throw err;
//     console.log("success");
//   });
// });

// view all roles->job titles, role id, dept for role, salary

// const tableDept=()=>
// return console.table(SELECT * ROLES);

// view all emp->ids, first name, last name, title, dept, manager

// CRUD ops

// update emp->select and update new role-update

promptDB();
