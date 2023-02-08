import "./login.scoped.css";
import { Link } from 'react-router-dom';
import React, { Component } from 'react';

class Signup extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('A username was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <main>
          <div className="form-container">
          <form class="login-form" onSubmit={this.handleSubmit}>
            <h1>STREAM WITH MEZZO!</h1>
            <label>
              <h3>Email or Username:</h3>
              <input type="text" placeholder="Enter your email/username" value={this.state.value} onChange={this.handleChange} />
            </label>

            <label>
              <h3>Password:</h3>
              <input type="text" placeholder="Enter your password" value={this.state.value} onChange={this.handleChange} />
            </label>

            <label>
              <h3>Confirm Password:</h3>
              <input type="text" placeholder="Enter your password" value={this.state.value} onChange={this.handleChange} />
            </label>

            <input className="login-signup-btn" type="submit" value="Sign Up" />

            <p>Already have an account? <Link to={'./signup'}>LOGIN!</Link></p>
          </form>
          </div>
          

        </main>
      );
    }
  }
  
  export default Signup;