import "./Register.css";
import React, { useState } from "react";
import { createAccount } from "../util";
import { useNavigate } from "react-router-dom";

const Register = ({setAccountCreated, email, setEmail}) => {

  // Set navigate (previously history() in older React versions)
  const navigate = useNavigate();

  // Set States
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  // Handle submit to create new user, checking if email already exists and returning error if so. Redirect to login if successful
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const data = new FormData(e.currentTarget);
    let newUser = "";
    try {
      data.set("email", email);
      data.set("password", password);
      newUser = await createAccount(data);
      if (newUser.error) {
        return setError(newUser.error);
      }
    } catch (err) {
      console.log(`catch error: ${err}`);
      return setError(err)
    }
    setAccountCreated(true);
    navigate('/auth/login');
  };

  return (
    <div id="register">
      <h3>Please register: </h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email Address: </label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          required
        />
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          required
        />
        <div id="button">
          <button type="submit">Register</button>
        </div>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Register;