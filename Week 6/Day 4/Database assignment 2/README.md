# Database Assignment 2 Solutions

### [Japanese Cities' Names](https://www.hackerrank.com/challenges/japanese-cities-name/problem)
[My Solution](https://www.hackerrank.com/rest/contests/master/challenges/japanese-cities-name/hackers/surajkhayamali/download_solution) \
[Screenshot](./www.hackerrank.com_challenges_japanese-cities-name_problem(Nest%20Hub%20Max).png "Japanese Cities' Names")

```sql
SELECT NAME FROM CITY WHERE COUNTRYCODE='JPN';
```


### [Weather Observation Station 3](https://www.hackerrank.com/challenges/weather-observation-station-3/problem)
[My Solution](https://www.hackerrank.com/rest/contests/master/challenges/weather-observation-station-3/hackers/surajkhayamali/download_solution) \
[Screenshot](./www.hackerrank.com_challenges_weather-observation-station-3_problem_isFullScreen=true(Nest%20Hub%20Max).png "Weather Observation Station 3")

```sql
SELECT DISTINCT CITY FROM STATION WHERE MOD(ID, 2) = 0;
```


### [Weather Observation Station 5](https://www.hackerrank.com/challenges/weather-observation-station-5/problem)
[My Solution](https://www.hackerrank.com/rest/contests/master/challenges/weather-observation-station-5/hackers/surajkhayamali/download_solution) \
[Screenshot](./www.hackerrank.com_challenges_weather-observation-station-5_problem(Nest%20Hub%20Max).png "Weather Observation Station 5")

```sql
SELECT 
    CITY,
    LENGTH(CITY) AS Length
FROM 
    STATION
ORDER BY 
    LENGTH,
    CITY
LIMIT 
    1;
    
SELECT 
    CITY,
    LENGTH(CITY) AS Length
FROM 
    STATION
ORDER BY 
    LENGTH DESC,
    CITY
LIMIT 
    1;
```


### [The Blunder](https://www.hackerrank.com/challenges/the-blunder/problem)
[My Solution](https://www.hackerrank.com/rest/contests/master/challenges/the-blunder/hackers/surajkhayamali/download_solution) \
[Screenshot](./www.hackerrank.com_challenges_the-blunder_problem_isFullScreen=true(Nest%20Hub%20Max).png "The Blunder")

```sql
SELECT 
    ROUND(AVG(salary)) - ROUND(AVG(REPLACE(salary, '0', ''))) 
FROM employees;
```


### [Weather Observation Station 18](https://www.hackerrank.com/challenges/weather-observation-station-18/problem)
[My Solution](https://www.hackerrank.com/rest/contests/master/challenges/weather-observation-station-18/hackers/surajkhayamali/download_solution) \
[Screenshot](./www.hackerrank.com_challenges_weather-observation-station-18_problem(Nest%20Hub%20Max).png "Weather Observation Station 18")

```sql
SELECT 
    ROUND(ABS(MAX(LAT_N) - MIN(LAT_N)) + ABS(MAX(LONG_W) - MIN(LONG_W)), 4) AS Manhattan_Distance
FROM STATION;
```


### [Average Population of Each Continent](https://www.hackerrank.com/challenges/average-population-of-each-continent/problem)
[My Solution](https://www.hackerrank.com/rest/contests/master/challenges/average-population-of-each-continent/hackers/surajkhayamali/download_solution) \
[Screenshot](./www.hackerrank.com_challenges_average-population-of-each-continent_problem_isFullScreen=true(Nest%20Hub%20Max).png "Average Population of Each Continent")

```sql
SELECT
    COUNTRY.CONTINENT,
    FLOOR(AVG(CITY.POPULATION))
FROM COUNTRY
INNER JOIN CITY
ON COUNTRY.CODE = CITY.COUNTRYCODE
GROUP BY COUNTRY.CONTINENT;
```


### [The PADS](https://www.hackerrank.com/challenges/the-pads/problem)
[My Solution](https://www.hackerrank.com/rest/contests/master/challenges/the-pads/hackers/surajkhayamali/download_solution) \
[Screenshot](./www.hackerrank.com_challenges_the-pads_problem(Nest%20Hub%20Max).png "The PADS")

```sql
SELECT 
    CONCAT(Name, '(', LEFT(Occupation, 1), ')')
FROM OCCUPATIONS
ORDER BY Name;

SELECT 
    CONCAT('There are a total of ', COUNT(*), ' ', LOWER(Occupation), 's.')
FROM OCCUPATIONS
GROUP BY Occupation
ORDER BY COUNT(Occupation), Occupation;
```


### [Type of Triangle (Use Case statement)](https://www.hackerrank.com/challenges/what-type-of-triangle/problem)
[My Solution](https://www.hackerrank.com/rest/contests/master/challenges/what-type-of-triangle/hackers/surajkhayamali/download_solution) \
[Screenshot](./www.hackerrank.com_challenges_what-type-of-triangle_problem(Nest%20Hub%20Max).png "Type of Triangle (Use Case statement)")

```sql
SELECT
    CASE
        WHEN A + B <= C OR A + C <= B OR B + C <= A THEN 'Not A Triangle'
        WHEN A = B AND B = C THEN 'Equilateral'
        WHEN A = B OR A = C OR B = C THEN 'Isosceles'
        ELSE 'Scalene'
    END AS TriangleType
FROM TRIANGLES;
```


### [Weather Observation Station 13](https://www.hackerrank.com/challenges/weather-observation-station-13/problem)
[My Solution](https://www.hackerrank.com/rest/contests/master/challenges/weather-observation-station-13/hackers/surajkhayamali/download_solution) \
[Screenshot](./www.hackerrank.com_challenges_weather-observation-station-13_problem(Nest%20Hub%20Max).png "Weather Observation Station 13")

```sql
SELECT
    TRUNCATE(SUM(LAT_N), 4)
FROM STATION
WHERE
    LAT_N > 38.7880
AND
    LAT_N < 137.2345;
```


### [The Report](https://www.hackerrank.com/challenges/the-report/problem)
[My Solution](https://www.hackerrank.com/rest/contests/master/challenges/the-report/hackers/surajkhayamali/download_solution) \
[Screenshot](./www.hackerrank.com_challenges_the-report_problem(Nest%20Hub%20Max).png "The Report")

```sql
SELECT
    IF(g.Grade < 8, NULL, s.Name),
    g.GRADE,
    s.MARKS
FROM
    STUDENTS s
INNER JOIN
    GRADES g
ON
    s.MARKS
BETWEEN 
    g.MIN_MARK
AND
    g.MAX_MARK
ORDER BY
    g.GRADE DESC,
    s.NAME;
```
    

