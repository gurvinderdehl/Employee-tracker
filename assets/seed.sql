USE employees_db;

INSERT INTO department (name)
VALUES ('Marketing');

INSERT INTO department (name)
VALUES ('Accounts');

INSERT INTO department (name)
VALUES ('HR');

INSERT INTO department (name)
VALUES ('IT');

SELECT * FROM department;

INSERT INTO role (title, salary, department_id)
VALUES ('Marketing Manager', 30000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ('Accounts Apprentice', 20000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ('Sales advisor', 60000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ('Digital Marketing Specialist', 80000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ('IT engineer', 50000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ('Head Accountant', 100000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ('HR Payrole', 30000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ('HR Manager', 60000, 3);

SELECT * FROM role;

ALTER TABLE employee AUTO_INCREMENT=100; 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Eden', 'Janman', 2, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Becky', 'Hill', 2, 100);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Peter', 'Jones', 2, 100);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Ben', 'Ashley', 5, 100);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Paul', 'Newman', 2, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Michael', 'Jackson', 2, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Mike', 'Tyson', 6, 155);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Anthony', 'Joshua', 6, 101);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Paul', 'Scholes', 18, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Wayne', 'Rooney', 10, 110);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Ryan', 'Giggs', 11, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('David', 'Beckham', 7, 201);

SELECT * FROM employee;

Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (`employees_db`.`role`, CONSTRAINT `role_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`))
