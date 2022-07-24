const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
console.log("connected!");

// menu to view departments, roles, employees
const promptDB = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        names: "databases",
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
          promptDepartment();
          break;
        case "Roles":
          promptRoles();
          break;
        case "Employees":
          promptEmployees();
          break;
        case "Add Department, Role, or Employee":
          promptAdd();
          break;
        case "Update Employee Information":
          promtUpdate();
          break;
      }
    });
};
// add department, add role, add employee, update employee role
// view all dept->dept name and ids
// view all roles->job titles, role id, dept for role, salary
// view all emp->ids, first name, last name, title, dept, manager
// CRUD ops
// add dept->name of dept-create
// add role->name, salary, dept-create
// add emp->name, role, manager-create
// update emp->select and update new role-update
