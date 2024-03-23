import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";

import AuthNav from "../sections/AuthNav";
import AuthFooter from "../sections/AuthFooter";
import { Context } from "../utilities/Context";

import { ToastContainer } from "react-toastify";
import { auth } from "../config/firebase";
import { addToFirestore } from "../utilities/firebaseFunctions";
import { isValidEmail } from "../utilities/otherFunctions";

const SignUp = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_pass, setConfirm_pass] = useState("");

  let { user, setuser, id, setid, errorMessage, setpage } = useContext(Context);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      email === "" ||
      password === "" ||
      companyName === "" ||
      firstName === "" ||
      lastName === "" ||
      confirm_pass === ""
    ) {
      errorMessage("Please fill in required fields");
    } else {
      if (isValidEmail(email)) {
        if (password == confirm_pass) {
          try {
            // Create a new user with email and password
            try {
              const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
              );
              const the_user = userCredential.user;
              const userId = the_user.uid;

              const new_user = {
                last_name: lastName.toLowerCase(),
                first_name: firstName.toLowerCase(),
                userId: userId,
                email: email,
                password: password,
                company_name: companyName,
              };

              await addToFirestore("users", new_user);

              setuser(firstName);
              setid(userId);
              navigate("/profile");
            } catch (error) {
              switch (error.code) {
                case "auth/email-already-in-use":
                  errorMessage("Email already in use");

                  break;
                case "auth/weak-password":
                  errorMessage("Weak password");
                  break;
                default:
                  errorMessage("Network error");
                  break;
              }
            }
          } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
          }
        } else {
          errorMessage("Passwords do not match!");
        }
      } else {
        errorMessage("Please enter a valid email");
      }
    }
  };

  return (
    <div className="signup">
      <AuthNav />
      <div className="login_container signup_container">
        <form>
          <div className="signup_header">
            <div className="form_head signup_head">
              {" "}
              Welcome to <br /> Capital International Bank.
            </div>
          </div>
          <div className="form_container">
            <div className="name_input">
              <div className="form_input">
                <label>
                  {" "}
                  First Name <span>*</span>
                </label>
                <input
                  name="firstname"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="form_input">
                <label>
                  {" "}
                  Last Name
                  <span>*</span>
                </label>
                <input
                  name="lastname"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form_input">
              <label>
                {" "}
                Company
                <span>*</span>
              </label>
              <input
                name="company"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div className="form_input">
              <label>
                {" "}
                Email
                <span>*</span>
              </label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
                value={confirm_pass}
                onChange={(e) => setConfirm_pass(e.target.value)}
                required
              />
            </div>
            <div className="login_submit">
              <button
                className="login_button"
                value="Submit"
                onClick={onSubmit}
                id="login-btn"
              >
                <span>Sign in</span>
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

export default SignUp;
