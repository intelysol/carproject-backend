import React, { useEffect, useState } from "react";
import "../../../../../index.css";

//! Importing Axios for fetching Api's...
import axios from "axios";

//! Importing All Countries Array...
import countryList from "../../../../../dummyData/Countries/countries";

//! Importing Multi Select DropDown...
import Multiselect from "multiselect-react-dropdown";

//! Import Link from React Router Dom...
import { Link, useNavigate } from "react-router-dom";

//! Importing Enviroment File...
import host from "../../../../../enviroment-file/enviroment-file";

//! Importing Modal Icons...
import errorIcon from "../../../../../assets/icons/404-error.png";
import successIcon from "../../../../../assets/icons/success-icon.png";

const CarDealerForm = () => {
  let navigation = useNavigate();

  //! Form States...
  const [form1, setForm1] = useState(true);
  const [form2, setForm2] = useState(false);
  const [form3, setForm3] = useState(false);

  //! Form 1 States...
  const [carDealerName, setCarDealerName] = useState("");
  const [carDealerContactNumber, setCarDealerContactNumber] = useState("");
  const [carDealerWhatsAppNumber, setCarDealerWhatsAppNumber] = useState("");
  const [carDealerEmail, setCarDealerEmail] = useState("");
  const [carDealerNationality, setCarDealerNationality] = useState("");
  const [packageType, setPackageType] = useState(Number);
  const [carDealerAddress, setCarDealerAddress] = useState("");
  const [carDealerDateOfBirth, setCarDealerDateOfBirth] = useState("");
  const [carDealerEmiratesId, setCarDealerEmiratesId] = useState("");
  const [carDealerLicenseNumber, setCarDealerLicenseNumber] = useState("");
  const [carDealerVatNumber, setCarDealerVatNumber] = useState("");
  const [carDealerLatitude, setCarDealerLatitude] = useState("");
  const [carDealerLongitude, setCarDealerLongitude] = useState("");
  const [carDealerExpiryDate, setCarDealerExpiryDate] = useState("");
  const [carDealerCities, setCarDealerCities] = useState([]);
  const [carDealerDescription, setCarDealerDescription] = useState("");

  //* Image State...
  const [file, setFile] = useState(null);

  //! Form 2 States...
  const [faceBookUrl, setFacebookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [linkedInUrl, setLinkedInUrl] = useState("");

  //! Form 3 States...
  const [vatDocFile, setVatDocFile] = useState(null);
  const [ejariDocFile, setEjariDocFile] = useState(null);
  const [insuranceDocFile, setInsuranceDocFile] = useState(null);
  const [idCard, setIdCard] = useState(null);
  const [othersDoc, setOthersDoc] = useState(null);

  //! Countries State...
  const [countries, setCountries] = useState(countryList);

  //? Api Data State...
  const [packagesDataState, setPackagesDataState] = useState([]);
  const [citiesDataState, setCitiesDataState] = useState([]);

  //? Modal/Alert State...
  const [modalStatus, setModalStatus] = useState(false);
  const [modalData, setModalData] = useState(null);

  //! Function for uploading id card pdf into folder...
  const uploadingIdCardPdf = async () => {
    const formData = new FormData();
    formData.append("idCardFile", idCard);

    let apiUrl = `${host[0].hostUrl}/api/upload/pdf/carDetails/idCardPdf`;

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
          setCarDealerName("");
          setFile(null);
          setCarDealerContactNumber("");
          setCarDealerWhatsAppNumber("");
          setCarDealerEmail("");
          setCarDealerNationality("");
          setPackageType("");
          setCarDealerAddress("");
          setCarDealerDateOfBirth("");
          setCarDealerEmiratesId("");
          setCarDealerLicenseNumber("");
          setCarDealerVatNumber("");
          setCarDealerLatitude("");
          setCarDealerLongitude("");
          setCarDealerExpiryDate("");
          setCarDealerCities([]);
          setCarDealerDescription("");

          setVatDocFile(null);
          setEjariDocFile(null);
          setInsuranceDocFile(null);
          setIdCard(null);

          setFacebookUrl("");
          setInstagramUrl("");
          setTwitterUrl("");
          setYoutubeUrl("");
          setLinkedInUrl("");

          navigation("/carDealerTable");
        }, 2000);
      }
    } catch (error) {
      console.log("Something went wrong while uploading pdf: ", error);
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

  //! Function for uploading insurance pdf into folder...
  const uploadingInsurancePdf = async () => {
    const formData = new FormData();
    formData.append("insuranceFile", insuranceDocFile);

    let apiUrl = `${host[0].hostUrl}/api/upload/pdf/carDetails/insurancePdf`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: formData,
      });
      console.log(response);
      if (response.status == 200) {
        uploadingIdCardPdf();
      }
    } catch (error) {
      console.log("Something went wrong while uploading pdf: ", error);
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

  //! Function for uploading ejari pdf into folder...
  const uploadingEjariPdf = async () => {
    const formData = new FormData();
    formData.append("ejariFile", ejariDocFile);

    let apiUrl = `${host[0].hostUrl}/api/upload/pdf/carDetails/ejariPdf`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: formData,
      });
      console.log(response);
      if (response.status == 200) {
        uploadingInsurancePdf();
      }
    } catch (error) {
      console.log("Something went wrong while uploading pdf: ", error);
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

  //! Function for uploading vat pdf into folder...
  const uploadingVatPdf = async () => {
    const formData = new FormData();
    formData.append("vatFile", vatDocFile);

    let apiUrl = `${host[0].hostUrl}/api/upload/pdf/carDetails/vatPdf`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: formData,
      });
      console.log(response);
      if (response.status == 200) {
        uploadingEjariPdf();
      }
    } catch (error) {
      console.log("Something went wrong while uploading pdf: ", error);
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

  //! Function for uploading image into folder...
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", file);

    let apiUrl = `${host[0].hostUrl}/api/upload/image/carDealers`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: formData,
      });
      console.log(response);
      if (response.status == 200) {
        uploadingVatPdf();
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

  //! Calling Api for adding new car dealer data...
  const apiCall = async (
    dealerName,
    whatsAppNumber,
    contactNumber,
    emailAddress,
    nationality,
    packageType,
    address,
    dateOfBirth,
    emiratesId,
    licenseNumber,
    vatNumber,
    latitude,
    longitude,
    expiryDate,
    cities,
    dealerDescription,
    faceBookUrl,
    instagramUrl,
    twitterUrl,
    youtubeUrl,
    linkedinUrl
  ) => {
    let apiUrl = `${host[0].hostUrl}/api/post/data/carDealers`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: {
          dealerName,
          whatsAppNumber,
          contactNumber,
          emailAddress,
          nationality,
          packageType,
          address,
          dateOfBirth,
          emiratesId,
          licenseNumber,
          vatNumber,
          latitude,
          longitude,
          expiryDate,
          cities,
          dealerDescription,
          faceBookUrl,
          instagramUrl,
          twitterUrl,
          youtubeUrl,
          linkedinUrl,
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

  //! Function for checking form 1 Validations...
  const form1CheckValidations = async () => {
    if (
      carDealerName.trim() == "" ||
      file == null ||
      carDealerWhatsAppNumber.trim() == "" ||
      carDealerContactNumber.trim() == "" ||
      carDealerEmail.trim() == "" ||
      carDealerNationality.trim() == "" ||
      packageType.length < 1 ||
      carDealerAddress.trim() == "" ||
      carDealerDateOfBirth.trim() == "" ||
      carDealerEmiratesId.trim() == "" ||
      carDealerLicenseNumber.trim() == "" ||
      carDealerVatNumber.trim() == "" ||
      carDealerLatitude.trim() == "" ||
      carDealerLongitude.trim() == "" ||
      carDealerExpiryDate.trim() == "" ||
      carDealerCities.length < 1 ||
      carDealerDescription.trim() == ""
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
    } else if (
      carDealerName.trim().length < 3 ||
      carDealerWhatsAppNumber.trim().length < 9 ||
      carDealerContactNumber.trim().length < 9 ||
      carDealerEmail.trim().length < 5 ||
      carDealerNationality.trim().length < 2 ||
      packageType.length < 1 ||
      carDealerAddress.trim().length < 5 ||
      carDealerDateOfBirth.trim().length < 8 ||
      carDealerEmiratesId.trim().length < 3 ||
      carDealerLicenseNumber.trim().length < 2 ||
      carDealerVatNumber.trim().length < 2 ||
      carDealerLatitude.trim().length < 2 ||
      carDealerLongitude.trim().length < 2 ||
      carDealerExpiryDate.trim().length < 8 ||
      carDealerCities.length < 1 ||
      carDealerDescription.trim().length < 5
    ) {
      setModalStatus(true);
      setModalData({
        heading: "Error: Cannot process your entry!",
        title: "Please enter valid details",
        title2: "Make sure you entered correct details",
        statusCode: "400",
      });
      setTimeout(() => {
        setModalStatus(false);
        setModalData(null);
      }, 5000);
    } else {
      setForm1(false);
      setForm3(false);
      setForm2(true);
    }
  };

  //! Function for adding new data in dataBase...
  const addNewCarDealerData = async () => {
    if (
      carDealerName.trim() == "" ||
      file == null ||
      carDealerWhatsAppNumber.trim() == "" ||
      carDealerContactNumber.trim() == "" ||
      carDealerEmail.trim() == "" ||
      carDealerNationality.trim() == "" ||
      packageType.length < 1 ||
      carDealerAddress.trim() == "" ||
      carDealerDateOfBirth.trim() == "" ||
      carDealerEmiratesId.trim() == "" ||
      carDealerLicenseNumber.trim() == "" ||
      carDealerVatNumber.trim() == "" ||
      carDealerLatitude.trim() == "" ||
      carDealerLongitude.trim() == "" ||
      carDealerExpiryDate.trim() == "" ||
      carDealerCities.length < 1 ||
      carDealerDescription.trim() == "" ||
      vatDocFile == null ||
      ejariDocFile == null ||
      insuranceDocFile == null ||
      idCard == null
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
    } else if (
      carDealerName.trim().length < 3 ||
      carDealerWhatsAppNumber.trim().length < 9 ||
      carDealerContactNumber.trim().length < 9 ||
      carDealerEmail.trim().length < 5 ||
      carDealerNationality.trim().length < 2 ||
      packageType.length < 1 ||
      carDealerAddress.trim().length < 5 ||
      carDealerDateOfBirth.trim().length < 8 ||
      carDealerEmiratesId.trim().length < 3 ||
      carDealerLicenseNumber.trim().length < 2 ||
      carDealerVatNumber.trim().length < 2 ||
      carDealerLatitude.trim().length < 2 ||
      carDealerLongitude.trim().length < 2 ||
      carDealerExpiryDate.trim().length < 8 ||
      carDealerCities.length < 1 ||
      carDealerDescription.trim().length < 5
    ) {
      setModalStatus(true);
      setModalData({
        heading: "Error: Cannot process your entry!",
        title: "Please enter valid details",
        title2: "Make sure you entered correct details",
        statusCode: "400",
      });
      setTimeout(() => {
        setModalStatus(false);
        setModalData(null);
      }, 5000);
    } else if (
      vatDocFile.type !== "application/pdf" ||
      ejariDocFile.type !== "application/pdf" ||
      insuranceDocFile.type !== "application/pdf" ||
      idCard.type !== "application/pdf"
    ) {
      setModalStatus(true);
      setModalData({
        heading: "Error: Cannot process your entry!",
        title: "Please upload PDF only",
        title2: "You are uploading another type file",
        statusCode: "400",
      });
      setTimeout(() => {
        setModalStatus(false);
        setModalData(null);
      }, 5000);
    } else {
      apiCall(
        carDealerName.trim(),
        carDealerWhatsAppNumber.trim(),
        carDealerContactNumber.trim(),
        carDealerEmail.trim(),
        carDealerNationality.trim(),
        packageType,
        carDealerAddress.trim(),
        carDealerDateOfBirth.trim(),
        carDealerEmiratesId.trim(),
        carDealerLicenseNumber.trim(),
        carDealerVatNumber.trim(),
        carDealerLatitude.trim(),
        carDealerLongitude.trim(),
        carDealerExpiryDate.trim(),
        carDealerCities,
        carDealerDescription.trim(),
        faceBookUrl,
        instagramUrl,
        twitterUrl,
        youtubeUrl,
        linkedInUrl
      );
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
      console.log("packages api", response.data.data);
      if (response.status == 200) {
        setPackagesDataState(response.data.data);
        setPackageType(response.data.data[0].id);
      }
    } catch (error) {
      console.log(`Something went wrong while fecthing packages Api: `, error);
    }
  };

  //! Fetching Cities Type Api...
  const citiesTypeApiCall = async () => {
    let apiUrl = `${host[0].hostUrl}/api/get/data/cities`;
    let arr = [];

    try {
      let response = await axios({
        method: "GET",
        url: apiUrl,
      });
      console.log(response.data.data);
      if (response.status == 200) {
        // setCitiesDataState(response.data.data);
        for (let i = 0; i < response.data.data.length; i++) {
          arr.push(response.data.data[i].cityName);
        }
        setCitiesDataState(arr);
      }
    } catch (error) {
      console.log(`Something went wrong while fecthing cities Api: `, error);
    }
  };

  useEffect(() => {
    packageTypeApiCall();
    citiesTypeApiCall();
    setCarDealerNationality(countries[0]);
  }, []);

  useEffect(() => {
    console.log(packageType);
  }, [packageType]);

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
              Add New Car Dealer
            </li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 col-md-12">
          {/* <div className="card"> */}
          <div className="card wizard clearfix">
            <div className="card-header border-bottom">
              <h3 className="card-title">Add New Car Dealer</h3>
            </div>

            {/* Steps */}
            <div
              className="steps clearfix border-bottom"
              style={{ backgroundColor: "none" }}
            >
              <ul role="tablist">
                <li
                  role="tab"
                  className="first current"
                  aria-disabled="false"
                  aria-selected="true"
                >
                  <a id="wizard1-t-0" aria-controls="wizard1-p-0">
                    <span
                      className="number"
                      style={{
                        backgroundColor:
                          form1 == true ? " #82c035" : " #13bfa6",
                      }}
                    >
                      1
                    </span>{" "}
                    <span
                      className="title"
                      style={{
                        color: form1 == true ? "#82c035" : " #13bfa6",
                      }}
                    >
                      Car Dealer Details
                    </span>
                  </a>
                </li>
                <li
                  role="tab"
                  className="done"
                  aria-disabled="false"
                  aria-selected="false"
                >
                  <a id="wizard1-t-1" aria-controls="wizard1-p-1">
                    <span
                      className="number"
                      style={{
                        backgroundColor:
                          form2 == true ? " #82c035" : " #13bfa6",
                      }}
                    >
                      2
                    </span>{" "}
                    <span
                      className="title"
                      style={{
                        color: form2 == true ? "#82c035" : " #13bfa6",
                      }}
                    >
                      Social Media Links
                    </span>
                  </a>
                </li>
                <li
                  role="tab"
                  className="done"
                  aria-disabled="false"
                  aria-selected="false"
                >
                  <a id="wizard1-t-1" aria-controls="wizard1-p-1">
                    <span
                      className="number"
                      style={{
                        backgroundColor:
                          form3 == true ? " #82c035" : " #13bfa6",
                      }}
                    >
                      3
                    </span>{" "}
                    <span
                      className="title"
                      style={{
                        color: form3 == true ? "#82c035" : " #13bfa6",
                      }}
                    >
                      Upload dealer documents
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="card-body">
              {/* Form 1 */}
              <form
                className="row g-3 needs-validation"
                noValidate
                style={{
                  backgroundColor: "none",
                  flexDirection: "column",
                  display: form1 == true ? "flex" : "none",
                }}
              >
                <div style={{ display: "flex" }}>
                  {/* Name */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                      Car Dealer Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={carDealerName}
                      onChange={(e) => {
                        setCarDealerName(e.target.value);
                      }}
                      style={{
                        borderColor:
                          carDealerName.trim().length < 3 ? "red" : "#8fbd56",
                      }}
                    />
                    {carDealerName.trim().length < 3 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter Car Dealer Name
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
                  {/* Email Address */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={carDealerEmail}
                      onChange={(e) => {
                        setCarDealerEmail(e.target.value);
                      }}
                      style={{
                        borderColor:
                          carDealerEmail.trim().length < 5 ? "red" : "#8fbd56",
                      }}
                    />
                    {carDealerEmail.trim().length < 5 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter Dealer Email Address
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
                {/* Image Upload */}
                <div className="col-md-6">
                  <label htmlFor="validationCustom02" className="form-label">
                    Upload Car Dealer logo
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
                      Please upload Dealer logo
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
                    backgroundColor: "none",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {/* WhatsApp Number */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                      WhatsApp Number
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={carDealerWhatsAppNumber}
                      onChange={(e) => {
                        setCarDealerWhatsAppNumber(e.target.value);
                      }}
                      style={{
                        borderColor:
                          carDealerWhatsAppNumber.trim().length < 9
                            ? "red"
                            : "#8fbd56",
                      }}
                    />
                    {carDealerWhatsAppNumber.trim().length < 9 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter WhatsApp Number
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
                  {/* Contact */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                      Contact Number
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={carDealerContactNumber}
                      onChange={(e) => {
                        setCarDealerContactNumber(e.target.value);
                      }}
                      style={{
                        borderColor:
                          carDealerContactNumber.trim().length < 9
                            ? "red"
                            : "#8fbd56",
                      }}
                    />
                    {carDealerContactNumber.trim().length < 9 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter Dealer Contact Number
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
                  {/* Nationality */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">
                      Select Nationality
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={carDealerNationality}
                      onChange={(e) => {
                        setCarDealerNationality(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      {countries.length > 0 ? (
                        countries.map((item, index) => {
                          return <option key={index}>{item}</option>;
                        })
                      ) : (
                        <option></option>
                      )}
                    </select>
                    {carDealerNationality.trim().length < 2 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select nationality
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
                  {/* Package Type */}
                  <div className="col-md-3">
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
                    >
                      <option disabled>Select</option>
                      {packagesDataState.length > 0 ? (
                        packagesDataState.map((item, index) => {
                          return (
                            <option key={index} value={item.id}>
                              {item.packageName}
                            </option>
                          );
                        })
                      ) : (
                        <option></option>
                      )}
                    </select>
                    {packageType.length < 1 ? (
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
                    )}
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                </div>
                {/*  */}
                <div style={{ display: "flex" }}>
                  {/* Date Of Birth */}
                  <div className="col-lg-3">
                    <div className="input-group">
                      <div className="input-group-text bg-primary-transparent text-primary">
                        <i className="fe fe-calendar text-20"></i>
                      </div>
                      <input
                        className="form-control"
                        id="datepicker-date"
                        placeholder="YYYY-MM-DD"
                        type="date"
                        required
                        value={carDealerDateOfBirth}
                        onChange={(e) => {
                          setCarDealerDateOfBirth(e.target.value);
                        }}
                        style={{
                          borderColor:
                            carDealerDateOfBirth.trim().length < 8
                              ? "red"
                              : "#8fbd56",
                        }}
                      />
                    </div>
                    {carDealerDateOfBirth.trim().length < 8 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter Date Of Birth
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
                  </div>
                  {/* Emirates Id */}
                  <div className="col-lg-3">
                    <div className="input-group">
                      <div className="input-group-text bg-primary-transparent text-primary">
                        ID
                      </div>
                      <input
                        className="form-control"
                        placeholder="Emirates-Id"
                        type="text"
                        required
                        value={carDealerEmiratesId}
                        onChange={(e) => {
                          setCarDealerEmiratesId(e.target.value);
                        }}
                        style={{
                          borderColor:
                            carDealerEmiratesId.trim().length < 3
                              ? "red"
                              : "#8fbd56",
                        }}
                      />
                    </div>
                    {carDealerEmiratesId.trim().length < 3 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter emirates id
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
                  </div>
                  {/* License Number */}
                  <div className="col-lg-3">
                    <div className="input-group">
                      <div className="input-group-text bg-primary-transparent text-primary">
                        License
                      </div>
                      <input
                        className="form-control"
                        placeholder="License number"
                        type="text"
                        required
                        value={carDealerLicenseNumber}
                        onChange={(e) => {
                          setCarDealerLicenseNumber(e.target.value);
                        }}
                        style={{
                          borderColor:
                            carDealerLicenseNumber.trim().length < 2
                              ? "red"
                              : "#8fbd56",
                        }}
                      />
                    </div>
                    {carDealerLicenseNumber.trim().length < 2 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter License Number
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
                  </div>
                  {/* VAT Number */}
                  <div className="col-lg-3">
                    <div className="input-group">
                      <div className="input-group-text bg-primary-transparent text-primary">
                        VAT
                      </div>
                      <input
                        className="form-control"
                        placeholder="VAT number"
                        type="text"
                        required
                        value={carDealerVatNumber}
                        onChange={(e) => {
                          setCarDealerVatNumber(e.target.value);
                        }}
                        style={{
                          borderColor:
                            carDealerVatNumber.trim().length < 2
                              ? "red"
                              : "#8fbd56",
                        }}
                      />
                    </div>
                    {carDealerVatNumber.trim().length < 2 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter VAT Number
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
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  {/* Latitude */}
                  <div className="col-lg-3">
                    <div className="input-group">
                      <div className="input-group-text bg-primary-transparent text-primary">
                        Lat
                      </div>
                      <input
                        className="form-control"
                        placeholder="Latitude"
                        type="text"
                        required
                        value={carDealerLatitude}
                        onChange={(e) => {
                          setCarDealerLatitude(e.target.value);
                        }}
                        style={{
                          borderColor:
                            carDealerLatitude.trim().length < 2
                              ? "red"
                              : "#8fbd56",
                        }}
                      />
                    </div>
                    {carDealerLatitude.trim().length < 2 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please fill the required field
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
                  </div>
                  {/* Longitude */}
                  <div className="col-lg-3">
                    <div className="input-group">
                      <div className="input-group-text bg-primary-transparent text-primary">
                        Log
                      </div>
                      <input
                        className="form-control"
                        placeholder="Longitude"
                        type="text"
                        required
                        value={carDealerLongitude}
                        onChange={(e) => {
                          setCarDealerLongitude(e.target.value);
                        }}
                        style={{
                          borderColor:
                            carDealerLongitude.trim().length < 2
                              ? "red"
                              : "#8fbd56",
                        }}
                      />
                    </div>
                    {carDealerLongitude.trim().length < 2 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please fill the required field
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
                  </div>
                  {/* Expiry Date */}
                  <div className="col-lg-3">
                    <div className="input-group">
                      <div className="input-group-text bg-primary-transparent text-primary">
                        Expiry
                      </div>
                      <input
                        className="form-control"
                        placeholder="YYYY-MM-DD"
                        type="text"
                        required
                        value={carDealerExpiryDate}
                        onChange={(e) => {
                          setCarDealerExpiryDate(e.target.value);
                        }}
                        style={{
                          borderColor:
                            carDealerExpiryDate.trim().length < 8
                              ? "red"
                              : "#8fbd56",
                        }}
                      />
                    </div>
                    {carDealerExpiryDate.trim().length < 8 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter Expiry Date
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
                  </div>
                  {/* Multi Select */}
                  {/* <div className="col-md-3" style={{ marginTop: -8 }}> */}
                  <div className="col-md-3">
                    {/* <label htmlFor="validationCustom04" className="form-label">
                      Select Cities
                    </label> */}
                    <Multiselect
                      placeholder="Search Cities"
                      isObject={false}
                      showCheckbox={true}
                      onSelect={(e) => {
                        // console.log(e);
                        setCarDealerCities(e);
                      }}
                      onRemove={(e) => {
                        // console.log(e);
                      }}
                      options={citiesDataState}
                      // selectedValues={}
                      hideSelectedList={true}
                    />
                    {carDealerCities.length == 0 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select Cities
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
                </div>
                <div style={{ display: "flex", marginTop: 5 }}>
                  {/* Description */}
                  <div className="col-md-6">
                    <label htmlFor="validationCustom01" className="form-label">
                      Description
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={carDealerDescription}
                      onChange={(e) => {
                        setCarDealerDescription(e.target.value);
                      }}
                      style={{
                        resize: "none",
                        height: 70,
                        // width:790,
                        borderColor:
                          carDealerDescription.trim().length < 5
                            ? "red"
                            : "#8fbd56",
                      }}
                    />
                    {carDealerDescription.trim().length < 5 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter Description
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
                  {/* Address */}
                  <div className="col-md-6">
                    <label htmlFor="validationCustom01" className="form-label">
                      Address
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={carDealerAddress}
                      onChange={(e) => {
                        setCarDealerAddress(e.target.value);
                      }}
                      style={{
                        resize: "none",
                        height: 70,
                        // height: 100,
                        // width:790,
                        borderColor:
                          carDealerAddress.trim().length < 5
                            ? "red"
                            : "#8fbd56",
                      }}
                    />
                    {carDealerAddress.trim().length < 5 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter Dealer Address
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
                {/* Buttons */}
                <div className="col-12">
                  <div className="btn btn-default" style={{ marginRight: 10 }}>
                    <Link to={"/carDealerTable"}>Cancel</Link>
                  </div>
                  <div
                    className="btn btn-primary"
                    onClick={form1CheckValidations}
                  >
                    Next
                  </div>
                </div>
              </form>

              {/* Form 2 */}
              <form
                className="row g-3 needs-validation"
                noValidate
                style={{
                  backgroundColor: "none",
                  flexDirection: "column",
                  display: form2 == true ? "flex" : "none",
                }}
              >
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {/* facebook */}
                  <div className="col-lg-4 mb-5">
                    <label htmlFor="faceBookUrl" className="form-label">
                      Facebook Url (Optional)
                    </label>
                    <div className="input-group">
                      <div className="input-group-text bg-primary-transparent text-primary">
                        <i className="fe fe-facebook text-20"></i>
                      </div>
                      <input
                        className="form-control"
                        id="faceBookUrl"
                        placeholder="https://www.facebook.com"
                        type="text"
                        required
                        value={faceBookUrl}
                        onChange={(e) => {
                          setFacebookUrl(e.target.value);
                        }}
                        style={{
                          borderColor:
                            faceBookUrl.trim().length < 8 ? "red" : "#8fbd56",
                        }}
                      />
                    </div>
                  </div>
                  {/* instagram */}
                  <div className="col-lg-4 mb-5">
                    <label htmlFor="instagramUrl" className="form-label">
                      Instagram Url (Optional)
                    </label>
                    <div className="input-group">
                      <div className="input-group-text bg-primary-transparent text-primary">
                        <i className="fe fe-instagram text-20"></i>
                      </div>
                      <input
                        className="form-control"
                        id="instagramUrl"
                        placeholder="https://www.instagram.com"
                        type="text"
                        required
                        value={instagramUrl}
                        onChange={(e) => {
                          setInstagramUrl(e.target.value);
                        }}
                        style={{
                          borderColor:
                            instagramUrl.trim().length < 8 ? "red" : "#8fbd56",
                        }}
                      />
                    </div>
                  </div>
                  {/* twitter */}
                  <div className="col-lg-4 mb-5">
                    <label htmlFor="twitterUrl" className="form-label">
                      Twitter Url (Optional)
                    </label>
                    <div className="input-group">
                      <div className="input-group-text bg-primary-transparent text-primary">
                        <i className="fe fe-twitter text-20"></i>
                      </div>
                      <input
                        className="form-control"
                        id="twitterUrl"
                        placeholder="https://www.twitter.com"
                        type="text"
                        required
                        value={twitterUrl}
                        onChange={(e) => {
                          setTwitterUrl(e.target.value);
                        }}
                        style={{
                          borderColor:
                            twitterUrl.trim().length < 8 ? "red" : "#8fbd56",
                        }}
                      />
                    </div>
                  </div>
                  {/* youtube */}
                  <div className="col-lg-4 mb-5">
                    <label htmlFor="youtubeUrl" className="form-label">
                      Youtube Url (Optional)
                    </label>
                    <div className="input-group">
                      <div className="input-group-text bg-primary-transparent text-primary">
                        <i className="fe fe-play text-20"></i>
                      </div>
                      <input
                        className="form-control"
                        id="youtubeUrl"
                        placeholder="https://www.youtube.com"
                        type="text"
                        required
                        value={youtubeUrl}
                        onChange={(e) => {
                          setYoutubeUrl(e.target.value);
                        }}
                        style={{
                          borderColor:
                            youtubeUrl.trim().length < 8 ? "red" : "#8fbd56",
                        }}
                      />
                    </div>
                  </div>
                  {/* linkedin */}
                  <div className="col-lg-4 mb-5">
                    <label htmlFor="linkedinUrl" className="form-label">
                      Linkedin Url (Optional)
                    </label>
                    <div className="input-group">
                      <div className="input-group-text bg-primary-transparent text-primary">
                        <i className="fe fe-linkedin text-20"></i>
                      </div>
                      <input
                        className="form-control"
                        id="linkedinUrl"
                        placeholder="https://www.linkedin.com"
                        type="text"
                        required
                        value={linkedInUrl}
                        onChange={(e) => {
                          setLinkedInUrl(e.target.value);
                        }}
                        style={{
                          borderColor:
                            linkedInUrl.trim().length < 8 ? "red" : "#8fbd56",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Add Buttons */}
                <div className="col-12">
                  <div
                    className="btn btn-default"
                    onClick={() => {
                      setForm2(false);
                      setForm3(false);
                      setForm1(true);
                    }}
                    style={{ marginRight: 10 }}
                  >
                    Previous
                  </div>
                  <div
                    className="btn btn-primary"
                    onClick={() => {
                      setForm2(false);
                      setForm1(false);
                      setForm3(true);
                    }}
                  >
                    Next to upload Docs
                  </div>
                </div>
              </form>

              {/* Form 3 */}
              <form
                className="row g-3 needs-validation"
                noValidate
                style={{
                  backgroundColor: "none",
                  flexDirection: "column",
                  display: form3 == true ? "flex" : "none",
                }}
              >
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {/* Vat Document Upload */}
                  <div className="col-md-4">
                    <label htmlFor="validationCustom02" className="form-label">
                      Upload Vat Document (PDF)
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="validationCustom02"
                      required
                      accept="application/pdf"
                      onChange={(e) => {
                        setVatDocFile(e.target.files[0]);
                      }}
                      style={{
                        borderColor: vatDocFile == null ? "red" : "#8fbd56",
                      }}
                    />
                    {vatDocFile == null ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please upload vat document
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
                  {/* Ejari Document Upload */}
                  <div className="col-md-4">
                    <label htmlFor="validationCustom02" className="form-label">
                      Upload Ejari Document (PDF)
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="validationCustom02"
                      required
                      accept="application/pdf"
                      onChange={(e) => {
                        setEjariDocFile(e.target.files[0]);
                      }}
                      style={{
                        borderColor: ejariDocFile == null ? "red" : "#8fbd56",
                      }}
                    />
                    {ejariDocFile == null ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please upload ejari document
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
                  {/* Insurance Document Upload */}
                  <div className="col-md-4">
                    <label htmlFor="validationCustom02" className="form-label">
                      Upload Insurance Document (PDF)
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="validationCustom02"
                      required
                      accept="application/pdf"
                      onChange={(e) => {
                        setInsuranceDocFile(e.target.files[0]);
                      }}
                      style={{
                        borderColor:
                          insuranceDocFile == null ? "red" : "#8fbd56",
                      }}
                    />
                    {insuranceDocFile == null ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please upload insurance document
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
                  {/* ID Card Upload */}
                  <div className="col-md-4">
                    <label htmlFor="validationCustom02" className="form-label">
                      Upload ID Card (PDF)
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="validationCustom02"
                      required
                      accept="application/pdf"
                      onChange={(e) => {
                        setIdCard(e.target.files[0]);
                      }}
                      style={{
                        borderColor: idCard == null ? "red" : "#8fbd56",
                      }}
                    />
                    {idCard == null ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please upload id card
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
                  {/* Others */}
                  <div className="col-md-4">
                    <label htmlFor="validationCustom02" className="form-label">
                      Others (Optional)
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="validationCustom02"
                      required
                      accept="application/pdf"
                      onChange={(e) => {
                        setOthersDoc(e.target.files[0]);
                      }}
                      style={{
                        borderColor: othersDoc == null ? "red" : "#8fbd56",
                      }}
                    />
                    {othersDoc == null ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Upload document pdf (Optional)
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

                {/* Add Buttons */}
                <div className="col-12">
                  <div
                    className="btn btn-default"
                    onClick={() => {
                      setForm3(false);
                      setForm1(false);
                      setForm2(true);
                    }}
                    style={{ marginRight: 10 }}
                  >
                    Previous
                  </div>
                  <div
                    className="btn btn-primary"
                    onClick={addNewCarDealerData}
                  >
                    Upload Docs & Add Data
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

export default CarDealerForm;
