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

const AreaForm = () => {
  let navigation = useNavigate();

  //! Form States...
  const [areaName, setAreaName] = useState("");
  const [cityName, setCityName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [status, setStatus] = useState(true);

  //! Api Data State...
  const [cityNameData, setCityNameData] = useState([]);

  //? Modal/Alert State...
  const [modalStatus, setModalStatus] = useState(false);
  const [modalData, setModalData] = useState(null);

  //! Calling Api for adding new car brand data...
  const apiCall = async (areaName, cityName, latitude, longitude, status) => {
    let apiUrl = `${host[0].hostUrl}/api/post/data/area`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: { areaName, cityName, latitude, longitude, status },
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

          setAreaName("");
          setCityName("");
          setLatitude("");
          setLongitude("");
          setStatus(false);
          navigation("/areaTable");
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
  const addNewArea = async () => {
    if (
      areaName.trim() == "" ||
      cityName.trim() == ""
    ) {
      setModalStatus(true);
      setModalData({
        heading: "Error: Cannot process your entry!",
        title: "Please select city or enter correct area name",
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
      apiCall(
        areaName.trim(),
        cityName.trim(),
        latitude.trim(),
        longitude.trim(),
        statusValue
      );
    }
  };

  //! Calling cities api...
  const callCityApi = async () => {
    try {
      let response = await axios({
        method: "GET",
        url: `${host[0].hostUrl}/api/get/data/cities`,
      });
      console.log(response);
      if (response.status == 200) {
        setCityName(response.data.data[0].cityName);
        setCityNameData(response.data.data);
      }
    } catch (error) {
      console.log(
        "Something went wrong while fetching city names api: ",
        error
      );
    }
  };

  useEffect(() => {
    callCityApi();
  }, []);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">City Area</h1>
        </div>
        <div className="ms-auto pageheader-btn">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" style={{ color: " #8fbd56" }}>
              City Area
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add New Area
            </li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="card">
            <div className="card-header border-bottom">
              <h3 className="card-title">Add New Area</h3>
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
                {/* DropDown */}
                <div className="col-md-6">
                  <label htmlFor="validationCustom04" className="form-label">
                    Select City
                  </label>
                  <select
                    className="form-select"
                    id="validationCustom04"
                    required
                    value={cityName}
                    onChange={(e) => {
                      setCityName(e.target.value);
                    }}
                  >
                    <option disabled>Select</option>
                    {cityNameData.length > 0 ? (
                      cityNameData.map((item, index) => {
                        return <option key={index}>{item.cityName}</option>;
                      })
                    ) : (
                      <option></option>
                    )}
                  </select>
                  {cityName.trim().length < 2 ? (
                    <label
                      htmlFor="validationCustom01"
                      className="form-label"
                      style={{
                        color: "red",
                        fontWeight: "400",
                        paddingLeft: 10,
                      }}
                    >
                      Please select City Name
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
                {/* Area Name */}
                <div className="col-md-6">
                  <label htmlFor="validationCustom01" className="form-label">
                    Area Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    required
                    value={areaName}
                    onChange={(e) => {
                      setAreaName(e.target.value);
                    }}
                    style={{
                      borderColor:
                        areaName.trim().length < 3 ? "red" : "#8fbd56",
                    }}
                  />
                  {areaName.trim().length < 3 ? (
                    <label
                      htmlFor="validationCustom01"
                      className="form-label"
                      style={{
                        color: "red",
                        fontWeight: "400",
                        paddingLeft: 10,
                      }}
                    >
                      Please enter Area Name
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
                    display: "flex",
                    flexWrap: "wrap",
                    marginBottom: -10,
                  }}
                >
                  <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                      Latitude (Optional)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={latitude}
                      onChange={(e) => {
                        setLatitude(e.target.value);
                      }}
                      style={{
                        borderColor:
                          latitude.trim().length < 2 ? "red" : "#8fbd56",
                      }}
                    />
                    {latitude.trim().length < 2 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter latitude
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
                  <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                      Longitude (Optional)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={longitude}
                      onChange={(e) => {
                        setLongitude(e.target.value);
                      }}
                      style={{
                        borderColor:
                          longitude.trim().length < 2 ? "red" : "#8fbd56",
                      }}
                    />
                    {longitude.trim().length < 2 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter longitude
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

                {/* Button */}
                <div className="col-12">
                  <div className="btn btn-default" style={{ marginRight: 10 }}>
                    <Link to={"/areaTable"}>Cancel</Link>
                  </div>
                  <div className="btn btn-primary" onClick={addNewArea}>
                    Add New Area
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

export default AreaForm;
