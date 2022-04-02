import "./Login.css";
import React, { useState } from "react";
import { loginAccount, getCart } from '../util';
import { useNavigate } from 'react-router-dom';

function Login({ accountCreated, setLoggedIn, email, setEmail, setCart, setId, cart }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const retrieveCart = async() => {
    let cart = {};
    try {
      cart = await getCart();
    } catch (e) {
      console.log(e);
    }
    setCart(cart);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newUser = "";
    try {
      newUser = await loginAccount(email, password);
      // console.log(newUser);
    } catch (err) {
      return setError("Invalid email address or password");
    }
    if (newUser) {
      setLoggedIn(true);
      setEmail(newUser.email);
      setId(newUser.id);
      retrieveCart();
      navigate('/products');
    }
  }



  return (
    <div id="login">
      {accountCreated && (
        <p style={{ color: "green" }}>Account created successfully!</p>
      )}
      <h3>Please login: </h3>
      <form 
      onSubmit={handleSubmit}
      >
        <label htmlFor="email">Email Address: </label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange = {({ target }) => setEmail(target.value)}
          required
        />
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange = {({ target }) => setPassword(target.value)}
          required
        />
        <div id="button">
          <button type="submit">Login</button>
        </div>
      </form>
      {error && <p style = {{ color: 'red'  }}>{error}</p>}
      <a href="/auth/register">Don't have an account? Register here!</a>
    </div>
  );
}

export default Login;
