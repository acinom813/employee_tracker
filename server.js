//Installed npm package dependencies
const connection = require("./db/db.js");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const mysql = require("mysql");
const { prompt } = require("inquirer");
//Prompt user to select course of action

const questions = function () {
  inquirer
    .prompt([
      {
        type: "list",
        name: "start",
        message: "Select one of the following employee management options?",
        choices: [
          "view all employees",
          "add employee",
          "update employee",
          "remove employee",
          "view all roles",
          "add role",
          "view all departments",
          "add department",
        ],
      },
    ])
    .then((answer) => {
      {
        switch (answer.start) {
          case "view all employees":
            viewAllEmployees();
            break;
          case "add employee":
            addEmployee();
            break;
          case "update employee":
            updateEmployee();
            break;
          case "remove employee":
            removeEmployee();
            break;
          case "view all roles":
            viewAllRoles();
            break;
          case "add role":
            addRole();
            break;
          case "view all departments":
            viewAllDepartments();
            break;
          case "add department":
            addDepartment();
            break;
        }
      }
    });
};
 

//User is able to view all departments currently in database
const viewAllDepartments = () => {
  connection.query("SELECT * FROM department", (err, answer) => {
    console.log("\n Departments retrieved from database \n");
    console.table(answer);
  });
  questions();
};

//User is able to view all employee roles currently in database
const viewAllRoles = () => {
  connection.query("SELECT * FROM role", (err, answer) => {
    console.log("\n Roles Retrieved from Database \n");
    console.table(answer);
  });
  questions();
};


//User is able to view all employees currently in db

const viewAllEmployees = () => {
  console.log("retrieving all employees from database");
  const query =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;";
  connection.query(query, (err, answer) => {
    console.table(answer);
    questions();
  });
 
};

//User is able to add a new employee
const addEmployee = () =>
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter employee's first name.",
        name: "firstname",
      },
      {
        type: "input",
        message: "Enter employee's last name.",
        name: "lastname",
      },
      {
        type: "input",
        message: "Enter employee's role id.",
        name: "role_id",
      },
      {
        type: "input",
        message: "Enter employee's manager's id.",
        name: "manager_id",
      },
    ])
    .then((answer) => {
      connection.query("INSERT INTO employee SET ?",
        {
          first_name: answer.firstname,
          last_name: answer.lastname,
          role_id: answer.role_id,
          manager_id: answer.manager_id,
        },
        (err, data) => {
          if (err) {
            throw err;
          }
          console.log(data)
          console.table(data);
          questions();
        });
     
    });

//User is able to grab employees and update their role
const updateEmployee = () => {
  let allemp = [];
  connection.query("SELECT * FROM employee", (err, answer) => {
    for (let i = 0; i < answer.length; i++) {
      let employeeString ={
          name: answer[i].first_name + " " + answer[i].last_name,
          value: answer[i].id 
      }
       
      allemp.push(employeeString);
    }

   
   

    inquirer
      .prompt([
        {
          type: "list",
          name: "updateEmployRole",
          message: "Select an employee to update",
          choices: allemp,
        },
        {
            type: "input",
            message: "Enter employee's role id.",
            name: "role_id",
          },
      ])
      .then((answer) => {
        
        connection.query(
          "UPDATE employee SET role_id = ? WHERE id = ?",
          [answer.role_id,  answer.updateEmployRole],
          (err, data) => {
            questions();
          }
        );
      });
  });
};

//User is able to add a new departments in db
const addDepartment = () => {
  inquirer
    .prompt({
      type: "input",
      name: "newdept",
      message: "Enter name of new department.",
    })
    .then((answer) => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.newdept,
        },
        (err, answer) => {
          if (err) {
            throw err;
          }
          console.table(answer);
          questions();
        }
      )
       
    });
};

//User is able to add a new role/title

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addtitle",
        message: "Enter employee's title",
      },
      {
        type: "input",
        name: "addsalary",
        message: "Enter employee's salary",
      },
      {
        type: "input",
        name: "addDepId",
        message: "Enter employee's department id",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.addtitle,
          salary: answer.addsalary,
          department_id: answer.addDepId,
        },
        (err, answer) => {
          if (err) {
            throw err;
          }
          console.table(answer);
          questions();
        }
      );
     
    });
};
questions();
