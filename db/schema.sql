-- Drop databases if exist --
drop database if exists employeetracker_db;

-- Create databases --
create database employeetracker_db;

-- focus on database
use employeetracker_db;

-- drop tables if they exist --
drop table if exists departments;
drop table if exists roles;
drop table if exists employees;

-- Create tables --
CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) not null,
    primary key (id)
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) not null,
    salary DECIMAL not null,
    department_id integer not null,
    primary key (id)
);

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) not null,
    last_name VARCHAR(30) not null,
    role_id INTEGER not null,
    MANAGER_ID INTEGER,
    primary key (id)
);



