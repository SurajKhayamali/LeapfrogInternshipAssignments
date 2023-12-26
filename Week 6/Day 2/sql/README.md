# Database assignment 1

## Description

This project involves creating and populating a database using SQL. The `migrations` folder contains SQL scripts for creating tables, and the `seeds` folder contains SQL scripts for inserting data into these tables.

## Folder structure:
```
migrations/
    1_customers.sql                                         – Create Scripts
    2_employees.sql
    3_shippers.sql
    4_orders.sql
    5_suppliers.sql
    6_categories.sql
    7_products.sql
    8_orderdetails.sql

seeds/
    1_customers.sql                                         - Insert Scripts
    2_employees.sql
    3_shippers.sql
    4_orders.sql
    5_suppliers.sql
    6_categories.sql
    7_products.sql
    8_orderdetails.sql
```

## Installation

1. Clone the repository to your local machine.
2. Ensure you have a PostgreSQL server running.

## Usage

To set up and populate the database:

1. Navigate to the `migrations` directory.
2. Run the SQL scripts in the order of their numbering. For example, you must run `1_customers.sql` before `2_employees.sql`. These scripts will create the necessary tables in your database.
3. Navigate to the `seeds` directory.
4. Similarly like before with the `migrations` directory, run the SQL scripts in the order of their numbering. These scripts will populate the tables with data.

*Please note that you'll need to have a PostgreSQL server running, in case of other SQL servers you may need to adjust the commands based on your SQL server's configuration.*
