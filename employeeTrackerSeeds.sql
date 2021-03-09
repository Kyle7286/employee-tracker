-- Drop databases if exist --
drop database if exists employeetracker_db;

-- Create databases --
create database employeetracker_db;

-- focus on database
use employeetracker_db;

-- Creates the table "people" within animals_db --
CREATE TABLE people (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  -- Makes a string column called "name" which cannot contain null --
  name VARCHAR(30) NOT NULL,
  -- Makes a boolean column called "has_pet" which cannot contain null --
  has_pet BOOLEAN NOT NULL,
  -- Makes a sting column called "pet_name" --
  pet_name VARCHAR(30),
  -- Makes an numeric column called "pet_age" --
  pet_age INTEGER(10),
  -- Sets id as this table's primary key which means all data contained within it will be unique --
  PRIMARY KEY (id)
);

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
    id INTEGER AUTO_INCREMENT NOT NULL,
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



