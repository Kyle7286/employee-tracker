const inquirer = require("inquirer");
const mysql = require('mysql');
const chalk = require('chalk');
require("dotenv").config();
require('console.table');

// SQL Connection details
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});
// INQ: Main Menu
const promptUserMainMenu = () => {
    return inquirer.prompt([
        {
            type: 'rawlist',
            choices: ["View all employees", "View all roles", "View all departments", "Add employee", "Add department", "Add role", "Update role", "Quit"],
            message: 'Please make a selection:',
            name: 'selection',
        },
    ]);
}
// INQ: Update Role
const updateRole = () => {
    connection.query("SELECT employees.id, employees.first_name, employees.last_name, employees.role_id, roles.title FROM employees INNER JOIN roles ON employees.role_id = roles.id ORDER BY role_id;",
        (err, data) => {
            if (err) throw err;
            inquirer.prompt([
                {
                    type: 'rawlist',
                    message: 'Which employee would you like to update?',
                    choices() {
                        return data.map((element) => {
                            return element.first_name + " " + element.last_name;
                        });
                    },
                    name: 'choiceEmployee',
                },
                {
                    type: 'rawlist',
                    message: 'Which role would you like to assign?',
                    choices() {
                        let choiceArray = data.map((element) => {
                            return element.title;
                        });
                        return [...new Set(choiceArray)]
                    },
                    name: 'choiceRole',
                },
            ]).then((input) => {
                // Get roleid of the selected title
                let roleID = (data.filter(element => element.title === input.choiceRole))[0].role_id;
                console.log(roleID);

                // Get employee id of the selected employee
                let employeeID = (data.filter(element => element.first_name + " " + element.last_name === input.choiceEmployee))[0].id;
                console.log(employeeID);

                // Update role for selected employee
                connection.query(
                    'UPDATE employees SET ? WHERE ?',
                    [
                        {
                            role_id: roleID,
                        },
                        {
                            id: employeeID,
                        },
                    ],
                    (err, res) => {
                        if (err) throw err;
                        console.log(`Successfully updated the role!`);
                        promptMainMenu();
                    }
                );
            });
        });
}
// INQ: Add Role
const addRole = () => {
    connection.query("SELECT distinct departments.name, departments.id FROM departments;",
        (err, data) => {
            if (err) throw err;
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'Roles\'s title?',
                    name: 'inputTitle',
                },
                {
                    type: 'input',
                    message: 'Salary?',
                    name: 'inputSalary',
                },
                {
                    type: 'rawlist',
                    message: 'Which department?',
                    choices() {

                        return data.map((element) => {
                            return element.name;
                        });

                    },
                    name: 'choiceDepartment',
                },
            ]).then((input) => {
                // Get department ID of the selected title
                let departmentID = (data.filter(element => element.name === input.choiceDepartment))[0].id;

                // Insert role into DB
                connection.query(
                    'INSERT INTO roles SET ?',
                    {
                        title: input.inputTitle,
                        salary: input.inputSalary,
                        department_id: departmentID,
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log(`Role ` + chalk.bold.green(`${input.inputTitle}`) + ` successfully added into the system!`);
                        promptMainMenu();
                    }
                );
            });
        });
}
// INQ: Add Department
const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Department\'s name?',
                name: 'departmentName',
            },
        ]).then((input) => {
            // Insert employee into DB
            connection.query(
                'INSERT INTO departments SET ?',
                {
                    name: input.departmentName,
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`Department ` + chalk.bold.green(`${input.departmentName}`) + ` successfully added into the system!`);
                    promptMainMenu();
                }
            );
        });
};
// INQ: Add Employee
const addEmployee = () => {
    connection.query("SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, employees.role_id, roles.title FROM employees INNER JOIN roles ON employees.role_id = roles.id;", (err, data) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                message: 'Employee\'s first name?',
                name: 'firstName',
            },
            {
                type: 'input',
                message: 'Employee\'s last name?',
                name: 'lastName',
            },
            {
                type: 'rawlist',
                message: 'Employee\'s role?',
                choices() {
                    let choiceArray = data.map((element) => {
                        return element.title;
                    });
                    return [...new Set(choiceArray)]
                },
                name: 'choiceRole',
            },
            {
                type: 'rawlist',
                message: 'Employee\'s manager?',
                choices() {
                    let choiceArray = data.map((element) => {
                        return element.first_name + " " + element.last_name;
                    });
                    choiceArray.push("None");
                    return choiceArray;
                },
                name: 'choiceManager',
            },
        ]).then((input) => {
            // Get roleid of the selected title
            let roleid = (data.filter(element => element.title === input.choiceRole))[0].role_id;

            // Get Manager ID of selected Manager
            let managerid;
            if (input.choiceManager != "None") {
                managerid = (data.filter(element => element.first_name + " " + element.last_name === input.choiceManager))[0].id;
            } else { managerid = null }

            // Insert employee into DB
            connection.query(
                'INSERT INTO employees SET ?',
                {
                    first_name: input.firstName,
                    last_name: input.lastName,
                    manager_id: managerid,
                    role_id: roleid,
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`Employee ` + chalk.bold.green(`${input.firstName} ${input.lastName}`) + ` successfully added into the system!`);
                    promptMainMenu();
                }
            );
        });
    });
}
// Main Menu
function promptMainMenu() {
    promptUserMainMenu()
        .then(response => {
            // Run respective function based on selection
            switch (response.selection) {
                case "View all employees":
                    viewEmployees();
                    break;
                case "View all roles":
                    viewRoles();
                    break;
                case "View all departments":
                    viewDepartments();
                    break;
                case "Add employee":
                    addEmployee();
                    break;
                case "Add department":
                    addDepartment();
                    break;
                case "Add role":
                    addRole();
                    break;
                case "Update role":
                    updateRole();
                    break;
                case "Quit":
                    finish();
                    break;
            }

        });
}
const init = () => {
    console.log(chalk.bold.blue('Employee Management System'));
    console.log(`
    Hello!

                            `+ chalk.underline('Thank you') + ` SO much for using` + chalk.bold.blue('Employee Management System') + `! Hope you find it to be very useful.
                    Please begin by entering the Team's name! :)
                        `);
    promptMainMenu();
}
function viewDepartments() {
    connection.query("select * from departments", (err, data) => {
        if (err) throw err;
        console.table(data);
        promptMainMenu();
    })
}
function viewRoles() {
    connection.query("select * from roles", (err, data) => {
        if (err) throw err;
        console.table(data);
        promptMainMenu();
    })
}
function viewEmployees() {
    connection.query("select * from employees", (err, data) => {
        if (err) throw err;
        console.table(data);
        promptMainMenu();
    })
}
function finish() {
    connection.end();
    process.exit();
}
// Run script on call
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId} `);
    // Run init() function
    init();
});



