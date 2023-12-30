import React, { useState } from "react";
import "../../../../../index.css";

//! Importing Axios for fetching Api's...
import axios from "axios";

//! Import Link from React Router Dom...
import { Link, useNavigate } from "react-router-dom";

//! Importing Enviroment File...
import host from "../../../../../enviroment-file/enviroment-file";

//! Importing Modal Icons...
import errorIcon from "../../../../../assets/icons/404-error.png";
import successIcon from "../../../../../assets/icons/success-icon.png";

const CustomerForm = () => {
  let navigation = useNavigate();

  //! Form States...
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerContactNumber, setCustomerContactNumber] = useState("");
  const [customerWhatsappNumber, setCustomerWhatsappNumber] = useState("");
  const [customerLocation, setCustomerLocation] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  //? Modal/Alert State...
  const [modalStatus, setModalStatus] = useState(false);
  const [modalData, setModalData] = useState(null);

  //! Calling Api for adding new customer data...
  const apiCall = async (
    name,
    email,
    contactNumber,
    whatsAppNumber,
    location,
    address
  ) => {
    let apiUrl = `${host[0].hostUrl}/api/post/data/customers`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: { name, email, contactNumber, whatsAppNumber, location, address },
      });
      console.log(response);
      if (response.status == 200) {
        setModalStatus(true);
        setModalData({
          heading: "Congraulations!",
          title: "New data is added successfully",
          title2: "Please wait",
          statusCode: "200",
        });
        setTimeout(() => {
          setModalData(null);
          setModalStatus(false);

          setCustomerName("");
          setCustomerEmail("");
          setCustomerContactNumber("");
          setCustomerWhatsappNumber("");
          setCustomerLocation("");
          setCustomerAddress("");

          navigation("/customerTable");
        }, 2000);
      }
    } catch (error) {
      console.log(
        "Something went wrong while adding data in dataBase: ",
        error
      );
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

  //! Fucntion for adding new data in dataBase...
  const addNewCustomer = async () => {
    if (
      customerName.trim() == "" ||
      customerEmail.trim() == "" ||
      customerContactNumber.trim() == "" ||
      customerWhatsappNumber.trim() == "" ||
      customerLocation.trim() == "" ||
      customerAddress.trim() == ""
    ) {
      // alert("all fields are required");
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
    } else {
      apiCall(
        customerName.trim(),
        customerEmail.trim(),
        customerContactNumber.trim(),
        customerWhatsappNumber.trim(),
        customerLocation.trim(),
        customerAddress.trim()
      );
    }
  };

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Customer</h1>
        </div>
        <div className="ms-auto pageheader-btn">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" style={{ color: " #8fbd56" }}>
              Customer
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add New Customer
            </li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="card">
            <div className="card-header border-bottom">
              <h3 className="card-title">Add New Customer</h3>
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
                {/* Customer Name */}
                <div className="col-md-6">
                  <label htmlFor="validationCustom01" className="form-label">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    required
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                    }}
                    style={{
                      borderColor:
                        customerName.trim().length < 2 ? "red" : "#8fbd56",
                    }}
                  />
                  {customerName.trim().length < 2 ? (
                    <label
                      htmlFor="validationCustom01"
                      className="form-label"
                      style={{
                        color: "red",
                        fontWeight: "400",
                        paddingLeft: 10,
                      }}
                    >
                      Please enter customer name
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
                {/* Customer Email */}
                <div className="col-md-6">
                  <label htmlFor="validationCustom01" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    required
                    value={customerEmail}
                    onChange={(e) => {
                      setCustomerEmail(e.target.value);
                    }}
                    style={{
                      borderColor:
                        customerEmail.trim().length < 5 ? "red" : "#8fbd56",
                    }}
                  />
                  {customerEmail.trim().length < 5 ? (
                    <label
                      htmlFor="validationCustom01"
                      className="form-label"
                      style={{
                        color: "red",
                        fontWeight: "400",
                        paddingLeft: 10,
                      }}
                    >
                      Please enter customer email
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
                <div
                  style={{
                    backgroundColor: "none",
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  {/* Customer Contact Number */}
                  <div className="col-md-4">
                    <label htmlFor="validationCustom01" className="form-label">
                      Contact Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={customerContactNumber}
                      onChange={(e) => {
                        setCustomerContactNumber(e.target.value);
                      }}
                      style={{
                        borderColor:
                          customerContactNumber.trim().length < 9
                            ? "red"
                            : "#8fbd56",
                      }}
                    />
                    {customerContactNumber.trim().length < 9 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter contact number
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
                  {/* Customer Whatsapp Number */}
                  <div className="col-md-4">
                    <label htmlFor="validationCustom01" className="form-label">
                      Whatsapp Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={customerWhatsappNumber}
                      onChange={(e) => {
                        setCustomerWhatsappNumber(e.target.value);
                      }}
                      style={{
                        borderColor:
                          customerWhatsappNumber.trim().length < 9
                            ? "red"
                            : "#8fbd56",
                      }}
                    />
                    {customerWhatsappNumber.trim().length < 9 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter whatsApp number
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
                  {/* Customer Location */}
                  <div className="col-md-4">
                    <label htmlFor="validationCustom01" className="form-label">
                      Location
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={customerLocation}
                      onChange={(e) => {
                        setCustomerLocation(e.target.value);
                      }}
                      style={{
                        borderColor:
                          customerLocation.trim().length < 2
                            ? "red"
                            : "#8fbd56",
                      }}
                    />
                    {customerLocation.trim().length < 2 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter customer location
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
                  {/* Customer Address */}
                  <div className="col-md-8">
                    <label htmlFor="validationCustom01" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={customerAddress}
                      onChange={(e) => {
                        setCustomerAddress(e.target.value);
                      }}
                      style={{
                        borderColor:
                          customerAddress.trim().length < 5 ? "red" : "#8fbd56",
                      }}
                    />
                    {customerAddress.trim().length < 5 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter customer address
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
                </div>

                {/* Button */}
                <div className="col-12">
                  <div className="btn btn-default" style={{ marginRight: 10 }}>
                    <Link to={"/customerTable"}>Cancel</Link>
                  </div>
                  <div className="btn btn-primary" onClick={addNewCustomer}>
                    Add New Customer
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

export default CustomerForm;
