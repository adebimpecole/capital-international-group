import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthNav from "../sections/AuthNav";
import AuthFooter from "../sections/AuthFooter";
import { updateFirestore } from "../utilities/firebaseFunctions";
import { Context } from "../utilities/Context";
import { ToastContainer } from "react-toastify";
import { excludeEmptyStrings } from "../utilities/otherFunctions";

const ForgetPassword3 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state.email;

  const [confirm, setConfirm] = useState("");
  const [password, setPassword] = useState("");

  let { user, setuser, id, setid, errorMessage, successMessage } = useContext(Context);
  const changePassword = async (e) => {
    e.preventDefault();
    // let data = await fetchDataFromFirestore("users", "email", email);
    const updatedData = {
        password: password,
      };

    if (password == "" || confirm == "") {
      errorMessage("Fill in all fields!");
    } else {
      if (confirm !== password) {
        errorMessage("The passwords are different");
      } else {
        // takes all updated value from the updatedData object
        const collectedData = excludeEmptyStrings(updatedData);

        // checks for collected data and uploads it to firestore
        if (Object.keys(collectedData).length === 0) {
        } else {
            try {
                successMessage("Password changed successfully!");
                const isUpdated = await updateFirestore("users", "email", email, collectedData);
                
                if (isUpdated) {
                  navigate("/login");
                } else {
                  errorMessage("Failed to update password."); // Handle failure to update
                }
              } catch (error) {
                errorMessage("An error occurred while changing the password. Please try again later.");
              }
        }
      }
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
                Enter New Password <span>*</span>
              </label>
              <input
                name="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form_input">
              <label>
                {" "}
                Confirm Password
                <span>*</span>
              </label>
              <input
                name="password"
                type="password"
                required
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>
            <div className="login_submit">
              <button
                className="login_button"
                id="login-btn"
                onClick={changePassword}
              >
                <span>Finish</span>
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

export default ForgetPassword3;
