import React, { useState, useEffect } from "react";
import "../../../../../index.css";

//! Importing axios for fetching api...
import axios from "axios";

//! Import Link from React Router Dom...
import { Link } from "react-router-dom";

//! Importing Enviroment File...
import host from "../../../../../enviroment-file/enviroment-file";

const YachtTable = () => {
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
    let apiUrl = `${host[0].hostUrl}/api/get/data/yachtDetails`;

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
    let apiUrl = `${host[0].hostUrl}/api/delete/data/yachtDetails/row/byId`;

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
          <h1 className="page-title">Yacht</h1>
        </div>
        <div className="ms-auto pageheader-btn">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" style={{ color: "#8fbd56" }}>
              Yacht
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Yacht List
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
          <Link to={"/yachtForm"} style={{ color: "white" }}>
            Add More Yacht
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="row row-sm">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header border-bottom">
                <h3 className="card-title">Yacht List</h3>
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
                        <th>Yacht Name</th>
                        <th>Yacht</th>
                        <th>Captain Included</th>
                        <th>Capacity</th>
                        <th>Size</th>
                        <th>Rooms</th>
                        <th>Music System</th>
                        <th>Hourly Cost</th>
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
                                {item.yachtName}
                              </td>
                              <td
                                data-field="age"
                                onClick={() => {
                                  setPhotosModalStatus(true);
                                  setPhotosModalData(item.yachtPhotosArray);
                                }}
                              >
                                <img
                                  src={require(`../../../../../../public/uploads/yachtPhotos/${item.yachtPhotosArray[0]}`)}
                                  height={50}
                                  width={100}
                                  style={{ borderRadius: 5 }}
                                />
                              </td>
                              {/* <td data-field="age">{item.logo}</td> */}
                              <td
                                data-field="age"
                                onClick={() => {
                                  setModalStatus(true);
                                  setModalData(item);
                                }}
                              >
                                {item.captainIncluded}
                              </td>
                              <td
                                data-field="name"
                                onClick={() => {
                                  setModalStatus(true);
                                  setModalData(item);
                                }}
                              >
                                {item.capacity}
                              </td>
                              <td
                                data-field="age"
                                onClick={() => {
                                  setModalStatus(true);
                                  setModalData(item);
                                }}
                              >
                                {item.yachtSize}
                              </td>
                              <td
                                data-field="age"
                                onClick={() => {
                                  setModalStatus(true);
                                  setModalData(item);
                                }}
                              >
                                {item.yachtRoom}
                              </td>
                              <td
                                data-field="age"
                                onClick={() => {
                                  setModalStatus(true);
                                  setModalData(item);
                                }}
                              >
                                {item.musicSystem == true ? "Yes" : "No"}
                              </td>
                              <td
                                data-field="age"
                                onClick={() => {
                                  setModalStatus(true);
                                  setModalData(item);
                                }}
                              >
                                {item.perHourRentalCost}
                              </td>

                              <td style={{ width: 120 }}>
                                <div
                                  className="btn btn-azure fs-14 text-white edit-icn"
                                  title="Edit"
                                >
                                  <Link
                                    className="fe fe-edit"
                                    style={{ color: "white" }}
                                    to="/yachtEditForm"
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
                                      item.yachtPhotosArray,
                                      item.yachtVideoName
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
                  ? `Yacht Details ID: ${modalData.id}`
                  : "Yacht Details"}
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
                  src={require(`../../../../../../public/uploads/yachtPhotos/${modalData.yachtPhotosArray[0]}`)}
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
                  <b>Yacht Name:</b>
                  <p>{modalData.yachtName}</p>
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
                      <b> Yacht Type:</b>
                      <p>{modalData.yachtType}</p>
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
                      <b> Captain Included:</b>
                      <p>{modalData.captainIncluded}</p>
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
                      <b>Crew Members:</b>
                      <p>{modalData.crewMembers}</p>
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
                      <b>Locations:</b>
                      <p>{modalData.location}</p>
                    </label>
                  </div>

                  <h6 style={{ color: "#82c035", fontWeight: "600" }}>
                    Yacht Specs
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
                      <b>Capacity:</b>
                      <p>{modalData.capacity}</p>
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
                      <b>Yacht Size:</b>
                      <p>{modalData.yachtSize}</p>
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
                      <b>Yacht Rooms:</b>
                      <p>{modalData.yachtRoom}</p>
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
                      <b>Free Fuel:</b>
                      <p>{modalData.freeFuel == true ? "Yes" : "No"}</p>
                    </label>
                  </div>

                  <h6 style={{ color: "#82c035", fontWeight: "600" }}>
                    Inclusions
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
                        flexDirection: "row",
                      }}
                    >
                      <b>Ice & Beverages:</b>
                      <p style={{color:'red',paddingLeft:3,fontWeight:'500'}}>
                        {modalData.iceWaterAndSoftDrinks == true ? "Y" : "N"}
                      </p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "row",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Towels:</b>
                      <p style={{color:'red',paddingLeft:3,fontWeight:'500'}}>{modalData.towels == true ? "Y" : "N"}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "row",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Bbq & Services:</b>
                      <p style={{color:'red',paddingLeft:3,fontWeight:'500'}}>
                        {modalData.bbqEquipmentAndServices == true
                          ? "Y"
                          : "N"}
                      </p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        backgroundColor: "none",
                        width: 200,
                        flexDirection: "row",
                        marginLeft: 50,
                      }}
                    >
                      <b>Kids Welcome:</b>
                      <p style={{color:'red',paddingLeft:3,fontWeight:'500'}}>{modalData.kidsWelcome == true ? "Y" : "N"}</p>
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
                        flexDirection: "row",
                      }}
                    >
                      <b>Music System:</b>
                      <p style={{color:'red',paddingLeft:3,fontWeight:'500'}}>{modalData.musicSystem == true ? "Y" : "N"}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "row",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Free Refreshment:</b>
                      <p style={{color:'red',paddingLeft:3,fontWeight:'500'}}>{modalData.freeRefreshment == true ? "Y" : "N"}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "row",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Fishing Equipment:</b>
                      <p style={{color:'red',paddingLeft:3,fontWeight:'500'}}>{modalData.fishingEquipment == true ? "Y" : "N"}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "row",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Safety Equipment:</b>
                      <p style={{color:'red',paddingLeft:3,fontWeight:'500'}}>{modalData.safetyEquipment == true ? "Y" : "N"}</p>
                    </label>
                  </div>

                  <h6 style={{ color: "#82c035", fontWeight: "600" }}>
                    Amenities
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
                        flexDirection: "row",
                        textAlign: "start",
                      }}
                    >
                      <b>Bluetooth:</b>
                      <p style={{color:'red',paddingLeft:3,fontWeight:'500'}}>{modalData.bluetooth == true ? "Y" : "N"}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "row",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>USB Port:</b>
                      <p style={{color:'red',paddingLeft:3,fontWeight:'500'}}>{modalData.usbPort == true ? "Y" : "N"}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "row",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>AUX Cable:</b>
                      <p style={{color:'red',paddingLeft:3,fontWeight:'500'}}>{modalData.auxCable == true ? "Y" : "N"}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "row",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Microwave:</b>
                      <p style={{color:'red',paddingLeft:3,fontWeight:'500'}}>{modalData.microwave == true ? "Y" : "N"}</p>
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
                        flexDirection: "row",
                        textAlign: "start",
                      }}
                    >
                      <b>Pillows & Blankets:</b>
                      <p style={{color:'red',paddingLeft:3,fontWeight:'500'}}>
                        {modalData.pillowsAndBlankets == true ? "Y" : "N"}
                      </p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "row",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Air Conditioning:</b>
                      <p style={{color:'red',paddingLeft:3,fontWeight:'500'}}>{modalData.airConditioning == true ? "Y" : "N"}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "row",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Shower:</b>
                      <p style={{color:'red',paddingLeft:3,fontWeight:'500'}}>{modalData.shower == true ? "Y" : "N"}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "row",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Cooler:</b>
                      <p style={{color:'red',paddingLeft:3,fontWeight:'500'}}>{modalData.cooler == true ? "Y" : "N"}</p>
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
                        flexDirection: "row",
                        textAlign: "start",
                      }}
                    >
                      <b>Inside Speakers:</b>
                      <p style={{color:'red',paddingLeft:3,fontWeight:'500'}}>{modalData.insideSpeakers == true ? "Y" : "N"}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "row",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Outside Speakers:</b>
                      <p style={{color:'red',paddingLeft:3,fontWeight:'500'}}>{modalData.outsideSpeakers == true ? "Y" : "N"}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "red",
                        width: 200,
                        flexDirection: "row",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b>Audio System:</b>
                      <p style={{color:'red',paddingLeft:3,fontWeight:'500'}}>{modalData.audioSystem == true ? "Y" : "N"}</p>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        // backgroundColor: "blue",
                        width: 200,
                        flexDirection: "row",
                        textAlign: "start",
                        marginLeft: 50,
                      }}
                    >
                      <b></b>
                      <p style={{color:'red',paddingLeft:3,fontWeight:'500'}}>{modalData.cooler}</p>
                    </label>
                  </div>

                  <h6 style={{ color: "#82c035", fontWeight: "600" }}>
                    Rental Period & Pricing:
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
                      <b>Per Hour:</b>
                      <p>{modalData.perHourRentalCost}</p>
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
                      <b>Weekly Rental Cost:</b>
                      <p>{modalData.weeklyRentalCost}</p>
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
                        {modalData.yachtVideoName == null
                          ? "-"
                          : modalData.yachtVideoName}
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
                    {/* <b> OverView:</b> */}
                    <h6 style={{ color: "#82c035", fontWeight: "600" }}>
                      Overview
                    </h6>
                    <p>{modalData.yachtOverview}</p>
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
              <h6 className="modal-title">Yacht Photos</h6>
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
                    src={require(`../../../../../../public/uploads/yachtPhotos/${photosModalData[modalImageNumber]}`)}
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

export default YachtTable;
