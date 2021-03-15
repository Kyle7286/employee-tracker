-- Department seeds --
INSERT INTO departments (name) VALUE ("Sales");
INSERT INTO departments (name) VALUE ("Service");
INSERT INTO departments (name) VALUE ("Customer Success");
INSERT INTO departments (name) VALUE ("Applications");
INSERT INTO departments (name) VALUE ("Development");
-- Employee roles --
-- Sales - 1 --
INSERT INTO roles (title, salary, department_id) VALUE ("Lead Sales Representative", 75000, 1);
INSERT INTO roles (title, salary, department_id) VALUE ("Sales Representative", 60000, 1);
INSERT INTO roles (title, salary, department_id) VALUE ("Sales Intern", 45000, 1);
-- Service - 2 --
INSERT INTO roles (title, salary, department_id) VALUE ("Service Team Lead", 60000, 2);
INSERT INTO roles (title, salary, department_id) VALUE ("Service Consultant", 45000, 2);
INSERT INTO roles (title, salary, department_id) VALUE ("Service Intern", 35000, 2);
-- Customer Success - 3 --
INSERT INTO roles (title, salary, department_id) VALUE ("Customer Success Lead", 80000, 3);
INSERT INTO roles (title, salary, department_id) VALUE ("Customer Success Consultant", 60000, 3);
INSERT INTO roles (title, salary, department_id) VALUE ("Customer Success Intern", 40000, 3);
-- Applications - 4 --
INSERT INTO roles (title, salary, department_id) VALUE ("Applications Team Lead", 65000, 4);
INSERT INTO roles (title, salary, department_id) VALUE ("Senior Application Administrator", 60000, 4);
INSERT INTO roles (title, salary, department_id) VALUE ("Application Administrator", 50000, 4);
INSERT INTO roles (title, salary, department_id) VALUE ("Application Administrator Intern", 35000, 4);
-- Development - 5 --
INSERT INTO roles (title, salary, department_id) VALUE ("Software Engineer Team Lead", 80000, 5);
INSERT INTO roles (title, salary, department_id) VALUE ("Software Engineer", 60000, 5);
INSERT INTO roles (title, salary, department_id) VALUE ("Software Engineer Intern", 35000, 5);
-- Employee Seeds --
-- Sales --
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUE ("King", "Smith", null, 1);
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUE ("Bishop", "Ellis", 1, 2);
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUE ("Knight", "Green", 1, 2);
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUE ("Rook", "Livingston", 1, 2);
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUE ("Pawn", "Greer", 1, 3);
-- Service --
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUE ("Rock", "Owens", null, 4);
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUE ("River", "Cunningham", 6, 5);
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUE ("Aurora", "Skies", 6, 5);
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUE ("Plains", "McSnowden", 6, 5);
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUE ("Tree", "Log", 6, 6);
-- Customer Success --
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUE ("Saphire", "Banks", null, 7);
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUE ("Ruby", "Jones", 11, 8);
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUE ("Emeralda", "Garcia", 11, 8);
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUE ("Jasmin", "Miller", 11, 8);
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUE ("Frank", "Arellius", 11, 9);
-- Applications --
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUE ("Zues", "Delphi", null, 10);
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUE ("Hera", "Lasus", 16, 11);
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUE ("Demeter", "Opus", 16, 12);
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUE ("Athena", "Troy", 16, 12);
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUE ("Steve", "Bernard", 16, 13);
-- Development --
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUE ("Max", "Aiden", null, 14);
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUE ("Livia", "Brown", 21, 15);
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUE ("Vita","Thompson", 21,15);
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUE ("Ben","Walker", 21,16);

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;