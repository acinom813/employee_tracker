const mysql = require("mysql");

//Establish connection for sql database: host, PORT, and user information
const connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "12345678",
    database: "employees",
});

//connect to DB

connection.connect((err) => {
    if (err) throw err;
});

//Export this module so that it can be imported by server.js

module.exports = connection;