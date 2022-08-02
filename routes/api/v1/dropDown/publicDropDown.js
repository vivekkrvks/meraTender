const express = require("express");
const router = express.Router();
const passport = require("passport");

const District = require("./../../../../models/Addition/Location/District")

// @type    GET
//@route    /api/v1/addition/category/allcategory
// @desc    route for getting all data from  category
// @access  PRIVATE

router.get(
  "/allDistrict",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
       District.find({})
       .then(
        data => res.json(data)
       )
       .catch(err => console.log(err))
  }
);




module.exports = router;
