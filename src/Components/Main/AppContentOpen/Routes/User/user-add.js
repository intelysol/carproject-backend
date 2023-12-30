import React, { useEffect, useState } from "react";
import "../../../../../index.css";

//! Importing Phone Number Input...
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

//! Importing Axios for fetching Api's...
import axios from "axios";

//! Import Link from React Router Dom...
import { Link, useNavigate } from "react-router-dom";

//! Importing Enviroment File...
import host from "../../../../../enviroment-file/enviroment-file";

//! Importing Modal Icons...
import errorIcon from "../../../../../assets/icons/404-error.png";
import successIcon from "../../../../../assets/icons/success-icon.png";

//! Importing Firebase reCaptcha & more for phone number verification...
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../../../firebase/setup";

const UserForm = () => {
  let navigation = useNavigate();

  //! Form States...
  const [userFullName, setUserFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userContactNumber, setUserContactNumber] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [userIP, setUserIP] = useState("");
  const [status, setStatus] = useState(true);

  //* Image State...
  const [file, setFile] = useState(null);

  //! Phone Number Verification states....
  const [userConfirmation, setUserConfirmation] = useState(null);
  const [userOtp, setUserOtp] = useState("");
  const [userOtpSendStatus, setUserOtpSendStatus] = useState("");

  //? Modal/Alert State...
  const [modalStatus, setModalStatus] = useState(false);
  const [modalData, setModalData] = useState(null);

  //! Function for uploading image into folder...
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", file);

    let apiUrl = `${host[0].hostUrl}/api/upload/image/user`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: formData,
      });
      console.log(response);
      if (response.status == 200) {
        setModalStatus(true);
        setModalData({
          heading: "Congraulations!",
          title: "OTP verified",
          title2: "New account is created successfully",
          statusCode: "200",
        });
        setTimeout(() => {
          setModalData(null);
          setModalStatus(false);
          setUserFullName("");
          setUserEmail("");
          setUserContactNumber("");
          setUserRole("");
          setUserPassword("");
          setUserConfirmPassword("");
          setUserIP("");
          setStatus(true);
          setFile(null);

          setUserConfirmation(null);
          setUserOtp("");
          userOtpSendStatus("");

          navigation("/userTable");
        }, 2000);
      }
    } catch (error) {
      console.log("Something went wrong while uploading image: ", error);
      setModalStatus(true);
      setModalData({
        heading: "Error: Cannot process your entry!",
        title:
          "Something went wrong from server site make sure your network is connected",
        title2: "Make sure you entered correct details",
        statusCode: "500",
      });
      setTimeout(() => {
        setModalStatus(false);
        setModalData(null);
      }, 5000);
    }
  };

  //! Calling Api for adding new user data...
  const apiCall = async (
    fullName,
    email,
    contactNumber,
    role,
    password,
    confirmPassword,
    ip,
    status
  ) => {
    let apiUrl = `${host[0].hostUrl}/api/user/signup`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: {
          fullName,
          email,
          contactNumber,
          role,
          password,
          confirmPassword,
          ip,
          status,
        },
      });
      console.log(response);
      if (response.status == 201) {
        // alert("New user account created successfully");
        uploadImage();
      }
    } catch (error) {
      console.log(
        "Something went wrong while adding user data in dataBase: ",
        error
      );
      // alert(error.response.data.message);
      if (error.response) {
        setModalStatus(true);
        setModalData({
          heading: "Error: Cannot process your entry!",
          title: error.response.data.message,
          title2: "Please enter correct details",
          statusCode: "500",
        });
        setTimeout(() => {
          setModalStatus(false);
          setModalData(null);
        }, 5000);
      } else {
        setModalStatus(true);
        setModalData({
          heading: "Error: Cannot process your entry!",
          title:
            "Something went wrong from server site make sure your network is connected",
          title2: "Make sure you entered correct details",
          statusCode: "500",
        });
        setTimeout(() => {
          setModalStatus(false);
          setModalData(null);
        }, 5000);
      }
    }
  };

  //! Function for sending otp to user phone number using firebase...
  const sendOtp = async (e) => {
    e.preventDefault();
    if (userContactNumber.trim().length == 13) {
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
        // console.log(
        //   "Something went wrong while sending otp to user phone number: ",
        //   error
        // );
        setUserOtpSendStatus("failed");
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
  const verifyOtp = async (statusValue) => {
    try {
      let verifyOtp = await userConfirmation.confirm(userOtp);
      // console.log("Otp verified: ", verifyOtp);
      if (verifyOtp) {
        apiCall(
          userFullName.trim(),
          userEmail.trim(),
          userContactNumber.trim(),
          userRole.trim(),
          userPassword.trim(),
          userConfirmPassword.trim(),
          userIP,
          statusValue
        );
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

  //! Function for getting user ip...
  const callApiforGettingIP = async () => {
    // ! Api Calling for getting user ip...
    let apiUrl = "https://api.ipify.org";

    try {
      let response = await fetch(apiUrl);
      // console.log(await response.text());

      if (response.status == 200) {
        let userip = await response.text();
        setUserIP(userip);
      }
    } catch (error) {
      console.log("Something went wrong while fetching IP api: ", error);
    }
  };

  //! Fucntion for adding new user in dataBase...
  const addNewUser = async (e) => {
    if (
      userFullName.trim() == "" ||
      userEmail.trim() == "" ||
      userContactNumber.trim() == "" ||
      userRole.trim() == "" ||
      userPassword.trim() == "" ||
      userConfirmPassword.trim() == ""
    ) {
      setModalStatus(true);
      setModalData({
        heading: "Error: Cannot process your entry!",
        title: "All fields are required",
        title2: "Make sure you entered correct details",
        statusCode: "400",
      });
      setTimeout(() => {
        setModalStatus(false);
        setModalData(null);
      }, 5000);
    } else if (
      userFullName.trim().length < 3 ||
      userEmail.trim().length < 8 ||
      userContactNumber.trim().length < 13 ||
      userRole.trim().length < 3 ||
      userPassword.trim().length < 8 ||
      userConfirmPassword.trim().length < 8
    ) {
      setModalStatus(true);
      setModalData({
        heading: "Error: Cannot process your entry!",
        title: "Please enter valid details",
        title2: "Make sure you entered correct details",
        statusCode: "400",
      });
      setTimeout(() => {
        setModalStatus(false);
        setModalData(null);
      }, 5000);
    } else if (userContactNumber.trim().length !== 13) {
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
    } else if (file == null) {
      setModalStatus(true);
      setModalData({
        heading: "Error: Cannot process your entry!",
        title: "Please upload profile picture",
        title2: "Make sure you entered correct details",
        statusCode: "400",
      });
      setTimeout(() => {
        setModalStatus(false);
        setModalData(null);
      }, 5000);
    } else if (userPassword !== userConfirmPassword) {
      setModalStatus(true);
      setModalData({
        heading: "Error: Cannot process your entry!",
        title: "Password not matched",
        title2: "Please enter same password in both fields",
        statusCode: "400",
      });
      setTimeout(() => {
        setModalStatus(false);
        setModalData(null);
      }, 5000);
    } else if (userOtp.trim() == "" || userOtp.trim().length !== 6) {
      setModalStatus(true);
      setModalData({
        heading: "Error: Cannot process your entry!",
        title: "Invalid OTP",
        title2: "Please enter 6 digits correct OTP",
        statusCode: "400",
      });
      setTimeout(() => {
        setModalStatus(false);
        setModalData(null);
      }, 5000);
    } else {
      let statusValue;
      if (status == true) {
        statusValue = "active";
      } else {
        statusValue = "inActive";
      }
      verifyOtp(statusValue);

      e.preventDefault();
    }
  };

  useEffect(() => {
    callApiforGettingIP();
    setUserRole("User");
  }, []);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">User</h1>
        </div>
        <div className="ms-auto pageheader-btn">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" style={{ color: " #8fbd56" }}>
              User
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add New User
            </li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="card">
            <div className="card-header border-bottom">
              <h3 className="card-title">Add New User</h3>
            </div>
            <div className="card-body">
              <form
                className="row g-3 needs-validation"
                noValidate
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Full Name */}
                <div className="col-md-6">
                  <label htmlFor="validationCustom01" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    required
                    value={userFullName}
                    onChange={(e) => {
                      setUserFullName(e.target.value);
                    }}
                    style={{
                      borderColor:
                        userFullName.trim().length < 3 ? "red" : "#8fbd56",
                    }}
                  />
                  {userFullName.trim().length < 3 ? (
                    <label
                      htmlFor="validationCustom01"
                      className="form-label"
                      style={{
                        color: "red",
                        fontWeight: "400",
                        paddingLeft: 10,
                      }}
                    >
                      Please enter user full name
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
                  <div className="valid-feedback">Looks good!</div>
                </div>
                {/* Upload Profile Picture */}
                <div className="col-md-6">
                  <label htmlFor="validationCustom02" className="form-label">
                    Upload Profile Picture
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="validationCustom02"
                    required
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                    style={{
                      borderColor: file == null ? "red" : "#8fbd56",
                    }}
                  />
                  {file == null ? (
                    <label
                      htmlFor="validationCustom01"
                      className="form-label"
                      style={{
                        color: "red",
                        fontWeight: "400",
                        paddingLeft: 10,
                      }}
                    >
                      Please upload profile picture
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
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {/* Email */}
                  <div className="col-md-4">
                    <label htmlFor="validationCustom01" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={userEmail}
                      onChange={(e) => {
                        setUserEmail(e.target.value);
                      }}
                      style={{
                        borderColor:
                          userEmail.trim().length < 8 ? "red" : "#8fbd56",
                      }}
                    />
                    {userEmail.trim().length < 8 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter valid email address
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
                    <div className="valid-feedback">Looks good!</div>
                  </div>
                  {/* Password */}
                  <div className="col-md-4">
                    <label htmlFor="validationCustom01" className="form-label">
                      Set Password
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={userPassword}
                      onChange={(e) => {
                        setUserPassword(e.target.value);
                      }}
                      style={{
                        borderColor:
                          userPassword.trim().length < 8 ? "red" : "#8fbd56",
                      }}
                    />
                    {userPassword.trim().length < 8 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter strong password
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
                    <div className="valid-feedback">Looks good!</div>
                  </div>
                  {/* Confirm Password */}
                  <div className="col-md-4">
                    <label htmlFor="validationCustom01" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={userConfirmPassword}
                      onChange={(e) => {
                        setUserConfirmPassword(e.target.value);
                      }}
                      style={{
                        borderColor:
                          userConfirmPassword.trim().length < 8
                            ? "red"
                            : "#8fbd56",
                      }}
                    />
                    {userConfirmPassword.trim().length < 8 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter same password
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
                    <div className="valid-feedback">Looks good!</div>
                  </div>
                  {/* Contact Number */}
                  <div className="col-md-4" style={{ backgroundColor: "none" }}>
                    <label htmlFor="validationCustom01" className="form-label">
                      Contact Number
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
                        className="btn btn-azure"
                        onClick={(e) => {
                          sendOtp(e);
                        }}
                        disabled={userContactNumber.length < 13 ? true : false}
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
                          : userOtpSendStatus == "success"
                          ? "OTP sended to your phone number"
                          : userOtpSendStatus == "failed"
                          ? "Failed while sending otp"
                          : ""}
                      </label>
                    )}
                    <div className="valid-feedback">Looks good!</div>
                  </div>
                  {/* Otp Verify */}
                  <div className="col-md-4" style={{ backgroundColor: "none" }}>
                    <label htmlFor="validationCustom01" className="form-label">
                      Verify Otp
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="validationCustom01"
                      required
                      disabled={userConfirmation == null ? true : false}
                      value={userOtp}
                      onChange={(e) => {
                        setUserOtp(e.target.value);
                      }}
                      style={{
                        cursor:
                          userConfirmation == null ? "not-allowed" : "pointer",
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
                    <div className="valid-feedback">Looks good!</div>
                  </div>
                  {/* User Role */}
                  <div className="col-md-4">
                    <label htmlFor="validationCustom04" className="form-label">
                      Select Role
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={userRole}
                      onChange={(e) => {
                        setUserRole(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      <option>User</option>
                      <option>Dealer</option>
                    </select>
                    {userRole.trim().length < 3 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select role
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
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                  {/* Phone Verify Recaptcha */}
                  <div id="recaptcha"></div>
                  {/* Status */}
                  <div
                    className="col-md-3"
                    style={{ paddingLeft: 20, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Active/Inactive
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-2"
                            defaultChecked={true}
                            onClick={() => {
                              setStatus(!status);
                            }}
                          />
                          <label
                            htmlFor="checkbox-2"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {status == true ? "Active" : ""}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                </div>

                {/* Button */}
                <div className="col-12">
                  <div className="btn btn-default" style={{ marginRight: 10 }}>
                    <Link to={"/userTable"}>Cancel</Link>
                  </div>
                  <div
                    className="btn btn-primary"
                    onClick={(e) => {
                      addNewUser(e);
                    }}
                  >
                    Verify & Add New User
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade show customStyle"
        id="modalToggle"
        aria-modal="true"
        role="dialog"
        style={{
          // display: modalStatus == true ? "block" : "none",
          // position: "absolute",
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

export default UserForm;
