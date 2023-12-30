//! Imorting Required Despendencies...
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const pg = require("pg");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

//! Required Despendencies For Image Uplaod with waterMark...
const { readFile, writeFile } = require("fs/promises");
const { resolve } = require("path");
const Sharp = require("sharp");

//! Variables...
let app = express();
let port = 7833;
let role = "admin";
let secretKey = "pFK9b%P4qKg5meiB8p";
let captchaSecretKey = "6LcgZjMpAAAAAKMshFDa02afofliu2RIhPCjRuJ4";
let current_Date_Time = `${new Date().getDate()}-${
  new Date().getMonth() + 1
}-${new Date().getFullYear()}, Time: ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
let credentials = {
  userEmail: "officemailforworking@gmail.com",
  userPassword: "jeyk ulkz kymu rlkg",
};

//! For saving image into folder by ID...
let carBrandDataID;
let citiesDataID;
let packagesDataID;
let carDealerDataID;
let carDetailsDataID;
let yachtDetailsDataID;
let userDetailsDataID;

//! Console for running backend server...
console.log(`Backend server is runnning successfully at: ${current_Date_Time}`);

//! Middlewares...
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log(`Request came: ${req.body}`);
  next();
});

//! Importing DataBase Schema...
const db = require("./models");
const {
  CarBrands,
  CarTypes,
  Cities,
  Packages,
  Faq,
  CarDealers,
  PackagesDetails,
  CarFeatures,
  CarDetails,
  CityArea,
  Customer,
  User,
  YachtDetails,
} = require("./models");

//*---------------------------------//*

//! Creating / Api...
app.get("/", (req, res) => {
  return res.status(200).send({
    status: true,
    message: "Get Api is running successfully",
  });
});

//*---------------------------------//*

//! Image uplaod destination or storage...
const carBrandUploads = multer({ dest: "../public/uploads/carBrandImages/" });
const citiesUploads = multer({ dest: "../public/uploads/citiesImages/" });
const packagesUploads = multer({ dest: "../public/uploads/packagesImages/" });
const carDealerUploads = multer({ dest: "../public/uploads/carDealerImages/" });
const carDetailsUpload = multer({
  dest: "../public/uploads/carDetailsPhotos/",
});
const yachtDetailsUpload = multer({
  dest: "../public/uploads/yachtPhotos/",
});
const userUploads = multer({ dest: "../public/uploads/userProfileImages/" });

//*---------------------------------//*

//! Creating Car Brand Post Api...
app.post("/api/post/data/carBrands", (req, res) => {
  let { carBrandName, status } = req.body;

  if (!carBrandName || !status) {
    return res.status(400).send({
      status: false,
      message: "All fields are required",
    });
  } else {
    CarBrands.create({
      brandName: carBrandName,
      isActive: status,
    })
      .then((success) => {
        carBrandDataID = success.dataValues.id;

        console.log("Car Brands data is added successfully in dataBase");
        return res.status(200).send({
          status: true,
          message: "Car Brands data is added successfully in dataBase",
        });
      })
      .catch((error) => {
        console.log("Failed while adding Car Brand data in dataBase: ", error);
        return res.status(500).send({
          status: false,
          message: "Failed while adding Car Brand data in dataBase",
        });
      });
  }
});

//! Creating Car Brand Get Api...
app.get("/api/get/data/carBrands", (req, res) => {
  CarBrands.findAll()
    .then((success) => {
      if (success) {
        console.log("All CarBrands data fetch successfully from dataBase");
        return res.status(200).send({
          status: true,
          message: "All CarBrands data fetch successfully from dataBase",
          data: success,
        });
      }
    })
    .catch((err) => {
      console.log(
        "Something went wrong while fetching all CarBrands data from dataBase",
        err
      );
      return res.status(500).send({
        status: false,
        message:
          "Something went wrong while fetching all CarBrands data from dataBase",
      });
    });
});

//! Creating Car Brand PUT Api...
app.put("/api/put/data/carBrands/update/byId", (req, res) => {
  let { carBrandName, status, id } = req.body;

  if (!carBrandName || !status || !id) {
    return res.status(400).send({
      status: false,
      message: "All fields are required",
    });
  } else {
    CarBrands.update(
      {
        brandName: carBrandName,
        isActive: status,
      },
      { where: { id: id } }
    )
      .then((success) => {
        carBrandDataID = id;

        console.log("Car Brands data is updated successfully in dataBase");
        return res.status(200).send({
          status: true,
          message: "Car Brands data is updated successfully in dataBase",
        });
      })
      .catch((error) => {
        console.log(
          "Failed while updating Car Brand data in dataBase: ",
          error
        );
        return res.status(500).send({
          status: false,
          message: "Failed while updating Car Brand data in dataBase",
        });
      });
  }
});

//! Creating Car Brand Delete Api...
app.delete("/api/delete/data/carBrands/row/byId", (req, res) => {
  let { id, logo } = req.body;

  if (!id || !logo) {
    return res.status(400).send({
      status: false,
      message: "Row ID not found",
    });
  } else {
    CarBrands.destroy({ where: { id: id } })
      .then((success) => {
        //! Also deleting image from folder...
        const imgPath = `../public/uploads/carBrandImages/${logo}`;

        fs.unlink(imgPath, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Row deleted successfully");
            return res.status(200).send({
              status: true,
              message: "Row Deleted Successfully",
            });
          }
        });
      })
      .catch((err) => {
        console.log("Something went wrong while deleting row: ", err);
        return res.status(500).send({
          status: false,
          message: "Something went wrong while deleting row",
        });
      });
  }
});

//! Creating Api for saving Car Brands Images with waterMarks into car brands images folder...
app.post(
  "/api/upload/image/carBrands",
  carBrandUploads.single("file"),
  async (req, res, next) => {
    if (!!req.file) {
      const img = Sharp(await readFile(req.file.path))
        .resize(800)
        // .composite([
        //   {
        //     input: await readFile(resolve("./watermark/logo.png")),
        //     center: 0,
        //   },
        // ])
        .png()
        .toBuffer();

      const fileName = `${carBrandDataID}.png`;

      await writeFile(
        resolve(`../public/uploads/carBrandImages/${fileName}`),
        await img
      );

      //! Saving image name in dataBase...
      CarBrands.update(
        {
          logo: fileName,
        },
        { where: { id: carBrandDataID } }
      );

      return res.status(200).send({
        status: true,
        message: "Image Uploaded successfully into folder & dataBase",
      });
    } else {
      next(new Error("No file found"));
    }
  }
);

//*---------------------------------//*

//! Creating Car Type Post Api...
app.post("/api/post/data/carTypes", (req, res) => {
  let { carTypeName, typeAbbrevation, status } = req.body;

  if (!carTypeName || !typeAbbrevation || !status) {
    return res.status(400).send({
      status: false,
      message: "All fields are required",
    });
  } else {
    CarTypes.create({
      carType: carTypeName,
      abbrevation: typeAbbrevation,
      isActive: status,
    })
      .then((success) => {
        console.log("Car Types data is added successfully in dataBase");
        return res.status(200).send({
          status: true,
          message: "Car Types data is added successfully in dataBase",
        });
      })
      .catch((error) => {
        console.log("Failed while adding Car Type data in dataBase: ", error);
        return res.status(500).send({
          status: false,
          message: "Failed while adding Car Type data in dataBase",
        });
      });
  }
});

//! Creating Car Type Get Api...
app.get("/api/get/data/carTypes", (req, res) => {
  CarTypes.findAll()
    .then((success) => {
      if (success) {
        console.log("All CarTypes data fetch successfully from dataBase");
        return res.status(200).send({
          status: true,
          message: "All CarTypes data fetch successfully from dataBase",
          data: success,
        });
      }
    })
    .catch((err) => {
      console.log(
        "Something went wrong while fetching all CarTypes data from dataBase",
        err
      );
      return res.status(500).send({
        status: false,
        message:
          "Something went wrong while fetching all CarTypes data from dataBase",
      });
    });
});

//! Creating Car Type PUT Api...
app.put("/api/put/data/carTypes/update/byId", (req, res) => {
  let { carTypeName, typeAbbrevation, status, id } = req.body;

  if (!carTypeName || !typeAbbrevation || !status || !id) {
    return res.status(400).send({
      status: false,
      message: "All fields are required",
    });
  } else {
    CarTypes.update(
      { carType: carTypeName, abbrevation: typeAbbrevation, isActive: status },
      { where: { id: id } }
    )
      .then((success) => {
        console.log("Car Types data is updated successfully in dataBase");
        return res.status(200).send({
          status: true,
          message: "Car Types data is updated successfully in dataBase",
        });
      })
      .catch((error) => {
        console.log("Failed while updating Car Type data in dataBase: ", error);
        return res.status(500).send({
          status: false,
          message: "Failed while updating Car Type data in dataBase",
        });
      });
  }
});

//! Creating Car Type Delete Api...
app.delete("/api/delete/data/carTypes/row/byId", (req, res) => {
  let { id } = req.body;

  if (!id) {
    return res.status(400).send({
      status: false,
      message: "Row ID not found",
    });
  } else {
    CarTypes.destroy({ where: { id: id } })
      .then((success) => {
        console.log("Row deleted successfully");
        return res.status(200).send({
          status: true,
          message: "Row Deleted Successfully",
        });
      })
      .catch((err) => {
        console.log("Something went wrong while deleting row: ", err);
        return res.status(500).send({
          status: false,
          message: "Something went wrong while deleting row",
        });
      });
  }
});

//*---------------------------------//*

//! Creating Cities Post Api...
app.post("/api/post/data/cities", (req, res) => {
  let { cityName, status } = req.body;

  if (!cityName || !status) {
    return res.status(400).send({
      status: false,
      message: "All fields are required",
    });
  } else {
    Cities.create({
      cityName: cityName,
      isActive: status,
    })
      .then((success) => {
        citiesDataID = success.dataValues.id;

        console.log("Cities data is added successfully in dataBase");
        return res.status(200).send({
          status: true,
          message: "Cities data is added successfully in dataBase",
        });
      })
      .catch((error) => {
        console.log("Failed while adding Cities data in dataBase: ", error);
        return res.status(500).send({
          status: false,
          message: "Failed while adding Cities data in dataBase",
        });
      });
  }
});

//! Creating Cities Get Api...
app.get("/api/get/data/cities", (req, res) => {
  Cities.findAll()
    .then((success) => {
      if (success) {
        console.log("All Cities data fetch successfully from dataBase");
        return res.status(200).send({
          status: true,
          message: "All Cities data fetch successfully from dataBase",
          data: success,
        });
      }
    })
    .catch((err) => {
      console.log(
        "Something went wrong while fetching all Cities data from dataBase",
        err
      );
      return res.status(500).send({
        status: false,
        message:
          "Something went wrong while fetching all Cities data from dataBase",
      });
    });
});

//! Creating Cities PUT Api...
app.put("/api/put/data/cities/update/byId", (req, res) => {
  let { cityName, status, id } = req.body;

  if (!cityName || !status || !id) {
    return res.status(400).send({
      status: false,
      message: "All fields are required",
    });
  } else {
    Cities.update(
      { cityName: cityName, isActive: status },
      { where: { id: id } }
    )
      .then((success) => {
        citiesDataID = id;

        console.log("Cities data is updated successfully in dataBase");
        return res.status(200).send({
          status: true,
          message: "Cities data is updated successfully in dataBase",
        });
      })
      .catch((error) => {
        console.log("Failed while updating Cities data in dataBase: ", error);
        return res.status(500).send({
          status: false,
          message: "Failed while updating Cities data in dataBase",
        });
      });
  }
});

//! Creating Cities Delete Api...
app.delete("/api/delete/data/cities/row/byId", (req, res) => {
  let { id, picture } = req.body;

  if (!id || !picture) {
    return res.status(400).send({
      status: false,
      message: "Row ID not found",
    });
  } else {
    Cities.destroy({ where: { id: id } })
      .then((success) => {
        //! Also deleting image from folder...
        const imgPath = `../public/uploads/citiesImages/${picture}`;

        fs.unlink(imgPath, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Row deleted successfully");
            return res.status(200).send({
              status: true,
              message: "Row Deleted Successfully",
            });
          }
        });
      })
      .catch((err) => {
        console.log("Something went wrong while deleting row: ", err);
        return res.status(500).send({
          status: false,
          message: "Something went wrong while deleting row",
        });
      });
  }
});

//! Creating Api for saving cities Images with waterMarks into cities images folder...
app.post(
  "/api/upload/image/cities",
  citiesUploads.single("file"),
  async (req, res, next) => {
    if (!!req.file) {
      const img = Sharp(await readFile(req.file.path))
        .resize(800)
        .png()
        .toBuffer();

      const fileName = `${citiesDataID}.png`;

      await writeFile(
        resolve(`../public/uploads/citiesImages/${fileName}`),
        await img
      );

      //! Saving image name in dataBase...
      Cities.update(
        {
          pictureUrl: fileName,
        },
        { where: { id: citiesDataID } }
      );

      return res.status(200).send({
        status: true,
        message: "Image Uploaded successfully into folder",
      });
    } else {
      next(new Error("No file found"));
    }
  }
);

//*---------------------------------//*

//! Creating Packages Post Api...
app.post("/api/post/data/packages", (req, res) => {
  let {
    packageName,
    status,
    currency,
    sellPrice,
    offerPrice,
    description,
    carLimit,
    verified,
    featured,
  } = req.body;

  if (
    !packageName ||
    !status ||
    !currency ||
    !sellPrice ||
    !offerPrice ||
    !description ||
    !carLimit ||
    !verified ||
    !featured
  ) {
    return res.status(400).send({
      status: false,
      message: "All fields are required",
    });
  } else {
    Packages.create({
      packageName: packageName,
      isActive: status,
      currencyType: currency,
      packageSellPrice: sellPrice,
      packageOfferPrice: offerPrice,
      packageDescription: description,
      carLimit: carLimit,
      verified: verified,
      featured: featured,
    })
      .then((success) => {
        packagesDataID = success.dataValues.id;

        console.log("Packages data is added successfully in dataBase");
        return res.status(200).send({
          status: true,
          message: "Packages data is added successfully in dataBase",
        });
      })
      .catch((error) => {
        console.log("Failed while adding Packages data in dataBase: ", error);
        return res.status(500).send({
          status: false,
          message: "Failed while adding Packages data in dataBase",
        });
      });
  }
});

//! Creating Packages Get Api...
app.get("/api/get/data/packages", (req, res) => {
  Packages.findAll()
    .then((success) => {
      if (success) {
        console.log("All Packages data fetch successfully from dataBase");
        return res.status(200).send({
          status: true,
          message: "All Packages data fetch successfully from dataBase",
          data: success,
        });
      }
    })
    .catch((err) => {
      console.log(
        "Something went wrong while fetching all Packages data from dataBase",
        err
      );
      return res.status(500).send({
        status: false,
        message:
          "Something went wrong while fetching all Packages data from dataBase",
      });
    });
});

//! Creating Packages POST Api foe fetching data By ID...
app.post("/api/get/data/packages/by/id", (req, res) => {
  let { id } = req.body;
  Packages.findOne({ where: { id: id } })
    .then((success) => {
      if (success) {
        console.log("Packages data fetch successfully by ID from dataBase");
        return res.status(200).send({
          status: true,
          message: "Packages data fetch successfully by ID from dataBase",
          data: success,
        });
      }
    })
    .catch((err) => {
      console.log(
        "Something went wrong while fetching Packages data from dataBase",
        err
      );
      return res.status(500).send({
        status: false,
        message:
          "Something went wrong while fetching Packages data from dataBase",
      });
    });
});

//! Creating Packages PUT Api...
app.put("/api/put/data/packages/update/byId", (req, res) => {
  let {
    packageName,
    status,
    currency,
    sellPrice,
    offerPrice,
    description,
    carLimit,
    verified,
    featured,
    id,
  } = req.body;

  if (
    !packageName ||
    !status ||
    !currency ||
    !sellPrice ||
    !offerPrice ||
    !description ||
    !carLimit ||
    !verified ||
    !featured ||
    !id
  ) {
    return res.status(400).send({
      status: false,
      message: "All fields are required",
    });
  } else {
    Packages.update(
      {
        packageName: packageName,
        isActive: status,
        currencyType: currency,
        packageSellPrice: sellPrice,
        packageOfferPrice: offerPrice,
        packageDescription: description,
        carLimit: carLimit,
        verified: verified,
        featured: featured,
      },
      { where: { id: id } }
    )
      .then((success) => {
        packagesDataID = id;

        console.log("Package data is updated successfully in dataBase");
        return res.status(200).send({
          status: true,
          message: "Package data is updated successfully in dataBase",
        });
      })
      .catch((error) => {
        console.log("Failed while updating package data in dataBase: ", error);
        return res.status(500).send({
          status: false,
          message: "Failed while updating package data in dataBase",
        });
      });
  }
});

//! Creating Packages Delete Api...
app.delete("/api/delete/data/packages/row/byId", (req, res) => {
  let { id, logo } = req.body;

  if (!id || !logo) {
    return res.status(400).send({
      status: false,
      message: "Row ID not found",
    });
  } else {
    Packages.destroy({ where: { id: id } })
      .then((success) => {
        //! Also deleting image from folder...
        const imgPath = `../public/uploads/packagesImages/${logo}`;

        fs.unlink(imgPath, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Row deleted successfully");
            return res.status(200).send({
              status: true,
              message: "Row Deleted Successfully",
            });
          }
        });
      })
      .catch((err) => {
        console.log("Something went wrong while deleting row: ", err);
        return res.status(500).send({
          status: false,
          message: "Something went wrong while deleting row",
        });
      });
  }
});

//! Creating Api for saving packages Images with waterMarks into package images folder...
app.post(
  "/api/upload/image/packages",
  packagesUploads.single("file"),
  async (req, res, next) => {
    if (!!req.file) {
      const img = Sharp(await readFile(req.file.path))
        .resize(800)
        .png()
        .toBuffer();

      const fileName = `${packagesDataID}.png`;

      await writeFile(
        resolve(`../public/uploads/packagesImages/${fileName}`),
        await img
      );

      //! Saving image name in dataBase...
      Packages.update(
        {
          logoUrl: fileName,
        },
        { where: { id: packagesDataID } }
      );

      return res.status(200).send({
        status: true,
        message: "Image Uploaded successfully into folder",
      });
    } else {
      next(new Error("No file found"));
    }
  }
);

//*---------------------------------//*

//! Creating FAQ Post Api...
app.post("/api/post/data/fAQ", (req, res) => {
  let { faqHeading, faqType, faqDescription, status } = req.body;

  if (!faqHeading || !faqType || !faqDescription || !status) {
    return res.status(400).send({
      status: false,
      message: "All fields are required",
    });
  } else {
    Faq.create({
      faqHeading: faqHeading,
      faqType: faqType,
      faqDescription: faqDescription,
      isActive: status,
    })
      .then((success) => {
        console.log("Faq data is added successfully in dataBase");
        return res.status(200).send({
          status: true,
          message: "Faq data is added successfully in dataBase",
        });
      })
      .catch((error) => {
        console.log("Failed while adding Faq data in dataBase: ", error);
        return res.status(500).send({
          status: false,
          message: "Failed while adding Faq data in dataBase",
        });
      });
  }
});

//! Creating FAQ Get Api...
app.get("/api/get/data/fAQ", (req, res) => {
  Faq.findAll()
    .then((success) => {
      if (success) {
        console.log("All Faq data fetch successfully from dataBase");
        return res.status(200).send({
          status: true,
          message: "All Faq data fetch successfully from dataBase",
          data: success,
        });
      }
    })
    .catch((err) => {
      console.log(
        "Something went wrong while fetching all Faq data from dataBase",
        err
      );
      return res.status(500).send({
        status: false,
        message:
          "Something went wrong while fetching all Faq data from dataBase",
      });
    });
});

//! Creating FAQ PUT Api...
app.put("/api/put/data/fAQ/update/byId", (req, res) => {
  let { faqHeading, faqType, faqDescription, status, id } = req.body;

  if (!faqHeading || !faqType || !faqDescription || !status || !id) {
    return res.status(400).send({
      status: false,
      message: "All fields are required",
    });
  } else {
    Faq.update(
      {
        faqHeading: faqHeading,
        faqType: faqType,
        faqDescription: faqDescription,
        isActive: status,
      },
      { where: { id: id } }
    )
      .then((success) => {
        console.log("Faq data is updated successfully in dataBase");
        return res.status(200).send({
          status: true,
          message: "Faq data is updated successfully in dataBase",
        });
      })
      .catch((error) => {
        console.log("Failed while updating Faq data in dataBase: ", error);
        return res.status(500).send({
          status: false,
          message: "Failed while updating Faq data in dataBase",
        });
      });
  }
});

//! Creating FAQ Delete Api...
app.delete("/api/delete/data/fAQ/row/byId", (req, res) => {
  let { id } = req.body;

  if (!id) {
    return res.status(400).send({
      status: false,
      message: "Row ID not found",
    });
  } else {
    Faq.destroy({ where: { id: id } })
      .then((success) => {
        console.log("Row deleted successfully");
        return res.status(200).send({
          status: true,
          message: "Row Deleted Successfully",
        });
      })
      .catch((err) => {
        console.log("Something went wrong while deleting row: ", err);
        return res.status(500).send({
          status: false,
          message: "Something went wrong while deleting row",
        });
      });
  }
});

//*---------------------------------//*

//! Creating Car Dealers Post Api...
app.post("/api/post/data/carDealers", (req, res) => {
  let {
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
  } = req.body;

  if (
    !dealerName ||
    !whatsAppNumber ||
    !contactNumber ||
    !emailAddress ||
    !nationality ||
    !packageType ||
    !address ||
    !dateOfBirth ||
    !emiratesId ||
    !licenseNumber ||
    !vatNumber ||
    !latitude ||
    !longitude ||
    !expiryDate ||
    !cities ||
    !dealerDescription
  ) {
    return res.status(400).send({
      status: false,
      message: "All fields are required",
    });
  } else {
    CarDealers.create({
      dealerName: dealerName,
      whatsAppNumber: whatsAppNumber,
      contactNumber: contactNumber,
      emailAddress: emailAddress,
      nationality: nationality,
      packageType: packageType,
      address: address,
      dateOfBirth: dateOfBirth,
      emiratesId: emiratesId,
      licenseNumber: licenseNumber,
      vatNumber: vatNumber,
      latitude: latitude,
      longitude: longitude,
      expiryDate: expiryDate,
      cities: cities,
      description: dealerDescription,
      facebookUrl: faceBookUrl,
      instagramUrl: instagramUrl,
      twitterUrl: twitterUrl,
      youtubeUrl: youtubeUrl,
      linkedinUrl: linkedinUrl,
    })
      .then((success) => {
        carDealerDataID = success.dataValues.id;

        console.log("Car Dealer data is added successfully in dataBase");
        return res.status(200).send({
          status: true,
          message: "Car Dealer data is added successfully in dataBase",
        });
      })
      .catch((error) => {
        console.log("Failed while adding Car Dealer data in dataBase: ", error);
        return res.status(500).send({
          status: false,
          message: "Failed while adding Car Dealer data in dataBase",
        });
      });
  }
});

//! Creating Car Dealers Get Api...
app.get("/api/get/data/carDealers", (req, res) => {
  CarDealers.findAll()
    .then((success) => {
      if (success) {
        console.log("All Car Dealers data fetch successfully from dataBase");
        return res.status(200).send({
          status: true,
          message: "All Car Dealers data fetch successfully from dataBase",
          data: success,
        });
      }
    })
    .catch((err) => {
      console.log(
        "Something went wrong while fetching all Car Dealers data from dataBase",
        err
      );
      return res.status(500).send({
        status: false,
        message:
          "Something went wrong while fetching all Car Dealers data from dataBase",
      });
    });
});

//! Creating Car Dealers PUT Api...
app.put("/api/put/data/carDealers/update/byId", (req, res) => {
  let {
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
    id,
  } = req.body;

  if (
    !dealerName ||
    !whatsAppNumber ||
    !contactNumber ||
    !emailAddress ||
    !nationality ||
    !packageType ||
    !address ||
    !dateOfBirth ||
    !emiratesId ||
    !licenseNumber ||
    !vatNumber ||
    !latitude ||
    !longitude ||
    !expiryDate ||
    !cities ||
    !dealerDescription ||
    !id
  ) {
    return res.status(400).send({
      status: false,
      message: "All fields are required",
    });
  } else {
    CarDealers.update(
      {
        dealerName: dealerName,
        whatsAppNumber: whatsAppNumber,
        contactNumber: contactNumber,
        emailAddress: emailAddress,
        nationality: nationality,
        packageType: packageType,
        address: address,
        dateOfBirth: dateOfBirth,
        emiratesId: emiratesId,
        licenseNumber: licenseNumber,
        vatNumber: vatNumber,
        latitude: latitude,
        longitude: longitude,
        expiryDate: expiryDate,
        cities: cities,
        description: dealerDescription,
        facebookUrl: faceBookUrl,
        instagramUrl: instagramUrl,
        twitterUrl: twitterUrl,
        youtubeUrl: youtubeUrl,
        linkedinUrl: linkedinUrl,
      },
      { where: { id: id } }
    )
      .then((success) => {
        carDealerDataID = id;

        console.log("Car Dealer data is updated successfully in dataBase");
        return res.status(200).send({
          status: true,
          message: "Car Dealer data is updated successfully in dataBase",
        });
      })
      .catch((error) => {
        console.log(
          "Failed while updating Car Dealer data in dataBase: ",
          error
        );
        return res.status(500).send({
          status: false,
          message: "Failed while updating Car Dealer data in dataBase",
        });
      });
  }
});

//! Creating Car Dealers Delete Api...
app.delete("/api/delete/data/carDealers/row/byId", (req, res) => {
  let { id, image, vatDocs, ejariDocs, insuranceDocs, idCardDocs, otherDocs } =
    req.body;

  if (
    !id ||
    !image ||
    !vatDocs ||
    !ejariDocs ||
    !insuranceDocs ||
    !idCardDocs
  ) {
    return res.status(400).send({
      status: false,
      message: "Row ID not found",
    });
  } else {
    CarDealers.destroy({ where: { id: id } })
      .then((success) => {
        let documentNameArray = [];
        documentNameArray.push(vatDocs);
        documentNameArray.push(ejariDocs);
        documentNameArray.push(insuranceDocs);
        documentNameArray.push(idCardDocs);

        //! Also deleting image from folder...
        const imgPath = `../public/uploads/carDealerImages/${image}`;

        fs.unlink(imgPath, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Row deleted successfully");
            return res.status(200).send({
              status: true,
              message: "Row Deleted Successfully",
            });
          }
        });

        //! Deleting all dealer documents pdf from folder after successfully deleting from database...
        for (let i = 0; i < documentNameArray.length; i++) {
          // console.log(documentNameArray[i]);

          const pdfPath = `../public/uploads/pdf/carDealer/${documentNameArray[i]}`;

          fs.unlink(pdfPath, (err) => {
            if (err) {
              console.log(err);
            } else {
              if (otherDocs !== null) {
                const otherDocsPdfPath = `../public/uploads/pdf/carDealer/${otherDocs}`;

                fs.unlink(otherDocsPdfPath, (err) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("Other document file deleted successfully");
                    return res.status(200).send({
                      status: true,
                      message: "Other document file deleted successfully",
                    });
                  }
                });
              } else {
                // console.log('no other documents file found');
              }
            }
          });
        }
      })
      .catch((err) => {
        console.log("Something went wrong while deleting row: ", err);
        return res.status(500).send({
          status: false,
          message: "Something went wrong while deleting row",
        });
      });
  }
});

// //! Creating Api for saving Car dealer Images with waterMarks into car dealer images folder...
app.post(
  "/api/upload/image/carDealers",
  carDealerUploads.single("file"),
  async (req, res, next) => {
    if (!!req.file) {
      const img = Sharp(await readFile(req.file.path))
        .resize(800)
        .png()
        .toBuffer();

      const fileName = `${carDealerDataID}.png`;

      await writeFile(
        resolve(`../public/uploads/carDealerImages/${fileName}`),
        await img
      );

      //! Saving image name in dataBase...
      CarDealers.update(
        {
          image: fileName,
        },
        { where: { id: carDealerDataID } }
      );

      return res.status(200).send({
        status: true,
        message: "Image Uploaded successfully into folder",
      });
    } else {
      next(new Error("No file found"));
    }
  }
);

//! PDF UPLOAADING...
//*---------------------------------//*

//! VAT PDF Uploading Configuration & saving into folder...
const vatPDFStorage = multer.diskStorage({
  destination: "../public/uploads/pdf/carDealer/",
  filename: (req, file, cb) => {
    cb(null, `vat-${carDealerDataID}${path.extname(file.originalname)}`);
  },
});
const uploadVatPDF = multer({ storage: vatPDFStorage });

// ! Creating Api for saving pdf into folder...
app.post(
  "/api/upload/pdf/carDetails/vatPdf",
  uploadVatPDF.single("vatFile"),
  (req, res) => {
    if (req.file) {
      if (carDealerDataID) {
        //! Saving pdf name in dataBase...
        CarDealers.update(
          {
            dealerVatDoc: `vat-${carDealerDataID}${path.extname(
              req.file.originalname
            )}`,
          },
          { where: { id: carDealerDataID } }
        );

        return res.status(200).send({
          status: true,
          message:
            "VAT PDF Uploaded successfully into folder & the name of the pdf saved in dataBase",
        });
      }
    }
  }
);
//?
//! EJARI PDF Uploading Configuration & saving into folder...
const ejariPDFStorage = multer.diskStorage({
  destination: "../public/uploads/pdf/carDealer/",
  filename: (req, file, cb) => {
    cb(null, `ejari-${carDealerDataID}${path.extname(file.originalname)}`);
  },
});
const uploadEjariPDF = multer({ storage: ejariPDFStorage });

// ! Creating Api for saving pdf into folder...
app.post(
  "/api/upload/pdf/carDetails/ejariPdf",
  uploadEjariPDF.single("ejariFile"),
  (req, res) => {
    if (req.file) {
      if (carDealerDataID) {
        //! Saving pdf name in dataBase...
        CarDealers.update(
          {
            dealerEjariDoc: `ejari-${carDealerDataID}${path.extname(
              req.file.originalname
            )}`,
          },
          { where: { id: carDealerDataID } }
        );

        return res.status(200).send({
          status: true,
          message:
            "EJARI PDF Uploaded successfully into folder & the name of the pdf saved in dataBase",
        });
      }
    }
  }
);
//?
//! INSURANCE PDF Uploading Configuration & saving into folder...
const insurancePDFStorage = multer.diskStorage({
  destination: "../public/uploads/pdf/carDealer/",
  filename: (req, file, cb) => {
    cb(null, `insurance-${carDealerDataID}${path.extname(file.originalname)}`);
  },
});
const uploadInsurancePdf = multer({ storage: insurancePDFStorage });

// ! Creating Api for saving pdf into folder...
app.post(
  "/api/upload/pdf/carDetails/insurancePdf",
  uploadInsurancePdf.single("insuranceFile"),
  (req, res) => {
    if (req.file) {
      if (carDealerDataID) {
        //! Saving pdf name in dataBase...
        CarDealers.update(
          {
            dealerInsuranceDoc: `insurance-${carDealerDataID}${path.extname(
              req.file.originalname
            )}`,
          },
          { where: { id: carDealerDataID } }
        );

        return res.status(200).send({
          status: true,
          message:
            "INSURANCE PDF Uploaded successfully into folder & the name of the pdf saved in dataBase",
        });
      }
    }
  }
);
//?
//! ID CARD PDF Uploading Configuration & saving into folder...
const idCardPDFStorage = multer.diskStorage({
  destination: "../public/uploads/pdf/carDealer/",
  filename: (req, file, cb) => {
    cb(null, `idCard-${carDealerDataID}${path.extname(file.originalname)}`);
  },
});
const uploadIdCardPdf = multer({ storage: idCardPDFStorage });

// ! Creating Api for saving pdf into folder...
app.post(
  "/api/upload/pdf/carDetails/idCardPdf",
  uploadIdCardPdf.single("idCardFile"),
  (req, res) => {
    if (req.file) {
      if (carDealerDataID) {
        //! Saving pdf name in dataBase...
        CarDealers.update(
          {
            dealerIdCard: `idCard-${carDealerDataID}${path.extname(
              req.file.originalname
            )}`,
          },
          { where: { id: carDealerDataID } }
        );

        return res.status(200).send({
          status: true,
          message:
            "ID CARD PDF Uploaded successfully into folder & the name of the pdf saved in dataBase",
        });
      }
    }
  }
);
//?

//*---------------------------------//*
//! PDF UPLOADING END...

//! Creating Package Details Post Api...
app.post("/api/post/data/packagesDetails", (req, res) => {
  let { packageType, packageFeatures } = req.body;

  if (!packageType || !packageFeatures) {
    return res.status(400).send({
      status: false,
      message: "All fields are required",
    });
  } else {
    PackagesDetails.create({
      packageType: packageType,
      packageFeature: packageFeatures,
    })
      .then((success) => {
        console.log("Package Details data is added successfully in dataBase");
        return res.status(200).send({
          status: true,
          message: "Package Details data is added successfully in dataBase",
        });
      })
      .catch((error) => {
        console.log(
          "Failed while adding package details data in dataBase: ",
          error
        );
        return res.status(500).send({
          status: false,
          message: "Failed while adding package details data in dataBase",
        });
      });
  }
});

//! Creating Package Details Get Api...
app.get("/api/get/data/packagesDetails", (req, res) => {
  PackagesDetails.findAll()
    .then((success) => {
      if (success) {
        console.log(
          "All Packages Details data fetch successfully from dataBase"
        );
        return res.status(200).send({
          status: true,
          message: "All Packages Details data fetch successfully from dataBase",
          data: success,
        });
      }
    })
    .catch((err) => {
      console.log(
        "Something went wrong while fetching all Packages Details data from dataBase",
        err
      );
      return res.status(500).send({
        status: false,
        message:
          "Something went wrong while fetching all Packages Details data from dataBase",
      });
    });
});

//! Creating Package Details PUT Api...
app.put("/api/put/data/packagesDetails/update/byId", (req, res) => {
  let { packageType, packageFeatures, id } = req.body;

  if (!packageType || !packageFeatures || !id) {
    return res.status(400).send({
      status: false,
      message: "All fields are required",
    });
  } else {
    PackagesDetails.update(
      { packageType: packageType, packageFeature: packageFeatures },
      { where: { id: id } }
    )
      .then((success) => {
        console.log(
          "Packages Details data is updated successfully in dataBase"
        );
        return res.status(200).send({
          status: true,
          message: "Packages Details data is updated successfully in dataBase",
        });
      })
      .catch((error) => {
        console.log(
          "Failed while updating packages details data in dataBase: ",
          error
        );
        return res.status(500).send({
          status: false,
          message: "Failed while updating packages details data in dataBase",
        });
      });
  }
});

//! Creating Package Details Delete Api...
app.delete("/api/delete/data/packagesDetails/row/byId", (req, res) => {
  let { id } = req.body;

  if (!id) {
    return res.status(400).send({
      status: false,
      message: "Row ID not found",
    });
  } else {
    PackagesDetails.destroy({ where: { id: id } })
      .then((success) => {
        console.log("Row deleted successfully");
        return res.status(200).send({
          status: true,
          message: "Row Deleted Successfully",
        });
      })
      .catch((err) => {
        console.log("Something went wrong while deleting row: ", err);
        return res.status(500).send({
          status: false,
          message: "Something went wrong while deleting row",
        });
      });
  }
});

//*---------------------------------//*

//! Creating Car Features Post Api...
app.post("/api/post/data/carFeatures", (req, res) => {
  let { carFeature, status } = req.body;

  if (!carFeature || !status) {
    return res.status(400).send({
      status: false,
      message: "All fields are required",
    });
  } else {
    CarFeatures.create({
      carFeature: carFeature,
      isActive: status,
    })
      .then((success) => {
        console.log("Car Feature data is added successfully in dataBase");
        return res.status(200).send({
          status: true,
          message: "Car Feature data is added successfully in dataBase",
        });
      })
      .catch((error) => {
        console.log(
          "Failed while adding Car Feature data in dataBase: ",
          error
        );
        return res.status(500).send({
          status: false,
          message: "Failed while adding Car Feature data in dataBase",
        });
      });
  }
});

//! Creating Car Features Get Api...
app.get("/api/get/data/carFeatures", (req, res) => {
  CarFeatures.findAll()
    .then((success) => {
      if (success) {
        console.log("All CarFeatures data fetch successfully from dataBase");
        return res.status(200).send({
          status: true,
          message: "All CarFeatures data fetch successfully from dataBase",
          data: success,
        });
      }
    })
    .catch((err) => {
      console.log(
        "Something went wrong while fetching all CarFeatures data from dataBase",
        err
      );
      return res.status(500).send({
        status: false,
        message:
          "Something went wrong while fetching all CarFeatures data from dataBase",
      });
    });
});

//! Creating Car Features PUT Api...
app.put("/api/put/data/carFeatures/update/byId", (req, res) => {
  let { carFeature, status, id } = req.body;

  if (!carFeature || !status || !id) {
    return res.status(400).send({
      status: false,
      message: "All fields are required",
    });
  } else {
    CarFeatures.update(
      { carFeature: carFeature, isActive: status },
      { where: { id: id } }
    )
      .then((success) => {
        console.log("Car Feature data is updated successfully in dataBase");
        return res.status(200).send({
          status: true,
          message: "Car Feature data is updated successfully in dataBase",
        });
      })
      .catch((error) => {
        console.log(
          "Failed while updating Car Feature data in dataBase: ",
          error
        );
        return res.status(500).send({
          status: false,
          message: "Failed while updating Car Feature data in dataBase",
        });
      });
  }
});

//! Creating Car Features Delete Api...
app.delete("/api/delete/data/carFeatures/row/byId", (req, res) => {
  let { id } = req.body;

  if (!id) {
    return res.status(400).send({
      status: false,
      message: "Row ID not found",
    });
  } else {
    CarFeatures.destroy({ where: { id: id } })
      .then((success) => {
        console.log("Row deleted successfully");
        return res.status(200).send({
          status: true,
          message: "Row Deleted Successfully",
        });
      })
      .catch((err) => {
        console.log("Something went wrong while deleting row: ", err);
        return res.status(500).send({
          status: false,
          message: "Something went wrong while deleting row",
        });
      });
  }
});

//*---------------------------------//*

//! Creating Car Details Post Api...
app.post("/api/post/data/carDetails", (req, res) => {
  let {
    carModelNo,
    carLicense,
    carBrandName,
    carType,
    carDealerCompanyName,
    carFeatures, // the features of the car is stored in array & the array coming with data by this name carFeatures...
    carDoors,
    carSeats,
    carLuggage,
    carFuelType,
    gccSpecs,
    autoTransmission,
    carInteriorColor,
    carExteriorColor,
    additionalMilageCharges,
    carToolsCharges,
    additionalDriverInsurance,
    insuranceType,
    perDayMilagelimit,
    perDayRentalCost,
    weeklyMilageLimit,
    weeklyRentalCost,
    monthlyMilageLimit,
    monthlyRentalCost,
    discountOffer,
    offerExpiryDate,
    minimumDriverAge,
    securityDeposit,
    refundedIn,
    status,
    carDescription,
  } = req.body;

  if (
    !carModelNo ||
    !carLicense ||
    !carBrandName ||
    !carType ||
    !carDealerCompanyName ||
    !carFeatures ||
    !carDoors ||
    !carSeats ||
    !carLuggage ||
    !carFuelType ||
    !gccSpecs ||
    !autoTransmission ||
    !carInteriorColor ||
    !carExteriorColor ||
    !additionalMilageCharges ||
    !carToolsCharges ||
    !additionalDriverInsurance ||
    !insuranceType ||
    !perDayMilagelimit ||
    !perDayRentalCost ||
    !weeklyMilageLimit ||
    !weeklyRentalCost ||
    !monthlyMilageLimit ||
    !monthlyRentalCost ||
    !discountOffer ||
    !offerExpiryDate ||
    !minimumDriverAge ||
    !securityDeposit ||
    !refundedIn ||
    !status ||
    !carDescription
  ) {
    return res.status(400).send({
      status: false,
      message: "All fields are required",
    });
  } else {
    CarDetails.create({
      carModelNo: carModelNo,
      carLicense: carLicense,
      carBrandName: carBrandName,
      carType: carType,
      carDealerCompanyName: carDealerCompanyName,
      carFeatures: carFeatures,
      carDoors: carDoors,
      carSeats: carSeats,
      carLuggage: carLuggage,
      carFuelType: carFuelType,
      gccSpecs: gccSpecs,
      autoTransmission: autoTransmission,
      carInteriorColor: carInteriorColor,
      carExteriorColor: carExteriorColor,
      additionalMilageCharges: additionalMilageCharges,
      carToolsCharges: carToolsCharges,
      additionalDriverInsurance: additionalDriverInsurance,
      insuranceType: insuranceType,
      perDayMilagelimit: perDayMilagelimit,
      perDayRentalCost: perDayRentalCost,
      weeklyMilageLimit: weeklyMilageLimit,
      weeklyRentalCost: weeklyRentalCost,
      monthlyMilageLimit: monthlyMilageLimit,
      monthlyRentalCost: monthlyRentalCost,
      discountOffer: discountOffer,
      offerExpiryDate: offerExpiryDate,
      minimumDriverAge: minimumDriverAge,
      securityDeposit: securityDeposit,
      refundedIn: refundedIn,
      isActive: status,
      description: carDescription,
    })
      .then((success) => {
        carDetailsDataID = success.dataValues.id;

        console.log("Car Details data is added successfully in dataBase");
        return res.status(200).send({
          status: true,
          message: "Car Details data is added successfully in dataBase",
        });
      })
      .catch((error) => {
        console.log(
          "Failed while adding Car Details data in dataBase: ",
          error
        );
        return res.status(500).send({
          status: false,
          message: "Failed while adding Car Details data in dataBase",
        });
      });
  }
});

//! Creating Car Details Get Api...
app.get("/api/get/data/carDetails", (req, res) => {
  CarDetails.findAll()
    .then((success) => {
      if (success) {
        console.log("All CarDetails data fetch successfully from dataBase");
        return res.status(200).send({
          status: true,
          message: "All CarDetails data fetch successfully from dataBase",
          data: success,
        });
      }
    })
    .catch((err) => {
      console.log(
        "Something went wrong while fetching all CarDetails data from dataBase",
        err
      );
      return res.status(500).send({
        status: false,
        message:
          "Something went wrong while fetching all CarDetails data from dataBase",
      });
    });
});

//! Creating Car Details PUT Api...
app.put("/api/put/data/carDetails/update/byId", (req, res) => {
  let {
    carModelNo,
    carLicense,
    carBrandName,
    carType,
    carDealerCompanyName,
    carFeatures,
    carDoors,
    carSeats,
    carLuggage,
    carFuelType,
    gccSpecs,
    autoTransmission,
    carInteriorColor,
    carExteriorColor,
    additionalMilageCharges,
    carToolsCharges,
    additionalDriverInsurance,
    insuranceType,
    perDayMilagelimit,
    perDayRentalCost,
    weeklyMilageLimit,
    weeklyRentalCost,
    monthlyMilageLimit,
    monthlyRentalCost,
    discountOffer,
    offerExpiryDate,
    minimumDriverAge,
    securityDeposit,
    refundedIn,
    status,
    carDescription,
    id,
    carPhotosData,
    carPhotosDataStatus,
  } = req.body;

  if (
    !carModelNo ||
    !carLicense ||
    !carBrandName ||
    !carType ||
    !carDealerCompanyName ||
    !carFeatures ||
    !carDoors ||
    !carSeats ||
    !carLuggage ||
    !carFuelType ||
    !gccSpecs ||
    !autoTransmission ||
    !carInteriorColor ||
    !carExteriorColor ||
    !additionalMilageCharges ||
    !carToolsCharges ||
    !additionalDriverInsurance ||
    !insuranceType ||
    !perDayMilagelimit ||
    !perDayRentalCost ||
    !weeklyMilageLimit ||
    !weeklyRentalCost ||
    !monthlyMilageLimit ||
    !monthlyRentalCost ||
    !discountOffer ||
    !offerExpiryDate ||
    !minimumDriverAge ||
    !securityDeposit ||
    !refundedIn ||
    !status ||
    !carDescription ||
    !id ||
    !carPhotosData ||
    !carPhotosDataStatus
  ) {
    return res.status(400).send({
      status: false,
      message: "All fields are required",
    });
  } else {
    CarDetails.update(
      {
        carModelNo: carModelNo,
        carLicense: carLicense,
        carBrandName: carBrandName,
        carType: carType,
        carDealerCompanyName: carDealerCompanyName,
        carFeatures: carFeatures,
        carDoors: carDoors,
        carSeats: carSeats,
        carLuggage: carLuggage,
        carFuelType: carFuelType,
        gccSpecs: gccSpecs,
        autoTransmission: autoTransmission,
        carInteriorColor: carInteriorColor,
        carExteriorColor: carExteriorColor,
        additionalMilageCharges: additionalMilageCharges,
        carToolsCharges: carToolsCharges,
        additionalDriverInsurance: additionalDriverInsurance,
        insuranceType: insuranceType,
        perDayMilagelimit: perDayMilagelimit,
        perDayRentalCost: perDayRentalCost,
        weeklyMilageLimit: weeklyMilageLimit,
        weeklyRentalCost: weeklyRentalCost,
        monthlyMilageLimit: monthlyMilageLimit,
        monthlyRentalCost: monthlyRentalCost,
        discountOffer: discountOffer,
        offerExpiryDate: offerExpiryDate,
        minimumDriverAge: minimumDriverAge,
        securityDeposit: securityDeposit,
        refundedIn: refundedIn,
        isActive: status,
        description: carDescription,
      },
      { where: { id: id } }
    )
      .then((success) => {
        carDetailsDataID = id;

        if (carPhotosDataStatus == "yes") {
          //! First i am going to delete all images related to this id & than uploading new images into folder...
          for (let i = 0; i < carPhotosData.length; i++) {
            // console.log(carPhotosData[i]);

            //! Deleting image from folder...
            const imgPath = `../public/uploads/carDetailsPhotos/${carPhotosData[i]}`;

            fs.unlink(imgPath, (err) => {
              if (err) {
                console.log(err);
              }
            });
          }
        } else {
          console.log("user not uploaded new images");
        }

        console.log("Car Details data is updated successfully in dataBase");
        return res.status(200).send({
          status: true,
          message: "Car Details data is updated successfully in dataBase",
        });
      })
      .catch((error) => {
        console.log(
          "Failed while updating Car Details data in dataBase: ",
          error
        );
        return res.status(500).send({
          status: false,
          message: "Failed while updating Car Details data in dataBase",
        });
      });
  }
});

//! Creating Car Details Delete Api...
app.delete("/api/delete/data/carDetails/row/byId", (req, res) => {
  let { id, photosArray, videoName, videoStatus } = req.body;
  if (!id || !photosArray || !videoStatus) {
    return res.status(400).send({
      status: false,
      message: "Row ID not found",
    });
  } else {
    CarDetails.destroy({ where: { id: id } })
      .then((success) => {
        for (let i = 0; i < photosArray.length; i++) {
          console.log(photosArray[i]);

          //! Also deleting image from folder...
          const imgPath = `../public/uploads/carDetailsPhotos/${photosArray[i]}`;

          fs.unlink(imgPath, (err) => {
            if (err) {
              console.log(err);
            }
          });
        }

        //! Checking video status if status == yes we will delete this item video if the status == no its means video was not upload last time so we cant delete it
        if (videoStatus == "yes") {
          //! Also deleting video form folder...
          const videoPath = `../public/uploads/videos/carDetails/${videoName}`;

          fs.unlink(videoPath, (err) => {
            if (err) {
              console.log(err);
            }
          });
        } else {
          console.log(
            "video not deleted because user not uploaded video last time"
          );
        }

        console.log("Row deleted successfully");
        return res.status(200).send({
          status: true,
          message: "Row Deleted Successfully",
        });
      })
      .catch((err) => {
        console.log("Something went wrong while deleting row: ", err);
        return res.status(500).send({
          status: false,
          message: "Something went wrong while deleting row",
        });
      });
  }
});

//! Creating Api for saving Car details Images/photos with waterMarks into car details images/photos folder...
app.post(
  "/api/upload/image/carDetails",
  carDetailsUpload.array("images"),
  async (req, res, next) => {
    let files = req.files;
    let fileNamesArr = [];
    if (!!files) {
      for (let i = 0; i < files.length; i++) {
        const image = files[i];
        // const processedImage = await sharp(image.buffer)
        const watermark = Sharp(await readFile(image.path))
          .resize(800)
          .composite([
            {
              input: await readFile(resolve("./watermark/logo.png")),
              center: 0,
            },
          ])
          .png()
          .toBuffer();

        // const fileName = `carDetails-${Date.now()}.png`;
        const fileName = `${carDetailsDataID}${i}0.png`;

        fileNamesArr.push(fileName);

        await writeFile(
          resolve(`../public/uploads/carDetailsPhotos/${fileName}`),
          await watermark
        );
      }

      //! Saving image name in dataBase...
      CarDetails.update(
        {
          carPhotosArray: fileNamesArr,
        },
        { where: { id: carDetailsDataID } }
      );

      return res.status(200).send({
        status: true,
        message: "Image Uploaded successfully into folder",
      });
    } else {
      next(new Error("No file found"));
    }
  }
);

//! Video Uploading Configuration & saving into folder...
const storage = multer.diskStorage({
  destination: "../public/uploads/videos/carDetails/",
  filename: (req, file, cb) => {
    cb(null, `${carDetailsDataID}${path.extname(file.originalname)}`);
  },
});
const uploadVideo = multer({ storage });

// ! Creating Api for saving video into folder...
app.post(
  "/api/upload/video/carDetails",
  uploadVideo.single("videoFile"),
  (req, res) => {
    // console.log("File uploaded:", req.file);

    if (req.file) {
      if (carDetailsDataID) {
        //! Saving Video name in dataBase...
        CarDetails.update(
          {
            carVideoName: `${carDetailsDataID}${path.extname(
              req.file.originalname
            )}`,
          },
          { where: { id: carDetailsDataID } }
        );

        return res.status(200).send({
          status: true,
          message:
            "Video Uploaded successfully into folder & the name of the video saved in dataBase",
        });
      }
    }
  }
);

//*---------------------------------//*

//! Creating Area Post Api...
app.post("/api/post/data/area", (req, res) => {
  let { areaName, cityName, latitude, longitude, status } = req.body;

  if (!areaName || !cityName || !status) {
    return res.status(400).send({
      status: false,
      message: "All fields are required",
    });
  } else {
    CityArea.create({
      areaName: areaName,
      cityName: cityName,
      latitude: latitude,
      longitude: longitude,
      isActive: status,
    })
      .then((success) => {
        console.log("Area data is added successfully in dataBase");
        return res.status(200).send({
          status: true,
          message: "Area data is added successfully in dataBase",
        });
      })
      .catch((error) => {
        console.log("Failed while adding Area data in dataBase: ", error);
        return res.status(500).send({
          status: false,
          message: "Failed while adding Area data in dataBase",
        });
      });
  }
});

//! Creating Area Get Api...
app.get("/api/get/data/area", (req, res) => {
  CityArea.findAll()
    .then((success) => {
      if (success) {
        console.log("All Area data fetch successfully from dataBase");
        return res.status(200).send({
          status: true,
          message: "All Area data fetch successfully from dataBase",
          data: success,
        });
      }
    })
    .catch((err) => {
      console.log(
        "Something went wrong while fetching all Area data from dataBase",
        err
      );
      return res.status(500).send({
        status: false,
        message:
          "Something went wrong while fetching all Area data from dataBase",
      });
    });
});

//! Creating Area PUT Api...
app.put("/api/put/data/area/update/byId", (req, res) => {
  let { areaName, cityName, latitude, longitude, status, id } = req.body;

  if (!areaName || !cityName || !status || !id) {
    return res.status(400).send({
      status: false,
      message: "All fields are required",
    });
  } else {
    CityArea.update(
      {
        areaName: areaName,
        cityName: cityName,
        latitude: latitude,
        longitude: longitude,
        isActive: status,
      },
      { where: { id: id } }
    )
      .then((success) => {
        console.log("Area data is updated successfully in dataBase");
        return res.status(200).send({
          status: true,
          message: "Area data is updated successfully in dataBase",
        });
      })
      .catch((error) => {
        console.log("Failed while updating Area data in dataBase: ", error);
        return res.status(500).send({
          status: false,
          message: "Failed while updating Area data in dataBase",
        });
      });
  }
});

//! Creating Area Delete Api...
app.delete("/api/delete/data/area/row/byId", (req, res) => {
  let { id } = req.body;

  if (!id) {
    return res.status(400).send({
      status: false,
      message: "Row ID not found",
    });
  } else {
    CityArea.destroy({ where: { id: id } })
      .then((success) => {
        console.log("Row deleted successfully");
        return res.status(200).send({
          status: true,
          message: "Row Deleted Successfully",
        });
      })
      .catch((err) => {
        console.log("Something went wrong while deleting row: ", err);
        return res.status(500).send({
          status: false,
          message: "Something went wrong while deleting row",
        });
      });
  }
});

//*---------------------------------//*

//! Creating Customer Post Api...
app.post("/api/post/data/customers", (req, res) => {
  let { name, email, contactNumber, whatsAppNumber, location, address } =
    req.body;

  if (
    !name ||
    !email ||
    !contactNumber ||
    !whatsAppNumber ||
    !location ||
    !address
  ) {
    return res.status(400).send({
      status: false,
      message: "All fields are required",
    });
  } else {
    Customer.create({
      customerName: name,
      customerEmail: email,
      customerContactNumber: contactNumber,
      customerWhatsAppNumber: whatsAppNumber,
      customerLocation: location,
      customerAddress: address,
    })
      .then((success) => {
        console.log("Customer data is added successfully in dataBase");
        return res.status(200).send({
          status: true,
          message: "Customer data is added successfully in dataBase",
        });
      })
      .catch((error) => {
        console.log("Failed while adding Customer data in dataBase: ", error);
        return res.status(500).send({
          status: false,
          message: "Failed while adding Customer data in dataBase",
        });
      });
  }
});

//! Creating Customer Get Api...
app.get("/api/get/data/customers", (req, res) => {
  Customer.findAll()
    .then((success) => {
      if (success) {
        console.log("All Customers data fetch successfully from dataBase");
        return res.status(200).send({
          status: true,
          message: "All Customers data fetch successfully from dataBase",
          data: success,
        });
      }
    })
    .catch((err) => {
      console.log(
        "Something went wrong while fetching all Customers data from dataBase",
        err
      );
      return res.status(500).send({
        status: false,
        message:
          "Something went wrong while fetching all Customers data from dataBase",
      });
    });
});

//! Creating Customer PUT Api...
app.put("/api/put/data/customers/update/byId", (req, res) => {
  let { name, email, contactNumber, whatsAppNumber, location, address, id } =
    req.body;

  if (
    !name ||
    !email ||
    !contactNumber ||
    !whatsAppNumber ||
    !location ||
    !address ||
    !id
  ) {
    return res.status(400).send({
      status: false,
      message: "All fields are required",
    });
  } else {
    Customer.update(
      {
        customerName: name,
        customerEmail: email,
        customerContactNumber: contactNumber,
        customerWhatsAppNumber: whatsAppNumber,
        customerLocation: location,
        customerAddress: address,
      },
      { where: { id: id } }
    )
      .then((success) => {
        console.log("Customer data is updated successfully in dataBase");
        return res.status(200).send({
          status: true,
          message: "Customer data is updated successfully in dataBase",
        });
      })
      .catch((error) => {
        console.log("Failed while updating Customer data in dataBase: ", error);
        return res.status(500).send({
          status: false,
          message: "Failed while updating Customer data in dataBase",
        });
      });
  }
});

//! Creating Customer Delete Api...
app.delete("/api/delete/data/customer/row/byId", (req, res) => {
  let { id } = req.body;

  if (!id) {
    return res.status(400).send({
      status: false,
      message: "Row ID not found",
    });
  } else {
    Customer.destroy({ where: { id: id } })
      .then((success) => {
        console.log("Row deleted successfully");
        return res.status(200).send({
          status: true,
          message: "Row Deleted Successfully",
        });
      })
      .catch((err) => {
        console.log("Something went wrong while deleting row: ", err);
        return res.status(500).send({
          status: false,
          message: "Something went wrong while deleting row",
        });
      });
  }
});

//*---------------------------------//*

//? Sign Up Api's....
//! Creating Sign-up Api...
app.post("/api/user/signup", (req, res) => {
  let {
    fullName,
    email,
    contactNumber,
    role,
    password,
    confirmPassword,
    ip,
    status,
  } = req.body;

  if (
    !fullName ||
    !email ||
    !contactNumber ||
    !role ||
    !password ||
    !confirmPassword ||
    !status
  ) {
    return res.status(400).send({
      status: false,
      message: "All fields are required",
    });
  } else {
    User.findOne({ where: { userEmail: email } })
      .then((success) => {
        if (success) {
          return res.status(400).send({
            status: false,
            message: `User already exist on this email ${email}`,
          });
        } else {
          if (password == confirmPassword) {
            //! let hashing password...
            bcrypt.genSalt(10, (err, salt) => {
              if (!err) {
                bcrypt.hash(confirmPassword, salt, (err, hashPass) => {
                  if (!err) {
                    User.create({
                      userName: fullName,
                      userEmail: email,
                      userContactNumber: contactNumber,
                      userRole: role,
                      userHashedPassword: hashPass,
                      // userToken: token,
                      userIp: ip,
                      userStatus: status,
                    })
                      .then((success) => {
                        // console.log("New user is created successfully");
                        if (success) {
                          //! Generating Token by using userID & SecretKey...
                          const token = jwt.sign(
                            { userID: success.dataValues.id },
                            secretKey,
                            { expiresIn: "5d" }
                          );

                          userDetailsDataID = success.dataValues.id;

                          try {
                            let transporter = nodemailer.createTransport({
                              service: "gmail",
                              auth: {
                                user: credentials.userEmail,
                                pass: credentials.userPassword,
                              },
                            });

                            let emailReceivingDetails = {
                              from: "Duby Drive",
                              to: email,
                              subject: "Info",
                              html: `<h2>Hello ${fullName},</h2>
                                    <p>Welcome to Duby Drive,</p>
                                    <p>Your account has been created on this email address ${email},</p>  
                                    <p>Use this email address to login your account on Duby Drive web...</b></p>`,
                            };

                            transporter.sendMail(
                              emailReceivingDetails,
                              (err) => {
                                if (err) {
                                  console.log(
                                    `Failed while sending email to user: ${err}`
                                  );
                                }
                              }
                            );

                            //! Sending email to admin for informing new user added in dataBase...
                            // let adminEmail = credentials.userEmail;
                            let adminEmail = "officemailforworking@gmail.com";
                            let sendEmailtoAdmin = {
                              from: "Duby Drive",
                              to: adminEmail,
                              subject: "New user added in dataBase",
                              html: `<h2>Dear Admin,</h2>
                                    <p>New user account has been created successfully,</p>  
                                    <h2>User Details:</h2>
                                    <p>Fullname: <b>${fullName}</b></p>
                                    <p>Email Address: <b>${email}</b></p>
                                    <p>Contact Number: <b>${contactNumber}</b></p>
                                    <p>Role: <b>${role}</b></p>
                                    <p>Password: <b>${password}</b></p>
                                    <p>Confirm Password: <b>${confirmPassword}</b></p>
                                    <p>IP: <b>${ip}</b></p>
                                    <p>Status: <b>${status}</b></p>`,
                            };

                            transporter.sendMail(sendEmailtoAdmin, (err) => {
                              if (err) {
                                console.log(`Failed while sending email`);
                              }
                            });
                          } catch (error) {
                            console.log(
                              `Something went wrong from server site while sending email to user: ${error}`
                            );
                          }

                          return res.status(201).send({
                            status: true,
                            message: "Account created successfully",
                            token: token,
                          });
                        }
                      })
                      .catch((error) => {
                        console.log(
                          `Something went wrong while creating your account: `,
                          error
                        );
                        return res.status(500).send({
                          status: false,
                          message:
                            "Something went wrong from server site while creating your account",
                        });
                      });
                  } else {
                    return res.status(400).send({
                      status: false,
                      message:
                        "Failed while securing your password please enter another password",
                    });
                  }
                });
              } else {
                return res.status(400).send({
                  status: false,
                  message:
                    "Failed while securing your password please enter another password",
                });
              }
            });
          } else {
            return res.status(400).send({
              status: false,
              message:
                "Password not match please enter same password in both fields",
            });
          }
        }
      })
      .catch((err) => {
        console.log(
          `Something went wrong while fetching user by email from database: ${err}`
        );
        return res.status(500).send({
          status: false,
          message:
            "Something went wrong while fetching user by email from database",
        });
      });
  }
});

//! Creating Api for storing user profile images into user profile images folder...
app.post(
  "/api/upload/image/user",
  userUploads.single("file"),
  async (req, res, next) => {
    if (!!req.file) {
      const img = Sharp(await readFile(req.file.path))
        .resize(800)
        .png()
        .toBuffer();

      const fileName = `${userDetailsDataID}.png`;

      await writeFile(
        resolve(`../public/uploads/userProfileImages/${fileName}`),
        await img
      );

      //! Saving image name in dataBase...
      User.update(
        {
          pictureUrl: fileName,
        },
        { where: { id: userDetailsDataID } }
      );

      return res.status(200).send({
        status: true,
        message: "Image Uploaded successfully into folder",
      });
    } else {
      next(new Error("No file found"));
    }
  }
);

//! Creating Api for fetching all users from database...
app.get("/api/get/users/all", (req, res) => {
  User.findAll({
    attributes: [
      "id",
      "userName",
      "userEmail",
      "userContactNumber",
      "userRole",
      "userIp",
      "userStatus",
      "pictureUrl",
    ],
  })
    .then((success) => {
      if (success.length > 0) {
        // console.log("All users fetched successfully from database: ", success);
        return res.status(200).send({
          status: true,
          message: "All users fetching successfully from database",
          data: success,
        });
      } else {
        console.log("No user exist on dataBase");
        return res.status(400).send({
          status: false,
          message: "No user exist in dataBase",
          data: success,
        });
      }
    })
    .catch((err) => {
      console.log("Error while fetching all users from database: ", err);
      return res.status(500).send({
        status: false,
        message:
          "Something went wrong from server site while fetcing all users from database",
      });
    });
});

//! Creating put api for updating user data...
app.put("/api/update/user/data", (req, res) => {
  let { fullName, email, role, ip, status, id } = req.body;

  if (!fullName || !email || !role || !status || !id) {
    return res.status(400).send({
      status: false,
      message: "All fields are required",
    });
  } else {
    User.findOne({ where: { userEmail: email } })
      .then((success) => {
        if (!success) {
          return res.status(400).send({
            status: false,
            message: `User not exist on this email ${email}`,
          });
        } else {
          User.update(
            {
              userName: fullName,
              userRole: role,
              userIp: ip,
              userStatus: status,
            },
            { where: { id: id } }
          )
            .then((success) => {
              if (success) {
                //! Generating Token by using userID & SecretKey...
                const token = jwt.sign({ userID: id }, secretKey, {
                  expiresIn: "5d",
                });

                userDetailsDataID = id;
                //! Here we will sending email to user by using his email...

                return res.status(200).send({
                  status: true,
                  message: "User data is updated successfully successfully",
                  token: token,
                });
              }
            })
            .catch((error) => {
              console.log(
                `Something went wrong while updating user data: `,
                error
              );
              return res.status(500).send({
                status: false,
                message:
                  "Something went wrong from server site while updating user data",
              });
            });
        }
      })
      .catch((err) => {
        console.log(
          `Something went wrong while fetching user by email from database: ${err}`
        );
        return res.status(500).send({
          status: false,
          message:
            "Something went wrong while fetching user by email from database",
        });
      });
  }
});

//! Creating User Delete Api...
app.delete("/api/delete/data/user/byId", (req, res) => {
  let { id, picture } = req.body;

  if (!id || !picture) {
    return res.status(400).send({
      status: false,
      message: "User Data not found",
    });
  } else {
    User.destroy({ where: { id: id } })
      .then((success) => {
        //! Also deleting image from folder...
        const imgPath = `../public/uploads/userProfileImages/${picture}`;

        fs.unlink(imgPath, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(
              "User Data is deleted successfully form dataBase & profile image is deleted from folder"
            );
            return res.status(200).send({
              status: true,
              message:
                "User Data is deleted successfully form dataBase & profile image is deleted from folder",
            });
          }
        });
      })
      .catch((err) => {
        console.log("Something went wrong while user data: ", err);
        return res.status(500).send({
          status: false,
          message: "Something went wrong while user data",
        });
      });
  }
});

//? Forget Password Api...
app.post("/api/search/email/for/forget/Pass", (req, res) => {
  let { email } = req.body;

  if (!email) {
    return res.status(400).send({
      status: false,
      message: "Email not found",
    });
  } else {
    User.findOne({ where: { userEmail: email } })
      .then((success) => {
        if (success.userEmail == email) {
          let userData = {
            userId: success.id,
            userContactNumber: success.userContactNumber,
          };
          return res.status(200).send({
            status: true,
            message: "User found successfully at this email",
            data: userData,
          });
        } else {
          return res.status(400).send({
            status: false,
            message: "User not exist on this email",
          });
        }
      })
      .catch((err) => {
        console.log("Error while finding user at this email: ", err);
        return res.status(500).send({
          status: false,
          message: "Failed while finding user at this email",
        });
      });
  }
});

//? Login Api's....
//! Creating sign-in Api...
app.post("/api/user/signin", (req, res) => {
  let { email, password, captchaValue } = req.body;

  if (!email || !password || !captchaValue) {
    return res.status(400).send({
      status: true,
      message: "All fields are required",
    });
  } else {
    //! Fetching Google Captcha Api...
    axios({
      url: `https://www.google.com/recaptcha/api/siteverify?secret=${captchaSecretKey}&response=${captchaValue}`,
      method: "POST",
    })
      .then(({ data }) => {
        if (data.success == true) {
          User.findOne({ where: { userEmail: email } })
            .then((success) => {
              if (!success) {
                return res.status(400).send({
                  status: false,
                  message: `User not exist on this email address: ${email}`,
                });
              } else {
                if (success.userEmail == email) {
                  //! let comparing password...
                  bcrypt.compare(
                    password,
                    success.userHashedPassword,
                    (err, result) => {
                      if (result == true) {
                        //! Generating Token by using userID & SecretKey...
                        const token = jwt.sign(
                          { userID: success.id },
                          secretKey,
                          {
                            expiresIn: "5d",
                          }
                        );

                        //! Destructing user data for sending to frontend...
                        let {
                          id,
                          pictureUrl,
                          userContactNumber,
                          userEmail,
                          userName,
                          userRole,
                        } = success;
                        return res.status(200).send({
                          status: true,
                          message: "Login successfully",
                          token: token,
                          data: {
                            id,
                            pictureUrl,
                            userContactNumber,
                            userEmail,
                            userName,
                            userRole,
                          },
                        });
                      } else {
                        return res.status(400).send({
                          status: false,
                          message: "Invalid Password",
                        });
                      }
                    }
                  );
                } else {
                  return res.status(400).send({
                    status: false,
                    message: "Failed while verifying user email",
                  });
                }
              }
            })
            .catch((err) => {
              return res.status(500).send({
                status: false,
                message:
                  "Something went wrong while fetching user from dataBase: ",
                err,
              });
            });
        }
      })
      .catch((err) => {
        console.log(
          "Something went wrong while fetcing google captcha api: ",
          err
        );
        return res.status(400).send({
          status: false,
          message: "Something went wrong while fetching google recaptcha api",
        });
      });
  }
});

