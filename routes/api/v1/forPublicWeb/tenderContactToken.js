const express = require("express");
const router = express.Router();
const passport = require("passport");
var mongoose = require('mongoose');

// @type    POST
//@route    /api/v1/forPublicWeb/tenderContactToken/generate
// @desc    route for getting all department
// @access  PRIVATE

router.get(
  "/favTenderWithFilter",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
       Department.find({})
       .then(
        data => (res.json(data))
       )
       .catch(err => console.log(err))
  }
);





module.exports = router;
