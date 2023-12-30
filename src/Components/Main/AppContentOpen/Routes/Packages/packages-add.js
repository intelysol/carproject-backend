import React, { useEffect, useState } from "react";
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

const PackagesForm = () => {
  let navigation = useNavigate();

  //! Form States...
  const [packageName, setPackageName] = useState("");
  const [currencyType, setCurrencyType] = useState("");
  const [carLimit, setCarLimit] = useState("");
  const [packageSellPrice, setPackageSellPrice] = useState("");
  const [packageOfferPrice, setPackageOfferPrice] = useState("");
  const [packageDescription, setPackageDescription] = useState("");
  const [status, setStatus] = useState(true);
  const [verified, setVerified] = useState(true);
  const [featured, setFeatured] = useState(true);

  //* Image State...
  const [file, setFile] = useState(null);

  //? Modal/Alert State...
  const [modalStatus, setModalStatus] = useState(false);
  const [modalData, setModalData] = useState(null);

  //! Function for uploading image into folder...
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", file);

    let apiUrl = `${host[0].hostUrl}/api/upload/image/packages`;

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
          title: "New data is added successfully",
          title2: "Please wait",
          statusCode: "200",
        });
        setTimeout(() => {
          setModalData(null);
          setModalStatus(false);
          setPackageName("");
          setFile(null);
          setStatus(false);
          setCurrencyType("");
          setPackageSellPrice("");
          setPackageOfferPrice("");
          setPackageDescription("");
          setCarLimit("");
          setVerified(false);
          setFeatured(false);
          navigation("/packagesTable");
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

  //! Calling Api for adding new package data...
  const apiCall = async (
    packageName,
    status,
    currency,
    sellPrice,
    offerPrice,
    description,
    carLimit,
    verified,
    featured
  ) => {
    let apiUrl = `${host[0].hostUrl}/api/post/data/packages`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: {
          packageName,
          status,
          currency,
          sellPrice,
          offerPrice,
          description,
          carLimit,
          verified,
          featured,
        },
      });
      console.log(response);
      if (response.status == 200) {
        uploadImage();
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
  const addNewPackage = async () => {
    if (
      packageName.trim() == "" ||
      file == null ||
      currencyType.trim() == "" ||
      packageSellPrice.trim() == "" ||
      packageOfferPrice.trim() == "" ||
      packageDescription.trim() == "" ||
      carLimit.trim() == ""
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
    } else {
      let statusValue = status == true ? "Active" : "InActive";
      let verifyValue = verified == true ? "Verified" : "Not Verified";
      let featuredValue = featured == true ? "Featured" : "Not Featured";
      apiCall(
        packageName.trim(),
        statusValue,
        currencyType.trim(),
        packageSellPrice.trim(),
        packageOfferPrice.trim(),
        packageDescription.trim(),
        carLimit.trim(),
        verifyValue,
        featuredValue
      );
    }
  };

  useEffect(() => {
    setCurrencyType("USD");
    setCarLimit("1");
  }, []);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Packages</h1>
        </div>
        <div className="ms-auto pageheader-btn">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" style={{ color: "#8fbd56" }}>
              Packages
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add New Package
            </li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="card">
            <div className="card-header border-bottom">
              <h3 className="card-title">Add New Package</h3>
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
                    Package Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    required
                    value={packageName}
                    onChange={(e) => {
                      setPackageName(e.target.value);
                    }}
                    style={{
                      borderColor:
                        packageName.trim().length < 3 ? "red" : "#8fbd56",
                    }}
                  />
                  {packageName.trim().length < 3 ? (
                    <label
                      htmlFor="validationCustom01"
                      className="form-label"
                      style={{
                        color: "red",
                        fontWeight: "400",
                        paddingLeft: 10,
                      }}
                    >
                      Please enter Package Name
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
                  <label htmlFor="validationCustom02" className="form-label">
                    Upload Logo
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
                      Please upload Package logo
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
                  {/* PAckage sell price Input Add */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                      Package Sell Price
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={packageSellPrice}
                      onChange={(e) => {
                        setPackageSellPrice(e.target.value);
                      }}
                      style={{
                        borderColor:
                          packageSellPrice.trim().length < 1
                            ? "red"
                            : "#8fbd56",
                        width: "100%",
                      }}
                    />
                    {packageSellPrice.trim().length < 1 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter Package Sell Price
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
                  {/* Package offer price input */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                      Package Offer Price
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={packageOfferPrice}
                      onChange={(e) => {
                        setPackageOfferPrice(e.target.value);
                      }}
                      style={{
                        borderColor:
                          packageOfferPrice.trim().length < 1
                            ? "red"
                            : "#8fbd56",
                        width: "100%",
                      }}
                    />
                    {packageOfferPrice.trim().length < 1 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter Package Offer Price
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
                  {/* Currency Type */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">
                      Select Currency
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={currencyType}
                      onChange={(e) => {
                        setCurrencyType(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      <option>USD</option>
                      <option>AED</option>
                      <option>PKR</option>
                    </select>
                    {currencyType.trim().length < 2 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select Currency Type
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
                  {/* Select Cars Limit */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">
                      Select Cars Limit
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={carLimit}
                      onChange={(e) => {
                        setCarLimit(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                      <option>11</option>
                      <option>12</option>
                    </select>
                    {carLimit.trim().length < 1 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select Cars Limit
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
                  {/* Packages Description */}
                  <div className="col-md-6">
                    <label htmlFor="validationCustom01" className="form-label">
                      Package Description
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={packageDescription}
                      onChange={(e) => {
                        setPackageDescription(e.target.value);
                      }}
                      style={{
                        resize: "none",
                        // height: 100,
                        borderColor:
                          packageDescription.trim().length < 5
                            ? "red"
                            : "#8fbd56",
                      }}
                    />
                    {packageDescription.trim().length < 5 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter Package Description
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
                  {/* CheckBoxes */}
                  <div style={{ display: "flex", gap: 50 }}>
                    {/* Status */}
                    <div
                      // className="col-md-1.5"
                      style={{ marginLeft: 20, backgroundColor: "none" }}
                    >
                      <label
                        htmlFor="validationCustom04"
                        className="form-label"
                      >
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
                    {/* Verify */}
                    <div
                      // className="col-md-1"
                      style={{ backgroundColor: "none" }}
                    >
                      <label
                        htmlFor="validationCustom04"
                        className="form-label"
                      >
                        Verify
                      </label>
                      <div className="form-group">
                        <div className="checkbox">
                          <div className="custom-checkbox custom-control">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="checkbox-3"
                              defaultChecked={true}
                              onClick={() => {
                                setVerified(!verified);
                              }}
                            />
                            <label
                              htmlFor="checkbox-3"
                              className="custom-control-label"
                              style={{
                                marginTop: 3,
                                fontWeight: "500",
                                color: "#8fbd56",
                              }}
                            >
                              {verified == true ? "Verified" : ""}
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="invalid-feedback">
                        Please select a valid state.
                      </div>
                    </div>
                    {/* Featured */}
                    <div
                      // className="col-md-1"
                      style={{ backgroundColor: "none" }}
                    >
                      <label
                        htmlFor="validationCustom04"
                        className="form-label"
                      >
                        Featured
                      </label>
                      <div className="form-group">
                        <div className="checkbox">
                          <div className="custom-checkbox custom-control">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="checkbox-4"
                              defaultChecked={true}
                              onClick={() => {
                                setFeatured(!featured);
                              }}
                            />
                            <label
                              htmlFor="checkbox-4"
                              className="custom-control-label"
                              style={{
                                marginTop: 3,
                                fontWeight: "500",
                                color: "#8fbd56",
                              }}
                            >
                              {featured == true ? "Featured" : ""}
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="invalid-feedback">
                        Please select a valid state.
                      </div>
                    </div>
                  </div>
                </div>
                {/* Button */}
                <div className="col-12">
                  <div className="btn btn-default" style={{ marginRight: 10 }}>
                    <Link to={"/packagesTable"}>Cancel</Link>
                  </div>
                  <div className="btn btn-primary" onClick={addNewPackage}>
                    Add New Package
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

export default PackagesForm;
