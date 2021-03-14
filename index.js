
const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'employees_db'
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected as ID ${connection.threadId}`);
  
    
});


launchMenu = () => {
    inquirer.prompt(
        {
            type: 'list',
            name: 'menuChoice',
            message: 'This is my Employee Tracker! What would you like to do?',
            choices: [
                'View ALL employees',
                'View employees by ROLE',
                'View employees by DEPARTMENT',
                'ADD employee',
                'ADD role',
                'ADD department',
                'UPDATE employee role',
                'Exit'
            ]
        }
    )

    viewAllEmployees = () => {
       
        connection.query(
            "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON department.id = role.department_id LEFT JOIN employee m ON employee.manager_id = m.id;",
            (err, res) => {
                if (err) throw err;
                console.table(res);
                launchMenu();
            }
        )
    };
    viewEmployeeRoles = () => {
        // console.log('view roles');
        connection.query(
            "SELECT employee.first_name, employee.last_name, role.title AS role FROM employee JOIN role ON employee.role_id = role.id;",
            (err, res) => {
                if (err) throw err;
                console.table(res);
                launchMenu();
            }
        )
    };

    viewEmployeeDept = () => {
        // console.log('view dept');
        connection.query(
            "SELECT employee.first_name, employee.last_name, department.name AS department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
            (err, res) => {
                if (err) throw err;
                console.table(res);
                launchMenu();
            }
        )
    };
