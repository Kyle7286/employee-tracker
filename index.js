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
            type: 'list',
            choices: ["View all employees", "View all roles", "View all departments", "Add employee", "Finish"],
            message: 'Please make a selection:',
            name: 'selection',
        },
    ]);
}

// INQ: Add Employee
const addEmployee = () => {
    connection.query("SELECT title, first_name, last_name FROM roles INNER JOIN employees ", (err, data) => {
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
                    const choiceArray = [];
                    return data.map((element) => {
                        return element.first_name + " " + element.last_name;
                    });
                },
                name: 'choiceManager',
            },
        ]);
    })


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

            `+ chalk.underline('Thank you') + ` SO much for using ` + chalk.bold.blue('Employee Management System') + `! Hope you find it to be very useful.
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
    console.log(`connected as id ${connection.threadId}`);
    // Run init() function
    init();
});



