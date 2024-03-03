const faker = require("faker");
const mysql = require("mysql");

productCount = 2000;
orderCount = 1000;
orderDetailCount = 1000;
customerCount = 300;

// Creating a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "e_commerce",
});


//Generating 2000 products
for (let i = 0; i < productCount; i++) {
    const name = faker.commerce.productName();
    const description = faker.commerce.productDescription();
    const attributes = {
      color: faker.commerce.color(),
      size: faker.random.arrayElement(['small', 'medium', 'large']), 
      price: faker.commerce.price(),
      brand: faker.company.companyName(),
    };
  
  
    const sql = `INSERT INTO products (name, description, attributes) VALUES (?, ?, ?)`;
  
    connection.query(
      sql,
      [name, description, JSON.stringify(attributes)],
      (err) => {
        if (err) throw err; 
      }
    );
  }

  // Generating 300 customers
  for (let i = 0; i < customerCount; i++) {
    const firstName = faker.name.firstName();
    const middleName = faker.name.middleName();
    const lastName = faker.name.lastName();
    const address = {
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zipCode: faker.address.zipCode(),
    };
  
    const sql = `INSERT INTO customers (firstname, middlename, lastname, address) VALUES (?, ?, ?, ?)`;
  
    connection.query(
      sql,
      [firstName, middleName, lastName, JSON.stringify(address)],
      (err) => {
        if (err) throw err;
        console.log("Customer ", i + 1, " inserted!");
      }
    );
  }

  //Generating 1000 orders
for (let i = 0; i < orderCount; i++) {
    const customerId = faker.random.number({ min: 1, max: customerCount });
    const orderDate = faker.date.recent();
  
    const sql = `INSERT INTO orders (customer_id, order_date) VALUES (?, ?)`;
  
    connection.query(sql, [customerId, orderDate], (err) => {
      if (err) throw err;
    });
  }
  
  //Generating 1000 order details
  for (let i = 0; i < orderDetailCount; i++) {
    const orderId = faker.random.number({ min: 1, max: orderCount });
    const productId = faker.random.number({ min: 1, max: productCount });
    const quantity = faker.random.number({ min: 1, max: 100 });
    const price = faker.commerce.price();
  
    const sql = `INSERT INTO order_details (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`;
  
    connection.query(sql, [orderId, productId, quantity, price], (err) => {
      if (err) throw err;
    });
  }


  // Closing MySQL connection
connection.end();
