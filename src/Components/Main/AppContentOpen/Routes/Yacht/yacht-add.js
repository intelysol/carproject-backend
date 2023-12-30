import React, { useEffect, useState } from "react";
import "../../../../../index.css";

//! Import Link from React Router Dom...
import { Link, useNavigate } from "react-router-dom";

//! Importing Multi Select DropDown...
import Multiselect from "multiselect-react-dropdown";

//! Importing Age Numbers...
import numbers from "../../../../../dummyData/Numbers/numbers";

//! Importing Axios for fetching Api's...
import axios from "axios";

//! Importing Enviroment File...
import host from "../../../../../enviroment-file/enviroment-file";

//! Importing Modal Icons...
import errorIcon from "../../../../../assets/icons/404-error.png";
import successIcon from "../../../../../assets/icons/success-icon.png";

//! Importing Upload Icon...
import uploadIcon from "../../../../../assets/icons/upload.png";

const YachtForm = () => {
  let navigation = useNavigate();

  //! Forms States...
  const [form1State, setForm1State] = useState(true);
  const [form2State, setForm2State] = useState(false);
  const [form3State, setForm3State] = useState(false);
  const [form4State, setForm4State] = useState(false);
  const [form5State, setForm5State] = useState(false);

  //! Form 1 Inputs/Selects States...
  const [yachtName, setYachtName] = useState("");
  const [yachtType, setYachtType] = useState("");
  const [captainIncluded, setCaptainIncluded] = useState("");
  const [crewMembers, setCrewMembers] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [yachtSize, setYachtSize] = useState("");
  const [yachtRoom, setYachtRoom] = useState("");
  const [yachtOverview, setYachtOverview] = useState("");

  //! Form 2 Checkboxes States...
  const [iceWaterAndSoftDrinks, setIceWaterAndSoftDrinks] = useState(true);
  const [freeFuel, setFreeFuel] = useState(true);
  const [towels, setTowels] = useState(true);
  const [bbqEquipmentAndServices, setBbqEquipmentAndServices] = useState(true);
  const [kidsWelcome, setKidsWelcome] = useState(true);
  const [musicSystem, setMusicSystem] = useState(true);
  const [freeRefreshment, setFreeRefreshment] = useState(true);
  const [fishingEquipment, setFishingEquipment] = useState(true);
  const [safetyEquipment, setSafetyEquipment] = useState(true);

  //! Form 3 CheckBoxes States...
  // Connectivity...
  const [bluetooth, setBluetooth] = useState(true);
  const [usbPort, setUsbPort] = useState(true);
  const [auxCable, setAuxCable] = useState(true);
  // Saloon & Cabin Facilities States...
  const [shower, setShower] = useState(true);
  const [pillowsAndBlankets, setPillowsAndBlankets] = useState(true);
  const [cooler, setCooler] = useState(true);
  const [airConditioning, setAirConditioning] = useState(true);
  const [microwave, setMicrowave] = useState(true);
  // Entertainment States...
  const [insideSpeakers, setInsideSpeakers] = useState(true);
  const [outsideSpeakers, setOutsideSpeakers] = useState(true);
  const [audioSystem, setAudioSystem] = useState(true);

  //! Form 4 Inputs States...
  const [perHourRentalCost, setPerHourRentalCost] = useState("");
  const [perDayRentalCost, setPerDayRentalCost] = useState("");
  const [weeklyRentalCost, setWeeklyRentalCost] = useState("");

  //! Form 5 Images States...
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [imagesArr, setImagesArr] = useState([]);

  //!* Video File State...
  const [videoFile, setVideoFile] = useState(null);

  //? Modal/Alert State...
  const [modalStatus, setModalStatus] = useState(false);
  const [modalData, setModalData] = useState(null);

  //! Function for toogle success modal after 200 response of Api...
  const toogleSuccessModal = () => {
    setYachtName("");
    setYachtType("");
    setCaptainIncluded("");
    setCrewMembers("");
    setLocation("");
    setCapacity("");
    setYachtSize("");
    setYachtRoom("");
    setYachtOverview("");

    setIceWaterAndSoftDrinks(true);
    setFreeFuel(true);
    setTowels(true);
    setBbqEquipmentAndServices(true);
    setKidsWelcome(true);
    setMusicSystem(true);
    setFreeRefreshment(true);
    setFishingEquipment(true);
    setSafetyEquipment(true);

    setBluetooth(true);
    setUsbPort(true);
    setAuxCable(true);
    setShower(true);
    setPillowsAndBlankets(true);
    setCooler(true);
    setAirConditioning(true);
    setMicrowave(true);
    setInsideSpeakers(true);
    setOutsideSpeakers(true);
    setAudioSystem(true);

    setPerHourRentalCost("");
    setPerDayRentalCost("");
    setWeeklyRentalCost("");

    setSelectedFiles(null);
    setImagesArr([]);
    setVideoFile(null);

    // setForm5State(false);
    // setForm4State(false);
    // setForm3State(false);
    // setForm2State(false);
    // setForm1State(true);

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

      navigation("/yachtTable");
    }, 3000);
  };

  //! Function for uploading video into folder or saving video name into dataBase...
  const uploadVideo = async () => {
    if (videoFile == null) {
      setModalStatus(true);
      setModalData({
        heading: "Error: Cannot process your entry!",
        title: "Video not found please try again later",
        title2: "Make sure you followed rules and regulations",
        statusCode: "500",
      });
      setTimeout(() => {
        setModalStatus(false);
        setModalData(null);
      }, 4000);
    } else {
      const formData = new FormData();
      formData.append("videoFile", videoFile);

      let apiUrl = `${host[0].hostUrl}/api/upload/video/yachtDetails`;

      try {
        let response = await axios({
          method: "POST",
          url: apiUrl,
          data: formData,
        });
        console.log(response);
        if (response.status == 200) {
          toogleSuccessModal();
        }
      } catch (error) {
        console.log("Something went wrong while uploading video: ", error);
        setModalStatus(true);
        setModalData({
          heading: "Error: Cannot process your entry!",
          title:
            "Something went wrong from server site make sure your network is connected",
          title2: "Make sure you followed rules and regulations",
          statusCode: "500",
        });
        setTimeout(() => {
          setModalStatus(false);
          setModalData(null);
        }, 5000);
      }
    }
  };

  //! Function for uploading yacht images into folder...
  const uploadImage = async () => {
    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append("images", file);
    }

    let apiUrl = `${host[0].hostUrl}/api/upload/image/yachtDetails`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: formData,
      });
      console.log(response);
      if (response.status == 200) {
        if (videoFile !== null) {
          uploadVideo();
        } else {
          toogleSuccessModal();
        }
      }
    } catch (error) {
      console.log("Something went wrong while uploading image: ", error);
      setModalStatus(true);
      setModalData({
        heading: "Error: Cannot process your entry!",
        title:
          "Something went wrong from server site make sure your network is connected",
        title2: "Make sure you followed rules and regulations",
        statusCode: "500",
      });
      setTimeout(() => {
        setModalStatus(false);
        setModalData(null);
      }, 5000);
    }
  };

  //! Calling Api for adding new yacht details data...
  const apiCall = async (
    yachtName,
    yachtType,
    captainIncluded,
    crewMembers,
    location,
    capacity,
    yachtSize,
    yachtRoom,
    yachtOverview,
    iceWaterAndSoftDrinks,
    freeFuel,
    towels,
    bbqEquipmentAndServices,
    kidsWelcome,
    musicSystem,
    freeRefreshment,
    fishingEquipment,
    safetyEquipment,
    bluetooth,
    usbPort,
    auxCable,
    shower,
    pillowsAndBlankets,
    cooler,
    airConditioning,
    microwave,
    insideSpeakers,
    outsideSpeakers,
    audioSystem,
    perHourRentalCost,
    perDayRentalCost,
    weeklyRentalCost
  ) => {
    let apiUrl = `${host[0].hostUrl}/api/post/data/yachtDetails`;

    try {
      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: {
          yachtName,
          yachtType,
          captainIncluded,
          crewMembers,
          location,
          capacity,
          yachtSize,
          yachtRoom,
          yachtOverview,
          iceWaterAndSoftDrinks,
          freeFuel,
          towels,
          bbqEquipmentAndServices,
          kidsWelcome,
          musicSystem,
          freeRefreshment,
          fishingEquipment,
          safetyEquipment,
          bluetooth,
          usbPort,
          auxCable,
          shower,
          pillowsAndBlankets,
          cooler,
          airConditioning,
          microwave,
          insideSpeakers,
          outsideSpeakers,
          audioSystem,
          perHourRentalCost,
          perDayRentalCost,
          weeklyRentalCost,
        },
      });
      console.log(response);
      if (response.status == 200) {
        uploadImage();
        // alert("data saved successfully in dataBase");
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

  //! Form 1 Handler...
  const form1Handler = () => {
    if (
      yachtName.trim() == "" ||
      yachtType.trim() == "" ||
      captainIncluded.trim() == "" ||
      crewMembers.trim() == "" ||
      location.trim() == "" ||
      capacity.trim() == "" ||
      yachtSize.trim() == "" ||
      yachtRoom.trim() == "" ||
      yachtOverview.trim() == ""
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
      setForm1State(false);
      setForm3State(false);
      setForm4State(false);
      setForm5State(false);
      setForm2State(true);
    }
  };
  //! Form 2 Handler...
  const form2Handler = () => {
    setForm2State(false);
    setForm1State(false);
    setForm4State(false);
    setForm5State(false);
    setForm3State(true);
  };
  //! Form 3 Handler...
  const form3Handler = () => {
    setForm3State(false);
    setForm1State(false);
    setForm2State(false);
    setForm5State(false);
    setForm4State(true);
  };
  //! Form 4 Handler...
  const form4Handler = () => {
    if (
      perHourRentalCost.trim() == "" ||
      perDayRentalCost.trim() == "" ||
      weeklyRentalCost.trim() == ""
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
      setForm4State(false);
      setForm1State(false);
      setForm2State(false);
      setForm3State(false);
      setForm5State(true);
    }
  };
  //! Form 5 Handler...
  const form5Handler = () => {
    if (
      imagesArr.length < 1 ||
      imagesArr.length > 10 ||
      selectedFiles == null
    ) {
      setModalStatus(true);
      setModalData({
        heading: "Error: Cannot process your entry!",
        title: "Please upload Yacht photos",
        title2: "Maximum length of Yacht Images is 10",
        statusCode: "400",
      });
      setTimeout(() => {
        setModalStatus(false);
        setModalData(null);
      }, 5000);
    } else {
      apiCall(
        yachtName.trim(),
        yachtType.trim(),
        captainIncluded.trim(),
        crewMembers.trim(),
        location.trim(),
        capacity.trim(),
        yachtSize.trim(),
        yachtRoom.trim(),
        yachtOverview.trim(),
        iceWaterAndSoftDrinks,
        freeFuel,
        towels,
        bbqEquipmentAndServices,
        kidsWelcome,
        musicSystem,
        freeRefreshment,
        fishingEquipment,
        safetyEquipment,
        bluetooth,
        usbPort,
        auxCable,
        shower,
        pillowsAndBlankets,
        cooler,
        airConditioning,
        microwave,
        insideSpeakers,
        outsideSpeakers,
        audioSystem,
        perHourRentalCost.trim(),
        perDayRentalCost.trim(),
        weeklyRentalCost.trim()
      );
    }
  };

  //! Handler for onChange for uploading images....
  const onChangeImage = (e) => {
    if (e.target.files.length < 1 || e.target.files.length > 10) {
      setModalStatus(true);
      setModalData({
        heading: "Error: Cannot process your entry!",
        title: "Please upload Yacht photos",
        title2: "Maximum length of Yacht Images is 10",
        statusCode: "400",
      });
      setTimeout(() => {
        setModalStatus(false);
        setModalData(null);
      }, 5000);
    } else {
      let files = e.target.files;
      setSelectedFiles(files);

      let filesArr = [];
      for (let i = 0; i < files.length; i++) {
        filesArr.push(files[i]);
      }
      setImagesArr(filesArr);
    }
  };

  useEffect(() => {
    setYachtType("Boat -7");
    setCaptainIncluded("Yes");
    setCrewMembers("Yes");
    setLocation("Dubai");
    setCapacity("1");
    setYachtSize("10 ft.");
    setYachtRoom("No");
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
              Add New Yacht
            </li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="card wizard clearfix">
            <div className="card-header border-bottom">
              <h3 className="card-title">Add New Yacht</h3>
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
                          form1State == true ? " #82c035" : " #13bfa6",
                      }}
                    >
                      1
                    </span>{" "}
                    <span
                      className="title"
                      style={{
                        color: form1State == true ? "#82c035" : " #13bfa6",
                      }}
                    >
                      Yacht Details
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
                          form2State == true ? " #82c035" : " #13bfa6",
                      }}
                    >
                      2
                    </span>{" "}
                    <span
                      className="title"
                      style={{
                        color: form2State == true ? "#82c035" : " #13bfa6",
                      }}
                    >
                      Inclusions
                    </span>
                  </a>
                </li>
                <li
                  role="tab"
                  className="last done"
                  aria-disabled="false"
                  aria-selected="false"
                >
                  <a id="wizard1-t-2" aria-controls="wizard1-p-2">
                    <span
                      className="number"
                      style={{
                        backgroundColor:
                          form3State == true ? " #82c035" : " #13bfa6",
                      }}
                    >
                      3
                    </span>{" "}
                    <span
                      className="title"
                      style={{
                        color: form3State == true ? "#82c035" : " #13bfa6",
                      }}
                    >
                      Amenities
                    </span>
                  </a>
                </li>
                <li
                  role="tab"
                  className="last done"
                  aria-disabled="false"
                  aria-selected="false"
                >
                  <a id="wizard1-t-2" aria-controls="wizard1-p-2">
                    <span
                      className="number"
                      style={{
                        backgroundColor:
                          form4State == true ? "#82c035" : " #13bfa6",
                      }}
                    >
                      4
                    </span>{" "}
                    <span
                      className="title"
                      style={{
                        color: form4State == true ? "#82c035" : " #13bfa6",
                      }}
                    >
                      Rental Periods & Prices
                    </span>
                  </a>
                </li>
                <li
                  role="tab"
                  className="last done"
                  aria-disabled="false"
                  aria-selected="false"
                >
                  <a id="wizard1-t-2" aria-controls="wizard1-p-2">
                    <span
                      className="number"
                      style={{
                        backgroundColor:
                          form5State == true ? "#82c035" : "#13bfa6",
                      }}
                    >
                      5
                    </span>{" "}
                    <span
                      className="title"
                      style={{
                        color: form5State == true ? "#82c035" : "#13bfa6",
                      }}
                    >
                      Uplaod Yacht Photos
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Form 1*/}
            <div
              className="card-body"
              style={{ display: form1State == true ? "block" : "none" }}
            >
              <form
                className="row g-3 needs-validation"
                noValidate
                style={{
                  backgroundColor: "none",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h4 style={{ color: "#8fbd56", marginBottom: -5 }}>
                  Yacht Details:
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                      Yacht Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={yachtName}
                      onChange={(e) => {
                        setYachtName(e.target.value);
                      }}
                      style={{
                        borderColor:
                          yachtName.trim().length < 3 ? "red" : "#8fbd56",
                      }}
                    />
                    {yachtName.trim().length < 3 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter yacht name
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
                  {/* DropDown */}
                  <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">
                      Select Yacht Type
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={yachtType}
                      onChange={(e) => {
                        setYachtType(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      <option>Boat -7</option>
                      <option>Yacht -111</option>
                    </select>
                    {yachtType.trim().length < 1 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select at least one option
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
                  <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">
                      Captain Included
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={captainIncluded}
                      onChange={(e) => {
                        setCaptainIncluded(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                    {captainIncluded.trim().length < 2 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select at least one option
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
                  <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">
                      Crew Members
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={crewMembers}
                      onChange={(e) => {
                        setCrewMembers(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                    {crewMembers.trim().length < 2 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select at least one option
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
                  <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">
                      Select Location
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={location}
                      onChange={(e) => {
                        setLocation(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      <option>Dubai</option>
                      <option>Abu Dhabi</option>
                    </select>
                    {location.trim().length < 2 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select location
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
                  <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">
                      Select Capacity
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={capacity}
                      onChange={(e) => {
                        setCapacity(e.target.value);
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
                    </select>
                    {capacity.trim().length < 1 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select capacity
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
                  <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">
                      Select Yacht Size
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={yachtSize}
                      onChange={(e) => {
                        setYachtSize(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      <option>10 ft.</option>
                      <option>20 ft.</option>
                      <option>30 ft.</option>
                      <option>40 ft.</option>
                      <option>50 ft.</option>
                      <option>60 ft.</option>
                      <option>80 ft.</option>
                      <option>90 ft.</option>
                      <option>100 ft.</option>
                    </select>
                    {yachtSize.trim().length < 2 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select yacht size
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
                  <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">
                      Select Yacht Rooms
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                      value={yachtRoom}
                      onChange={(e) => {
                        setYachtRoom(e.target.value);
                      }}
                    >
                      <option disabled>Select</option>
                      <option>No</option>
                      <option>1 room</option>
                      <option>2 rooms</option>
                      <option>3 rooms</option>
                    </select>
                    {yachtRoom.trim().length < 2 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please select yacht rooms
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
                  <div className="col-md-6">
                    <label htmlFor="validationCustom01" className="form-label">
                      Yacht Overview
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                      value={yachtOverview}
                      onChange={(e) => {
                        setYachtOverview(e.target.value);
                      }}
                      style={{
                        resize: "none",
                        height: 70,
                        borderColor:
                          yachtOverview.trim().length < 5 ? "red" : "#8fbd56",
                      }}
                    />
                    {yachtOverview.trim().length < 5 ? (
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          paddingLeft: 10,
                        }}
                      >
                        Please enter yacht overview
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

                {/* Button */}
                <div className="col-12" style={{ marginTop: 30 }}>
                  <div className="btn btn-default" style={{ marginRight: 10 }}>
                    <Link to={"/yachtTable"}>Cancel</Link>
                  </div>
                  <div className="btn btn-primary" onClick={form1Handler}>
                    Next
                  </div>
                </div>
              </form>
            </div>

            {/* Form 2 */}
            <div
              className="card-body"
              style={{ display: form2State == true ? "block" : "none" }}
            >
              <form
                className="row g-3 needs-validation"
                noValidate
                style={{
                  backgroundColor: "none",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h4 style={{ color: "#8fbd56", marginBottom: -5 }}>
                  Inclusions:
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {/* Status */}
                  <div
                    className="col-md-3"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Ice, Water & Soft drinks
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
                              setIceWaterAndSoftDrinks(!iceWaterAndSoftDrinks);
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
                            {iceWaterAndSoftDrinks == true ? "Yes" : ""}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                  {/* Status */}
                  <div
                    className="col-md-3"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Free Fuel
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
                              setFreeFuel(!freeFuel);
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
                            {freeFuel == true ? "Yes" : ""}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                  {/* Status */}
                  <div
                    className="col-md-3"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Towels
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-5"
                            defaultChecked={true}
                            onClick={() => {
                              setTowels(!towels);
                            }}
                          />
                          <label
                            htmlFor="checkbox-5"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {towels == true ? "Yes" : ""}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                  {/* Status */}
                  <div
                    className="col-md-3"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      BBQ Equipment & Services
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-6"
                            defaultChecked={true}
                            onClick={() => {
                              setBbqEquipmentAndServices(
                                !bbqEquipmentAndServices
                              );
                            }}
                          />
                          <label
                            htmlFor="checkbox-6"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {bbqEquipmentAndServices == true ? "Yes" : ""}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                  {/* Status */}
                  <div
                    className="col-md-3"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Kids Welcome
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-7"
                            defaultChecked={true}
                            onClick={() => {
                              setKidsWelcome(!kidsWelcome);
                            }}
                          />
                          <label
                            htmlFor="checkbox-7"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {kidsWelcome == true ? "Yes" : ""}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                  {/* Status */}
                  <div
                    className="col-md-3"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Music System
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-8"
                            defaultChecked={true}
                            onClick={() => {
                              setMusicSystem(!musicSystem);
                            }}
                          />
                          <label
                            htmlFor="checkbox-8"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {musicSystem == true ? "Yes" : ""}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                  {/* Status */}
                  <div
                    className="col-md-3"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Free Refreshment
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-9"
                            defaultChecked={true}
                            onClick={() => {
                              setFreeRefreshment(!freeRefreshment);
                            }}
                          />
                          <label
                            htmlFor="checkbox-9"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {freeRefreshment == true ? "Yes" : ""}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                  {/* Status */}
                  <div
                    className="col-md-3"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Fishing Equipment
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-10"
                            defaultChecked={true}
                            onClick={() => {
                              setFishingEquipment(!fishingEquipment);
                            }}
                          />
                          <label
                            htmlFor="checkbox-10"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {fishingEquipment == true ? "Yes" : ""}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                  {/* Status */}
                  <div
                    className="col-md-3"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Safety Equipment
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-11"
                            defaultChecked={true}
                            onClick={() => {
                              setSafetyEquipment(!safetyEquipment);
                            }}
                          />
                          <label
                            htmlFor="checkbox-11"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {safetyEquipment == true ? "Yes" : ""}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                </div>

                {/* Button */}
                <div className="col-12" style={{ marginTop: 30 }}>
                  <div
                    className="btn btn-default"
                    style={{ marginRight: 10 }}
                    onClick={() => {
                      setForm2State(false);
                      setForm3State(false);
                      setForm4State(false);
                      setForm5State(false);
                      setForm1State(true);
                    }}
                  >
                    Previous
                  </div>
                  <div className="btn btn-primary" onClick={form2Handler}>
                    Next
                  </div>
                </div>
              </form>
            </div>

            {/* Form 3 */}
            <div
              className="card-body"
              style={{ display: form3State == true ? "block" : "none" }}
            >
              <form
                className="row g-3 needs-validation"
                noValidate
                style={{
                  backgroundColor: "none",
                  display: "flex",
                  // flexDirection: "column",
                }}
              >
                {/* Connectivity */}
                <h4 style={{ color: "#8fbd56", marginBottom: -5 }}>
                  Connectivity:
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    backgroundColor: "none",
                  }}
                >
                  {/* Bluetooth */}
                  <div
                    className="col-md-2"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Bluetooth
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-12"
                            defaultChecked={true}
                            onClick={() => {
                              setBluetooth(!bluetooth);
                            }}
                          />
                          <label
                            htmlFor="checkbox-12"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {bluetooth == true ? "Yes" : ""}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                  {/* USB Port */}
                  <div
                    className="col-md-2"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      USB Port
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-13"
                            defaultChecked={true}
                            onClick={() => {
                              setUsbPort(!usbPort);
                            }}
                          />
                          <label
                            htmlFor="checkbox-13"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {usbPort == true ? "Yes" : ""}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                  {/* AUX Cable */}
                  <div
                    className="col-md-2"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      AUX Cable
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-14"
                            defaultChecked={true}
                            onClick={() => {
                              setAuxCable(!auxCable);
                            }}
                          />
                          <label
                            htmlFor="checkbox-14"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {auxCable == true ? "Yes" : ""}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                </div>

                {/* Saloon & Cabin Facilities */}
                <h4 style={{ color: "#8fbd56", marginBottom: -5 }}>
                  Saloon & Cabin Facilities:
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    backgroundColor: "none",
                  }}
                >
                  {/* Shower */}
                  <div
                    className="col-md-2"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Shower
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-15"
                            defaultChecked={true}
                            onClick={() => {
                              setShower(!shower);
                            }}
                          />
                          <label
                            htmlFor="checkbox-15"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {shower == true ? "Yes" : ""}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                  {/* Pillows & Blankets */}
                  <div
                    className="col-md-2"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Pillows & Blankets
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-16"
                            defaultChecked={true}
                            onClick={() => {
                              setPillowsAndBlankets(!pillowsAndBlankets);
                            }}
                          />
                          <label
                            htmlFor="checkbox-16"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {pillowsAndBlankets == true ? "Yes" : ""}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                  {/* Cooler */}
                  <div
                    className="col-md-1"
                    style={{
                      marginLeft: 10,
                      marginRight: 15,
                      backgroundColor: "none",
                    }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Cooler
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-17"
                            defaultChecked={true}
                            onClick={() => {
                              setCooler(!cooler);
                            }}
                          />
                          <label
                            htmlFor="checkbox-17"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {cooler == true ? "Yes" : ""}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                  {/* Air Conditioning */}
                  <div
                    className="col-md-2"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Air Conditioning
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-18"
                            defaultChecked={true}
                            onClick={() => {
                              setAirConditioning(!airConditioning);
                            }}
                          />
                          <label
                            htmlFor="checkbox-18"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {airConditioning == true ? "Yes" : ""}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                  {/* Microwave */}
                  <div
                    className="col-md-2"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Microwave
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-19"
                            defaultChecked={true}
                            onClick={() => {
                              setMicrowave(!microwave);
                            }}
                          />
                          <label
                            htmlFor="checkbox-19"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {microwave == true ? "Yes" : ""}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                </div>

                {/* Entertainment */}
                <h4 style={{ color: "#8fbd56", marginBottom: -5 }}>
                  Entertainment:
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    backgroundColor: "none",
                  }}
                >
                  {/* Inside Speakers */}
                  <div
                    className="col-md-2"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Inside Speakers
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-20"
                            defaultChecked={true}
                            onClick={() => {
                              setInsideSpeakers(!insideSpeakers);
                            }}
                          />
                          <label
                            htmlFor="checkbox-20"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {insideSpeakers == true ? "Yes" : ""}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                  {/* Outside Speakers */}
                  <div
                    className="col-md-2"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Outside Speakers
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-21"
                            defaultChecked={true}
                            onClick={() => {
                              setOutsideSpeakers(!outsideSpeakers);
                            }}
                          />
                          <label
                            htmlFor="checkbox-21"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {outsideSpeakers == true ? "Yes" : ""}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                  {/* Audio System */}
                  <div
                    className="col-md-2"
                    style={{ marginLeft: 10, backgroundColor: "none" }}
                  >
                    <label htmlFor="validationCustom04" className="form-label">
                      Audio System
                    </label>
                    <div className="form-group">
                      <div className="checkbox">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-22"
                            defaultChecked={true}
                            onClick={() => {
                              setAudioSystem(!audioSystem);
                            }}
                          />
                          <label
                            htmlFor="checkbox-22"
                            className="custom-control-label"
                            style={{
                              marginTop: 3,
                              fontWeight: "500",
                              color: "#8fbd56",
                            }}
                          >
                            {audioSystem == true ? "Yes" : ""}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                </div>

                {/* Button */}
                <div className="col-12" style={{ marginTop: 30 }}>
                  <div
                    className="btn btn-default"
                    style={{ marginRight: 10 }}
                    onClick={() => {
                      setForm3State(false);
                      setForm4State(false);
                      setForm5State(false);
                      setForm1State(false);
                      setForm2State(true);
                    }}
                  >
                    Previous
                  </div>
                  <div className="btn btn-primary" onClick={form3Handler}>
                    Next
                  </div>
                </div>
              </form>
            </div>

            {/* Form 4 */}
            <div
              className="card-body"
              style={{ display: form4State == true ? "block" : "none" }}
            >
              <form
                className="row g-3 needs-validation"
                noValidate
                style={{
                  backgroundColor: "none",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h4 style={{ color: "#8fbd56" }}>Rental Period & Pricing:</h4>
                <div className="col-md-6" style={{ backgroundColor: "none" }}>
                  <table
                    id="editable-file-datatable"
                    className="table editable-table table-nowrap table-bordered table-edit wp-100"
                  >
                    <thead>
                      <tr>
                        <th>Rental Period</th>
                        <th>Rental Cost (AED)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr data-id="0">
                        <th data-field="id">Hour</th>
                        <td data-field="age">
                          <input
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                            required
                            value={perHourRentalCost}
                            onChange={(e) => {
                              setPerHourRentalCost(e.target.value);
                            }}
                            style={{
                              borderColor:
                                perHourRentalCost.trim().length < 1
                                  ? "red"
                                  : "#8fbd56",
                            }}
                          />
                        </td>
                      </tr>
                      <tr data-id="1">
                        <th data-field="id">Day</th>
                        <td data-field="age">
                          <input
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                            required
                            value={perDayRentalCost}
                            onChange={(e) => {
                              setPerDayRentalCost(e.target.value);
                            }}
                            style={{
                              borderColor:
                                perDayRentalCost.trim().length < 1
                                  ? "red"
                                  : "#8fbd56",
                            }}
                          />
                        </td>
                      </tr>
                      <tr data-id="2">
                        <th data-field="id">Weak</th>
                        <td data-field="age">
                          <input
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                            required
                            value={weeklyRentalCost}
                            onChange={(e) => {
                              setWeeklyRentalCost(e.target.value);
                            }}
                            style={{
                              borderColor:
                                weeklyRentalCost.trim().length < 1
                                  ? "red"
                                  : "#8fbd56",
                            }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Button */}
                <div className="col-12" style={{ marginTop: 30 }}>
                  <div
                    className="btn btn-default"
                    style={{ marginRight: 10 }}
                    onClick={() => {
                      setForm4State(false);
                      setForm5State(false);
                      setForm1State(false);
                      setForm2State(false);
                      setForm3State(true);
                    }}
                  >
                    Previous
                  </div>
                  <div className="btn btn-primary" onClick={form4Handler}>
                    Next
                  </div>
                </div>
              </form>
            </div>

            {/* Form 5 */}
            <div
              className="card-body"
              style={{ display: form5State == true ? "block" : "none" }}
            >
              <form
                className="row g-3 needs-validation"
                noValidate
                style={{
                  backgroundColor: "none",
                  display: "flex",
                  // flexDirection: "column",
                }}
              >
                {/* Photos Upload */}
                <div className="col-md-6">
                  <h4
                    style={{
                      color: "#8fbd56",
                      // marginBottom: -5,
                      paddingLeft: 10,
                    }}
                  >
                    Upload Yacht Photos:
                  </h4>
                  <div style={{ backgroundColor: "none" }}>
                    <div
                      className="col-md-12"
                      style={{ backgroundColor: "none" }}
                    >
                      <div className="fileBox">
                        <img src={uploadIcon} className="uploadIcon" />
                        <p className="uplaodBtnText">
                          Drag and drop a file here or click
                        </p>
                        <input
                          type="file"
                          className="customImageBtn"
                          id="validationCustom02"
                          // accept=" image/jpeg, image/png, text/html, application/zip, text/css, text/js"
                          required
                          multiple
                          onChange={onChangeImage}
                        />
                      </div>
                    </div>

                    <div
                      className="col-md-12"
                      style={{
                        marginTop: 10,
                        // backgroundColor: "red",
                        display: "flex",
                        flexWrap: "wrap",
                        // justifyContent:'center',
                      }}
                    >
                      {imagesArr.length > 0 ? (
                        imagesArr.map((item, index) => {
                          return (
                            <div
                              key={index}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <img
                                src={URL.createObjectURL(item)}
                                style={{
                                  height: 80,
                                  width: 130,
                                  borderRadius: 10,
                                  margin: 5,
                                  cursor: "pointer",
                                }}
                                alt={item.name}
                                title={item.name}
                              />
                            </div>
                          );
                        })
                      ) : (
                        <p
                          style={{
                            fontWeight: "bold",
                            color: "gray",
                            paddingLeft: 10,
                          }}
                        >
                          No file chosen
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Video Uplaod */}
                <div className="col-md-6">
                  <h4
                    style={{
                      color: "#8fbd56",
                      paddingLeft: 10,
                    }}
                  >
                    Upload Yacht Video (Optional)
                  </h4>
                  <div style={{ backgroundColor: "none" }}>
                    <div
                      className="col-md-12"
                      style={{ backgroundColor: "none" }}
                    >
                      <div className="fileBox">
                        <img src={uploadIcon} className="uploadIcon" />
                        <p className="uplaodBtnText">
                          Drag and drop a file here or click
                        </p>
                        <input
                          type="file"
                          className="customImageBtn"
                          id="validationCustom02"
                          name="video"
                          accept=".mp4, .mkv"
                          required
                          onChange={(e) => {
                            setVideoFile(e.target.files[0]);
                          }}
                        />
                      </div>
                      {videoFile == null ? (
                        <p
                          style={{
                            fontWeight: "bold",
                            color: "gray",
                            paddingLeft: 10,
                            marginTop: 10,
                          }}
                        >
                          No file chosen
                        </p>
                      ) : (
                        <p
                          style={{
                            fontWeight: "bold",
                            color: "#8fbd56",
                            paddingLeft: 10,
                            marginTop: 10,
                          }}
                        >
                          {videoFile.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Button */}
                <div
                  className="col-12"
                  style={{ marginTop: 30, marginLeft: 20 }}
                >
                  <div
                    className="btn btn-default"
                    style={{ marginRight: 10 }}
                    onClick={() => {
                      setForm5State(false);
                      setForm1State(false);
                      setForm2State(false);
                      setForm3State(false);
                      setForm4State(true);
                    }}
                  >
                    Previous
                  </div>
                  <div className="btn btn-primary" onClick={form5Handler}>
                    Submit & Finish
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

export default YachtForm;
