//Installed npm package dependencies
const connection = require("./db/db.js");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const mysql = require("mysql");
const { connect } = require("./db/db.js");

//Prompt user to select course of action

const questions = function() {
inquirer
    .prompt ({
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
        ]

})

    .then((answer) => {
    {switch(answer.start) {
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
            viewAllRoles():
            break;
        case "add role":
            addRole ();
            break;
        case "view all departments":
            viewAllDepartments();
            break;
        case "add department":
            addDepartment();
            break;
    }
};

});

questions();

//User is able to view all employees currently in db

const viewAllEmployees = () => {
    console.log("retrieving all employees from database");
    const query =
    'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role.id = role.id LEFT JOIN department on role.department_id = department.id;';
    connection.query(query, (err, answer) => {
    console.table(answer);
    });
    questions();
}

//User is able to view all roles currently in db

//User is able to view all departments in db
