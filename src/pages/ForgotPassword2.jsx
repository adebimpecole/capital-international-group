import React,{useState, useContext} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthNav from "../sections/AuthNav";
import AuthFooter from "../sections/AuthFooter";
import { Context } from "../utilities/Context";
import { ToastContainer } from "react-toastify";


const ForgotPassword2 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state ? location.state.email : '';
  const gen_code = location.state ? location.state.code : '';

  let { user, setuser, id, setid, errorMessage } = useContext(Context);

  const [code, setCode] = useState("");

  const checkCode = (e) => {
    e.preventDefault()
    if(code == ''){
        errorMessage('Enter the code sent to your email')
    }
    else{
        if(code === gen_code){
          navigate("/forgot3", { state: { email: email} });

        }
        else{
            errorMessage('Incorrect code!')
        }
    }
  }
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
                Enter Code <span>*</span>
              </label>
              <input name="name" type="text" required value={code}
                onChange={(e) => setCode(e.target.value)} />
            </div>
            <div className="login_submit">
              <button
                className="login_button"
                id="login-btn"
                onClick={checkCode}
              >
                <span>Next</span>
              </button>
            </div>
          </div>
        </form>
        <AuthFooter />
      </div>
      <ToastContainer/>
    </div>
  );
};

export default ForgotPassword2;
