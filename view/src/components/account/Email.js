import React, { useState } from "react";
import { changeEmail } from "../util";
import { useNavigate } from "react-router-dom";

function Email({ id, setEmail, error, setError, success, setSuccess}) {
  const navigate = useNavigate();

  const [newEmail, setNewEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const data = new FormData(e.currentTarget);
    try {
      data.set("email", newEmail);
      data.set("id", id);
      const newUser = await changeEmail(data);
      if (newUser.error) {
        return setError(newUser.error);
      }
    } catch (err) {
      console.log(`catch error: ${err}`);
      return setError(err);
    }
    setEmail(newEmail);
    navigate('/account');
    setSuccess('Email address changed successfully!')
  };

  return (
    <div id="change-email">
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-email">New Email: </label>
        <input
          id="new-email"
          type="email"
          name="email"
          value={newEmail}
          onChange={({ target }) => setNewEmail(target.value)}
        />
        <div id="button">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Email;
