const express = require("express");
const router = express.Router();
const passport = require("passport");

const SavedTender = require("../../../../models/ProUser/SavedTender");

// route to save fav tender
// /api/v1/forPublicWeb/saveTender/saveThis

router.post(
    "/saveThis",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        // console.log(req.body.tenderId)
      let tenderValue = {district:{},department:{}}
      tenderValue.user = req.user.id;
      tenderValue.tenderId = req.body.tenderId;
      tenderValue.district.districtName = req.body.district?.districtName;
      tenderValue.district.districtLink = req.body.district?.districtLink;
      tenderValue.department.departmentName = req.body.department?.departmentName;
      tenderValue.department.departmentLink = req.body.department?.departmentLink;
      if(tenderValue.tenderId && 
        tenderValue.district?.districtLink &&
         tenderValue.department?.departmentLink)
     { SavedTender.findOne({
        user:req.user.id,
        tenderId:req.body.tenderId
      })
      .then(data => {
        if(!data){
          new SavedTender(tenderValue)
          .save()
          .then(    res.json({
            "message":"Saved in the Collection",
            "variant":"success",
            type:"added"
        }))
          .catch(err => console.log(err))
        } else {
            deleteSaveTender(req,res,data._id)
        }
      })
      .catch(err => console.log(err))}
      else {
        res.json({
            "message":"Mandatory parameter missing",
            "variant":"error"
        })
      }
    }
  )
  
 
  const deleteSaveTender =  (req, res,saveTenId) => {
  
      SavedTender.findOne({ _id: saveTenId }).then(stData => {
        if (stData) {
          SavedTender.findOneAndDelete({ _id: saveTenId })
            .then(() =>
              res.json({ message: "Removed from Saved Collection", variant: "success",type:"removed" })
            )
            .catch(err =>
              res.json("Failed to remove due to this error - " + err)
            );
        } else {
          res
            .json({ message: " Not Found", variant: "error" });
        }
      });
   
    }
 

module.exports = router;
