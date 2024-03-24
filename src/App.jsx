import React, { lazy, Suspense, useState, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Context } from "./utilities/Context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LandingPage from "./pages/LandingPage";

function App() {
  const Login = lazy(() => import("./pages/Login"));
  const SignUp = lazy(() => import("./pages/SignUp"));
  const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
  const ForgotPassword2 = lazy(() => import("./pages/ForgotPassword2"));
  const ForgetPassword3 = lazy(() => import("./pages/ForgetPassword3"));


  const Profile = lazy(() => import("./pages/Profile"));


  let [user, setuser] = useState(null);
  let [id, setid] = useState(null);

  // alert messages
  const errorMessage = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      className: "toast-message",
    });
  };
  const successMessage = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      className: "toast-message2",
    });
  };

  let providerValue = useMemo(
    () => ({
      user,
      setuser,
      id,
      setid,
      errorMessage,
      successMessage,
    }),
    [user, setuser, id, setid, errorMessage, successMessage]
  );

  // Save user to localStorage as a JSON string
  useEffect(() => {
    if (user == null || user == 0 || user == undefined) {
    } else {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("id", JSON.stringify(id));
    }
  }, [user]);

  // Retrieve user information from local storage and parse it to an object
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedId = localStorage.getItem("id");

    if (storedUser) {
      setuser(JSON.parse(storedUser));
    }
    if (storedId) {
      setid(JSON.parse(storedId));
    }
  }, []);

  return (
    <BrowserRouter>
      <>
        <Context.Provider value={providerValue}>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route
            exact
            path="/login"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Login />
              </Suspense>
            }
          />
          <Route
            exact
            path="/signup"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <SignUp />
              </Suspense>
            }
          />
          <Route
            exact
            path="/forgot"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ForgotPassword />
              </Suspense>
            }
          />
          <Route
            exact
            path="/forgot2"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ForgotPassword2 />
              </Suspense>
            }
          />
          <Route
            exact
            path="/forgot3"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ForgetPassword3 />
              </Suspense>
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Profile />
              </Suspense>
            }
          />
        </Routes>
        </Context.Provider>
      </>
    </BrowserRouter>
  );
}

export default App;
