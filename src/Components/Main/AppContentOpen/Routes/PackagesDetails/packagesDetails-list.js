import React, { useEffect, useState } from "react";

//! Import Link from React Router Dom...
import { Link } from "react-router-dom";

//! Importing axios for fetching api...
import axios from "axios";

//! Importing Enviroment File...
import host from "../../../../../enviroment-file/enviroment-file";

const PackageDetailsTable = () => {
  //! States...
  const [data, setData] = useState([]);

  //! Fetching Package Details List Api...
  const fetchingApi = async () => {
    let apiUrl = `${host[0].hostUrl}/api/get/data/packagesDetails`;

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

    let apiUrl = `${host[0].hostUrl}/api/delete/data/packagesDetails/row/byId`;

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
    fetchingApi();
  }, []);

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
              Package Details List
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
          <Link to={"/packageDetailsForm"} style={{ color: "white" }}>
            Add New Package Details
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="row row-sm">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header border-bottom">
                <h3 className="card-title">Package Details List</h3>
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
                        <th>Package Type</th>
                        <th>Package Features</th>
                        <th>Buttons</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        data.map((item, index) => {
                          return (
                            <tr data-id="1" key={index}>
                              <td data-field="id">#{item.id}</td>
                              <td data-field="name">{item.packageType}</td>
                              <td
                                data-field="age"
                                style={{ backgroundColor: "none", width: 800 }}
                              >
                                {item.packageFeature}
                              </td>
                              <td style={{ width: 120 }}>
                                <div
                                  className="btn btn-azure fs-14 text-white edit-icn"
                                  title="Edit"
                                >
                                  <Link
                                    className="fe fe-edit"
                                    style={{ color: "white" }}
                                    to="/packageDetailsEditForm"
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
                        <tr data-id="1">
                          <td data-field="id">No data</td>
                          <td data-field="name">No data</td>
                          <td
                            data-field="age"
                            style={{ backgroundColor: "none", width: 800 }}
                          >
                            No data
                          </td>
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

export default PackageDetailsTable;
