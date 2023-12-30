import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//! Importing axios for fetching api...
import axios from "axios";

//! Importing Enviroment File...
import host from "../../../../../enviroment-file/enviroment-file";

const CarDealerTable = () => {
  //! States...
  const [data, setData] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [modalData, setModalData] = useState(null);

  const [packageData, setPackageData] = useState(null);

  //! Day left bar States...
  const [leftDays, setLeftDays] = useState(Number);

  //! Fetching Car Dealers List Api...
  const fetchingApi = async () => {
    let apiUrl = `${host[0].hostUrl}/api/get/data/carDealers`;

    try {
      let response = await axios({
        method: "GET",
        url: apiUrl,
      });
      console.log(response);
      if (response.status == 200) {
        setData(response.data.data.reverse());
      }
    } catch (error) {
      console.log("Something went wrong while fetching api: ", error);
    }
  };

  //! Function for deleting Row...
  const deleteRow = async (
    id,
    image,
    vatDocs,
    ejariDocs,
    insuranceDocs,
    idCardDocs,
    otherDocs
  ) => {
    //! Calling Api for deleting Row By ID...
    let apiUrl = `${host[0].hostUrl}/api/delete/data/carDealers/row/byId`;

    try {
      let response = await axios({
        method: "DELETE",
        url: apiUrl,
        data: {
          id,
          image,
          vatDocs,
          ejariDocs,
          insuranceDocs,
          idCardDocs,
          otherDocs,
        },
      });
      console.log(response);
      if (response.status == 200) {
        fetchingApi();
      }
    } catch (error) {
      console.log(
        "Something went wrong while deleting row from dataBase: ",
        error
      );
    }
  };

  //! Function for getting current date...
  const getCurrentDate = () => {
    let current = new Date();

    const expiryDate = new Date(
      modalData == null ? "2023-12-22" : modalData.expiryDate
    );
    const currentDate = new Date(
      `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`
    );

    const leftDaysInMs = expiryDate - currentDate;
    const leftDays = Math.floor(leftDaysInMs / (1000 * 60 * 60 * 24));

    setLeftDays(leftDays);
    // console.log(`Left Days by Formula: ${leftDays}`);
  };

  //! Calling Package Api...
  const callPackageApi = async (id) => {
    let apiUrl = `${host[0].hostUrl}/api/get/data/packages/by/id`;
    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: { id },
      });
      console.log(response);
      if (response.status == 200) {
        setPackageData(response.data.data);
      }
    } catch (error) {
      console.log("Something went wrong while fetching api: ", error);
    }
  };

  useEffect(() => {
    fetchingApi();
    // getCurrentDate();
  }, []);

  useEffect(() => {
    getCurrentDate();
  }, [modalData]);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Car Dealers</h1>
        </div>
        <div className="ms-auto pageheader-btn">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" style={{ color: "#8fbd56" }}>
              Car Dealers
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Car Dealers List
            </li>
          </ol>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "none",
          width: "97%",
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <div className="btn btn-primary" style={{ marginBottom: 10 }}>
          <Link to={"/carDealerForm"} style={{ color: "white" }}>
            Add New Car Dealer
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="row row-sm">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header border-bottom">
                <h3 className="card-title">Car Dealers List</h3>
              </div>
              <div className="card-body">
                <div className="table-responsive export-table">
                  <table
                    id="editable-file-datatable"
                    className="table editable-table table-nowrap table-bordered table-edit wp-100"
                  >
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Dealer Name</th>
                        <th>Logo</th>
                        <th>Contact</th>
                        <th>Email</th>
                        {/* <th>CNIC</th> */}
                        <th style={{ width: 200 }}>Days Left</th>
                        <th>Expiry Date</th>
                        <th>Buttons</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        data.map((item, index) => {
                          return (
                            <tr
                              data-id="1"
                              key={index}
                              style={{ cursor: "pointer" }}
                            >
                              <td
                                data-field="id"
                                onClick={() => {
                                  setModalStatus(true);
                                  setModalData(item);
                                  callPackageApi(item.packageType);
                                }}
                              >
                                #{item.id}
                              </td>
                              <td
                                data-field="name"
                                onClick={() => {
                                  setModalStatus(true);
                                  setModalData(item);
                                  callPackageApi(item.packageType);
                                }}
                              >
                                {item.dealerName}
                              </td>
                              {/* <td data-field="age">{item.logo}</td> */}
                              <td
                                data-field="age"
                                onClick={() => {
                                  setModalStatus(true);
                                  setModalData(item);
                                  callPackageApi(item.packageType);
                                }}
                              >
                                <img
                                  src={require(`../../../../../../public/uploads/carDealerImages/${item.image}`)}
                                  height={50}
                                  width={100}
                                  style={{ borderRadius: 5 }}
                                />
                              </td>
                              <td
                                data-field="age"
                                onClick={() => {
                                  setModalStatus(true);
                                  setModalData(item);
                                  callPackageApi(item.packageType);
                                }}
                              >
                                {item.contactNumber}
                              </td>
                              <td
                                data-field="age"
                                onClick={() => {
                                  setModalStatus(true);
                                  setModalData(item);
                                  callPackageApi(item.packageType);
                                }}
                              >
                                {item.emailAddress}
                              </td>
                              {/* <td data-field="age">{item.cnicNumber}</td> */}
                              <td
                                data-field="age"
                                onClick={() => {
                                  setModalStatus(true);
                                  setModalData(item);
                                  callPackageApi(item.packageType);
                                }}
                              >
                                <div
                                  className="card my-1 custom-card mt-0 p-0 pb-0 mb-0 shadow-none"
                                  style={{
                                    backgroundColor: "none",
                                    width: "100%",
                                  }}
                                >
                                  <div className="progress fileprogress h-auto ps-0 mb-0">
                                    <div
                                      className="progress-bar progress-bar-xs wd-15p"
                                      role="progressbar"
                                      aria-valuenow="25"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                      style={{
                                        backgroundColor:
                                          Math.floor(
                                            (new Date(item.expiryDate) -
                                              new Date(
                                                `${new Date().getFullYear()}-${
                                                  new Date().getMonth() + 1
                                                }-${new Date().getDate()}`
                                              )) /
                                              (1000 * 60 * 60 * 24)
                                          ) > 30
                                            ? "green"
                                            : Math.floor(
                                                (new Date(item.expiryDate) -
                                                  new Date(
                                                    `${new Date().getFullYear()}-${
                                                      new Date().getMonth() + 1
                                                    }-${new Date().getDate()}`
                                                  )) /
                                                  (1000 * 60 * 60 * 24)
                                              ) > 60
                                            ? "#59adec"
                                            : Math.floor(
                                                (new Date(item.expiryDate) -
                                                  new Date(
                                                    `${new Date().getFullYear()}-${
                                                      new Date().getMonth() + 1
                                                    }-${new Date().getDate()}`
                                                  )) /
                                                  (1000 * 60 * 60 * 24)
                                              ) > 90
                                            ? "yellow"
                                            : "red",
                                        width: `${
                                          100 -
                                          Math.floor(
                                            (new Date(item.expiryDate) -
                                              new Date(
                                                `${new Date().getFullYear()}-${
                                                  new Date().getMonth() + 1
                                                }-${new Date().getDate()}`
                                              )) /
                                              (1000 * 60 * 60 * 24)
                                          )
                                        }%`,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                                <p style={{ marginBottom: -7 }}>
                                  {Math.floor(
                                    (new Date(item.expiryDate) -
                                      new Date(
                                        `${new Date().getFullYear()}-${
                                          new Date().getMonth() + 1
                                        }-${new Date().getDate()}`
                                      )) /
                                      (1000 * 60 * 60 * 24)
                                  ) > 0
                                    ? Math.floor(
                                        (new Date(item.expiryDate) -
                                          new Date(
                                            `${new Date().getFullYear()}-${
                                              new Date().getMonth() + 1
                                            }-${new Date().getDate()}`
                                          )) /
                                          (1000 * 60 * 60 * 24)
                                      ) + " days left"
                                    : "Expired"}
                                </p>
                              </td>
                              <td
                                data-field="age"
                                onClick={() => {
                                  setModalStatus(true);
                                  setModalData(item);
                                  callPackageApi(item.packageType);
                                }}
                              >
                                {item.expiryDate}
                              </td>
                              <td style={{ width: 120 }}>
                                <div
                                  className="btn btn-azure fs-14 text-white edit-icn"
                                  title="Edit"
                                >
                                  <Link
                                    className="fe fe-edit"
                                    style={{ color: "white" }}
                                    to="/carDealerEditForm"
                                    state={{ data: item }}
                                  ></Link>
                                </div>
                                <a
                                  className="btn btn-red fs-14 text-white trash-icn"
                                  title="trash"
                                  style={{ marginLeft: 10 }}
                                  onClick={() => {
                                    deleteRow(
                                      item.id,
                                      item.image,
                                      item.dealerVatDoc,
                                      item.dealerEjariDoc,
                                      item.dealerInsuranceDoc,
                                      item.dealerIdCard,
                                      item.others
                                    );
                                  }}
                                >
                                  <i className="fe fe-trash"></i>
                                </a>
                                {/* New Button */}
                                <button
                                  className="btn btn-primary fs-14 text-white plus-icn"
                                  title="Add New Car"
                                  style={{ marginTop: 5 }}
                                  disabled
                                >
                                  <Link
                                    className="fa fa-car"
                                    style={{ color: "white" }}
                                    to="/carDetailsForm"
                                    state={{ data: item }}
                                  ></Link>
                                </button>
                                {/* Invoice btn */}
                                <div
                                  className="btn btn-gray fs-14 text-white file-icn"
                                  title="print invoice"
                                  style={{ marginTop: 5, marginLeft: 10 }}
                                >
                                  <Link
                                    className="fa fa-print"
                                    style={{ color: "white" }}
                                    to="/invoiceTable"
                                    state={{ data: item }}
                                  ></Link>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr data-id="0">
                          <td data-field="id">No data</td>
                          <td data-field="name">No data</td>
                          <td data-field="age">No data</td>
                          <td data-field="gender">No data</td>
                          <td data-field="gender">No data</td>
                          <td data-field="gender">No data</td>
                          <td data-field="gender">No data</td>
                          <td style={{ width: 120 }}>No data</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade show"
        id="largemodal"
        tabIndex="-1"
        style={{
          display: modalStatus == true ? "flex" : "none",
          backgroundColor: "none",
          alignItems: "center",
        }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-lg " role="document">
          <div
            className="modal-content"
            style={{ backgroundColor: "none", width: 700 }}
          >
            <div
              className="modal-header"
              style={{
                backgroundColor: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <h6 className="modal-title">Car Dealer details</h6>
              {modalData !== null ? (
                <div style={{ backgroundColor: "none" }}>
                  {modalData.facebookUrl !== "" ? (
                    <img
                      src={require("../../../../../assets/icons/social-icons/facebook.png")}
                      style={{
                        height: 30,
                        width: 30,
                        marginRight: 10,
                        cursor: "pointer",
                      }}
                      alt="fb-icon"
                      onClick={() => {
                        window.open(modalData.facebookUrl, "_blank");
                      }}
                    />
                  ) : (
                    ""
                  )}
                  {modalData.instagramUrl !== "" ? (
                    <img
                      src={require("../../../../../assets/icons/social-icons/instagram.png")}
                      style={{
                        height: 30,
                        width: 30,
                        marginRight: 10,
                        cursor: "pointer",
                      }}
                      alt="insta-icon"
                      onClick={() => {
                        window.open(modalData.instagramUrl, "_blank");
                      }}
                    />
                  ) : (
                    ""
                  )}
                  {modalData.twitterUrl !== "" ? (
                    <img
                      src={require("../../../../../assets/icons/social-icons/twitter.png")}
                      style={{
                        height: 30,
                        width: 30,
                        marginRight: 10,
                        cursor: "pointer",
                      }}
                      alt="twitter-icon"
                      onClick={() => {
                        window.open(modalData.twitterUrl, "_blank");
                      }}
                    />
                  ) : (
                    ""
                  )}
                  {modalData.youtubeUrl !== "" ? (
                    <img
                      src={require("../../../../../assets/icons/social-icons/youtube.png")}
                      style={{
                        height: 30,
                        width: 30,
                        marginRight: 10,
                        cursor: "pointer",
                      }}
                      alt="yt-icon"
                      onClick={() => {
                        window.open(modalData.youtubeUrl, "_blank");
                      }}
                    />
                  ) : (
                    ""
                  )}
                  {modalData.linkedinUrl !== "" ? (
                    <img
                      src={require("../../../../../assets/icons/social-icons/linkedin.png")}
                      style={{
                        height: 30,
                        width: 30,
                        marginRight: 10,
                        cursor: "pointer",
                      }}
                      alt="linkedin-icon"
                      onClick={() => {
                        window.open(modalData.linkedinUrl, "_blank");
                      }}
                    />
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                <button
                  aria-label="Close"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setModalStatus(false);
                    setModalData(null);
                    setPackageData(null);
                  }}
                >
                  <span aria-hidden="true">×</span>
                </button>
              )}
            </div>
            {modalStatus == true ? (
              <div className="modal-body">
                <img
                  src={require(`../../../../../../public/uploads/carDealerImages/${modalData.image}`)}
                  height={50}
                  width={100}
                  style={{ borderRadius: 5, float: "right" }}
                />
                <label
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: 30,
                  }}
                >
                  <b>Dealer Name:</b>
                  <p>{modalData.dealerName}</p>
                </label>

                <div style={{ backgroundColor: "none", marginTop: 20 }}>
                  <div
                    style={{
                      backgroundColor: "none",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <label
                      style={{
                        display: "flex",
                        backgroundColor: "none",
                        width: 200,
                        flexDirection: "column",
                      }}
                    >
                      <b> Contact Number:</b>
                      <p>{modalData.contactNumber}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 70,
                      }}
                    >
                      <b> WhatsApp Number:</b>
                      <p>{modalData.whatsAppNumber}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        paddingLeft: 50,
                      }}
                    >
                      <b> Email Address:</b>
                      <p>{modalData.emailAddress}</p>
                    </label>
                  </div>

                  <div
                    style={{
                      backgroundColor: "none",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <label
                      style={{
                        display: "flex",
                        backgroundColor: "none",
                        width: 200,
                        flexDirection: "column",
                      }}
                    >
                      <b> Emirates ID:</b>
                      <p>{modalData.emiratesId}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 70,
                      }}
                    >
                      <b> Date Of Birth:</b>
                      <p>{modalData.dateOfBirth}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        paddingLeft: 50,
                      }}
                    >
                      <b> Nationality:</b>
                      <p>{modalData.nationality}</p>
                    </label>
                  </div>

                  <div
                    style={{
                      backgroundColor: "none",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <label
                      style={{
                        display: "flex",
                        backgroundColor: "none",
                        width: 200,
                        flexDirection: "column",
                      }}
                    >
                      <b> License Number:</b>
                      <p>{modalData.licenseNumber}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 70,
                      }}
                    >
                      <b> Package Type:</b>
                      <p>
                        {packageData == null ? "-" : packageData.packageName}
                      </p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        paddingLeft: 50,
                      }}
                    >
                      <b> Cars Limit:</b>
                      <p>{packageData == null ? "-" : packageData.carLimit}</p>
                    </label>
                  </div>

                  <div
                    style={{
                      backgroundColor: "none",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <label
                      style={{
                        display: "flex",
                        backgroundColor: "none",
                        width: 200,
                        flexDirection: "column",
                      }}
                    >
                      <b> Expiry Date:</b>
                      <p>{modalData.expiryDate}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 70,
                      }}
                    >
                      <b> Verified:</b>
                      <p>
                        {packageData == null
                          ? "-"
                          : packageData.Verified == "Verified"
                          ? "Yes"
                          : "No"}
                      </p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        paddingLeft: 50,
                      }}
                    >
                      <b> Featured:</b>
                      <p>
                        {packageData == null
                          ? "-"
                          : packageData.featured == "Featured"
                          ? "Yes"
                          : "No"}
                      </p>
                    </label>
                  </div>

                  <div
                    style={{
                      backgroundColor: "none",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <label
                      style={{
                        display: "flex",
                        backgroundColor: "none",
                        width: 200,
                        flexDirection: "column",
                      }}
                    >
                      <b> VAT Number:</b>
                      <p>{modalData.vatNumber}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 70,
                      }}
                    >
                      <b> Latitude:</b>
                      <p>{modalData.latitude}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        paddingLeft: 50,
                      }}
                    >
                      <b> Longitude:</b>
                      <p>{modalData.longitude}</p>
                    </label>
                  </div>

                  <div
                    style={{
                      backgroundColor: "none",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <label
                      style={{
                        display: "flex",
                        backgroundColor: "none",
                        width: "100%",
                        flexDirection: "column",
                      }}
                    >
                      <b> Cities:</b>
                      <div style={{ display: "flex" }}>
                        {modalData.cities.map((item, index) => {
                          return (
                            <p key={index} style={{ marginRight: 5 }}>
                              {item},
                            </p>
                          );
                        })}
                      </div>
                    </label>
                  </div>

                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      // marginTop: 10,
                      // backgroundColor: "red",
                    }}
                  >
                    <b> Address:</b>
                    <p>{modalData.address}</p>
                  </label>
                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      // marginTop: 10,
                      // backgroundColor: "red",
                    }}
                  >
                    <b> Description:</b>
                    <p>{modalData.description}</p>
                  </label>
                </div>
              </div>
            ) : (
              <div className="modal-body">
                <p>NO data</p>
              </div>
            )}
            <div
              className="modal-footer"
              style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "none",
                justifyContent: "space-between",
              }}
            >
              <div
                className="card my-1 custom-card mt-0 p-0 pb-0 mb-0 shadow-none"
                style={{ backgroundColor: "none", width: "50%" }}
              >
                <div className="progress fileprogress h-auto ps-0 mb-2">
                  <div
                    className="progress-bar progress-bar-xs wd-15p"
                    role="progressbar"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{
                      backgroundColor:
                        leftDays > 30
                          ? "green"
                          : leftDays > 60
                          ? "#59adec"
                          : leftDays > 90
                          ? "yellow"
                          : "red",
                      width: `${100 - leftDays}%`,
                    }}
                  ></div>
                </div>
                <div className="text-muted font-weight-semibold tx-13 mb-1">
                  {leftDays > 0
                    ? `Dealer package expiry: only ${leftDays} days left`
                    : "Expired"}
                </div>
              </div>
              <button
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {
                  setModalStatus(false);
                  setModalData(null);
                  setPackageData(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarDealerTable;
