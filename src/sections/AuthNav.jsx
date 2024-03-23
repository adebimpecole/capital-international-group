import React from "react";
import { Link } from "react-router-dom";

const AuthNav = () => {
  return (
    <div className="Navbar auth_nav">
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
      <div className="nav_text">
        {" "}
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export default AuthNav;
