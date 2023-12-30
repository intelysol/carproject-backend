import React, { useEffect, useState } from "react";

//! Import Link from React Router Dom...
import { Link } from "react-router-dom";

//! Importing axios for fetching api...
import axios from "axios";

//! Importing Enviroment File...
import host from "../../../../../enviroment-file/enviroment-file";

const PackagesTable = () => {
  //! States...
  const [data, setData] = useState([]);

  //! Fetching Packages List Api...
  const fetchingApi = async () => {
    let apiUrl = `${host[0].hostUrl}/api/get/data/packages`;

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
  const deleteRow = async (id, logo) => {
    //! Calling Api for deleting Row By ID...

    let apiUrl = `${host[0].hostUrl}/api/delete/data/packages/row/byId`;

    try {
      let response = await axios({
        method: "DELETE",
        url: apiUrl,
        data: { id, logo },
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
          <h1 className="page-title">Packages</h1>
        </div>
        <div className="ms-auto pageheader-btn">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" style={{ color: "#8fbd56" }}>
              Packages
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Packages List
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
          <Link to={"/packagesForm"} style={{ color: "white" }}>
            Add New Package
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="row row-sm">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header border-bottom">
                <h3 className="card-title">Packages List</h3>
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
                        <th>Package Name</th>
                        <th>Description</th>
                        <th>Picture</th>
                        <th>Features</th>
                        <th>Currency</th>
                        {/* <th>Sell Price</th>
                        <th>Offer Price</th>
                        <th>Currency Type</th> */}
                        <th>Status</th>
                        <th>Buttons</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        data.map((item, index) => {
                          return (
                            <tr data-id="1" key={index}>
                              <td data-field="id">{`#${item.id}`}</td>
                              <td
                                data-field="name"
                                style={{
                                  backgroundColor: "none",
                                  position: "relative",
                                }}
                              >
                                {item.packageName}
                              </td>
                              <td
                                data-field="age"
                                style={{ width: 300, overflow: "hidden" }}
                              >
                                {item.packageDescription}
                              </td>
                              {/* <td data-field="age">{item.logoUrl}</td> */}
                              <td data-field="age">
                                <img
                                  src={require(`../../../../../../public/uploads/packagesImages/${item.logoUrl}`)}
                                  height={50}
                                  width={100}
                                  style={{ borderRadius: 5 }}
                                />
                              </td>
                              <td data-field="age">
                                <tr>
                                  <th style={{ border: "none" }}>Car Limit:</th>
                                  <td style={{ border: "none" }}>
                                    {item.carLimit}
                                  </td>
                                </tr>
                                <tr>
                                  <th style={{ border: "none" }}>Verified:</th>
                                  <td style={{ border: "none" }}>
                                    {item.verified == "Verified" ? "Yes" : "No"}
                                  </td>
                                </tr>
                                <tr>
                                  <th style={{ border: "none" }}>Featured:</th>
                                  <td style={{ border: "none" }}>
                                    {item.featured == "Featured" ? "Yes" : "No"}
                                  </td>
                                </tr>
                              </td>
                              <td data-field="age">
                                <tr>
                                  <th style={{ border: "none" }}>
                                    Sell Price:
                                  </th>
                                  <td style={{ border: "none" }}>
                                    {item.packageSellPrice}
                                  </td>
                                </tr>
                                <tr>
                                  <th style={{ border: "none" }}>
                                    Offer Price:
                                  </th>
                                  <td style={{ border: "none" }}>
                                    {item.packageOfferPrice}
                                  </td>
                                </tr>
                                <tr>
                                  <th style={{ border: "none" }}>Type:</th>
                                  <td style={{ border: "none" }}>
                                    {item.currencyType}
                                  </td>
                                </tr>
                              </td>
                              <td data-field="gender">
                                {item.isActive == "Active" ? (
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
                                    to="/packagesEditForm"
                                    state={{ data: item }}
                                  ></Link>
                                </div>
                                <a
                                  className="btn btn-red fs-14 text-white trash-icn"
                                  title="trash"
                                  style={{ marginLeft: 10 }}
                                  onClick={() => {
                                    deleteRow(item.id, item.logoUrl);
                                  }}
                                >
                                  <i className="fe fe-trash"></i>
                                </a>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr data-id="1">
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
    </>
  );
};

export default PackagesTable;
