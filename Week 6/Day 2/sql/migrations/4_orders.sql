CREATE TABLE orders (
    orderid INT PRIMARY KEY,
    customerid INT,
    employeeid INT,
    orderdate TIMESTAMP NOT NULL,
    shipperid INT,
    FOREIGN KEY (customerid) REFERENCES customers(customerid),
    FOREIGN KEY (employeeid) REFERENCES employees(employeeid),
    FOREIGN KEY (shipperid) REFERENCES shippers(shipperid)
);