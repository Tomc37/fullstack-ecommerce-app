import "./Checkout.css";
import React, { useState, useEffect } from "react";
import {
  retrieveCartProducts,
  updateCartAmount,
  getCart,
  deleteFromCart,
  submitOrder,
} from "../util";

function Checkout({ cart, setCart }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [success, setSuccess] = useState("");

  const handleAmountValueChange = async (e) => {
    const newValue = parseInt(e.currentTarget.value);
    const productId = parseInt(e.currentTarget.id);
    const price = cartProducts.find(
      (object) => object.product_id === productId
    ).price;
    const oldValue = cartProducts.find(
      (object) => object.product_id === productId
    ).amount;
    console.log(`
      newValue: ${newValue}\n
      oldValue: ${oldValue}\n
      productId: ${productId}\n
      cart.id: ${cart.id}\n
      price: ${price}
    `);
    try {
      await updateCartAmount(newValue, oldValue, cart.id, productId, price);
      setCart(await getCart());
      setCartProducts(await retrieveCartProducts(cart.id));
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (e) => {
    const productId = parseInt(e.currentTarget.id);
    const cartId = parseInt(cart.id);
    const price = cartProducts.find(
      (object) => object.product_id === productId
    ).price;
    const cartAmount = cartProducts.find(
      (object) => object.product_id === productId
    ).amount;
    console.log(`
      productId: ${productId}\n
      cartId: ${cartId}\n
      cartAmount: ${cartAmount}\n
      price: ${price}
    `);
    try {
      await deleteFromCart(cartId, productId, price, cartAmount);
      setCart(await getCart());
      setCartProducts(await retrieveCartProducts(cart.id));
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    const orderPrice = cart.price;
    const cartId = parseInt(cart.id);
    // console.log(JSON.stringify(cartProducts));
    console.log(`
      orderPrice: ${orderPrice}\n
      cartProducts: ${cartProducts}\n
      typeof cartProducts: ${typeof cartProducts}\n;
      cartId: ${cartId}\n
    `);
    try {
      await submitOrder(orderPrice, JSON.stringify(cartProducts), cartId);
      setCart(await getCart());
      setCartProducts(await retrieveCartProducts(cart.id));
      setSuccess("Order placed successfully!")
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getCartProducts = async () => {
      if (cart.id) {
        try {
          const cartProductsList = await retrieveCartProducts(cart.id);
          if (cartProductsList) {
            setCartProducts(cartProductsList);
          }
        } catch (e) {
          console.log(e);
        }
      }
    };
    getCartProducts();
  }, [cart.id]);

  // Iterator for select options 1 - 10
  const item = [];
  for (let i = 1; i <= 10; i++) {
    item.push(i);
  }

  return (
    <div id="checkout">
      <h2>Checkout</h2>
      {cartProducts &&
        cartProducts.map((product) => {
          return (
            <div id="checkout-listing" key={product.product_id}>
              <div id="checkout-listing-image">
                <img
                  src={require(`../../resources/${product.image}.jpg`)}
                  alt={product.image}
                />
              </div>
              <div id="checkout-listing-product-description">
                <div id="product-description">
                  <p id="name">{product.name}</p>
                  <p id="description">{product.description}</p>
                </div>
                <div id="options">
                  <form>
                    <span>Qty: </span>
                    <select
                      id={product.product_id}
                      defaultValue={product.amount}
                      onChange={handleAmountValueChange}
                    >
                      {item.map((item) => {
                        return (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                    <span
                      className="delete"
                      id={product.product_id}
                      onClick={handleDelete}
                    >
                      Delete
                    </span>
                  </form>
                </div>
              </div>
              <div id="price">
                <p>{product.price}</p>
              </div>
            </div>
          );
        })}
      {cartProducts[0] && (
        <div id="cart-confirm">
          <div
            className="button"
            id="order-confirm"
            onClick={handleSubmitOrder}
          >
            <p>CONFIRM ORDER</p>
          </div>
          <p id="total-price">Total Price: {cart.price}</p>
        </div>
      )}
      {!cartProducts[0] && (
        <div id="no-products">
          {!success ?
          <p>No products in cart</p>
          :
          <p>Order placed successfully!</p>
          }
          <a href="../products">Back to products</a>
          
        </div>
      )}
    </div>
  );
}

export default Checkout;
