var mysql = require("mysql");
var inquirer = require("inquirer");
var fs = require('fs');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1Qws7u12",
  database: employees_db,
},
console.log('Connected to the Employee Database')
);


