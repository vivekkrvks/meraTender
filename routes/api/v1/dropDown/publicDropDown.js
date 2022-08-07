const express = require("express");
const router = express.Router();
const passport = require("passport");

const District = require("./../../../../models/Addition/Location/District")
const Department = require("./../../../../models/Addition/Department")

// @type    GET
//@route    /api/v1/dropDown/publicDropDown/allDistrict
// @desc    route for getting all district
// @access  PRIVATE

router.get(
  "/allDistrict",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
       District.find({})
       .then(
        data => (res.json(data))
       )
       .catch(err => console.log(err))
  }
);

// @type    GET
//@route    /api/v1/dropDown/publicDropDown/allDepartment
// @desc    route for getting all department
// @access  PRIVATE

router.get(
  "/allDepartment",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
       Department.find({})
       .then(
        data => (res.json(data))
       )
       .catch(err => console.log(err))
  }
);




module.exports = router;
