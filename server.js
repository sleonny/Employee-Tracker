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
        type: "list",
        name: "mainMenu",
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
          selectDepartment();
          break;
        case "View all roles":
          selectRole();
          break;
        case "View all employees":
          selectEmployee();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateRole();
          break;
        default:
          process.exit();
      }
    });
};

const selectDepartment = () => {
  connection.query("SELECT * FROM DEPARTMENT;", (error, results) => {
    console.table(results);
    console.log(error);
    mainMenu();
  });
};

const selectRole = () => {
  connection.query("SELECT * FROM ROLE;", (error, results) => {
    console.table(results);
    mainMenu();
  });
};

const selectEmployee = () => {
  connection.query("SELECT * FROM EMPLOYEE;", (error, results) => {
    console.table(results);
    mainMenu();
  });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department_name",
        message: "What is the new department name?",
        validate: (departmentNameInput) => {
          if (departmentNameInput) {
            return true;
          } else {
            console.log("Please enter a name for the new department");
            return false;
          }
        },
      },
    ])
    .then(({ department_name }) => {
      connection.query(
        "INSERT INTO department SET ?",
        { department_name: department_name },
        (error, result) => {
          if (error) {
            console.error("There was an error in addDepartment: ", error);
            throw error;
          }
          selectDepartment();
        }
      );
    });
};

const addRole = () => {
  return connection
    .promise()
    .query("SELECT department.id, department.department_name FROM department;")
    .then(([department]) => {
      let departmentChoice = department.map(({ id, department_name }) => ({
        name: department_name,
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
          connection.query(
            "INSERT INTO role SET ?",
            {
              title: newRole,
              dept_id: department,
              salary: salary,
            },
            function (err, res) {
              if (err) {
                console.error("There was an error in addRole: ", err);
                throw err;
              }
            }
          );
        })
        .then(() => {
          selectRole();
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
          "SELECT Employee.id, CONCAT(Employee.first_name, ' ', Employee.last_name) AS manager FROM Employee;"
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
              connection.query(
                "INSERT INTO Employee SET ?",
                {
                  first_name: firstName,
                  last_name: lastName,
                  role_id: role,
                  manager_id: manager,
                },
                function (err, res) {
                  if (err) {
                    console.error("There was an error in addEmployee: ", err);
                    throw err;
                  }
                  console.log(res);
                }
              );
            })
            .then(() => selectEmployee());
        });
    });
};

const updateRole = () => {
  return connection
    .promise()
    .query("SELECT Role.id, Role.title, Role.salary, Role.dept_id FROM Role;")
    .then(([role]) => {
      let roleChoices = role.map(({ id, title }) => ({
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
          {
            type: "input",
            name: "title",
            message: "Enter the new name of the title",
            validate: (titleName) => {
              if (titleName) {
                return true;
              } else {
                console.log("You must enter a title");
                return false;
              }
            },
          },
          {
            type: "input",
            name: "salary",
            message: "Enter the new salary",
            validate: (salary) => {
              if (salary) {
                return true;
              } else {
                console.log("You must enter a salary");
                return false;
              }
            },
          },
        ])
        .then(({ role, title, salary }) => {
          connection.query(
            "UPDATE role SET title = ?, salary = ? WHERE id = ?",
            [title, salary, role],
            function (err, res) {
              if (err) {
                console.error("There was an error in updateRole: ", err);
                throw err;
              }
            }
          );
        })
        .then(() => mainMenu());
    });
};
