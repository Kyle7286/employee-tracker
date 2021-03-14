-- Department seeds --
INSERT INTO departments (name) VALUE ("Sales");
INSERT INTO departments (name) VALUE ("Engineering");
INSERT INTO departments (name) VALUE ("Finance");
INSERT INTO departments (name) VALUE ("Legal");
-- Employee roles --
INSERT INTO roles (title, salary, department_id) VALUE ("Lead Engineer", 120000, 2);
INSERT INTO roles (title, salary, department_id) VALUE ("Software Engineer" , 110000, 2);
INSERT INTO roles (title, salary, department_id) VALUE ("Accountant", 100000, 3);
INSERT INTO roles (title, salary, department_id) VALUE ("Sales Lead", 90000, 1);
INSERT INTO roles (title, salary, department_id) VALUE ("Salesperson", 70000, 1);
INSERT INTO roles (title, salary, department_id) VALUE ("Legal Team Lead", 115000, 4);
INSERT INTO roles (title, salary, department_id) VALUE ("Lawyer", 145000, 4);
-- Employee Seeds --
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUE ("John", "Doe", 1, 1);
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUE ("Jane", "Doe", 2, 2);
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUE ("Homer","Simpson",null,3);
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUE ("Hank", "Hill", 1, 4);
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUE ("John", "Travolta", null, 5);
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUE ("Kevin", "Spacey", 4, 6);
SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;