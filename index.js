const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
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
          //   can put an array of objects into-serialize it for the console.table
          db.query(
            "SELECT * FROM employee_db.departments;",
            function (err, results) {
              console.table("\n", results);
            }
          );
          promptDB();
          break;
        case "Roles":
          db.query("SELECT * FROM employee_db.roles;", function (err, results) {
            console.table("\n", results);
          });
          promptDB();
          break;
        case "Employees":
          db.query(
            "SELECT * FROM employee_db.employee LEFT JOIN roles ON employee.role_id = roles.role_id ;",
            function (err, results) {
              console.table("\n", results);
            }
          );
          promptDB();
          break;
        case "Add Department, Role, or Employee":
          promptAdd();
          break;
        case "Update Employee Information":
          promptUpdate();
          break;
        case "Quit":
          "Good Bye";
          break;
        default:
          break;
      }
    });
};
// add department, add role, add employee, update employee role
const promptAdd = () => {
  inquirer
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
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What department would you like to add?",
      },
    ])
    .then((answer) => {
      const sql =
        "INSERT INTO employee_db.departments (department_name) VALUES (?)";
      const params = [answer.department];
      db.query(sql, params, (err, answer) => {
        if (err) {
          console.log(err);
        }
        console.log("success");
      });
      promptDB();
    });
};
// add role->name, salary, dept-create
const addRoles = () => {
  const sql1 = "SELECT * FROM employee_db.departments";

  db.query(sql1, (err, results) => {
    if (err) {
      console.log(err);
    }
    // console.log(results);
    // we go through the results to make an array of objects that has name key and value key
    const deptMap = results.map((department) => {
      return {
        name: `${department.department_name} ${department.department_id}`,
        value: department.department_id,
      };
    });
    console.log(deptMap);

    inquirer
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
        {
          type: "list",
          name: "dept_role",
          message: "What department is it in?",
          choices: deptMap,
        },
        // department id? this is broke-need the primary key to insert as the foreign key into the table
        // need to know department_id
      ])
      .then((answers) => {
        console.log(answers);
        const sql =
          "INSERT INTO employee_db.roles (title, salary, department_id) VALUES (?,?,?)";
        const params = [answers.role, answers.salary, answers.dept_role];
        db.query(sql, params, (err, answers) => {
          if (err) {
            console.log(err);
          }
          console.log(answers);
          promptDB();
        });
      });
  });
};
// add emp->name, role, manager-create
const addEmployees = () => {
  const sql1 =
    "SELECT * FROM employee_db.employee LEFT JOIN roles ON employee.role_id = roles.role_id";

  db.query(sql1, (err, results) => {
    if (err) {
      console.log(err);
    }
    // console.log(results);
    // we go through the results to make an array of objects that has name key and value key
    const manMap = results.map((manager) => ({
      name: `${manager.first_name} ${manager.last_name}`,
      value: manager.employee_id,
    }));
    // console.log(manMap); i receive the list of employees and their id
    const rolMap = results.map((roles) => ({
      name: `${roles.title} ${roles.role_id}`,
      value: roles.role_id,
    }));
    // console.log(rolMap);I receive the role title and id with a value being the id
    inquirer
      .prompt([
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
          type: "list",
          name: "manager",
          message: "Who is their manager?",
          choices: manMap,
        },
        {
          type: "list",
          name: "role_id",
          message: "What is their role title?",
          choices: rolMap,
        },
        // role id?
      ])
      .then((answers) => {
        console.log(answers);
        const sql =
          "INSERT INTO employee_db.employee (first_name, last_name, employee_id, role_id) VALUES (?)";
        const params = [
          answers.last_name,
          answers.first_name,
          answers.employee_id,
          answers.role_id,
        ];
        db.query(sql, params, (err, answers) => {
          if (err) {
            console.log(err);
          }
          console.log(answers);
        });
        promptDB();
      });
  });
};
// CRUD ops
// update emp->select and update new role-update
const promptUpdate = () => {
  inquirer
    .prompt([
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
        name: "role",
        message: "What their new role?",
      },
    ])
    .then((answers) => {
      console.log(answers);
      const sql =
        "UPDATE employee_db.employee (first_name, last_name, manager) WHERE ?";
      const params = [answers.last_name, answers.first_name, answers.role];
      db.query(sql, params, (err, answers) => {
        if (err) {
          console.log(err);
        }
        console.log(answers);
      });
      promptDB();
    });
};
db.connect(() => {
  console.log(`Connected to the employee_db database.`);
  promptDB();
});
