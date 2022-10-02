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
                date:1,mobileNo:1,mobileVerified:1, name:1,isProUser:1,
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
// @type    GET
//@route    /api/v1/report/getUserReport/trans/getall
// @desc    route for getting all data from  district
// @access  PRIVATE

router.get(
  "/trans/getall",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {

   let allData = await AllTransaction.aggregate(
        [
            {$match:{
                user:req.user._id,
                
            }},
           
        ]
    )   .catch(err =>
       console.log({ message: "No Data Found", variant: "error" })
      );

      res.json(allData)
   
  }
);


module.exports = router;
