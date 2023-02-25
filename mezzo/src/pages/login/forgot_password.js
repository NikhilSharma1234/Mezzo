import { Link } from 'react-router-dom';
import React from 'react';
import './login.scoped.css';

class ResetPW extends React.Component { 
    render() {
      return (
        <main className="forgot-password-main">
          <div className="form-container">
          <form className="login-form" method="POST" action='/api/user/password'>
            <h1 className="login-signin-h1">Forgot Password?</h1>
            <label>
              <h3>Email:</h3>
              <input type="text" placeholder="Enter your email" name= "email" required/>
            </label>

            <h4> If valid email, password will be changed to below </h4>

            <label>
              <h3>New Password:</h3>
              <input type="text" placeholder="Enter your password" name= "password" required/>
            </label>

            <input className="login-signup-btn" id="forgot-btn"type="submit" value="Send Verifcation" onClick="fufillLogin"/>

            <p>Remembered Password? <Link to={'./../login'}>LOGIN!</Link></p>
          </form>
          </div>
        </main>
      );
    }
  }
  
  export default ResetPW;