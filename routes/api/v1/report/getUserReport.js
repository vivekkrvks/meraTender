const express = require("express");
const router = express.Router();
const passport = require("passport");

// @type    GET
//@route    /api/v1/addition/location/district/alldistrict
// @desc    route for getting all data from  district
// @access  PRIVATE

router.post(
  "/getAll",
  // passport.authenticate("jwt", { session: false }),
  async(req, res) => {
   let allData = await District.aggregate(
        [
            {$project:{districtName:1,districtLink:1}}
        ]
    )   .catch(err =>
        res
          .status(404)
          .json({ message: "No District Found", variant: "error" })
      );
      res.json(allData)
   
  }
);


module.exports = router;
