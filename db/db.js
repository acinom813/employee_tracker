const mysql = require("mysql");

//Establish connection host, PORT, and user information
const connection = mysql.createConnection({
    host: "localhost",
    port: 8000,
    user: "default",
    password: "default",
    database: "employeeTracker_db",
});

connection.connect(function(err) {
    if(err) throw err;
});

module.exports = connection;