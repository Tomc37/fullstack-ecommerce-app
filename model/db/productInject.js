const productsList = require("./products.json");
const { Pool } = require("pg");
const {v4: uuidv4} = require("uuid");

const db = new Pool({
  connectionString: "postgres://mtqqlijanwqjur:6c8fc56e6b87590e8fec5236286e0e63d5ceb17ee6f209761c7699aa40a02a70@ec2-99-80-170-190.eu-west-1.compute.amazonaws.com:5432/df1jdgnuh0td16",
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

