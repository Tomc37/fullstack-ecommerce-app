const { retrieveProducts, addToCart } = require("../model/products");

exports.retrieveProducts = async (req, res, next) => {
  try {
    const productsList = await retrieveProducts();
    res.status(200).json(productsList);
  } catch (e) {
    console.log(e)
    return { e }
  }
}

exports.addToCart = async (req, res, next) => {
  const userId = req.user.id;
  // console.log(`typeOf req.body: ${typeof req.body}`)
  // console.log(`req.body: ${req.body}`);
  const { cartId, productId, price } = req.body;
//   console.log(`
//   cartId: ${cartId}\n
//   productId: ${productId}\n
//   price: ${price}
// `)
  try {
    const addedProduct = await addToCart(cartId, productId, userId, price)
    res.status(200).json(addedProduct)
  } catch (e) {
    console.log(e);
    return { e };
  }
}