-- Seed data for department table
INSERT INTO department (department_name) VALUES
    ('Coaches'),
    ('Forwards'),
    ('Midfielders'),
    ('Defenders');

-- Seed data for role table
INSERT INTO role (title, salary, dept_id) VALUES
    ('Manager', 600000, 1),
    ('Head Physio', 400000, 1),
    ('Striker', 700000, 2),
    ('Winger', 500000, 2),
    ('Offensive Midfielder', 550000, 3),
    ('Defensive Midfielder', 350000, 3),
    ('Backs', 65000, 4),
    ('Goalies', 45000, 4);

-- Seed data for employees table
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
    ('Carlo', 'Ancelloti', 1, 0),
    ('Karim', 'Benzema', 2, 1),
    ('Vinicius', 'Junior', 3, 1),
    ('Tony', 'Kroos', 4, 2),
    ('Luka', 'Modric', 5, 3),
    ('Danny', 'Carvajal', 6, 3),
    ('Antonio', 'Rudiger', 7, 4),
    ('Thibaut', 'Courtois', 8, 7);
