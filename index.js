const express = require("express");
const axios = require("axios");
const mongoose = require('mongoose');
const morgan = require('morgan')
const bodyParser = require('body-parser')

const TheftRoute = require('./routes/theftRouter');
mongoose.connect('mongodb://localhost:27017/theft-detection', {useNewUrlParser:true, useUnifiedTopology:true})
const db = mongoose.connection

db.on('error', (err)=>{
  console.log(err);
})

db.once('open',()=>{
  console.log("Database connection successfully");
})


const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(5000, () => {
  console.log("server started ");
});

app.use('/api/theft', TheftRoute);
