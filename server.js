const mysql = require("mysql2");
const inquirer = require("inquirer");
const fs = require("fs");
require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1Qws7u12",
  database: "employees_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to the Employee Database");
  mainMenu();
});

const mainMenu = () => {
  return inquirer
    .prompt([
      {
        name: "mainMenu",
        type: "list",
        message: "Where would you like to start?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then((userChoice) => {
      switch (userChoice.mainMenu) {
        case "View all departments":
          selectDepartment;
          break;
        case "View all roles":
          selectRole;
          break;
        case "View all employees":
          selectEmployee;
          break;
        case "Add a department":
          addDepartment;
          break;
        case "Add a role":
          addRole;
          break;
        case "Add an employee":
          addEmployee;
          break;
        case "Update an employee role":
          updateRole;
          break;
        default:
          process.exit();
      }
    });
};

const selectDepartment = () => {
  connection.query("SELECT * FROM DEPARTMENT;", (error, results) => {
    console.table(results);
    mainMenu();
  });
};

const selectRole = () => {
  connection.query("SELECT * FROM ROLE;", (error, results) => {
    console.table(results);
    // function();
  });
};

const selectEmployee = () => {
  connection.query("SELECT * FROM EMPLOYEES;", (error, results) => {
    console.table(results);
    // function();
  });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the new department name?",
        validate: (departmentName) => {
          if (departmentName) {
            return true;
          } else {
            console.log("Please enter a name for the new department");
            return false;
          }
        },
      },
    ])
    .then((name) => {
      connection.promise().query("INSERT INTO department SET ?", name);
      //function;
    });
};

const addRole = () => {
  return connection
    .promise()
    .query("SELECT department.id, department.name FROM department;")
    .then(([department]) => {
      let departmentChoice = department.map(({ id, name }) => ({
        name: name,
        value: id,
      }));
      inquirer
        .prompt([
          {
            type: "input",
            name: "newRole",
            message: "Please enter the title of the new role",
            validate: (roleName) => {
              if (roleName) {
                return true;
              } else {
                return false;
              }
            },
          },
          {
            type: "list",
            name: "department",
            message: "In what department would you like to place the new role?",
            choices: departmentChoice,
          },
          {
            type: "input",
            name: "salary",
            message: "Please enter the salary for the new role",
            validate: (salary) => {
              if (salary) {
                return true;
              } else {
                return false;
              }
            },
          },
        ])
        .then(({ newRole, department, salary }) => {
          const query = connection.query(
            "INSERT INTO role SET ?",
            {
              title: newRole,
              department_id: department,
              salary: salary,
            },
            function (err, res) {
              if (err) throw err;
            }
          );
        })
        .then(() => {
          //function();
        });
    });
};

const addEmployee = () => {
  return connection
    .promise()
    .query("SELECT Role.id, Role.title FROM Role;")
    .then(([role]) => {
      let titleChoice = role.map(({ id, title }) => ({
        value: id,
        name: title,
      }));
      connection
        .promise()
        .query(
          "SELECT Employee.id, CONCAT(Employee.first_name, Employee.last_name) AS manager FROM Employee;"
        )
        .then(([manager]) => {
          let managerChoice = manager.map(({ id, manager }) => ({
            value: id,
            name: manager,
          }));
          inquirer
            .prompt([
              {
                type: "input",
                name: "firstName",
                message: "What is the employee's first name?",
                validate: (firstName) => {
                  if (firstName) {
                    return true;
                  } else {
                    console.log("Please enter the first name of the employee");
                    return false;
                  }
                },
              },
              {
                type: "input",
                name: "lastName",
                message: "What is the employee's last name?",
                validate: (lastName) => {
                  if (lastName) {
                    return true;
                  } else {
                    console.log("Please enter the last name of the employee");
                    return false;
                  }
                },
              },
              {
                type: "list",
                name: "role",
                message: "What is the role of the new employee?",
                choices: titleChoice,
              },
              {
                type: "list",
                name: "manager",
                message: "Who will be the new employee's manager?",
                choices: managerChoice,
              },
            ])
            .then(({ firstName, lastName, role, manager }) => {
              const query = connection.query(
                "INSERT INTO Employee SET ?",
                {
                  first_name: firstName,
                  last_name: lastName,
                  role_id: role,
                  manager_id: manager,
                },
                function (err, res) {
                  if (err) throw err;
                  console.log({ role, manager });
                }
              );
            })
            .then(() => selectEmployees());
        });
    });
};

const updateRole = () => {
  return connection
    .promise()
    .query(
      "SELECT Role.id, Role.title, Role.salary, Role.department_id FROM Role;"
    )
    .then(([role]) => {
      let roleChoices = roles.map(({ id, title }) => ({
        value: id,
        name: title,
      }));
      inquirer
        .prompt([
          {
            type: "list",
            name: "role",
            message: "Please select the role you would like to update",
            choices: roleChoices,
          },
        ])
        .then((role) => {
          console.log(role);
          inquirer
            .prompt([
              {
                type: "input",
                name: "title",
                message: "Enter the name of the title",
                validate: (titleName) => {
                  if (titleName) {
                    return true;
                  } else {
                    console.log("You must enter a title");
                    return false;
                  }
                },
              },
            ])
            .then(({ title, salary }) => {
              const query = connection.query(
                "UPDATE role SET title = ?, salary = ? WHERE id = ?",
                [title, salary, role.roles],
                function (err, res) {
                  if (err) throw err;
                }
              );
            })
            .then(() => mainMenu());
        });
    });
};
mainMenu();
