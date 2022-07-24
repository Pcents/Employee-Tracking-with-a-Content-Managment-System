const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
// const sequelize = require("./config/connection");
console.log("connected!");

// turn on connection to db and server
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "test",
// });

// menu to view departments, roles, employees
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
        ],
      },
    ])
    .then((choices) => {
      switch (choices.databases) {
        case "Departments":
          tableDepartment();
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

// view all dept->dept name and ids
// view all roles->job titles, role id, dept for role, salary
// view all emp->ids, first name, last name, title, dept, manager
// CRUD ops
// add dept->name of dept-create
// add role->name, salary, dept-create
// add emp->name, role, manager-create
// update emp->select and update new role-update
promptDB();
