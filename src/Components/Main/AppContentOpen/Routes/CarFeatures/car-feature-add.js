import React, { useState } from "react";
import "../../../../../index.css";

//! Import Link from React Router Dom...
import { Link, useNavigate } from "react-router-dom";

//! Importing Axios for fetching Api's...
import axios from "axios";

//! Importing Enviroment File...
import host from "../../../../../enviroment-file/enviroment-file";

//! Importing Modal Icons...
import errorIcon from "../../../../../assets/icons/404-error.png";
import successIcon from "../../../../../assets/icons/success-icon.png";

const CarFeatureForm = () => {
  let navigation = useNavigate();

  //! Form States...
  const [carFeatureName, setCarFeatureName] = useState("");
  const [status, setStatus] = useState(true);

  //? Modal/Alert State...
  const [modalStatus, setModalStatus] = useState(false);
  const [modalData, setModalData] = useState(null);

  //! Calling Api for adding new car feature data...
  const apiCall = async (carFeature, status) => {
    let apiUrl = `${host[0].hostUrl}/api/post/data/carFeatures`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: { carFeature, status },
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
          setCarFeatureName("");
          setStatus(false);
          navigation("/carFeaturesTable");
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
  const addNewCarFeature = async () => {
    if (carFeatureName.trim() == "") {
      setModalStatus(true);
      setModalData({
        heading: "Error: Cannot process your entry!",
        title: "Please enter correct name of the car feature",
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
      apiCall(carFeatureName.trim(), statusValue);
    }
  };

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Car Features</h1>
        </div>
        <div className="ms-auto pageheader-btn">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" style={{ color: "#8fbd56" }}>
              Car Features
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add New Car Feature
            </li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="card">
            <div className="card-header border-bottom">
              <h3 className="card-title">Add New Car Feature</h3>
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
                    Car Feature
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    required
                    value={carFeatureName}
                    onChange={(e) => {
                      setCarFeatureName(e.target.value);
                    }}
                    style={{
                      borderColor:
                        carFeatureName.trim().length < 3 ? "red" : "#8fbd56",
                    }}
                  />
                  {carFeatureName.trim().length < 3 ? (
                    <label
                      htmlFor="validationCustom01"
                      className="form-label"
                      style={{
                        color: "red",
                        fontWeight: "400",
                        paddingLeft: 10,
                      }}
                    >
                      Please enter Car Feature Name
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
                    <Link to={"/carFeaturesTable"}>Cancel</Link>
                  </div>
                  <div className="btn btn-primary" onClick={addNewCarFeature}>
                    Add New Car Feature
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

export default CarFeatureForm;