//*---------------------------------//*

//! Creating Yacht Details Post Api...
app.post("/api/post/data/yachtDetails", (req, res) => {
  let {
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
  } = req.body;

  console.log("yachtName: ", yachtName);
  console.log("yachtType: ", yachtType);
  console.log("captainIncluded: ", captainIncluded);
  console.log("crewMembers: ", crewMembers);
  console.log("location: ", location);
  console.log("capacity: ", capacity);
  console.log("yachtSize: ", yachtSize);
  console.log("yachtRoom: ", yachtRoom);
  console.log("yachtOverview: ", yachtOverview);
  console.log("iceWaterAndSoftDrinks: ", iceWaterAndSoftDrinks);
  console.log("freeFuel: ", freeFuel);
  console.log("towels: ", towels);
  console.log("bbqEquipmentAndServices: ", bbqEquipmentAndServices);
  console.log("kidsWelcome: ", kidsWelcome);
  console.log("musicSystem: ", musicSystem);
  console.log("freeRefreshment: ", freeRefreshment);
  console.log("fishingEquipment: ", fishingEquipment);
  console.log("safetyEquipment: ", safetyEquipment);
  console.log("bluetooth: ", bluetooth);
  console.log("usbPort: ", usbPort);
  console.log("auxCable: ", auxCable);
  console.log("shower: ", shower);
  console.log("pillowsAndBlankets: ", pillowsAndBlankets);
  console.log("cooler: ", cooler);
  console.log("airConditioning: ", airConditioning);
  console.log("microwave: ", microwave);
  console.log("insideSpeakers: ", insideSpeakers);
  console.log("outsideSpeakers: ", outsideSpeakers);
  console.log("audioSystem: ", audioSystem);
  console.log("perHourRentalCost: ", perHourRentalCost);
  console.log("perDayRentalCost: ", perDayRentalCost);
  console.log("weeklyRentalCost: ", weeklyRentalCost);

  if (
    !yachtName ||
    !yachtType ||
    !captainIncluded ||
    !crewMembers ||
    !location ||
    !capacity ||
    !yachtSize ||
    !yachtRoom ||
    !yachtOverview ||
    // !iceWaterAndSoftDrinks ||
    // !freeFuel ||
    // !towels ||
    // !bbqEquipmentAndServices ||
    // !kidsWelcome ||
    // !musicSystem ||
    // !freeRefreshment ||
    // !fishingEquipment ||
    // !safetyEquipment ||
    // !bluetooth ||
    // !usbPort ||
    // !auxCable ||
    // !shower ||
    // !pillowsAndBlankets ||
    // !cooler ||
    // !airConditioning ||
    // !microwave ||
    // !insideSpeakers ||
    // !outsideSpeakers ||
    // !audioSystem ||
    !perHourRentalCost ||
    !perDayRentalCost ||
    !weeklyRentalCost
  ) {
    return res.status(400).send({
      status: false,
      message: "All fields are required",
    });
  } else {
    YachtDetails.create({
      yachtName: yachtName,
      yachtType: yachtType,
      captainIncluded: captainIncluded,
      crewMembers: crewMembers,
      location: location,
      capacity: capacity,
      yachtSize: yachtSize,
      yachtRoom: yachtRoom,
      yachtOverview: yachtOverview,
      iceWaterAndSoftDrinks: iceWaterAndSoftDrinks,
      freeFuel: freeFuel,
      towels: towels,
      bbqEquipmentAndServices: bbqEquipmentAndServices,
      kidsWelcome: kidsWelcome,
      musicSystem: musicSystem,
      freeRefreshment: freeRefreshment,
      fishingEquipment: fishingEquipment,
      safetyEquipment: safetyEquipment,
      bluetooth: bluetooth,
      usbPort: usbPort,
      auxCable: auxCable,
      shower: shower,
      pillowsAndBlankets: pillowsAndBlankets,
      cooler: cooler,
      airConditioning: airConditioning,
      microwave: microwave,
      insideSpeakers: insideSpeakers,
      outsideSpeakers: outsideSpeakers,
      audioSystem: audioSystem,
      perHourRentalCost: perHourRentalCost,
      perDayRentalCost: perDayRentalCost,
      weeklyRentalCost: weeklyRentalCost,
    })
      .then((success) => {
        yachtDetailsDataID = success.dataValues.id;

        console.log("Yacht Details data is added successfully in dataBase");
        return res.status(200).send({
          status: true,
          message: "Yacht Details data is added successfully in dataBase",
        });
      })
      .catch((error) => {
        console.log(
          "Failed while adding Yacht Details data in dataBase: ",
          error
        );
        return res.status(500).send({
          status: false,
          message: "Failed while adding Yacht Details data in dataBase",
        });
      });
  }
});

