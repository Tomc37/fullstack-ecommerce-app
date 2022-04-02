import "./Account.css";
import React, {useState} from "react";
import { Route, Routes } from "react-router-dom";
import Email from "./Email";
import Password from "./Password";

function Account({ email, id, setEmail }) {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  return (
    <div id="account">
      <h3>Your account</h3>
      <div className="account-details">
        <span>Your email: </span>
        <span className="detail-span">{email}</span>
        <a href="/account/email" className="link-span">
          <span>(Change email)</span>
        </a>
      </div>
      <div id="password-details">
        <span>Password:</span>
        <a href="/account/password" className="link-span">
          <span>(Change password)</span>
        </a>
      </div>
      <a id="order-history" href="../orders">Order History</a>
      <Routes>
        <Route path="/email" element={<Email id={id} setEmail={setEmail} setError={setError} setSuccess={setSuccess}/>} />
        <Route path="/password" element={<Password id={id} setError={setError} setSuccess={setSuccess}/>} />
      </Routes>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}

export default Account;
