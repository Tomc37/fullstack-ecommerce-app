import "./Header.css";
import React from "react";
import { logOut } from "../util";
import { useNavigate } from 'react-router-dom';

function Header({ loggedIn, setLoggedIn, setEmail, setId, setCart }) {
  const navigate = useNavigate();

  const handleLogOut = async (e) => {
    e.preventDefault();
    logOut();
    setLoggedIn(false);
    setEmail("");
    setId("");
    setCart("");
    navigate('/auth/login')
  }

  return (
    <div id="header">
      <h1>Tom's Hardware</h1>
      {loggedIn ? <p onClick={handleLogOut}>Logout</p> : <a href="/auth/login">Login/Register</a>}
      
    </div>
  );
}

export default Header;
