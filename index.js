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


// promptMainMenu, Selections
const promptUserMainMenu = () => {
    return inquirer.prompt([
        {
            type: 'list',
            choices: ["View all employees", "View all roles", "View all departments", "Finish"],
            message: 'Please make a selection:',
            name: 'selection',
        },
    ]);
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




