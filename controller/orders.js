const { retrieveOrders, retrieveOrder } = require("../model/orders");

exports.retrieveOrders = async (req, res, next) => {
  const userId = req.user.id;
  // const userId = 159;
  try {
    const orders = await retrieveOrders(userId);
    return res.status(200).json(orders);
  } catch (e) {
    console.log(e);
  }
};

exports.retrieveOrder = async (req, res, next) => {
  const userId = req.user.id;
  const orderId = req.params.id;
  // const userId = 159;
  try {
    const order = await retrieveOrder(orderId, userId);
    return res.status(200).json(order);
  } catch (e) {
    console.log(e);
  }
}
