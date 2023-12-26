### Why VARCHAR(255) and not VARCHAR(256)?
- With a maximum length of 255 characters, the DBMS can choose to use a single byte to indicate the length of the data in the field. If the limit were 256 or greater, two bytes would be needed.

https://stackoverflow.com/questions/2340639/why-historically-do-people-use-255-not-256-for-database-field-magnitudes

### Escape characters usage
- E is placed in front of the string literal to indicate that the following string is an escape string. Without the E, the backslash would be treated as a regular character and a syntax error would result.
https://stackoverflow.com/questions/935/string-literals-and-escape-characters-in-postgresql

#### Using SERIAL for auto-incrementing primary key in PostgreSQL (instead of INT UNSIGNED AUTO_INCREMENT in MySQL)
- Example:
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
```
- SERIAL is an auto-incrementing integer value. It is a shortcut for creating an auto-incrementing sequence and a column of type integer to hold the value from the sequence. The SERIAL type is a PostgreSQL extension to SQL.

https://www.postgresqltutorial.com/postgresql-serial/


### Prompts used while Optimizing Database Modeling for this assignment 1 with ChatGPT-3.5 
https://chat.openai.com/share/d5f3a087-a848-405b-9f7b-c3d971cfd0f7