import "./login.scoped.css";
import { Link } from 'react-router-dom';
import React from 'react';

let noMatchElement;

class Signup extends React.Component {  
  constructor(props) {
      super(props);
      this.state = {password: '', password_conf: '', beDisabled: false};
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
      if (event.target.name === "password"){
        this.setState({password: event.target.value});
      } else if (event.target.name === "password_conf"){
        this.setState({password_conf: event.target.value})
        if (this.state.password.slice(0, -1) === this.state.password_conf){
          console.log(this.state.password);
          console.log("conf",this.state.password_conf);
          noMatchElement = (<p></p>);
          this.setState({beDisabled: false});
        } else {
          event.preventDefault();
          noMatchElement = (<p>Passwords do no match </p>);
          this.setState({beDisabled: true});
        }
      }
    }

    
  
    render() {
      return (
        <main id="signup-main">
          <div className="form-container">
          <form class="login-form" method="post" action='/api/user'>
            <h1>STREAM WITH MEZZO!</h1>
            <label>
              <h3>Email:</h3>
              <input type="text" placeholder="Enter your email" name="email" required/>
            </label>

            <label>
              <h3>Username:</h3>
              <input type="text" placeholder="Enter your username" name="username" required/>
            </label>

            <label>
              <h3>Password:</h3>
              <input type="password" placeholder="Enter your password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} required/>
            </label>

            <label>
              <h3>Confirm Password:</h3>
              <input type="password" placeholder="Enter your password" name="password_conf" value={this.state.password_conf} onChange={e => this.handleChange(e)} required/>
            </label>

            <input id="signup-btn" className="login-signup-btn" type="submit" value="Sign Up" disabled={this.state.beDisabled}/>
            {noMatchElement}
            <p id="form-footer">Already have an account? <Link to={'/login'}>LOGIN!</Link></p>

          </form>
          </div>
        </main>
      );
    }
  }
  
  export default Signup;