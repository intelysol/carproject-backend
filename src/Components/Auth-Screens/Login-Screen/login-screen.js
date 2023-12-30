import React, { useEffect, useState, useRef } from "react";
import "../../../index.css";

//! Importing axios for fetching api...
import axios from "axios";

//! Import Link from React Router Dom...
import { Link, useNavigate } from "react-router-dom";

//! Importing Enviroment File...
import host from "../../../enviroment-file/enviroment-file";

//! Importing Google ReCaptcha...
import ReCAPTCHA from "react-google-recaptcha";

//! Importing Modal Icons...
import errorIcon from "../../../assets/icons/404-error.png";
import successIcon from "../../../assets/icons/success-icon.png";

const LoginScreen = () => {
  let navigation = useNavigate();

  //! States...
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //* Captcha Value State...
  const [captchaValue, setCaptchaValue] = useState("");
  const captchaRef = useRef();

  //! Login Button State for disable...
  const [btnDisabled, setBtnDisabled] = useState(true);

  //? Modal/Alert State...
  const [modalStatus, setModalStatus] = useState(false);
  const [modalData, setModalData] = useState(null);

  //! Calling Api for login account...
  const apiCall = async (email, password, captchaValue) => {
    let apiUrl = `${host[0].hostUrl}/api/user/signin`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: { email, password, captchaValue },
      });
      // console.log(response);
      if (response.status == 200) {
        localStorage.setItem("ud", JSON.stringify(response.data.data));
        setModalStatus(true);
        setModalData({
          heading: "Congraulations!",
          title: "Login successfully",
          title2: "Please wait we are directing you to your dashboard",
          statusCode: "200",
        });
        setTimeout(() => {
          setCaptchaValue("");
          setEmail("");
          setPassword("");
          captchaRef.current.reset();

          // setModalData(null);
          // setModalStatus(false);

          window.location.reload();
          // navigation("/");
        }, 2000);
      }
    } catch (error) {
      // console.log("Something went wrong while fetching login api: ", error);
      if (error.response) {
        setModalStatus(true);
        setModalData({
          heading: "Error: Failed to login your account!",
          title: error.response.data.message,
          title2: "Please enter correct details",
          statusCode: "500",
        });
        setTimeout(() => {
          setModalStatus(false);
          setModalData(null);
          window.location.reload();
        }, 5000);
      } else {
        setModalStatus(true);
        setModalData({
          heading: "Error: Failed to login your account!",
          title: "Something went wrong from server site",
          title2: "Make sure your network are stable",
          statusCode: "500",
        });
        setTimeout(() => {
          setModalStatus(false);
          setModalData(null);
          window.location.reload();
        }, 5000);
      }
    }
  };

  //! Function for login account...
  const loginAccount = (e) => {
    e.preventDefault();

    if (email.trim() == "" || password.trim() == "" || captchaValue == "") {
      setModalStatus(true);
      setModalData({
        heading: "Error: Failed to login your account!",
        title: "Please enter valid email or correct password",
        title2: "Make sure you will enter valid details",
        statusCode: "500",
      });
      setTimeout(() => {
        setModalStatus(false);
        setModalData(null);
      }, 5000);
    } else if (email == host[1].userEmail) {
      if (password == host[1].userConfirmPassword) {
        let obj = {
          id: host[1].id,
          pictureUrl: host[1].pictureUrl,
          userContactNumber: host[1].userContactNumber,
          userEmail: host[1].userEmail,
          userName: host[1].userName,
          userRole: host[1].userRole,
        };
        localStorage.setItem("ud", JSON.stringify(obj));
        setModalStatus(true);
        setModalData({
          heading: "Congraulations!",
          title: "Dummmy account is login successfully",
          title2: "Please wait we are directing you to dashboard",
          statusCode: "200",
        });
        setTimeout(() => {
          setCaptchaValue("");
          setEmail("");
          setPassword("");
          captchaRef.current.reset();

          // setModalData(null);
          // setModalStatus(false);

          window.location.reload();
          // navigation("/");
        }, 2000);
      } else {
        setModalStatus(true);
        setModalData({
          heading: "Error: Failed to login dummy account!",
          title: "Please enter correct password",
          title2: "Make sure you will enter valid details",
          statusCode: "500",
        });
        setTimeout(() => {
          setModalStatus(false);
          setModalData(null);
        }, 5000);
      }
    } else {
      apiCall(email.trim(), password.trim(), captchaValue);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "rgba(143, 189, 86, 0.9)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          // position: "absolute",
          width: "100%",
        }}
      >
        <img
          src={require("../../../assets/logo/todo.png")}
          className="header-brand-img"
          alt="logo"
          style={{ height: 80, width: 80, marginBottom: 20 }}
        />
        <div className="wrap-login100 p-0">
          <div className="card-body">
            <form className="login100-form validate-form">
              <span className="login100-form-title">Login</span>
              <div
                className="wrap-input100 validate-input"
                data-bs-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  className="input100"
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="zmdi zmdi-email" aria-hidden="true"></i>
                </span>
              </div>
              <div
                className="wrap-input100 validate-input"
                data-bs-validate="Password is required"
              >
                <input
                  className="input100"
                  type="password"
                  name="pass"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="zmdi zmdi-lock" aria-hidden="true"></i>
                </span>
              </div>

              {/* Google ReCaptcha */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <ReCAPTCHA
                  sitekey={host[0].captchaSitekey}
                  onChange={(e) => {
                    setCaptchaValue(e);
                    setBtnDisabled(false);
                  }}
                  ref={captchaRef}
                />
              </div>

              {/* Forget Password Link */}
              <div className="text-end pt-1">
                <p className="mb-0">
                  <button
                    onClick={() => {
                      navigation("/forgetPassScreen");
                    }}
                    className="text-primary ms-1"
                  >
                    Forgot Password?
                  </button>
                </p>
              </div>

              {/* Login Account Btn */}
              <button
                className="container-login100-form-btn"
                disabled={btnDisabled}
                style={{
                  cursor: btnDisabled == true ? "not-allowed" : "pointer",
                }}
                type="button"
                onClick={(e) => {
                  loginAccount(e);
                }}
              >
                <a className="login100-form-btn btn-primary">Login</a>
              </button>
              {/* <div className="text-center pt-3">
                <p className="text-dark mb-0">
                  Not a member?
                  <button className="text-primary ms-1">
                    <Link to="/SignupScreen">Create an Account</Link>
                  </button>
                </p>
              </div> */}
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center my-3">
              {/* <a className="social-login  text-center me-4">
                <i className="fa fa-google"></i>
              </a>
              <a className="social-login  text-center me-4">
                <i className="fa fa-facebook"></i>
              </a>
              <a className="social-login  text-center">
                <i className="fa fa-twitter"></i>
              </a> */}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade show customStyle"
        id="modalToggle"
        aria-modal="true"
        role="dialog"
        style={{
          // display: modalStatus == true ? "block" : "none",
          position: "absolute",
          // backgroundColor: "red",
          display: "block",
          top: modalStatus == true ? "0%" : "-100%",
        }}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          style={{
            backgroundColor: "none",
            display: "flex",
            alignItems: "start",
          }}
        >
          <div className="modal-content">
            <button
              aria-label="Close"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={() => {
                setModalStatus(false);
                setModalData(null);
              }}
              style={{ position: "absolute", right: 10, top: 5 }}
            >
              <span aria-hidden="true">×</span>
            </button>
            {modalStatus == true ? (
              <div
                className="modal-body"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={modalData.statusCode == "200" ? successIcon : errorIcon}
                  style={{ marginTop: 10, height: 45, width: 45 }}
                />
                <h4
                  style={{
                    color: modalData.statusCode == "200" ? "#13bfa6" : "red",
                    textAlign: "center",
                    marginTop: 20,
                  }}
                >
                  {modalData.heading}
                </h4>
                <p style={{ textAlign: "center" }}>{modalData.title}</p>
                <p style={{ textAlign: "center", marginTop: -10 }}>
                  {modalData.title2}
                </p>
                {modalData.statusCode == "200" ? (
                  <button
                    className="btn btn-success"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      setModalStatus(false);
                      setModalData(null);
                    }}
                    style={{ width: 120 }}
                  >
                    Close
                  </button>
                ) : (
                  <button
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      setModalStatus(false);
                      setModalData(null);
                    }}
                    style={{ width: 120 }}
                  >
                    Close
                  </button>
                )}
              </div>
            ) : (
              <div
                className="modal-body"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h4
                  style={{ color: "red", textAlign: "center", marginTop: 20 }}
                >
                  Error
                </h4>
                <p style={{ textAlign: "center" }}>Something went wrong</p>
                <button
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setModalStatus(false);
                    setModalData(null);
                  }}
                  style={{ width: 120 }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
