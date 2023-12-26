CREATE TABLE orderdetails (
    orderdetailid SERIAL PRIMARY KEY,
    orderid INT REFERENCES orders(orderid),
    productid INT REFERENCES products(productid),
    quantity INT NOT NULL CHECK (quantity > 0)
);