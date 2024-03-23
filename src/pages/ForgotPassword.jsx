import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import AuthNav from "../sections/AuthNav";
import AuthFooter from "../sections/AuthFooter";

import { Context } from "../utilities/Context";
import EMAILJS_USER_ID from "../config/config";

import { generateCustomId } from "../utilities/otherFunctions";
import { fetchDataFromFirestore } from "../utilities/firebaseFunctions";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  let { user, setuser, id, setid, successMessage } = useContext(Context);

  const requestCode = async (e) => {
    e.preventDefault();
    let code = generateCustomId("REQ", 5);

    const userData = await fetchDataFromFirestore("users", "email", email);

    setuser(userData.first_name);
    setid(userData.userId);

    if (userData.userId != null) {
      // Sending email using EmailJS
      const serviceId = "service_t4divkd";
      const templateId = "template_blevcqa";

      // Send email
      await emailjs.send(serviceId, templateId, {
        user: userData.first_name,
        email: email,
        code: code,
    }, EMAILJS_USER_ID);
      successMessage("Code sent!");
    }

    navigate("/forgot2", { state: { email: email, code: code } });
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
    </div>
  );
};

export default ForgotPassword;
