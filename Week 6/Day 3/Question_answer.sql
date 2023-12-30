-- Select the first 4 customers from the customers table
SELECT customerid, contactname, address, city, country from customers LIMIT 4;

-- Select the customers from index 5-8 from the customers table
SELECT customerid, contactname, address, city, country from customers LIMIT 4 OFFSET 4;

-- Count the number of customers in the customers table
SELECT COUNT(*) from customers;

-- Count the number of customers in the customers table that we have in each city
SELECT city, COUNT(city) from customers GROUP BY city;


SELECT customername, contactname, address from customers WHERE city IN ('London', 'Paris', 'Madrid');

SELECT customername, contactname, address, city from customers WHERE city = 'London' 
UNION
SELECT customername, contactname, address, city from customers WHERE city = 'Paris';

SELECT customerid, customername, contactname, address, city from customers WHERE city IN ('London', 'Paris');

SELECT customerid, customername, contactname, address, city from customers 
WHERE city IN ('London', 'Paris')
ORDER BY city DESC;

-- Recommended format
SELECT 
	customerid, 
	customername, 
	contactname, 
	address, 
	city 
FROM customers 
WHERE city IN ('London', 'Paris')
ORDER BY city DESC;

SELECT 
	customerid, 
	customername, 
	contactname, 
	address, 
	city 
FROM customers 
WHERE customerid 
NOT IN 
(
	SELECT customerid 
	FROM orders
);

SELECT 
	customerid, 
	customername, 
	contactname, 
	address, 
	city 
FROM customers 
WHERE customerid 
IN 
(
	SELECT customerid 
	FROM orders
);

SELECT 
	customerid, 
	customername, 
	contactname, 
	address, 
	city 
FROM customers 
WHERE 
NOT EXISTS 
(
	SELECT customerid 
	FROM orders
	WHERE customerid = customers.customerid
);

SELECT 
	customerid, 
	customername, 
	contactname, 
	address, 
	city 
FROM customers c
WHERE 
NOT EXISTS 
(
	SELECT customerid 
	FROM orders o
	WHERE o.customerid = c.customerid
);

SELECT 
	c.customerid, 
	c.customername, 
	c.contactname, 
	c.address,
	o.orderid,
	o.orderdate
FROM customers c
INNER JOIN orders o 
ON c.customerid = o.customerid;

SELECT 
	c.customerid, 
	c.customername, 
	c.contactname, 
	c.address,
	o.orderid,
	o.orderdate
FROM customers c
INNER JOIN orders o 
ON c.customerid = o.customerid
ORDER BY customername ASC;

SELECT
	c.customername, 
	c.contactname, 
	c.address,
	COUNT(o.orderid) AS OrdersCount
FROM customers c
LEFT JOIN orders o 
ON c.customerid = o.customerid
GROUP BY c.customerid;

SELECT
	c.customername, 
	c.contactname, 
	c.address,
	COUNT(o.orderid) AS OrdersCount
FROM customers c
INNER JOIN orders o 
ON c.customerid = o.customerid
GROUP BY c.customerid;

SELECT
	c.customerid,
	c.customername, 
	c.contactname, 
	c.address,
	COUNT(o.orderid) AS OrdersCount
FROM customers c
LEFT JOIN orders o 
ON c.customerid = o.customerid
GROUP BY 
	c.customerid,
	c.address;

SELECT
	c.customerid,
	c.customername, 
	c.contactname, 
	c.address,
	COUNT(o.orderid) AS OrdersCount
FROM customers c
LEFT JOIN orders o 
ON c.customerid = o.customerid
GROUP BY c.customerid;


SELECT
	c.customerid,
	c.customername, 
	c.contactname, 
	c.address,
	o.orderdate,
	COUNT(o.orderid) AS OrdersCount
FROM customers c
LEFT JOIN orders o 
ON c.customerid = o.customerid
GROUP BY 
	c.customerid,
	o.orderdate;

SELECT
	c.customerid,
	c.customername, 
	c.contactname, 
	c.address,
	o.orderdate,
	COUNT(o.orderid) AS OrdersCount
FROM customers c
LEFT JOIN orders o 
ON c.customerid = o.customerid
GROUP BY 
	c.customerid,
	o.orderid;

SELECT
	c.customerid,
	c.customername, 
	c.contactname, 
	c.address,
	o.orderdate,
	COUNT(o.orderid) AS OrdersCount
FROM customers c
LEFT JOIN orders o 
ON c.customerid = o.customerid
GROUP BY 
	c.customerid,
	c.customername, 
	c.contactname, 
	c.address,
	o.orderdate;

SELECT
	c.customerid,
	c.customername, 
	c.contactname, 
	c.address,
	o.orderdate,
	COUNT(o.orderid) AS OrdersCount
FROM customers c
LEFT JOIN orders o 
ON c.customerid = o.customerid
GROUP BY 
	c.customerid,
	c.customername, 
	c.contactname, 
	c.address,
	o.orderdate;

-- We get 0 in the OrdersCount column for customers that have no orders
SELECT
	c.customerid,
	c.customername, 
	c.contactname, 
	c.address,
	o.orderdate,
	COUNT(o.orderid) AS OrdersCount
FROM customers c
LEFT JOIN orders o 
ON c.customerid = o.customerid
GROUP BY 
	c.customerid,
	c.customername, 
	c.contactname, 
	c.address,
	o.orderdate
ORDER BY c.customerid;

-- Whole row is counted so we get 1 for each row
SELECT
	c.customerid,
	c.customername, 
	c.contactname, 
	c.address,
	o.orderdate,
	COUNT(*) AS OrdersCount
FROM customers c
LEFT JOIN orders o 
ON c.customerid = o.customerid
GROUP BY 
	c.customerid,
	c.customername, 
	c.contactname, 
	c.address,
	o.orderdate
ORDER BY c.customerid;

SELECT
	DISTINCT c.city
FROM customers c
LEFT JOIN orders o 
ON c.customerid = o.customerid
GROUP BY
	c.city;

SELECT c.city
FROM customers c
GROUP BY c.city;

SELECT DISTINCT c.city
FROM customers c;

SELECT
	city,
	COUNT(city)
FROM customers c
GROUP BY city;

SELECT
	c.customerid,
	c.customername, 
	c.contactname, 
	c.address,
	o.orderid
FROM customers c
LEFT JOIN orders o 
ON c.customerid = o.customerid;

SELECT
	c.customerid,
	c.customername, 
	c.contactname, 
	c.address,
	o.orderid
FROM customers c
LEFT JOIN orders o 
ON c.customerid = o.customerid
WHERE o.customerid IS NULL;

SELECT
	customername, 
	contactname, 
	address
FROM customers c
LEFT JOIN orders o 
ON c.customerid = o.customerid
WHERE o.customerid IS NULL;