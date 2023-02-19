import "./master.scoped.css";
import * as React from "react";
import {useNavigate } from "react-router-dom";

const Master = () => {
  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/login");
  };

  const navigateSignup = () => {
    navigate("/signup");
  };
  return (
    <>
    <img id="master-img" src="./headphones.jpg"/>
    <div className="master-main">
      <div className="master-body">
        <h3>Welcome to</h3>
        <h1 id="service-name">Mezzo</h1>
        <div className="join-btn-container">
          <button className="join-btn" onClick={navigateLogin}>
            Login
          </button>
          <button className="join-btn" onClick={navigateSignup}>
            Sign up
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Master;
