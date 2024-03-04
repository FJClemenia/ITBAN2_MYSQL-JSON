# ITBAN2-Advanced-MySQL-Queries-with-JSON-Data
Making an 'e_commerce' MySQL DB with tables for products, orders, order details, and customers. Auto-populated with sample data using faker.js. Contains documented queries with screenshots and SQL dumps.

### By F.J. Clemenia & R. Sunquit


##### 1. Retrieve Product Information:

• Write a query to fetch the names and descriptions of all products.

```sql
SELECT name, description
FROM products;
```

![image](/queries&ss/1-1.png)

• Extend the previous query to include specific attributes such as color, size, and 
price.

```sql
SELECT name, description, JSON_EXTRACT(attributes, '$.color') as color,
JSON_EXTRACT(attributes, '$.size') as size, JSON_EXTRACT(attributes, '$.price') as price, 
FROM products;
```

![image](/queries&ss/1-2.png)

##### 2. Query Orders and Order Details:
	
• Retrieve the details of all orders placed, including the order date, customer ID, 
product name, quantity, and price.

```sql
SELECT o.order_id, o.order_date, o.customer_id, p.name as "product name", od.quantity, od.price
FROM orders o
JOIN order_details od ON o.order_id = od.order_id
JOIN products p ON od.product_id = p.product_id;
```

![image](/queries&ss/2-1.png)

• Calculate the total cost of each order.

```sql
SELECT o.order_id, SUM(od.quantity * od.price) as "total cost of each order"
FROM orders o
JOIN order_details od ON o.order_id = od.order_id
GROUP BY o.order_id;
```

![image](/queries&ss/2-2.png)


##### 3. Filtering Products Based on Attributes:

• Write a query to find all products with a price greater than $50.

```sql
SELECT product_id, JSON_UNQUOTE(JSON_EXTRACT(attributes, '$.price')) as price
FROM products
WHERE JSON_EXTRACT(attributes, '$.price') > 50;
```

![image](/queries&ss/3-1.png)

• Filter products by color and brand, and display their names and prices.

```sql
SELECT name, JSON_UNQUOTE(JSON_EXTRACT(attributes, '$.price')) as price
FROM products
WHERE JSON_EXTRACT(attributes, '$.color') = 'azure' AND JSON_EXTRACT(attributes, '$.brand') = 'Pouros Inc';
```

![image](/queries&ss/3-2.png)

##### 4. Calculating Aggregate Data:

• Calculate the total sales revenue generated by each product.

```sql
SELECT p.product_id, p.name, SUM(od.quantity * od.price) as "total revenue" 
FROM order_details od
JOIN products p ON p.product_id = od.product_id
GROUP BY p.product_id;
```

![image](/queries&ss/4-1.png)

• Determine the total quantity of each product ordered. 

```sql
SELECT p.product_id, p.name, SUM(od.quantity) as "total quantity" 
FROM order_details od
JOIN products p ON p.product_id = od.product_id
GROUP BY p.product_id;
```

![image](/queries&ss/4-2.png)

##### 5. Advanced Filtering and Aggregation: 

• Find the top 5 best-selling products based on total quantity sold. 

![image](/queries&ss/5-1.png)

• Identify the average price of products from a specific brand. 

![image](/queries&ss/5-2.png)

##### 6. Nested JSON Queries: 
• Retrieve the color and size of a specific product. 

![image](/queries&ss/6-1.png)

• Extract and display all available attributes of products in JSON format. 

![image](/queries&ss/6-2.png)

##### 7. Joining Multiple Tables: 
• Write a query to find all orders placed by customers along with the products 
ordered and their quantities. 

![image](/queries&ss/7-1.png)

• Calculate the total revenue generated by each customer. 

![image](/queries&ss/7-2.png)

##### 8. Data Manipulation with JSON Functions: 
• Update the price of a specific product stored as JSON attribute.

The original price of the product id 11.

![image](/queries&ss/8-1a.png)

The specific query to update the specific price of product id 11.

![image](/queries&ss/8-1b.png)


Updated price of the product id number 11.

![image](/queries&ss/8-1c.png)

• Add a new attribute to all products with a default value.
![image](/queries&ss/8-2a.png)

This is the product attributes with newly added availability attribute.

![image](/queries&ss/8-2b.png)

##### 9. Advanced JSON Operations: 
• Find products with specific attributes that match a given criteria using JSON path 
expressions.

![image](/queries&ss/9-1.png)

• Extract and display the first element of an array stored within a JSON attribute.

![image](/queries&ss/9-2.png)
