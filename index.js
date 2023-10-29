const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiUrl = "https://theftdetectionep1.eastus2.inference.ml.azure.com/score";
const token = "elkEMTRnJtcI6ihTWQPOb49BwBGWsewc";

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
    data: [[]],
  },
};

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};


app.post("/submit", (req, res) => {
  // Access the data sent by the client
  const formData = req.body;

  payloadData.input_data.index.push(payloadData.input_data.index.length);
  payloadData.input_data.data.push(Object.values(formData));

  // Process the data as needed
  console.log(formData);
  // Respond to the client
  res.json({ message: "Data received successfully" });
});

app.get("/score", (req, res) => {

  console.log(payloadData);
  axios
    .post(apiUrl, payloadData, { headers })
    .then((response) => {
      console.log("API response:", response.data);
      res.json(response.data);
    })
    .catch((error) => {
      console.error("API request error:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.listen(5000, () => {
  console.log("server started ");
});
