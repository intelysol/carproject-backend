import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//! Importing axios for fetching api...
import axios from "axios";

//! Importing Enviroment File...
import host from "../../../../../enviroment-file/enviroment-file";

const UserTable = () => {
  //! States...
  const [data, setData] = useState([]);

  //! Fetching Car Brands List Api...
  const fetchingApi = async () => {
    let apiUrl = `${host[0].hostUrl}/api/get/users/all`;

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

  //! Function for deleting user...
  const deleteRow = async (id, picture) => {
    //! Calling Api for deleting Row By ID...
    let apiUrl = `${host[0].hostUrl}/api/delete/data/user/byId`;

    try {
      let response = await axios({
        method: "DELETE",
        url: apiUrl,
        data: { id, picture },
      });
      console.log(response);
      if (response.status == 200) {
        setData([]);
        fetchingApi();
      }
    } catch (error) {
      console.log(
        "Something went wrong while deleting user data from dataBase: ",
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
          <h1 className="page-title">User</h1>
        </div>
        <div className="ms-auto pageheader-btn">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" style={{ color: "#8fbd56" }}>
              User
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              User List
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
          <Link to={"/userForm"} style={{ color: "white" }}>
            Add New User
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="row row-sm">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header border-bottom">
                <h3 className="card-title">User List</h3>
              </div>
              <div className="card-body">
                <div className="table-responsive export-table">
                  <table
                    id="editable-file-datatable"
                    className="table editable-table table-nowrap table-bordered table-edit wp-100"
                  >
                    <thead>
                      <tr>
                        <th>UID</th>
                        <th>Full Name</th>
                        <th>Profile</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Role</th>
                        <th>IP Address</th>
                        <th>Status</th>
                        <th>Buttons</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        data.map((item, index) => {
                          return (
                            <tr data-id="1" key={index}>
                              <td data-field="id">#{item.id}</td>
                              <td data-field="name">{item.userName}</td>
                              {/* <td data-field="age">{item.pictureUrl}</td> */}
                              <td data-field="age">
                                <img
                                  src={require(`../../../../../../public/uploads/userProfileImages/${item.pictureUrl}`)}
                                  height={50}
                                  width={50}
                                  style={{ borderRadius: "50%" }}
                                />
                              </td>
                              <td data-field="age">{item.userEmail}</td>
                              <td data-field="age">{item.userContactNumber}</td>
                              <td data-field="age">{item.userRole}</td>
                              <td data-field="age">
                                {item.userIp == "" ? "-" : item.userIp}
                              </td>
                              <td data-field="gender">
                                {item.userStatus == "active" ? (
                                  <span
                                    className="badge bg-success my-1"
                                    style={{
                                      fontWeight: "bold",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    {item.userStatus}
                                  </span>
                                ) : (
                                  <span
                                    className="badge bg-danger my-1"
                                    style={{
                                      fontWeight: "bold",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    {item.userStatus}
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
                                    to="/userEditForm"
                                    state={{ data: item }}
                                  ></Link>
                                </div>
                                <a
                                  className="btn btn-red fs-14 text-white trash-icn"
                                  title="trash"
                                  style={{ marginLeft: 10 }}
                                  onClick={() => {
                                    deleteRow(item.id, item.pictureUrl);
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
                          <td data-field="age">No data</td>
                          <td data-field="age">No data</td>
                          <td data-field="age">No data</td>
                          <td data-field="age">No data</td>
                          <td data-field="age">No data</td>
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

export default UserTable;
