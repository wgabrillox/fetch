import React, { useState } from "react";
import { post } from "../api";

export const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Enter login credentials</h1>
      <label htmlFor="emailInput">Email</label>
      <input
        type="text"
        id="emailInput"
        placeholder="email"
        value={email}
        onChange={({ target }) => setEmail(target.value)}
      />

      <label htmlFor="nameInput">Name</label>
      <input
        type="text"
        id="nameInput"
        placeholder="name"
        value={name}
        onChange={({ target }) => setName(target.value)}
      />
      <button
        onClick={async () => {
          const response = await post("auth/login", { email, name });
          if (response.ok) {
            setLoggedIn(true);
          }
        }}
      >
        Submit
      </button>
    </div>
  );
};
