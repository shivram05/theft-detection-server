const Theft = require("../model/TheftModel");
const axios = require("axios");

// show all data

const apiUrl = "https://theftdetectionep1.eastus2.inference.ml.azure.com/score";
const token = "elkEMTRnJtcI6ihTWQPOb49BwBGWsewc";

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

const index = (req, res, next) => {
  Theft.find()
    .then((response) => {
      const customerName = response[0].origin_zipCode; 
      const carrierName = response[0].carrier_name;
      const transporationMode = response[0].transporation_mode;
      const originName = response[0].origin_name;
      const originCity = response[0].origin_city;
      const originState = response[0].origin_state;
      const originZipCode = response[0].origin_zipCode;
      const destinationName = response[0].destination_name;
      const destinationCity = response[0].destination_city;
      const destinationState = response[0].destination_state;
      const destinationZipCode = response[0].destination_zipCode;
      const totalPieces = response[0].total_pieces;
      const totalWeight = response[0].total_weight;
      const commodityDescription = response[0].commodity_description;
      let payloadData = {
        input_data: {
          columns: [
            "CUSTOMER NAME",
            "SERVPROV NAME",
            "TRANSPORTATION MODE",
            "ORIGIN NAME",
            "ORIGIN CITY",
            "ORIGIN STATE",
            "ORIGIN ZIPCODE",
            "DESTINATION NAME",
            "DESTINATION CITY",
            "DESTINATION STATE",
            "DESTINATION ZIPCODE",
            "TOTAL PIECES",
            "TOTAL WEIGHT",
            "COMMODITY DESCRIPTION",
          ],
          index: [0],
          data: [
            [
              customerName,
              carrierName,
              transporationMode,
              originName,
              originCity,
              originState,
              originZipCode,
              destinationName,
              destinationCity,
              destinationState,
              destinationZipCode,
              totalPieces,
              totalWeight,
              commodityDescription,
            ],
          ],
        },
      };


      axios
        .post(apiUrl, payloadData, { headers })
        .then(async (response) => {
          console.log("API response:", response.data);

          try {
            // await Theft.deleteMany({});
            console.log("All data deleted successfully");

            res.json({
              message: "API response received and data deleted successfully",
              responseData: response.data,
            });
          } catch (error) {
            console.error("Error deleting data:", error);
            res
              .status(500)
              .json({
                message: "An error occurred while deleting all theft data",
                error: error.message,
              });
          }
        })
        .catch((error) => {
          console.error("API request error:", error);
          res
            .status(500)
            .json({ message: "API request error", error: error.message });
        });

    })
    .catch((error) => {
      res.json({
        message: "An error occured",
      });
    });
};



// to store data
const store = (req, response, next) => {
  let theft = new Theft({
    customer_name: req.body.customer_name,
    carrier_name: req.body.carrier_name,
    transporation_mode: req.body.transporation_mode,

    origin_name: req.body.origin_name,

    origin_city: req.body.origin_city,

    origin_state: req.body.origin_state,

    origin_zipCode: req.body.origin_zipCode,

    destination_name: req.body.destination_name,
    destination_city: req.body.destination_city,

    destination_state: req.body.destination_state,

    destination_zipCode: req.body.destination_zipCode,
    total_pieces: req.body.total_pieces,

    total_weight: req.body.total_weight,

    commodity_description: req.body.commodity_description,
  });

  theft
    .save()
    .then((response) => {
      response.json({
        message: "Data Added succesfully",
      });
    })
    .catch((error) => {
      response.json({
        message: error,
      });
    });
};

module.exports = {
  index,
  store,
};
