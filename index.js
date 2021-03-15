const inquirer = require("inquirer");
const mysql = require('mysql');
const chalk = require('chalk');
require('console.table')


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'employeetracker_db',
});


// INQ: Main Menu
const promptUserMainMenu = () => {
    return inquirer.prompt([
        {
            type: 'rawlist',
            choices: ["View all employees", "View all roles", "View all departments", "Add employee", "Add department", "Add role", "Finish"],
            message: 'Please make a selection:',
            name: 'selection',
        },
    ]);
}

// INQ: Add Role
const addRole = () => {
    connection.query("SELECT roles.id, roles.title, roles.salary, roles.department_id, departments.name FROM roles INNER JOIN departments ON roles.department_id = departments.id", (err, data) => {
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
                    let choiceArray = data.map((element) => {
                        return element.name;
                    });
                    return [...new Set(choiceArray)]
                },
                name: 'choiceDepartment',
            },
        ]).then((input) => {
            // Get roleid of the selected title
            let departmentID = (data.filter(element => element.name === input.choiceDepartment))[0].department_id;
            console.log(departmentID);

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
                case "Finish":
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



