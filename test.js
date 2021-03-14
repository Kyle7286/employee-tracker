const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'employeetracker_db',
});

function getRoles() {
    connection.query("select title from roles", (err, data) => {
        if (err) throw err;

        newarray = data.map((element) => {
            return element.title;
        })

        // console.log(newarray);
        gArray =  newarray;
    })
}


// Run script on call
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    // Run init() function
    let a = getRoles();
    console.log(a);
});


