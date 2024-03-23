import React, { useState, useEffect, useContext, useRef } from "react";

import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

import { Context } from "../utilities/Context";

import { ToastContainer } from "react-toastify";

import link from "../assets/external-link.svg";
import home2 from "../assets/home copy.svg";
import set2 from "../assets/person.svg";

const SideNav = () => {
  const { user, setuser, id, setid, errorMessage, successMessage } =
    useContext(Context);

  // Signing out
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        window.location.href = "/";
        localStorage.clear();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sidenav">
      <ul className="first_list">
        <div className="sidenav_logo">
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
        <div className="nav_section">
          <ul className="list_segment">
            <li className="">
              <img src={home2} alt="nav_icon" className="nav_icon" />
              <span>Home</span>
            </li>
            <li className="">
              <img src={home2} alt="nav_icon" className="nav_icon" />
              <span>Analytics</span>
            </li>
            <li className="opened_tab">
              <img src={set2} alt="nav_icon" className="nav_icon" />
              <span>Profile</span>
            </li>
          </ul>
        </div>
      </ul>
      <ul>
        <li onClick={handleLogout}>
          <img src={link} alt="nav_icon" className="nav_icon" />
          <span>Log Out</span>
        </li>
      </ul>
      <ToastContainer />
    </div>
  );
};

export default SideNav;
