import "./login.scoped.css";
import { Link, Navigate } from 'react-router-dom';
import React, { useState } from 'react';

let noMatchElement;

const Signup = (props) => {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [isDisabled, setDisabled] = useState(false);
    const [error, setError] = useState(null);

    const handleEmailChange = (event) => {
      event.preventDefault();
      setEmail(event.target.value);
    };

    const handleUsernameChange = (event) => {
      event.preventDefault();
      setUsername(event.target.value);
    };

    const handleChange = (event) => {
      if (event.target.name === "password"){
        setPassword(event.target.value);
      } else if (event.target.name === "passwordConf"){
        setPasswordConf(event.target.value)
        if (password.slice(0, -1) === passwordConf){
          noMatchElement = (<p></p>);
          setDisabled(false);
        } else {
          event.preventDefault();
          noMatchElement = (<p>Passwords do no match </p>);
          setDisabled(true);
        }
      }
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const user = await fetch(process.env.REACT_APP_API_URL + "api/user/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, username: username, password: password}),
        });
        localStorage.setItem("username", JSON.stringify(username))
        setUser(user);
        props.onAuth(true);
      } catch (error) {
        props.onAuth(false);
        setError(error);
      }
    };
  
    return (
      <main id="signup-main">
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
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="login-signin-h1">STREAM WITH MEZZO!</h1>
          <label>
            <h3>Email:</h3>
            <input type="text" placeholder="Enter your email" value={email} onChange={handleEmailChange} required/>
          </label>

          <label>
            <h3>Username:</h3>
            <input type="text" placeholder="Enter your username" value={username} onChange={handleUsernameChange} required/>
          </label>

          <label>
            <h3>Password:</h3>
            <input type="password" placeholder="Enter your password" name="password" value={password} onChange={e => handleChange(e)} required/>
          </label>

          <label>
            <h3>Confirm Password:</h3>
            <input type="password" placeholder="Enter your password" name="passwordConf" value={passwordConf} onChange={e => handleChange(e)} required/>
          </label>

          <input id="signup-btn" className="login-signup-btn" type="submit" value="Sign Up" disabled={isDisabled}/>
          {noMatchElement}
          <p id="form-footer">Already have an account? <Link to={'/login'}>LOGIN!</Link></p>

        </form>
        </div>
      </main>
    );
  }
  
  export default Signup;