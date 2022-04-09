const db = require("./db");
const {v4: uuidv4} = require("uuid");

const retrieveCart = async (id) => {
  try {
    let cart = await db.query("SELECT * FROM carts WHERE user_id = $1;", [id]);
    if (cart.rows[0]) {
      cart = cart.rows[0];
      return cart;
    } else {
      cart = await db.query(
        "INSERT INTO carts (id, user_id) VALUES ($1, $2) RETURNING *;",
        [uuidv4(), id]
      );
      cart = cart.rows[0];
      return cart;
    }
  } catch (e) {
    console.log(e);
  }
};

const retrieveCartProducts = async (cartId) => {
  try {
    let cartProducts = await db.query(
      "SELECT carts_products.cart_id, carts_products.product_id, products.name, products.description, products.image, products.price, carts_products.amount FROM carts_products INNER JOIN products ON carts_products.product_id = products.id WHERE carts_products.cart_id = $1;",
      [cartId]
    );
    cartProducts = cartProducts.rows;
    return cartProducts;
  } catch (e) {
    console.log(e);
  }
};

const updateCartAmount = async (
  newValue,
  oldValue,
  cartId,
  productId,
  price
) => {
  try {
    price = parseFloat(price.replace(",", "").substring(1));
    oldValue = parseInt(oldValue);
    newValue = parseInt(newValue);
    // console.log(`
    //   newValue: ${newValue}\n
    //   typeof newValue: ${typeof newValue}\n
    //   oldValue: ${oldValue}\n
    //   typeof oldValue: ${typeof oldValue}\n
    //   cartId: ${cartId}\n
    //   productId: ${productId}\n
    //   price: ${price}\n
    //   typeof price: ${typeof price}
    // `);
    let updatedProductAmount = await db.query(
      "UPDATE carts_products SET amount = $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *;",
      [newValue, cartId, productId]
    );
    updatedProductAmount = updatedProductAmount.rows[0];
    await db.query(
      "UPDATE carts SET price = price - $1 * $2::money, product_count = product_count - $1 RETURNING *;",
      [oldValue, price]
    );
    await db.query(
      "UPDATE carts SET price = price + $1 * $2::money, product_count = product_count + $1;",
      [newValue, price]
    );
    return updatedProductAmount;
  } catch (e) {
    console.log(e);
  }
};

const deleteFromCart = async (cartId, productId, price, cartAmount) => {
  try {
    price = parseFloat(price.replace(",", "").substring(1));
    cartAmount = parseInt(cartAmount);
    const deletedItem = await db.query(
      "DELETE FROM carts_products WHERE cart_id = $1 AND product_id = $2 RETURNING *;",
      [cartId, productId]
    );
    await db.query(
      "UPDATE carts SET product_count = product_count - $1, price = price - $1 * $2::money;",
      [cartAmount, price]
    );
    return deletedItem;
  } catch (e) {
    console.log(e);
  }
};

const submitOrder = async (userId, orderPrice, cartProducts, cartId) => {
  cartProducts = await JSON.parse(cartProducts);
  // console.log(`typeof cartProducts: ${typeof cartProducts}`);
  // console.log(`
  //   userId: ${userId}\n
  //   orderPrice: ${parseFloat(orderPrice.replace(",", "").substring(1))}\n
  //   cartProducts: ${cartProducts}\n
  //   cartId: ${cartId}
  // `);
  // cartProducts.forEach((object) => {
  //   console.log(object.name);
  //   console.log(object.price);
  //   console.log(object.amount);
  // })
  try {
    orderPrice = parseFloat(orderPrice.replace(",", "").substring(1));

    const orderStatus = "Submitted";
    const newOrder = await db.query(
      "INSERT INTO orders (id, user_id, date_submitted, price, status) VALUES ($1, $2, NOW()::date, $3, $4) RETURNING *;",
      [uuidv4(), userId, orderPrice, orderStatus]
    );
    const orderId = newOrder.rows[0].id;
    cartProducts.forEach((product) => {
      const productPrice = parseFloat(product.price.replace(",", "").substring(1))
      const productAmount = parseInt(product.amount);
      db.query(
            "INSERT INTO orders_products (order_id, product_id, amount, price) VALUES ($1, $2, $3, $4);",
            [orderId, product.product_id, productAmount, productPrice]
          );
    })
    const deleteCart = await db.query(
      "DELETE FROM carts WHERE id = $1 AND user_id = $2;",
      [cartId, userId]
    );
    return newOrder;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  retrieveCart,
  retrieveCartProducts,
  updateCartAmount,
  deleteFromCart,
  submitOrder,
};
