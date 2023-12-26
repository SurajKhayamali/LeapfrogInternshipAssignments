CREATE TABLE employees (
    employeeid SERIAL PRIMARY KEY,
    lastname VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    birthdate DATE NOT NULL,
    photo VARCHAR(255) NOT NULL,
    notes TEXT NOT NULL
);