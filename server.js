//Installed npm package dependencies
const connection = require("./db/db.js");
const inquirer = require("inquirer")
const consoleTable = require("console.table");
const mysql = require("mysql");
const {prompt} = require("inquirer");
//Prompt user to select course of action

const questions = function() {
    inquirer.prompt ([
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
        ]
    },
    ]) .then((answer) => {
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
            viewAllRoles();
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

//User is able to view all departments currently in database 
const viewAllDepartments = () => {
    connection.query("SELECT * FROM department", (err, answer) => {
        console.log("\n Departments retrieved from database \n");
        console.table(answer);
    });
    questions();
}

//User is able to view all employee roles currently in database
const viewAllRoles = () => {
    connection.query("SELECT * FROM role", (err,answer) => {
        console.log("\n Roles Retrieved from Database \n");
        console.table(answer);
    });
    questions();

}

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

//User is able to add a new employee
const addEmployee = () =>
    inquirer.prompt ([
       {
        type: "input",
        message: "Enter employee's first name.",
        name: "firstname"
       },
       {
        type: "input",
        message: "Enter employee's last name.",
        name: "lastname"
       }

    ]).then((answer) => {
        connnection.query =
        "INSERT INTO employee SET ?",
        {
            first_name: answer.firstname,
            last_name: answer.lastname,
            role_id: null,
            manager_id: null
        },
        (err, answer) => {
            if (err) {
                throw err;
            }
            console.table(answer);
        }
        questions();
    });
   



//User is able to grab employees and update their role
const updateEmployee = () => {
    let allemp = [];
    connection.query("SELECT * FROM employee", (err,answer) => {
        for (let i = 0; i < answer.length; i++) {
            let employeeString =
              answer[i].id + " " + answer[i].first_name + " " + answer [i].last.name;
              allemp.push(employeeString);   
        }
        inquirer.prompt ([
        {
            type: "list",
            name: "updateEmployRole",
            message: "Select an employee to update",
            choices: allemp
        },
        {
            type: "list",
            name: "newrole",
            message: "Update employees role",
            choices: ["manager", "employee"],
        },
        ])
        .then((answer) => {
            console.log ("update processing", answer);
            const updateID = {};
            updateID.employeeId = parseInt(answer.updateEmployRole.split(" ") [0]);
            if (answer.newrole === "manager") {
                updateID.role_id = 1;
            } else if (answer.newrole === "employee") {
                updateID.role_id = 2;
            }
            connection.query(
                "UPDATE employee SET role_id = ? WHERE id = ?",
                [updateID.role_id, updateID.employeeId],
                (err, data) => {
                    questions();
                }
            );

        });
    });
}

//User is able to add a new departments in db
const addDepartment = () => {
    inquirer.prompt({
        type: "input",
        name: "newdept",
        message:"Enter name of new department."
    })
    .then((answer) => {
        connnection.query(
            "INSERT INTO department SET ?",
        {
            name: answer.newdept
        },
         (err, answer) => {
             if (err) {
                 throw err;
             }
         }
        ),
        console.table(answer);
        questions();
    });
}

//User is able to add a new role/title

const addRole = () => {
    inquirer.prompt([
        {
            type:"input",
            name: "addtitle",
            message:"Enter employee's title"
        },
        {
            type:"input",
            name: "addsalary",
            message:"Enter employee's salary"
        },
        {
            type:"input",
            name: "addDepId",
            message:"Enter employee's department id",
        }
    ])
    .then((answer) => {
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: answer.addtitle,
                salary: answer.addsalary,
                department_id: answer.addDepID
            },
            (err, answer) => {
                if(err) {
                    throw err;
                }
                console.table(answer);
            }
        );
       
    });
}
questions();