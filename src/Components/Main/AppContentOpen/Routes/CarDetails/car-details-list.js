import React, { useState, useEffect } from "react";
import "../../../../../index.css";

//! Importing axios for fetching api...
import axios from "axios";

//! Import Link from React Router Dom...
import { Link } from "react-router-dom";

//! Importing Enviroment File...
import host from "../../../../../enviroment-file/enviroment-file";

const CarDetailsTable = () => {
  //! States...
  const [data, setData] = useState([]);

  //! Modal States...
  const [modalStatus, setModalStatus] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [photosModalStatus, setPhotosModalStatus] = useState(false);
  const [photosModalData, setPhotosModalData] = useState([]);
  const [modalImageNumber, setModalImageNumber] = useState(0);

  //! Fetching Car Details List Api...
  const fetchingApi = async () => {
    let apiUrl = `${host[0].hostUrl}/api/get/data/carDetails`;

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
      console.log("Something went wrong while fetching api:", error);
    }
  };

  //! Function for deleting Row...
  const deleteRow = async (id, photosArray, videoName) => {
    //! Calling Api for deleting Row By ID...
    let apiUrl = `${host[0].hostUrl}/api/delete/data/carDetails/row/byId`;

    let videoStatus;
    if (videoName == null) {
      videoStatus = "no";
    } else {
      videoStatus = "yes";
    }

    try {
      let response = await axios({
        method: "DELETE",
        url: apiUrl,
        data: { id, photosArray, videoName, videoStatus },
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

  useEffect(() => {
    fetchingApi();
  }, []);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Car Details</h1>
        </div>
        <div className="ms-auto pageheader-btn">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" style={{ color: "#8fbd56" }}>
              Car Details
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Car Details List
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
          <Link to={"/carDetailsForm"} style={{ color: "white" }}>
            Add More Car Details
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="row row-sm">
          <div className="col-lg-12">
            <div className="card">
              <div
                className="card-header border-bottom"
              >
                <h3 className="card-title">Car Details List</h3>
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
                        <th>Brand Name</th>
                        <th>Car</th>
                        <th>Company Name</th>
                        <th>Car Type</th>
                        <th>Exterior Color</th>
                        <th>Model No.</th>
                        <th>Status</th>
                        {/* <th>Expiry Date</th> */}
                        <th>Buttons</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        data.map((item, index) => {
                          return (
                            <tr data-id="1" key={index}>
                              <td
                                data-field="id"
                                onClick={() => {
                                  setModalStatus(true);
                                  setModalData(item);
                                }}
                              >
                                #{item.id}
                              </td>
                              <td
                                data-field="name"
                                onClick={() => {
                                  setModalStatus(true);
                                  setModalData(item);
                                }}
                              >
                                {item.carBrandName}
                              </td>
                              {/* <td
                                data-field="age"
                                onClick={() => {
                                  setPhotosModalStatus(true);
                                  setPhotosModalData(item.carPhotosArray);
                                }}
                              >
                                <img
                                  src={require(`../../../../../../public/uploads/carDetailsPhotos/${item.carPhotosArray[0]}`)}
                                  height={50}
                                  width={100}
                                  style={{ borderRadius: 5 }}
                                />
                              </td> */}
                              <td
                                data-field="age"
                                onClick={() => {
                                  setPhotosModalStatus(true);
                                  setPhotosModalData(item.carPhotosArray);
                                }}
                              >
                                <img
                                  src={require(`../../../../../../public/uploads/carDetailsPhotos/${item.carPhotosArray[0]}.jpg`)}
                                  height={50}
                                  width={100}
                                  style={{ borderRadius: 5 }}
                                />
                              </td>
                              {/* <td data-field="age">{item.carPhotosArray}</td> */}
                              <td
                                data-field="name"
                                onClick={() => {
                                  setModalStatus(true);
                                  setModalData(item);
                                }}
                              >
                                {item.carDealerCompanyName}
                              </td>
                              <td
                                data-field="age"
                                onClick={() => {
                                  setModalStatus(true);
                                  setModalData(item);
                                }}
                              >
                                {item.carType}
                              </td>
                              <td
                                data-field="age"
                                onClick={() => {
                                  setModalStatus(true);
                                  setModalData(item);
                                }}
                              >
                                {/* <span
                                  className="badge my-1"
                                  style={{
                                    fontWeight: "bold",
                                    textTransform: "capitalize",
                                    backgroundColor:item.carExteriorColor,
                                    color:item.carExteriorColor
                                  }}
                                >
                                  {item.carExteriorColor}
                                </span> */}
                                {item.carExteriorColor}
                              </td>
                              <td
                                data-field="age"
                                onClick={() => {
                                  setModalStatus(true);
                                  setModalData(item);
                                }}
                              >
                                {item.carModelNo}
                              </td>
                              <td
                                data-field="gender"
                                onClick={() => {
                                  setModalStatus(true);
                                  setModalData(item);
                                }}
                              >
                                {item.isActive == "active" ? (
                                  <span
                                    className="badge bg-success my-1"
                                    style={{
                                      fontWeight: "bold",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    {item.isActive}
                                  </span>
                                ) : (
                                  <span
                                    className="badge bg-danger my-1"
                                    style={{
                                      fontWeight: "bold",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    {item.isActive}
                                  </span>
                                )}
                              </td>
                              <td style={{ width: 120 }}>
                                <div
                                  className="btn btn-azure fs-14 text-white edit-icn"
                                  title="Edit"
                                >
                                  <Link
                                    className="fe fe-edit"
                                    style={{ color: "white" }}
                                    to="/carDetailsEditForm"
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
                                      item.carPhotosArray,
                                      item.carVideoName
                                    );
                                  }}
                                >
                                  <i className="fe fe-trash"></i>
                                </a>
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

      {/* Details Modal */}
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
            style={{ backgroundColor: "none", width: 800 }}
          >
            <div className="modal-header">
              <h6 className="modal-title">
                {modalData !== null
                  ? `Car Details ID: ${modalData.id}`
                  : "Car Details"}
              </h6>
              <button
                aria-label="Close"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={() => {
                  setModalStatus(false);
                  setModalData(null);
                }}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            {modalStatus == true ? (
              <div className="modal-body">
                <img
                  src={require(`../../../../../../public/uploads/carDetailsPhotos/${modalData.carPhotosArray[0]}`)}
                  height={70}
                  width={140}
                  style={{ borderRadius: 5, float: "right" }}
                />
                <label
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    // marginBottom: 30,
                  }}
                >
                  <b>Company Name:</b>
                  <p>{modalData.carDealerCompanyName}</p>
                </label>

                <div style={{ backgroundColor: "none", marginTop: 20 }}>
                  <h6 style={{ color: "#82c035", fontWeight: "600" }}>
                    Details
                  </h6>
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
                        // backgroundColor: "green",
                        width: 200,
                        flexDirection: "column",
                      }}
                    >
                      <b> Brand Name:</b>
                      <p>{modalData.carBrandName}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b> Car Type:</b>
                      <p>{modalData.carType}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "yellow",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Model No:</b>
                      <p>{modalData.carModelNo}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "column",
                        marginLeft: 50,
                      }}
                    >
                      <b>License No:</b>
                      <p>{modalData.carLicense}</p>
                    </label>
                  </div>

                  <h6 style={{ color: "#82c035", fontWeight: "600" }}>
                    Car Specs
                  </h6>
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
                      <b> Exterior Color:</b>
                      <p>{modalData.carExteriorColor}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b> Interior Color:</b>
                      <p>{modalData.carInteriorColor}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b> Fuel Type:</b>
                      <p>{modalData.carFuelType}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Luggage:</b>
                      <p>{modalData.carLuggage}</p>
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
                      <b>Car Doors:</b>
                      <p>{modalData.carDoors}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b> Car Seats:</b>
                      <p>{modalData.carSeats}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Auto Transmission:</b>
                      <p>{modalData.autoTransmission}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b> GSS Specs:</b>
                      <p>{modalData.gccSpecs}</p>
                    </label>
                  </div>

                  <h6 style={{ color: "#82c035", fontWeight: "600" }}>
                    Additional Charges & Insurance
                  </h6>
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
                      <b>Additional Charges (Km):</b>
                      <p>{modalData.additionalMilageCharges}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b> Tools Charges:</b>
                      <p>{modalData.carToolsCharges}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Driver Insurance:</b>
                      <p>{modalData.additionalDriverInsurance}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        backgroundColor: "none",
                        width: 200,
                        flexDirection: "column",
                        marginLeft: 50,
                      }}
                    >
                      <b>Insurance Type:</b>
                      <p>{modalData.insuranceType}</p>
                    </label>
                  </div>

                  <h6 style={{ color: "#82c035", fontWeight: "600" }}>
                    Discount & Security Deposit
                  </h6>
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
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                      }}
                    >
                      <b> Discount Offer:</b>
                      <p>{modalData.discountOffer}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Offer Expiry:</b>
                      <p>{modalData.offerExpiryDate}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b> Security Deposit:</b>
                      <p>{modalData.securityDeposit}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Refunded In:</b>
                      <p>{modalData.refundedIn}</p>
                    </label>
                  </div>

                  <h6 style={{ color: "#82c035", fontWeight: "600" }}>
                    Rental Cost & Milage Limit
                  </h6>
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
                      <b>Per Day Milage:</b>
                      <p>{modalData.perDayMilagelimit}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b> Per Day Rental Cost:</b>
                      <p>{modalData.perDayRentalCost}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Weekly Milage:</b>
                      <p>{modalData.weeklyMilageLimit}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        backgroundColor: "none",
                        width: 200,
                        flexDirection: "column",
                        marginLeft: 50,
                      }}
                    >
                      <b>Weekly Rental Cost:</b>
                      <p>{modalData.weeklyRentalCost}</p>
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
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        // marginLeft: 70,
                      }}
                    >
                      <b> Monthly Milage:</b>
                      <p>{modalData.monthlyMilageLimit}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "column",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Monthly Rental Cost:</b>
                      <p>{modalData.monthlyRentalCost}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        backgroundColor: "none",
                        width: 200,
                        flexDirection: "column",
                        marginLeft: 50,
                      }}
                    >
                      <b>Minimum Driver Age:</b>
                      <p>{modalData.minimumDriverAge}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        backgroundColor: "none",
                        width: 200,
                        flexDirection: "column",
                        marginLeft: 50,
                      }}
                    >
                      <b>Video:</b>
                      <p>
                        {modalData.carVideoName == null
                          ? "-"
                          : modalData.carVideoName}
                      </p>
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
                    {/* <b> Description:</b> */}
                    <h6 style={{ color: "#82c035", fontWeight: "600" }}>
                      Description
                    </h6>
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
                justifyContent: "end",
              }}
            >
              <button
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {
                  setModalStatus(false);
                  setModalData(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Photos Modal */}
      <div
        className="modal fade show"
        id="largemodal"
        tabIndex="-1"
        style={{
          display: photosModalStatus == true ? "flex" : "none",
          backgroundColor: "none",
          alignItems: "center",
        }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-lg " role="document">
          <div
            className="modal-content"
            style={{ backgroundColor: "none", width: 800 }}
          >
            <div className="modal-header">
              <h6 className="modal-title">Car Photos</h6>
              <button
                aria-label="Close"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={() => {
                  setPhotosModalStatus(false);
                  setPhotosModalData([]);
                  setModalImageNumber(0);
                }}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div
              className="modal-body"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div
                style={{
                  // backgroundColor: "red",
                  width: "100%",
                  height: 400,
                }}
              >
                {photosModalData.length > 0 ? (
                  <img
                    className="carImages"
                    src={require(`../../../../../../public/uploads/carDetailsPhotos/${photosModalData[modalImageNumber]}`)}
                    height={"100%"}
                    width={"100%"}
                    style={{ borderRadius: 10 }}
                  />
                ) : (
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <b>Oops, Something went wrong</b>
                  </div>
                )}
              </div>
            </div>

            <div
              className="modal-footer"
              style={{
                display: "flex",
                flexDirection: "row",
                // backgroundColor: "yellow",
                justifyContent: "end",
              }}
            >
              <button
                className="btn btn-default"
                data-bs-dismiss="modal"
                onClick={() => {
                  setModalImageNumber(modalImageNumber - 1);
                  console.log(photosModalData.length);
                }}
                style={{ margin: 5 }}
                disabled={modalImageNumber == 0 ? true : false}
              >
                Previous
              </button>
              <button
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {
                  setModalImageNumber(modalImageNumber + 1);
                }}
                disabled={
                  modalImageNumber == photosModalData.length - 1 ? true : false
                }
                style={{ margin: 5 }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarDetailsTable;
