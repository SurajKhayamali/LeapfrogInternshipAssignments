CREATE TABLE suppliers (
    supplierid SERIAL PRIMARY KEY,
    suppliername VARCHAR(100) NOT NULL,
    contactname VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    postalcode VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL
);