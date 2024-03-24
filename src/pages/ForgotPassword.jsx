import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import AuthNav from "../sections/AuthNav";
import AuthFooter from "../sections/AuthFooter";
import { auth } from "../config/firebase";
import { Context } from "../utilities/Context";
import { sendPasswordResetEmail } from "firebase/auth";

import { generateCustomId } from "../utilities/otherFunctions";
import { fetchDataFromFirestore } from "../utilities/firebaseFunctions";
import { ToastContainer } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  let { user, setuser, id, setid, successMessage, errorMessage } =
    useContext(Context);

  const requestCode = async (e) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        successMessage("Password reset email sent");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
    navigate('/login')
  };
  return (
    <div className="login">
      <AuthNav />
      <div className="login_container">
        <form noValidate>
          <div>
            <div className="form_head"> Forgot Password </div>
          </div>
          <div className="form_container">
            <div className="form_input">
              <label>
                {" "}
                Enter Email <span>*</span>
              </label>
              <input
                name="email"
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login_submit">
              <button
                className="login_button"
                id="login-btn"
                onClick={requestCode}
              >
                <span>Request Code</span>
              </button>
            </div>
          </div>
        </form>
        <AuthFooter />
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
