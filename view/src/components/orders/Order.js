import "./Order.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { retrieveOrder } from "../util";

function Order() {
  const [orderProducts, setOrderProducts] = useState([]);

  const { orderId } = useParams();

  useEffect(() => {
    const getOrder = async () => {
      const orderProductsList = await retrieveOrder(orderId);
      setOrderProducts(orderProductsList);
    };
    getOrder();
  }, [orderId]);

  return (
    <div id="order-root">
      {orderProducts[0] && (
        <div id="order">
          <div id="order-title">
            <span>Order ID: {orderId}</span>
            <span>
              Placed: {orderProducts[0].date_submitted.substring(0, 10)}
            </span>
            <span>Total: {orderProducts[0].order_price}</span>
            <span>Status: {orderProducts[0].order_status}</span>
          </div>
          {orderProducts.map((product) => {
            return (
              <div id="order-listing" key={product.product_id}>
                <img
                  src={require(`../../resources/${product.product_image}.jpg`)}
                  alt={product.product_image}
                />
                <div id="product-details">
                  <div id="name-description">
                    <p id="name">{product.product_name}</p>
                    <p id="description">{product.product_description}</p>
                  </div>
                  <p>Amount: {product.amount}</p>
                  <p>Product Price: {product.product_price}</p>
                </div>
              </div>
            );
          })}
          {orderProducts[0] && (
            <div id="order-total">
              <p id="order-total-label">ORDER TOTAL:</p>
              <p id="order-total-price">{orderProducts[0].order_price}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Order;
