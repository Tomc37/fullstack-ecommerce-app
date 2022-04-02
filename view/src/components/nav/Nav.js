import "./Nav.css";
import React from "react";

function Nav({ loggedIn, cart }) {
  return (
    <div id="nav">
      <div id="nav-box">
        <ul>
          {loggedIn && (
            <a className="navlink" href="/account">
              <li>Account</li>
            </a>
          )}
          {loggedIn && (
            <a className="navlink" href="/products">
              <li>Products</li>
            </a>
          )}
        </ul>
      </div>
      {loggedIn && (
        <a id="cart" href="/cart/checkout">
          Cart ({cart.product_count})
        </a>
      )}
    </div>
  );
}

export default Nav;
