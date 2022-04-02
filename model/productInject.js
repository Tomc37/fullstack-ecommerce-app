const productsList = require("./products.json");
const { Pool } = require("pg");
const {v4: uuidv4} = require("uuid");

const db = new Pool({
  user: "postgres",
  host: "localhost",
  password: "postgres",
  database: "fullstack_ecom",
  port: 5432
})

const addProducts = (productsList) => {
  productsList.forEach(async (product) => {
    try {
      await db.query("INSERT INTO products (id, category, name, description, image, price) VALUES ($1, $2, $3, $4, $5, $6)", 
      [uuidv4(), product.category, product.name, product.description, product.image, product.price]);
    } catch (e) {
      console.log(e);
    }
  })
}

addProducts(productsList);

