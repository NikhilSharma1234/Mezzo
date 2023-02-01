import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import './login.scoped.css';

class Login extends React.Component {
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
        <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email or Username:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>

          <label>
            Password:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>

          <input type="submit" value="Login" />
        </form>

        <h3>Don't have an account?</h3>
        <Link to={'./signup'}>
        <button variant="raised">
            Sign up!
        </button>
        </Link>
        </div>
      );
    }
  }
  
  export default Login;