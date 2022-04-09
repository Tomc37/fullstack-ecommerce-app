const db = require('./db');

const retrieveOrders = async (userId) => {
  try {
    const orders = await db.query("SELECT * FROM Orders WHERE user_id = $1", [
      userId,
    ]);
    // console.log(orders.rows)
    return orders.rows;
  } catch (e) {
    console.log(e);
  }
};

const retrieveOrder = async (orderId, userId) => {
  try {
    const order = await db.query(
      "SELECT orders.id AS order_id, orders.user_id AS user_id, orders.price AS order_price, orders.status AS order_status, orders.date_submitted AS date_submitted, orders_products.product_id AS product_id, orders_products.amount AS amount, orders_products.price AS product_price, products.name AS product_name, products.image AS product_image FROM ((orders INNER JOIN orders_products ON orders.id = orders_products.order_id) INNER JOIN products ON orders_products.product_id = products.id) WHERE orders.id = $1 AND orders.user_id = $2;",
      [orderId, userId]
    );
    return order.rows;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  retrieveOrders,
  retrieveOrder,
};
