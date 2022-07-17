const express = require("express");
const router = express.Router();
const passport = require("passport");

// @type    GET
//@route    /api/v1/report/getUserReport/getAll
// @desc    route for getting all data from  district
// @access  PRIVATE

router.post(
  "/getAll",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {

   let allData = await User.aggregate(
        [
            {$match:{"designation.id":"user"}},
            {$project:{
                date:1,mobileNo:1,mobileVerified:1, name:1,

            }}
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
