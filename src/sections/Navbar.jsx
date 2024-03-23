import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="left_nav">
        <a
          href="/"
          aria-current="page"
          className="footer-logo w-inline-block w--current"
        >
          <img
            src="https://assets-global.website-files.com/5e100b7a946b12ba33ac57ee/5e12f977c5e98c6f6bfd0612_CIG-white-gold.svg"
            width="135"
            alt="capital logo"
            className="image-123"
          />
        </a>
      </div>
      <div className="right_nav">
        <span className="nav_list_item">Investment Services</span>
        <span className="nav_list_item">Banking</span>
        <span className="nav_list_item">Company</span>
        <Link to='/login' className="login_item">Login</Link>
        <Link to='/signup' className="signup_item">Get Started</Link>
        <span className="search_item">
          <img
            src="https://assets-global.website-files.com/5e100b7a946b12ba33ac57ee/5e15d3d5274eec9065bc26cd_search-regular-white.svg"
            width="18"
            alt=""
          />
        </span>
      </div>
    </div>
  );
};

export default Navbar;
