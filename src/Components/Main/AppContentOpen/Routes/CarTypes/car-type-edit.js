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

const CarTypeEditForm = () => {
  let location = useLocation();
  let navigation = useNavigate();

  //! Form States...
  const [carTypeName, setCarTypeName] = useState("");
  const [abbrevation, setAbbrevation] = useState("");
  const [status, setStatus] = useState(true);
  const [rowID, setRowID] = useState(Number);

  //? Modal/Alert State...
  const [modalStatus, setModalStatus] = useState(false);
  const [modalData, setModalData] = useState(null);

  //! Calling Api for edit car type data...
  const apiCall = async (carTypeName, typeAbbrevation, status, id) => {
    let apiUrl = `${host[0].hostUrl}/api/put/data/carTypes/update/byId`;

    try {
      let response = await axios({
        method: "PUT",
        url: apiUrl,
        data: { carTypeName, typeAbbrevation, status, id },
      });
      console.log(response);
      if (response.status == 200) {
        // alert("data updated successfully");
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
          setCarTypeName("");
          setAbbrevation("");
          setStatus(false);
          setRowID(Number);
          navigation("/carTypeTable");
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

  //! Fucntion for update new data in dataBase...
  const editCarTypeData = async () => {
    if (carTypeName.trim() == "" || abbrevation.trim() == "" || !rowID) {
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
      let statusValue;
      if (status == true) {
        statusValue = "active";
      } else {
        statusValue = "inActive";
      }
      apiCall(carTypeName.trim(), abbrevation.trim(), statusValue, rowID);
    }
  };

  useEffect(() => {
    console.log(location.state.data);
    setRowID(location.state.data.id);
    setCarTypeName(location.state.data.carType);
    setAbbrevation(location.state.data.abbrevation);
  }, []);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Car Type</h1>
        </div>
        <div className="ms-auto pageheader-btn">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" style={{ color: "#8fbd56" }}>
              Car Type
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
                <div className="col-md-6">
                  <label htmlFor="validationCustom01" className="form-label">
                    Edit Car Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    required
                    value={carTypeName}
                    onChange={(e) => {
                      setCarTypeName(e.target.value);
                    }}
                    style={{
                      borderColor:
                        carTypeName.trim().length < 3 ? "red" : "#8fbd56",
                    }}
                  />
                  {carTypeName.trim().length < 3 ? (
                    <label
                      htmlFor="validationCustom01"
                      className="form-label"
                      style={{
                        color: "red",
                        fontWeight: "400",
                        paddingLeft: 10,
                      }}
                    >
                      Please enter updated Car Type Name
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
                <div className="col-md-6">
                  <label htmlFor="validationCustom01" className="form-label">
                    Edit Abbrevation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    required
                    value={abbrevation}
                    onChange={(e) => {
                      setAbbrevation(e.target.value);
                    }}
                    style={{
                      borderColor:
                        abbrevation.trim().length < 2 ? "red" : "#8fbd56",
                    }}
                  />
                  {abbrevation.trim().length < 2 ? (
                    <label
                      htmlFor="validationCustom01"
                      className="form-label"
                      style={{
                        color: "red",
                        fontWeight: "400",
                        paddingLeft: 10,
                      }}
                    >
                      Please enter updated Car Type Abbrevation
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
                {/* Status */}
                <div className="col-md-5" style={{ marginLeft: 10 }}>
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
                <div className="col-12">
                  <div className="btn btn-default" style={{ marginRight: 10 }}>
                    <Link to={"/carTypeTable"}>Cancel</Link>
                  </div>
                  <div className="btn btn-primary" onClick={editCarTypeData}>
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

export default CarTypeEditForm;
