const mysql = require("mysql");

//Establish connection host, PORT, and user information
const connection = mysql.createConnection({
    host: "localhost",
    port: 8000,
    user: "root",
    password: " ",
    database: "employees_db",
});

//connect to DB
connection.connect((err) => {
    if(err) throw err;
});

//Export this module so that it can be imported by server.js

module.exports = connection;