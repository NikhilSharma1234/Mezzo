import { Link, Navigate } from "react-router-dom";
import React, { Component, useState } from "react";
import "./login.scoped.css";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleUsernameChange = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password}),
      });
      
      setUser(user);
      localStorage.setItem("username", JSON.stringify(username))
    } catch (error) {
      setError(error);
    }
  };
  


  return (
    <main id="login-main">
      {error && <p>{error.message}</p>}
      {user && (
        <Navigate
          to={{
            pathname: "/_/discover",
          }}
          replace={true}
        />
      )}
      <div className="form-container">
        <form class="login-form" onSubmit={handleSubmit}>
          <h1>STREAM WITH MEZZO!</h1>
          <label>
            <h3>Username:</h3>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>

          <label>
            <h3>Password:</h3>
            <input
              type="text"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>

          <input className="login-signup-btn" id="login-btn"type="submit" value="Login" />

          <p id="form-footer">
            Don't have an account? <Link to={"/signup"}>SIGN UP!</Link>
          </p>
          <p><Link to={'./../forgotpw'}>Forgot Password?</Link></p>
        </form>
      </div>
    </main>
  );
};

export default Login;