//! Creating Yacht Details Get Api...
app.get("/api/get/data/yachtDetails", (req, res) => {
  YachtDetails.findAll()
    .then((success) => {
      if (success) {
        console.log("All YachtDetails data fetch successfully from dataBase");
        return res.status(200).send({
          status: true,
          message: "All YachtDetails data fetch successfully from dataBase",
          data: success,
        });
      }
    })
    .catch((err) => {
      console.log(
        "Something went wrong while fetching all YachtDetails data from dataBase",
        err
      );
      return res.status(500).send({
        status: false,
        message:
          "Something went wrong while fetching all YachtDetails data from dataBase",
      });
    });
});

//! Creating Yacht Details PUT Api...
app.put("/api/put/data/yachtDetails/update/byId", (req, res) => {
  let {
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
    id,
    yachtPhotosData,
    yachtPhotosDataStatus,
  } = req.body;

  if (
    !yachtName ||
    !yachtType ||
    !captainIncluded ||
    !crewMembers ||
    !location ||
    !capacity ||
    !yachtSize ||
    !yachtRoom ||
    !yachtOverview ||
    // !iceWaterAndSoftDrinks ||
    // !freeFuel ||
    // !towels ||
    // !bbqEquipmentAndServices ||
    // !kidsWelcome ||
    // !musicSystem ||
    // !freeRefreshment ||
    // !fishingEquipment ||
    // !safetyEquipment ||
    // !bluetooth ||
    // !usbPort ||
    // !auxCable ||
    // !shower ||
    // !pillowsAndBlankets ||
    // !cooler ||
    // !airConditioning ||
    // !microwave ||
    // !insideSpeakers ||
    // !outsideSpeakers ||
    // !audioSystem ||
    !perHourRentalCost ||
    !perDayRentalCost ||
    !weeklyRentalCost ||
    !id ||
    !yachtPhotosData ||
    !yachtPhotosDataStatus
  ) {
    return res.status(400).send({
      status: false,
      message: "All fields are required",
    });
  } else {
    YachtDetails.update(
      {
        yachtName: yachtName,
        yachtType: yachtType,
        captainIncluded: captainIncluded,
        crewMembers: crewMembers,
        location: location,
        capacity: capacity,
        yachtSize: yachtSize,
        yachtRoom: yachtRoom,
        yachtOverview: yachtOverview,
        iceWaterAndSoftDrinks: iceWaterAndSoftDrinks,
        freeFuel: freeFuel,
        towels: towels,
        bbqEquipmentAndServices: bbqEquipmentAndServices,
        kidsWelcome: kidsWelcome,
        musicSystem: musicSystem,
        freeRefreshment: freeRefreshment,
        fishingEquipment: fishingEquipment,
        safetyEquipment: safetyEquipment,
        bluetooth: bluetooth,
        usbPort: usbPort,
        auxCable: auxCable,
        shower: shower,
        pillowsAndBlankets: pillowsAndBlankets,
        cooler: cooler,
        airConditioning: airConditioning,
        microwave: microwave,
        insideSpeakers: insideSpeakers,
        outsideSpeakers: outsideSpeakers,
        audioSystem: audioSystem,
        perHourRentalCost: perHourRentalCost,
        perDayRentalCost: perDayRentalCost,
        weeklyRentalCost: weeklyRentalCost,
      },
      { where: { id: id } }
    )
      .then((success) => {
        yachtDetailsDataID = id;

        if (yachtPhotosDataStatus == "yes") {
          //! First i am going to delete all images related to this id & than uploading new images into folder...
          for (let i = 0; i < yachtPhotosData.length; i++) {
            // console.log(carPhotosData[i]);

            //! Deleting image from folder...
            const imgPath = `../public/uploads/yachtPhotos/${yachtPhotosData[i]}`;

            fs.unlink(imgPath, (err) => {
              if (err) {
                console.log(err);
              }
            });
          }
        } else {
          console.log("user not uploaded new images");
        }

        console.log("Yacht Details data is updated successfully in dataBase");
        return res.status(200).send({
          status: true,
          message: "Yacht Details data is updated successfully in dataBase",
        });
      })
      .catch((error) => {
        console.log(
          "Failed while updating Yacht Details data in dataBase: ",
          error
        );
        return res.status(500).send({
          status: false,
          message: "Failed while updating Yacht Details data in dataBase",
        });
      });
  }
});

