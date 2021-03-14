
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


    addEmployee = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Please enter their first name'
            }, {
                type: 'input',
                name: 'lastName',
                message: 'Please enter their last name'
            }, {
                type: 'list',
                name: 'roleChoice',
                message: 'Please select their role',
                choices: selectRole()
            }, {
                type: 'list',
                name: 'managerChoice',
                message: 'Do they have a manager?',
                choices: ['Yes', 'No']
            }
        ]).then((data) => {
            if (data.managerChoice == 'Yes') {
                selectManager(data);
            } else {
                const roleId = data.roleChoice;
                connection.query('INSERT INTO employee SET ?', {
                    first_name: data.firstName,
                    last_name: data.lastName,
                    role_id: roleId,
                    manager_id: null
                }, (err, res) => {
                    viewAllEmployees();
                    if (err) throw err;
                });
            }
        })
    };

    selectRole = () => {
        connection.query(
            'SELECT * FROM role',
            (err, res) => {
                if (err) throw err;
                for (let i = 0; i < res.length; i++) {
                    let newEmpRole = { name: res[i].title, value: res[i].id };
                    roleArr.push(newEmpRole)
                }
            }
        )
        return roleArr;
    }

    selectManager = (data) => {
        connection.query(
            'SELECT first_name, last_name, id FROM employee WHERE manager_id IS NULL;',
            (err, res) => {
                if (err) throw err;
                for (let i = 0; i < res.length; i++) {
                    let managerName = { name: `${res[i].first_name} ${res[i].last_name}`, value: res[i].id };
                    managerArr.push(managerName)
                }
                inquirer.prompt({
                    type: 'list',
                    name: 'manager',
                    message: 'Please enter their manager',
                    choices: managerArr
                }).then((response) => {
                    const roleId = data.roleChoice
                    // console.log(roleId);
                    // console.log(response.manager);
                    const managerId = response.manager; 
                    connection.query('INSERT INTO employee SET ?', {
                        first_name: data.firstName,
                        last_name: data.lastName,
                        role_id: roleId,
                        manager_id: managerId
                    }, (err, res) => {
                        // console.table(data)
                        viewAllEmployees();
                        if (err) throw err;
                    });
                })
            }
        )
    }

    addRole = () => {
        connection.query(
            'SELECT * FROM department',
            (err, res) => {
                if (err) throw err;
                for (let i = 0; i < res.length; i++) {
                    deptArr.push({ name: res[i].name, value: res[i].id });
                }
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'roleTitle',
                        message: 'What is the new role title?'
                    }, {
                        type: 'input',
                        name: 'roleSalary',
                        message: 'What is the new role salary'
                    }, {
                        type: 'list',
                        name: 'roleDept',
                        message: 'What department does the new role fall under?',
                        choices: deptArr
                    }
                ]).then((data) => {
                    connection.query(
                        'INSERT INTO role SET ?',
                        {
                            title: data.roleTitle,
                            salary: data.roleSalary,
                            department_id: data.roleDept
                        },
                        (err, res) => {
                            launchMenu();
                            if (err) throw err;
                        }
                    )
                })
            }
        )
    };
    addDept = () => {
        // console.log('add dept');
        inquirer.prompt(
            {
                type: 'input',
                name: 'dept',
                message: 'What is the new department?'
            }
        ).then((data) => {
            connection.query(
                'INSERT INTO department SET ?',
                {
                    name: data.dept,
                }, (err, res) => {
                    // console.log(res);
                    // console.table(data);
                    launchMenu();
                    if (err) throw err;
                }
            )
        })
    };