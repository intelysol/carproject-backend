import React, { useEffect, useState, useRef } from "react";
import "../../../index.css";

//! Importing Phone Number Input...
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

//! Importing axios for fetching api...
import axios from "axios";

//! Import Link from React Router Dom...
import { Link, useNavigate } from "react-router-dom";

//! Importing Enviroment File...
import host from "../../../enviroment-file/enviroment-file";

//! Importing Modal Icons...
import errorIcon from "../../../assets/icons/404-error.png";
import successIcon from "../../../assets/icons/success-icon.png";

//! Importing Firebase reCaptcha & more for phone number verification...
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../firebase/setup";

const ForgetPassScreen = () => {
  let navigation = useNavigate();

  //! States...
  const [email, setEmail] = useState("");
  const [userContactNumber, setUserContactNumber] = useState("");

  const [emailFindData, setEmailFindData] = useState(null);

  //! Phone Number Verification states....
  const [userConfirmation, setUserConfirmation] = useState(null);
  const [userOtp, setUserOtp] = useState("");
  const [userOtpSendStatus, setUserOtpSendStatus] = useState("");

  //! Login Button State for disable...
  const [btnDisabled, setBtnDisabled] = useState(true);

  //? Modal/Alert State...
  const [modalStatus, setModalStatus] = useState(false);
  const [modalData, setModalData] = useState(null);

  //! Function for sending otp to user phone number using firebase...
  const sendOtp = async (e) => {
    e.preventDefault();
    if (userContactNumber.trim().length == 13) {
      if (userContactNumber.trim() == emailFindData.userContactNumber) {
        try {
          const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
          const confirmation = await signInWithPhoneNumber(
            auth,
            userContactNumber,
            recaptcha
          );
          // console.log("Confirmation: ", confirmation);
          setUserConfirmation(confirmation);
          setUserOtpSendStatus("success");
        } catch (error) {
          console.log(
            "Something went wrong while sending otp to user phone number: ",
            error
          );
          setUserOtpSendStatus("failed");
        }
      } else {
        setModalStatus(true);
        setModalData({
          heading: "Error: Incorrect Phone number!",
          title:
            "The phone number you entered is not associated with your account",
          title2:
            "Please enter correct phone number which is associated to your account",
          statusCode: "400",
        });
        setTimeout(() => {
          setModalStatus(false);
          setModalData(null);
        }, 5000);
      }
    } else {
      setModalStatus(true);
      setModalData({
        heading: "Error: Cannot process your entry!",
        title: "Please enter valid phone number or select your country code",
        title2: "Make sure you entered correct details",
        statusCode: "400",
      });
      setTimeout(() => {
        setModalStatus(false);
        setModalData(null);
      }, 5000);
    }
  };

  //! Function for verifying user otp...
  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      let verifyOtp = await userConfirmation.confirm(userOtp);
      // console.log("Otp verified: ", verifyOtp);
      if (verifyOtp) {
        alert("otp verified successfully");
      } else {
        setModalStatus(true);
        setModalData({
          heading: "Error: Cannot process your entry!",
          title: "Something went wrong while verifying your OTP",
          title2: "Please try again later",
          statusCode: "400",
        });
        setTimeout(() => {
          setModalStatus(false);
          setModalData(null);
        }, 5000);
      }
    } catch (error) {
      // console.log(`Something went wrong while verifying otp: `, error);
      setModalStatus(true);
      setModalData({
        heading: "Error: Cannot process your entry!",
        title: "Failed while verifying your OTP",
        title2: "Invalid OTP or expired",
        statusCode: "400",
      });
      setTimeout(() => {
        setModalStatus(false);
        setModalData(null);
      }, 5000);
    }
  };

  //! Calling Api for searching email...
  const apiCall = async (email) => {
    let apiUrl = `${host[0].hostUrl}/api/search/email/for/forget/Pass`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: { email },
      });
      console.log(response);
      if (response.status == 200) {
        setEmail("");
        alert(response.data.message);
        setEmailFindData(response.data.data);
      }
    } catch (error) {
      //   console.log(
      //     "Something went wrong while finding user at this email: ",
      //     error
      //   );
      if (error.response) {
        setModalStatus(true);
        setModalData({
          heading: "Error: Failed to find your account!",
          title: error.response.data.message,
          title2: "Please enter correct email",
          statusCode: "500",
        });
        setTimeout(() => {
          setModalStatus(false);
          setModalData(null);
        }, 5000);
      } else {
        setModalStatus(true);
        setModalData({
          heading: "Error: Failed to find your account!",
          title: "Something went wrong from server site",
          title2: "Make sure your network are stable",
          statusCode: "500",
        });
        setTimeout(() => {
          setModalStatus(false);
          setModalData(null);
        }, 5000);
      }
    }
  };

  //! Function for login account...
  const searchEmail = (e) => {
    e.preventDefault();

    if (email.trim() == "") {
      setModalStatus(true);
      setModalData({
        heading: "Error: Failed to find your email!",
        title: "Please enter valid email",
        title2: "Make sure you will enter valid details",
        statusCode: "500",
      });
      setTimeout(() => {
        setModalStatus(false);
        setModalData(null);
      }, 5000);
    } else {
      apiCall(email.trim());
    }
  };

  useEffect(() => {
    console.log("Upated confirmation: ", userConfirmation);
  }, [userConfirmation]);

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
        {/* Forget Pass Screen */}
        <div className="row" style={{ backgroundColor: "none" }}>
          <div className="col col-login mx-auto">
            <form
              className="card shadow-none"
              method="post"
              style={{ backgroundColor: "none" }}
            >
              <div className="card-body" style={{ backgroundColor: "none" }}>
                <div className="text-center">
                  <span className="login100-form-title">
                    {emailFindData == null ? "Forgot Password" : "Verification"}
                  </span>
                  {userOtpSendStatus !== "success" ? (
                    <p className="text-muted">
                      {emailFindData == null
                        ? "Enter the email address registered on your account"
                        : "Enter the phone number associated with your account"}
                    </p>
                  ) : (
                    <p className="text-muted">
                      Enter the 6 digits OTP to verify your account
                    </p>
                  )}
                </div>
                <div className="pt-3" id="forgot">
                  <div
                    className="form-group"
                    style={{
                      display: emailFindData !== null ? "none" : "block",
                    }}
                  >
                    <label className="form-label" htmlFor="eMail">
                      Email:
                    </label>
                    <input
                      className="form-control"
                      id="eMail"
                      placeholder="Enter Your Email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>

                  {userConfirmation == null ? (
                    <>
                      {/* Phone number */}
                      <div
                        className="form-group"
                        style={{
                          display: emailFindData == null ? "none" : "block",
                        }}
                      >
                        <label
                          htmlFor="validationCustom01"
                          className="form-label"
                        >
                          Phone Number
                        </label>
                        <div
                          style={{
                            backgroundColor: "none",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <PhoneInput
                            country={"pk"}
                            value={userContactNumber}
                            onlyCountries={["pk", "us", "ae"]}
                            containerStyle={{
                              width: "75%",
                            }}
                            inputStyle={{ width: "100%" }}
                            dropdownStyle={{
                              marginLeft: 200,
                            }}
                            onChange={(e) => {
                              setUserContactNumber("+" + e);
                            }}
                          />
                          {/* Send Otp Button */}
                          <button
                            className="btn btn-default"
                            onClick={(e) => {
                              sendOtp(e);
                            }}
                            id="otpSendBtn"
                            disabled={
                              userContactNumber.length < 13 ? true : false
                            }
                            style={{
                              cursor:
                                userContactNumber.length !== 13
                                  ? "not-allowed"
                                  : "pointer",
                            }}
                          >
                            Send Otp
                          </button>
                        </div>
                        {userContactNumber.trim().length < 13 ? (
                          <label
                            htmlFor="validationCustom01"
                            className="form-label"
                            style={{
                              color: "red",
                              fontWeight: "400",
                              paddingLeft: 10,
                            }}
                          >
                            Select your country & enter number
                          </label>
                        ) : (
                          <label
                            htmlFor="validationCustom01"
                            className="form-label"
                            style={{
                              color: "#8fbd56",
                              fontWeight: "400",
                              paddingLeft: 10,
                            }}
                          >
                            {userOtpSendStatus == ""
                              ? "Looks good"
                              : "Failed while sending OTP"}
                          </label>
                        )}
                        <div className="valid-feedback">Looks good!</div>
                      </div>
                      {/* reacptcha */}
                      <div
                        id="recaptcha"
                        style={{
                          backgroundColor: "none",
                          display: "flex",
                          justifyContent: "center",
                          marginBottom: 10,
                        }}
                      ></div>
                    </>
                  ) : (
                    <>
                      {/* Otp Verify */}
                      <div className="form-group">
                        <label className="form-label" htmlFor="eMail">
                          Enter 6 digits OTP
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="validationCustom01"
                          required
                          value={userOtp}
                          onChange={(e) => {
                            setUserOtp(e.target.value);
                          }}
                        />
                        {userOtp.trim().length < 6 ? (
                          <label
                            htmlFor="validationCustom01"
                            className="form-label"
                            style={{
                              color: "red",
                              fontWeight: "400",
                              paddingLeft: 10,
                            }}
                          >
                            Please enter correct otp
                          </label>
                        ) : (
                          <label
                            htmlFor="validationCustom01"
                            className="form-label"
                            style={{
                              color: "#8fbd56",
                              fontWeight: "400",
                              paddingLeft: 10,
                            }}
                          >
                            Looks good
                          </label>
                        )}
                      </div>
                    </>
                  )}

                  {/* Button */}
                  <div
                    className="submit"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    {emailFindData == null ? (
                      <button
                        className="btn btn-primary p-1"
                        style={{ width: "100%" }}
                        onClick={(e) => {
                          searchEmail(e);
                        }}
                        disabled={email.trim().length < 8 ? true : false}
                      >
                        Search Email
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary p-2"
                        style={{ width: "80%" }}
                        onClick={(e) => {
                          verifyOtp(e);
                        }}
                        disabled={userOtpSendStatus == "success" ? false : true}
                      >
                        Verify Otp
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {/* Footer */}
              <div className="card-footer">
                <div className="text-center mt-2">
                  <p className="text-dark mb-2" style={{ cursor: "pointer" }}>
                    Go back to
                    <a
                      className="text-primary ms-1"
                      onClick={() => navigation("/")}
                    >
                      Login Screen ?
                    </a>
                  </p>
                </div>
              </div>
            </form>
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

export default ForgetPassScreen;
