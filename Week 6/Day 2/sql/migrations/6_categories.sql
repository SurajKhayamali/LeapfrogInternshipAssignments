CREATE TABLE categories (
    categoryid SERIAL PRIMARY KEY,
    categoryname VARCHAR(100) NOT NULL,
    description TEXT NOT NULL
);