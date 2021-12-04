const express = require("express");
const app = express();
const port = 7000;
const config = require("./config.json");
const https = require("https");
var getRequest = require('./getRequest.js');


const bodyParser = require('body-parser');
require('dotenv').config();
var cors = require('cors');
const cookieParser = require('cookie-parser');


app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(cookieParser());

app.use(cors());

app.set("view engine", "ejs");


app.all('/*', function (req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  // res.header('Access-Control-Allow-Headers', 'Content-type,token');
  if (req.method == 'OPTIONS') {
      res
          .status(200)
          .end();
  } else {
      next();
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/get-articles/:topic", (req, res) => {
  var topic = req.params["topic"];
  var url =
    "https://gnews.io/api/v4/search?q=" + topic + "&token=" + config.API_KEY + "&lang=en&country=us";
   var data = getRequest.getRequestTest(url, function(dataTest) {
    res.send(JSON.parse(dataTest));
  });
});

app.listen(port);

module.exports = app
