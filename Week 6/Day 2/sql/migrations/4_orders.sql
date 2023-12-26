CREATE TABLE orders (
    orderid SERIAL PRIMARY KEY,
    customerid INT REFERENCES customers(customerid),
    employeeid INT REFERENCES employees(employeeid),
    orderdate DATE NOT NULL,
    shipperid INT REFERENCES shippers(shipperid)
);