//! Creating Yacht Details Delete Api...
app.delete("/api/delete/data/yachtDetails/row/byId", (req, res) => {
  let { id, photosArray, videoName, videoStatus } = req.body;
  if (!id || !photosArray || !videoStatus) {
    return res.status(400).send({
      status: false,
      message: "Row ID not found",
    });
  } else {
    YachtDetails.destroy({ where: { id: id } })
      .then((success) => {
        for (let i = 0; i < photosArray.length; i++) {
          // console.log(photosArray[i]);

          //! Also deleting image from folder...
          const imgPath = `../public/uploads/yachtPhotos/${photosArray[i]}`;

          fs.unlink(imgPath, (err) => {
            if (err) {
              console.log(err);
            }
          });
        }

        //! Checking video status if status == yes we will delete this item video if the status == no its means video was not upload last time so we cant delete it
        if (videoStatus == "yes") {
          //! Also deleting video form folder...
          const videoPath = `../public/uploads/videos/yachtDetails/${videoName}`;

          fs.unlink(videoPath, (err) => {
            if (err) {
              console.log(err);
            }
          });
        } else {
          console.log(
            "video not deleted because user not uploaded video last time"
          );
        }

        console.log("Row deleted successfully");
        return res.status(200).send({
          status: true,
          message: "Row Deleted Successfully",
        });
      })
      .catch((err) => {
        console.log("Something went wrong while deleting row: ", err);
        return res.status(500).send({
          status: false,
          message: "Something went wrong while deleting row",
        });
      });
  }
});

