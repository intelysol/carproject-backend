import React, { useEffect, useState } from "react";
import "../../../../../index.css";

//! Import Link from React Router Dom...
import { Link, useNavigate, useLocation } from "react-router-dom";

//! Importing Axios for fetching Api's...
import axios from "axios";

//! Importing Enviroment File...
import host from "../../../../../enviroment-file/enviroment-file";

//! Importing Modal Icons...
import errorIcon from "../../../../../assets/icons/404-error.png";
import successIcon from "../../../../../assets/icons/success-icon.png";

const CustomerEditForm = () => {
  let location = useLocation();
  let navigation = useNavigate();

  //! Form States...
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerContactNumber, setCustomerContactNumber] = useState("");
  const [customerWhatsappNumber, setCustomerWhatsappNumber] = useState("");
  const [customerLocation, setCustomerLocation] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [rowID, setRowID] = useState(Number);

  //? Modal/Alert State...
  const [modalStatus, setModalStatus] = useState(false);
  const [modalData, setModalData] = useState(null);

  //! Calling Api for edit customer data...
  const apiCall = async (
    name,
    email,
    contactNumber,
    whatsAppNumber,
    location,
    address,
    id
  ) => {
    let apiUrl = `${host[0].hostUrl}/api/put/data/customers/update/byId`;

    try {
      let response = await axios({
        method: "PUT",
        url: apiUrl,
        data: {
          name,
          email,
          contactNumber,
          whatsAppNumber,
          location,
          address,
          id,
        },
      });
      console.log(response);
      if (response.status == 200) {
        setModalStatus(true);
        setModalData({
          heading: "Congraulations!",
          title: "Data updated successfully",
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

          setRowID(Number);

          navigation("/customerTable");
        }, 2000);
      }
    } catch (error) {
      console.log(
        "Something went wrong while updating data in dataBase: ",
        error
      );
      setModalStatus(true);
      setModalData({
        heading: "Error: Cannot process your update entry!",
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

  //! Fucntion for update data in dataBase...
  const editCustomerData = async () => {
    if (
      customerName.trim() == "" ||
      customerEmail.trim() == "" ||
      customerContactNumber.trim() == "" ||
      customerWhatsappNumber.trim() == "" ||
      customerLocation.trim() == "" ||
      customerAddress.trim() == "" ||
      !rowID
    ) {
      setModalStatus(true);
      setModalData({
        heading: "Error: Cannot process your update entry!",
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
        customerAddress.trim(),
        rowID
      );
    }
  };

  useEffect(() => {
    // console.log(location.state.data);
    setRowID(location.state.data.id);
    setCustomerName(location.state.data.customerName);
    setCustomerEmail(location.state.data.customerEmail);
    setCustomerContactNumber(location.state.data.customerContactNumber);
    setCustomerWhatsappNumber(location.state.data.customerWhatsAppNumber);
    setCustomerLocation(location.state.data.customerLocation);
    setCustomerAddress(location.state.data.customerAddress);
  }, []);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Customer</h1>
        </div>
        <div className="ms-auto pageheader-btn">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" style={{ color: "#8fbd56" }}>
              Customer
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Form
            </li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="card">
            <div className="card-header border-bottom">
              <h3 className="card-title">Edit Form</h3>
            </div>
            <div className="card-body">
              <form
                className="row g-3 needs-validation"
                noValidate
                style={{
                  backgroundColor: "none",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Customer Name */}
                <div className="col-md-6">
                  <label htmlFor="validationCustom01" className="form-label">
                    Edit Customer Name
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
                      Please enter updated name
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
                    Edit Email Address
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
                      Please enter updated email
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
                      Edit Contact Number
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
                        Please enter updated contact number
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
                      Edit Whatsapp Number
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
                        Please enter updated whatsApp number
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
                      Edit Location
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
                        Please enter updated customer location
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
                      Edit Address
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
                        Please enter updated address
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

                <div className="col-12">
                  <div className="btn btn-default" style={{ marginRight: 10 }}>
                    <Link to={"/customerTable"}>Cancel</Link>
                  </div>
                  <div className="btn btn-primary" onClick={editCustomerData}>
                    Update
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

export default CustomerEditForm;
