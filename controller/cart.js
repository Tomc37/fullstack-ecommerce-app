const {
  retrieveCart,
  retrieveCartProducts,
  updateCartAmount,
  deleteFromCart,
  submitOrder,
} = require("../model/cart");

exports.retrieveCart = async (req, res, next) => {
  try {
    const id = req.user.id;
    // console.log(id);
    let cart = await retrieveCart(id);
    // console.log(cart);
    if (cart) {
      return res.status(200).json(cart);
    }
  } catch (e) {
    console.log(e);
  }
};

exports.retrieveCartProducts = async (req, res, next) => {
  const { cartId } = req.body;
  // console.log(`from controller.cartjs:19: cart id: ${cartId}`);
  try {
    let cartProducts = await retrieveCartProducts(cartId);
    return res.status(200).json(cartProducts);
  } catch (e) {
    console.log(e);
  }
};

exports.updateCartAmount = async (req, res, next) => {
  const { newValue, oldValue, cartId, productId, price } = req.body;
  console.log(`
    newValue: ${newValue}\n
    cartId: ${cartId}\n
    productId: ${productId}\n
    price: ${price}
  `);
  try {
    let updatedProductAmount = await updateCartAmount(
      newValue,
      oldValue,
      cartId,
      productId,
      price
    );
    return res.status(204).json(updatedProductAmount);
  } catch (e) {
    console.log(e);
  }
};

exports.deleteFromCart = async (req, res, next) => {
  const { cartId, productId, price, cartAmount } = req.body;
  try {
    let deleteItem = await deleteFromCart(cartId, productId, price, cartAmount);
    return res.status(200).json(deleteItem);
  } catch (e) {
    console.log(e);
  }
};

exports.submitOrder = async (req, res, next) => {
  const userId = req.user.id;
  const { orderPrice, cartProducts, cartId } = req.body;
//   console.log(`
//     userId: ${userId}\n
//     orderPrice: ${orderPrice}\n
//     cartProducts: ${cartProducts}\n
//     cartId: ${cartId}\n
// `);
  try {
    let newOrder = await submitOrder(userId, orderPrice, cartProducts, cartId);
    return res.status(201).json(newOrder);
  } catch (e) {
    console.log(e);
  }
};
