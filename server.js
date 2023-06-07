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

const addRole = () => {
   return connection.promise().query(
    'SELECT department.id', 'department.name FROM department;'
   ) .then (([department]) => {
    let departmentChoice = department.map(({
        id, name
    }) => 
    ({
        name: name,
        value: id
    }));
    inquirer.prompt(
        [{
            type: 'input',
            name: 'newRole',
            message: 'Please enter the title of the new role',
            validate: roleName => {
                if (roleName) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'department',
            message: 'In what department would you like to place the new role?',
            choices: departmentChoice
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Please enter the salary for the new role',
            validate: salary => {
                if (salary) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]
)
    .then (({ newRole, department, salary}) => {
        const query = connection.query(
            'INSERT INTO role SET ?',
            {
                title: newRole,
                department_id: department,
                salary: salary
            },
            function (err, res) {
                if (err) throw err;
            }
        )
    }).then(() => //function())
   })
};

const addEmployee = (role) => {
    return connection.promise().query(
        'SELECT Role.id, role.title FROM Role;'
    )
    .then (([employee]) => {
        var titleChoice = employee.map(({
            id, title
        }) => ({
            value: id, 
            name: title
        }))
    connection.promise().query(
        'SELECT Employee.id, CONCAT(Employee.first_name,``,Employee.last_name) AS manager FROM Employee;'
    ).then(([manager]) => {
        let managerChoice = manager.map(({
            id, 
            manager
        }) => ({
            value:id, 
            name: manager
        }));
        inquirer.prompt(
            [{
                type: 'input',
                name: 'firstName',
                message: 'What is the employees first name?',
                validate firstName => {
                    if (firstName) {
                        return true;
                    } else {
                        console.log('Please enter the first name of the employee')
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the the employees last name?',
                validate: lastName => {
                    return true;
                } else {
                    console.log('Please enter the last name of the employee')
                    return false;
                }
            }
        }]
        )
    })
    }