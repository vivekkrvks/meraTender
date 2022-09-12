const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");
const upload = require("express-fileupload");
const cors = require("cors");
const path = require("path");
const cloudinary = require("cloudinary").v2;

require('dotenv/config')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const cookieSession = require('cookie-session')


//bring all routes
const register = require("./routes/api/v1/auth/register");
const loginApi = require("./routes/api/v1/auth/loginApi");
const otpLogin = require("./routes/api/v1/auth/otpLogin");
// Addition
const category = require("./routes/api/v1/addition/category");
const department = require("./routes/api/v1/addition/department");
const tender = require("./routes/api/v1/addition/tender");
const price = require("./routes/api/v1/addition/price");
const cafe = require("./routes/api/v1/addition/cafe");
// Addition --> Location
const state = require("./routes/api/v1/addition/location/state");
const district = require("./routes/api/v1/addition/location/district");
// Report 
const getUserReport = require("./routes/api/v1/report/getUserReport")
// Dropdown data
const publicDropDown = require("./routes/api/v1/dropDown/publicDropDown")
// for public web
const getTender = require("./routes/api/v1/forPublicWeb/getTender")
const saveTender = require("./routes/api/v1/forPublicWeb/saveTender")
const paytm = require("./routes/api/v1/forPublicWeb/paytm")

// other
const fileUpload = require("./routes/api/v1/other/fileUpload");
const pstatus = require("./routes/api/v1/other/pstatus");
// 

//passport 
// const passport = require("./services/passport")
const app = express();
//cookie
app.use(cookieSession({
  maxAge:24*60*60*1000,
  keys:['akjsdfkjk']
}))

//initialise passport
app.use(passport.initialize());
app.use(passport.session());

app.use(upload({ useTempFiles: true }));
app.use(cors());

//Middleware for bodyparser
app.use(bodyparser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyparser.json({limit: "50mb"}));
app.use(express.static(path.join(__dirname, "client/build")))


//mongoDB configuration
const db = require("./setup/myurl").mongoURL;

//Attempt to connect to database
mongoose
  .connect(db , { useFindAndModify: false, useNewUrlParser: true , useUnifiedTopology: true} )
  .then(() => console.log(" MongoDB connected successfully"))
  .catch(err => console.log(err));

  //import models
  require("./models/User")

//Passport middleware
app.use(passport.initialize());

//Config for JWT strategy
require("./strategies/jsonwtStrategy")(passport);
require('./services/passport')


//actual routes
app.use("/api/v1/auth/register", register);
app.use("/api/v1/auth/loginApi", loginApi);
app.use("/api/v1/auth/otpLogin", otpLogin);
// Addition
app.use("/api/v1/addition/category", category);
app.use("/api/v1/addition/department", department);
app.use("/api/v1/addition/tender", tender);
app.use("/api/v1/addition/price", price);
app.use("/api/v1/addition/cafe", cafe);
// add -> loc
app.use("/api/v1/addition/location/state", state);
app.use("/api/v1/addition/location/district", district);
// Report
app.use("/api/v1/report/getUserReport", getUserReport);
// Dropdown data
app.use("/api/v1/dropDown/publicDropDown", publicDropDown);

// for public web
app.use("/api/v1/forPublicWeb/getTender", getTender);
app.use("/api/v1/forPublicWeb/saveTender", saveTender);
app.use("/api/v1/forPublicWeb/paytm", paytm);


//other
app.use("/api/v1/other/fileUpload",fileUpload)
app.use("/api/v1/other/pstatus",pstatus)

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"), function(
    err
  ) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const port = process.env.PORT || 2040;

app.listen(port, () => console.log(` App is running at ${port}`));

