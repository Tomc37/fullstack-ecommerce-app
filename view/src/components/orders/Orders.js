import "./Orders.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { retrieveOrders } from "../util";

function Orders() {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const ordersDb = await retrieveOrders();
        console.log(ordersDb);
        console.log(typeof ordersDb);
        if (ordersDb) {
          setOrders(ordersDb);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getOrders();
  }, []);

  const orderClick = (e) => {
    // console.log(e.currentTarget.id);
    const orderId = e.currentTarget.id;
    navigate(`/orders/${orderId}`);
  };

  return (
    <div id="orders">
      {orders &&
        orders.map((order) => {
          return (
            <div
              className="order-listing"
              id={order.id}
              key={order.id}
              onClick={orderClick}
            >
              <span id="order-id">Order ID: {order.id}</span>
              <span id="order-date">
                Placed: {order.date_submitted.substring(0, 10)}
              </span>
              <span id="order-status">Status: {order.status}</span>
              <span id="order-price">Total: {order.price}</span>
            </div>
          );
        })}
      {!orders[0] && (
        <div id="no-orders">
          <p>You have not placed any orders.</p>
          <a id="products-link" href="../products">
            Back to products
          </a>
        </div>
      )}
    </div>
  );
}

export default Orders;
