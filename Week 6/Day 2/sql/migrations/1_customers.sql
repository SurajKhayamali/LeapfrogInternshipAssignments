CREATE TABLE customers (
    customerid SERIAL PRIMARY KEY,
    customername VARCHAR(100) NOT NULL,
    contactname VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    postalcode VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL
);

CREATE INDEX idx_customername ON customers (customername);
CREATE INDEX idx_city ON customers (city);