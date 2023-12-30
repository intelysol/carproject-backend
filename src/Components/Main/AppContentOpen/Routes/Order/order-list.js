import React, { useState, useEffect } from "react";

//! Importing axios for fetching api...
import axios from "axios";

//! Import Link from React Router Dom...
import { Link } from "react-router-dom";

//! Importing Enviroment File...
import host from "../../../../../enviroment-file/enviroment-file";

const OrderTable = () => {
  //! States...
  const [data, setData] = useState([]);

  //! Fetching Customers List Api...
  const fetchingApi = async () => {
    let apiUrl = `${host[0].hostUrl}/api/get/data/customers`;

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
  const deleteRow = async (id) => {
    console.log(`Item ID: ${id}`);

    //! Calling Api for deleting Row By ID...
    let apiUrl = `${host[0].hostUrl}/api/delete/data/customer/row/byId`;

    try {
      let response = await axios({
        method: "DELETE",
        url: apiUrl,
        data: { id },
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
    // fetchingApi();
  }, []);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Order</h1>
        </div>
        <div className="ms-auto pageheader-btn">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" style={{ color: "#8fbd56" }}>
              Order
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Orders List
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
        <button disabled className="btn btn-primary" style={{ marginBottom: 10 }}>
          <Link to={"/customerForm"} style={{ color: "white" }}>
            Add New Order
          </Link>
        </button>
      </div>

      <div className="row">
        <div className="row row-sm">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header border-bottom">
                <h3 className="card-title">Orders List</h3>
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
                        <th>Customer Name</th>
                        <th>Car</th>
                        <th>Contact No.</th>
                        <th>Milage</th>
                        <th>Rate Amount</th>
                        <th>Date & Time</th>
                        <th>Dealer</th>
                        <th>Status</th>
                        <th>Payment Type</th>
                        <th>Buttons</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        data.map((item, index) => {
                          return (
                            <tr data-id="1" key={index}>
                              <td data-field="id">#{item.id}</td>
                              <td data-field="name">{item.customerName}</td>
                              <td data-field="age">{item.customerEmail}</td>
                              <td data-field="age">
                                {item.customerContactNumber}
                              </td>
                              <td data-field="age">
                                {item.customerWhatsAppNumber}
                              </td>
                              <td data-field="age">{item.customerLocation}</td>
                              <td data-field="age">{item.customerAddress}</td>

                              <td style={{ width: 120 }}>
                                <div
                                  className="btn btn-azure fs-14 text-white edit-icn"
                                  title="Edit"
                                >
                                  <Link
                                    className="fe fe-edit"
                                    style={{ color: "white" }}
                                    to="/customerEditForm"
                                    state={{ data: item }}
                                  ></Link>
                                </div>
                                <a
                                  className="btn btn-red fs-14 text-white trash-icn"
                                  title="trash"
                                  style={{ marginLeft: 10 }}
                                  onClick={() => {
                                    deleteRow(item.id);
                                  }}
                                >
                                  <i className="fe fe-trash"></i>
                                </a>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <>
                          <tr data-id="1">
                            <td>#1</td>
                            <td>Ahmed Ali</td>
                            <td>
                              <img
                                src={require(`../../../../../assets/images/Cars/kai2.jpg`)}
                                height={50}
                                width={100}
                                style={{ borderRadius: 5 }}
                              />
                            </td>
                            <td>03351334691</td>
                            <td>20Km</td>
                            <td>20K</td>
                            <td>2023-12-06T16:46</td>
                            <td>Inovo Motors</td>
                            <td>Pending</td>
                            <td>Cheque</td>
                            <td style={{ width: 120 }}>
                              <button
                                className="btn btn-azure fs-14 text-white edit-icn"
                                title="Edit"
                                disabled
                              >
                                <Link
                                  className="fe fe-edit"
                                  style={{ color: "white" }}
                                  to="/customerEditForm"
                                ></Link>
                              </button>
                              <a
                                className="btn btn-red fs-14 text-white trash-icn"
                                title="trash"
                                style={{ marginLeft: 10 }}
                              >
                                <i className="fe fe-trash"></i>
                              </a>
                            </td>
                          </tr>
                          <tr data-id="1">
                            <td>#2</td>
                            <td>Irfan Junaid</td>
                            <td>
                              <img
                                src={require(`../../../../../assets/images/Cars/4.jpg`)}
                                height={50}
                                width={100}
                                style={{ borderRadius: 5 }}
                              />
                            </td>

                            <td>03351334691</td>
                            <td>60Km</td>
                            <td>100K</td>
                            <td>2023-09-06T16:46</td>
                            <td>Inovo Motors</td>
                            <td>Closed</td>
                            <td>Cash</td>
                            <td style={{ width: 120 }}>
                              <button
                                className="btn btn-azure fs-14 text-white edit-icn"
                                title="Edit"
                                disabled
                              >
                                <Link
                                  className="fe fe-edit"
                                  style={{ color: "white" }}
                                  to="/customerEditForm"
                                ></Link>
                              </button>
                              <a
                                className="btn btn-red fs-14 text-white trash-icn"
                                title="trash"
                                style={{ marginLeft: 10 }}
                              >
                                <i className="fe fe-trash"></i>
                              </a>
                            </td>
                          </tr>
                          <tr data-id="1">
                            <td>#3</td>
                            <td>Akram Noman</td>
                            <td>
                              <img
                                src={require(`../../../../../assets/images/Cars/1.jpg`)}
                                height={50}
                                width={100}
                                style={{ borderRadius: 5 }}
                              />
                            </td>
                            <td>03351334691</td>
                            <td>45Km</td>
                            <td>50K</td>
                            <td>2013-09-06T16:46</td>
                            <td>Inovo Motors</td>
                            <td>New</td>
                            <td>Cash</td>
                            <td style={{ width: 120 }}>
                              <button
                                className="btn btn-azure fs-14 text-white edit-icn"
                                title="Edit"
                                disabled
                              >
                                <Link
                                  className="fe fe-edit"
                                  style={{ color: "white" }}
                                  to="/customerEditForm"
                                ></Link>
                              </button>
                              <a
                                className="btn btn-red fs-14 text-white trash-icn"
                                title="trash"
                                style={{ marginLeft: 10 }}
                              >
                                <i className="fe fe-trash"></i>
                              </a>
                            </td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderTable;