//! Creating Api for saving Yacht details Images/photos with waterMarks into yacht details images/photos folder...
app.post(
  "/api/upload/image/yachtDetails",
  yachtDetailsUpload.array("images"),
  async (req, res, next) => {
    let files = req.files;
    let fileNamesArr = [];
    if (!!files) {
      for (let i = 0; i < files.length; i++) {
        const image = files[i];
        const watermark = Sharp(await readFile(image.path))
          .resize(800)
          .composite([
            {
              input: await readFile(resolve("./watermark/logo.png")),
              center: 0,
            },
          ])
          .png()
          .toBuffer();

        const fileName = `${yachtDetailsDataID}${i}0.png`;

        fileNamesArr.push(fileName);

        await writeFile(
          resolve(`../public/uploads/yachtPhotos/${fileName}`),
          await watermark
        );
      }

      //! Saving image name in dataBase...
      YachtDetails.update(
        {
          yachtPhotosArray: fileNamesArr,
        },
        { where: { id: yachtDetailsDataID } }
      );

      return res.status(200).send({
        status: true,
        message: "Image Uploaded successfully into folder",
      });
    } else {
      next(new Error("No file found"));
    }
  }
);

//! Yacht Video Uploading Configuration & saving into folder...
const YachtVideoStorage = multer.diskStorage({
  destination: "../public/uploads/videos/yachtDetails/",
  filename: (req, file, cb) => {
    cb(null, `${yachtDetailsDataID}${path.extname(file.originalname)}`);
  },
});
const uploadYachtVideo = multer({ storage: YachtVideoStorage });

// ! Creating Api for saving yacht video into folder...
app.post(
  "/api/upload/video/yachtDetails",
  uploadYachtVideo.single("videoFile"),
  (req, res) => {
    // console.log("File uploaded:", req.file);

    if (req.file) {
      if (yachtDetailsDataID) {
        //! Saving Video name in dataBase...
        YachtDetails.update(
          {
            yachtVideoName: `${yachtDetailsDataID}${path.extname(
              req.file.originalname
            )}`,
          },
          { where: { id: yachtDetailsDataID } }
        );

        return res.status(200).send({
          status: true,
          message:
            "Video Uploaded successfully into folder & the name of the video saved in dataBase",
        });
      }
    }
  }
);

//*---------------------------------//*

// //! Server Running...
db.sequelize.sync().then((req) => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
