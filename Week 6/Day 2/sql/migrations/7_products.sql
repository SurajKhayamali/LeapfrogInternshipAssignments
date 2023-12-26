CREATE TABLE products (
    productid SERIAL PRIMARY KEY,
    productname VARCHAR(100) NOT NULL,
    supplierid INT REFERENCES suppliers(supplierid),
    categoryid INT REFERENCES categories(categoryid),
    unit VARCHAR(50) NOT NULL,
    price NUMERIC(10, 2) -- Adjust precision and scale as needed
);