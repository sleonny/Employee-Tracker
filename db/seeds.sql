-- departments.seeds.sql

-- Inserting data into the department table
INSERT INTO department (department_name) VALUES ('Finance');
INSERT INTO department (department_name) VALUES ('Human Resources');
INSERT INTO department (department_name) VALUES ('Marketing');
INSERT INTO department (department_name) VALUES ('Sales');
INSERT INTO department (department_name) VALUES ('Engineering');
INSERT INTO department (department_name) VALUES ('Customer Service');
INSERT INTO department (department_name) VALUES ('IT');
INSERT INTO department (department_name) VALUES ('Operations');

-- roles.seeds.sql

-- Inserting data into the role table
INSERT INTO role (title, salary, dept_id) VALUES ('Accountant', 50000, 1);
INSERT INTO role (title, salary, dept_id) VALUES ('HR Manager', 60000, 2);
INSERT INTO role (title, salary, dept_id) VALUES ('Marketing Specialist', 45000, 3);
INSERT INTO role (title, salary, dept_id) VALUES ('Sales Representative', 55000, 4);
INSERT INTO role (title, salary, dept_id) VALUES ('Software Engineer', 80000, 5);
INSERT INTO role (title, salary, dept_id) VALUES ('Customer Service Representative', 40000, 6);
INSERT INTO role (title, salary, dept_id) VALUES ('IT Manager', 70000, 7);
INSERT INTO role (title, salary, dept_id) VALUES ('Operations Supervisor', 55000, 8);

-- employees.seeds.sql

-- Inserting data into the employees table
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Smith', 2, 2);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Michael', 'Johnson', 3, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Emily', 'Davis', 4, 4);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('David', 'Lee', 5, 5);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Sarah', 'Wilson', 6, 6);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Matthew', 'Clark', 7, 7);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Jennifer', 'Taylor', 8, 8);
