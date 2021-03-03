const mysql = require("mysql");

//Establish connection host, PORT, and user information
const connection = mysql.createConnection({
    host: "localhost",
    port: 8000,
    user: "root",
    password: "root",
    database: "employees_db",
});

connection.connect(function(err) {
    if(err) throw err;
});

module.exports = connection;