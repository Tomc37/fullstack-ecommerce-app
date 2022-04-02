const db = require("./db");

const retrieveProducts = async () => {
  let productArr = [];
  try {
    const productsList = await db.query("SELECT * FROM products");
    // console.log(productsList.rows);
    return productsList.rows;
  } catch (e) {
    console.log(e);
  }
};

const findProductCart = async (cartId, productId) => {
  try {
    const foundCart = await db.query("SELECT * FROM carts_products WHERE cart_id = $1 AND product_id = $2", [cartId, productId]);
    return foundCart.rows[0];
  } catch (e) {
    console.log (e);
  }
}

const addToCart = async (cartId, productId, userId, price) => {
  try {
    const cartExists = await findProductCart(cartId, productId);
    let addedProduct = "";
    if (!cartExists) {
      addedProduct = await db.query("INSERT INTO carts_products (cart_id, product_id, amount, price) VALUES ($1, $2, 1, $3) RETURNING *;", [cartId, productId, price]);
    } else {
      addedProduct = await db.query("UPDATE carts_products SET amount = amount + 1 WHERE cart_id = $1 AND product_id = $2 RETURNING *", [cartId, productId])
    }
    await db.query("UPDATE carts SET product_count = product_count + 1, price = price + $1 WHERE user_id = $2;", [price, userId]);
    return addedProduct.rows[0];
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  retrieveProducts,
  addToCart
}