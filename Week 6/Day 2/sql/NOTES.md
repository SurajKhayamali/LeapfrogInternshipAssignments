### Why VARCHAR(255) and not VARCHAR(256)?
- With a maximum length of 255 characters, the DBMS can choose to use a single byte to indicate the length of the data in the field. If the limit were 256 or greater, two bytes would be needed.

https://stackoverflow.com/questions/2340639/why-historically-do-people-use-255-not-256-for-database-field-magnitudes

### Escape characters usage
- E is placed in front of the string literal to indicate that the following string is an escape string. Without the E, the backslash would be treated as a regular character and a syntax error would result.
https://stackoverflow.com/questions/935/string-literals-and-escape-characters-in-postgresql