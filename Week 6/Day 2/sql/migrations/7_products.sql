CREATE TABLE products (
    productid INT PRIMARY KEY,
    productname VARCHAR(255) NOT NULL,
    supplierid INT,
    categoryid INT,
    unit VARCHAR(255) NOT NULL,
    price FLOAT,
    FOREIGN KEY (supplierid) REFERENCES suppliers(supplierid),
    FOREIGN KEY (categoryid) REFERENCES categories(categoryid)
);