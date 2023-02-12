import { Link } from 'react-router-dom';
import React from 'react';
import './login.scoped.css';

class Login extends React.Component {
    render() {
      return (
        <main>
          <div className="form-container">
          <form class="login-form" method="POST" action='/api/user/login'>
            <h1>STREAM WITH MEZZO!</h1>
            <label>
              <h3>Username:</h3>
              <input type="text" placeholder="Enter your username" name = "username" required/>
            </label>

            <label>
              <h3>Password:</h3>
              <input type="password" placeholder="Enter your password" name="password" required/>
            </label>

            <input className="login-signup-btn" type="submit" value="Login" onClick="fufillLogin"/>

            <p>Don't have an account? <Link to={'./../signup'}>SIGN UP!</Link></p>
            <p><Link to={'./../forgotpw'}>Forgot Password?</Link></p>
          </form>
          </div>
        </main>
      );
    }
  }
  
  export default Login;