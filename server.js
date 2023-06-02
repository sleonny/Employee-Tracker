const mysql = require("mysql");
const inquirer = require("inquirer");
const fs = require('fs');
const { constants } = require("buffer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1Qws7u12",
  database: employees_db,
},
console.log('Connected to the Employee Database')
);

const mainMenu = () => {
    return inquirer.prompt([{
        name: 'Main_Menu',
        type: 'list',
        message: 'Where would you like to start?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    }])
    .then(userChoice => {
        switch (userChoice.mainMenu) {
            case 'View all departments':
                // function();
                break;
            case 'View all roles':
                // function();
                break;
            case 'View all employees':
                // function();
                break;
            case 'Add a department':
                // function();
                break;
            case 'Add a role':
                // function();
                break;
            case 'Add an employee':
                // function();
                break;
            case 'Update an employee role':
                // function();
                break;
            default:
                process.exit();
                
        }
    });
};

const selectDepartment = () => {
    connection.query(
    'SELECT * FROM DEPARTMENT;'
    (error, results) => {
        console.table(results);
        // function();
        }
    );
};

const selectRole = () => {
    connection.query(
    'SELECT * FROM ROLE;'
    (error, results) => {
        console.table(results);
        // function();
        }
    );
};

const selectEmployees = () => {
    connection.query(
        'SELECT * FROM EMPLOYEES;'
        (error, results) => {
        console.table(results);
        // function();
        }
    );
};

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the new department name?',
            validate: departmentName => {
                if (departmentName) {
                    return true;
                } else {
                    console.log('Please enter a name for the new department');
                    return false;
                }
            }
        }
    ])
    .then(name => {
        connection.promise().query('INSERT INTO department SET ?', name);
        //function;
    })
}