import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import AuthNav from "../sections/AuthNav";
import AuthFooter from "../sections/AuthFooter";

import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../config/firebase";

import { Context } from "../utilities/Context";

import { ToastContainer } from "react-toastify";
import { fetchDataFromFirestore } from "../utilities/firebaseFunctions";

const Login = () => {
  const navigate = useNavigate();

  let { user, setuser, id, setid, errorMessage } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      errorMessage("Please fill in required fields");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          const userData = await fetchDataFromFirestore(
            "users",
            "userId",
            user.uid
          );

          setuser(userData.first_name);
          setid(userData.userId);
          navigate("/profile");
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);

          if (errorCode === "auth/invalid-login-credentials") {
            errorMessage("Invalid Email or Password");
          }
          if (errorCode === "auth/network-request-failed") {
            errorMessage("Network error");
          }
          if (errorCode === "auth/invalid-credential") {
            errorMessage("Invalid email or password");
          }
        });
    }
  };
  return (
    <div className="login">
      <AuthNav />
      <div className="login_container">
        <form noValidate>
          <div>
            <div className="form_head"> Welcome back </div>
          </div>
          <div className="form_container">
            <div className="form_input">
              <label>
                {" "}
                Email <span>*</span>
              </label>
              <input
                name="email"
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form_input">
              <label>
                {" "}
                Password
                <span>*</span>
              </label>
              <input
                name="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="login_submit">
              <button className="login_button" id="login-btn" onClick={onLogin}>
                <span>Sign in</span>
              </button>
            </div>
            <div className="form_footer">
              <hr />
              <div className="footer_options">
                <Link to="/forgot">Forgot Password?</Link>
              </div>
            </div>
          </div>
        </form>
        <AuthFooter />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
