import React, { useState, useEffect } from "react";
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

const PackageDetailsForm = () => {
  let navigation = useNavigate();

  //! Form States...
  const [packageType, setPackageType] = useState(null);
  const [packageFeatures, setPackageFeatures] = useState("");

  //? Api Data State...
  const [packagesDataState, setPackagesDataState] = useState([]);

  //? Modal/Alert State...
  const [modalStatus, setModalStatus] = useState(false);
  const [modalData, setModalData] = useState(null);

  //! Calling Api for adding new package details data...
  const apiCall = async (packageType, packageFeatures) => {
    let apiUrl = `${host[0].hostUrl}/api/post/data/packagesDetails`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: { packageType, packageFeatures },
      });
      console.log(response);
      if (response.status == 200) {
        // alert("success");
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
          setPackageType("");
          setPackageFeatures("");
          navigation("/packageDetailsTable");
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

  //! Function for adding new data in dataBase...
  const addNewPackageDetails = async () => {
    if (packageType.trim() == "" || packageFeatures.trim() == "") {
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
      apiCall(packageType.trim(), packageFeatures.trim());
    }
  };

  //! Fetching Package Type Api...
  const packageTypeApiCall = async () => {
    let apiUrl = `${host[0].hostUrl}/api/get/data/packages`;

    try {
      let response = await axios({
        method: "GET",
        url: apiUrl,
      });
      console.log(response.data.data);
      if (response.status == 200) {
        setPackagesDataState(response.data.data);
        setPackageType(response.data.data[0]);
      }
    } catch (error) {
      console.log(`Something went wrong while fecthing packages Api: `, error);
    }
  };

  useEffect(() => {
    packageTypeApiCall();
  }, []);

  useEffect(() => {
    console.log("Package Type: ", packageType);
  }, [packageType]);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Package Details</h1>
        </div>
        <div className="ms-auto pageheader-btn">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" style={{ color: "#8fbd56" }}>
              Package Details
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add New Package Details
            </li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="card">
            <div className="card-header border-bottom">
              <h3 className="card-title">Add New Package Details</h3>
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
                  <label htmlFor="validationCustom04" className="form-label">
                    Select Package Type
                  </label>
                  <select
                    className="form-select"
                    id="validationCustom04"
                    required
                    value={packageType}
                    onChange={(e) => {
                      setPackageType(e.target.value);
                    }}
                    // style={{
                    //   borderColor:
                    //     faqType.trim() == "Select" ? "red" : "#8fbd56",
                    // }}
                  >
                    <option disabled>Select</option>
                    {packagesDataState.length > 0 ? (
                      packagesDataState.map((item, index) => {
                        return <option key={index} value={item}>{item.packageName}</option>;
                      })
                    ) : (
                      <option></option>
                    )}
                  </select>
                  {/* {packageType.trim().length < 2 ? (
                    <label
                      htmlFor="validationCustom01"
                      className="form-label"
                      style={{
                        color: "red",
                        fontWeight: "400",
                        paddingLeft: 10,
                      }}
                    >
                      Please select Package Type
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
                  )} */}
                  <div className="invalid-feedback">
                    Please select a valid state.
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="validationCustom01" className="form-label">
                    Package Features
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    required
                    value={packageFeatures}
                    onChange={(e) => {
                      setPackageFeatures(e.target.value);
                    }}
                    style={{
                      resize: "none",
                      height: 35,
                      borderColor:
                        packageFeatures.trim().length < 5 ? "red" : "#8fbd56",
                    }}
                  />
                  {packageFeatures.trim().length < 5 ? (
                    <label
                      htmlFor="validationCustom01"
                      className="form-label"
                      style={{
                        color: "red",
                        fontWeight: "400",
                        paddingLeft: 10,
                      }}
                    >
                      Please enter Packages Features
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
                <div className="col-12">
                  <div className="btn btn-default" style={{ marginRight: 10 }}>
                    <Link to={"/packageDetailsTable"}>Cancel</Link>
                  </div>
                  <div
                    className="btn btn-primary"
                    onClick={addNewPackageDetails}
                  >
                    Add New Package Details
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

export default PackageDetailsForm;
