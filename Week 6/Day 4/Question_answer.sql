SELECT * FROM orders where orderdate > '2023-12-28'::date;


SELECT * FROM orders where orderdate > CURRENT_DATE;


UPDATE
	orders
SET orderdate='1997-02-12'
WHERE orderid=10443;


SELECT * FROM suppliers WHERE country = 'Kanada';

UPDATE 
	suppliers
SET
	country = 'Canada'
WHERE 
	country = 'Kanada';


