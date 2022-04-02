import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/header/Header";
import Nav from "./components/nav/Nav";
import Login from "./components/login/Login";
import Account from "./components/account/Account";
import Register from "./components/register/Register";
import Products from "./components/products/Products";
import Checkout from "./components/checkout/Checkout";
import Orders from "./components/orders/Orders";
import Order from "./components/orders/Order";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [cart, setCart] = useState({});

  useEffect(() => {
    setLoggedIn(JSON.parse(window.sessionStorage.getItem("loggedIn")));
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("loggedIn", loggedIn);
  }, [loggedIn]);

  useEffect(() => {
    if (sessionStorage["email"]) {
      setEmail(window.sessionStorage.getItem("email"));
    }
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("email", email);
  }, [email]);

  useEffect(() => {
    if (sessionStorage["id"]) {
      setId(window.sessionStorage.getItem("id"));
    }
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("id", id);
  }, [id]);

  useEffect(() => {
    if (sessionStorage["cart"]) {
      setCart(JSON.parse(window.sessionStorage.getItem("cart")));
    }
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <Router>
      <Header
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        setEmail={setEmail}
        setId={setId}
        setCart={setCart}
      />
      <Nav loggedIn={loggedIn} cart={cart} />
      <main>
        <Routes>
          <Route
            path="/auth/login"
            element={
              loggedIn ? (
                <Navigate to="/account" />
              ) : (
                <Login
                  setLoggedIn={setLoggedIn}
                  accountCreated={accountCreated}
                  email={email}
                  setEmail={setEmail}
                  id={id}
                  setId={setId}
                  setCart={setCart}
                  cart={cart}
                />
              )
            }
          />
          <Route
            path="/auth/register"
            element={
              loggedIn ? (
                <Navigate to="/account" />
              ) : (
                <Register
                  setAccountCreated={setAccountCreated}
                  email={email}
                  setEmail={setEmail}
                />
              )
            }
          />
          <Route
            path="/account/*"
            element={
              loggedIn && <Account email={email} id={id} setEmail={setEmail} />
            }
          />
          <Route path="/products" element={<Products cart={cart} setCart={setCart}/>} />
          <Route path="/cart/checkout" element={<Checkout cart={cart} setCart={setCart}/>} />
          <Route path="/orders/:orderId" element={<Order />} />
          <Route path="/orders" element={<Orders />} />
          <Route
            exact
            path="/"
            loggedIn={loggedIn}
            element={
              loggedIn ? (
                <Navigate to="/account" />
              ) : (
                <Navigate to="/auth/login" />
              )
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
