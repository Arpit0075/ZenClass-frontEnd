import React from "react";
import "./nav.css";
import logo from "./logo.svg";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="nav-container">
      <div className="img-cont">
        <Link to="/">
          <p>
            <img src={logo} alt="logo" />
          </p>
        </Link>
      </div>
      <div className="menu">
        <Link to="/students">
          <h2>Students</h2>
        </Link>
        <Link to="/mentors">
          <h2>Mentors</h2>
        </Link>
      </div>
    </div>
  );
}

export default Nav;
