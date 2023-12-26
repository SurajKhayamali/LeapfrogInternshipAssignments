CREATE TABLE orderdetails (
    orderdetailid INT PRIMARY KEY,
    orderid INT,
    productid INT,
    quantity INT,
    FOREIGN KEY (orderid) REFERENCES orders(orderid),
    FOREIGN KEY (productid) REFERENCES products(productid),
    CHECK (quantity > 0)
);