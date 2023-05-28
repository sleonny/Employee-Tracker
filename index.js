var mysql = require("mysql");
var express = require("express");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1Qws7u12",
    database: employeetracker_db
});

