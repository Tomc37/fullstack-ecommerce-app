const productsList = require("./products.json");
const { Pool } = require("pg");
const {v4: uuidv4} = require("uuid");

const db = new Pool({
  connectionString: "postgres://uliduhnynzxeok:34a4cef4e4b7168b6a3640b4239f0ff8ae2fbe474126cae530001064bef7ceaa@ec2-54-75-184-144.eu-west-1.compute.amazonaws.com:5432/d63mjd2vdh157i",
  ssl: {
    rejectUnauthorized: false,
    required: true
  }
})

const addProducts = (productsList) => {
  productsList.forEach(async (product) => {
    const price = parseFloat(product.price.replace(",", "").substring(1))
    try {
      await db.query("INSERT INTO products (id, category, name, description, image, price) VALUES ($1, $2, $3, $4, $5, $6)", 
      [uuidv4(), product.category, product.name, product.description, product.image, price]);
    } catch (e) {
      console.log(e);
    }
  })
}

addProducts(productsList);

