import React, { useState } from "react";
import { changePassword } from "../util";
import { useNavigate } from "react-router-dom";

function Password({ id, setEmail, setSuccess, setError }) {
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      data.set("oldPassword", oldPassword)
      data.set("newPassword", newPassword)
      data.set("id", id);
      const newUser = await changePassword(data);
      if (newUser.error) {
        return setError(newUser.error);
      }
    } catch (err) {
      console.log(`catch error: ${err}`);
      return setError(err);
    }
    setError("");
    setSuccess("Password changed succesfully!");
    navigate('/account')
  };

  return (
    <div id="change-password">
      <form onSubmit={handleSubmit}>
      <label htmlFor="old-password">Old Password: </label>
        <input
          id="old-password"
          type="password"
          name="oldPassword"
          value={oldPassword}
          onChange={({ target }) => setOldPassword(target.value)}
        />
        <label htmlFor="new-password">New Password: </label>
        <input
          id="new-password"
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={({ target }) => setNewPassword(target.value)}
        />
        <div id="button">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Password;
