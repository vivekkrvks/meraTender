const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load AddPartner.js Model
const AddPartner = require("../../../../models/Addition/AddPartner");

// @type    POST
//@route    /api/v1/addition/addPartner/
// @desc    route for SAVING data for addPartner
// @access  PRIVATE
router.post(
  "/",
   passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const addPartnerValues = {
        state:{},
        district:{},
        visibility:{},
        partnerType:{}
    };
    addPartnerValues.user = req.user.id;
    addPartnerValues.visibility.name = req.body.visibility.name;
    addPartnerValues.visibility.id = req.body.visibility.id;
    addPartnerValues.isVerified = req.body.isVerified;
    addPartnerValues.partnerType.partnerTypeName = req.body.partnerType.partnerTypeName;
    addPartnerValues.partnerType.partnerTypeLink = req.body.partnerType.partnerTypeLink;

    addPartnerValues.partnerName = req.body.partnerName;
//partnerLink start

    var strs = req.body.partnerLink;
    var rests = strs.replace(/  | |   |    |      /gi, function (x) {
      return  "";
    });
    addPartnerValues.partnerLink = rests.toLowerCase()
    addPartnerValues.state.stateName = req.body.state.stateName;
    addPartnerValues.state.stateLink = req.body.state.stateLink;
    addPartnerValues.district.districtName = req.body.district.districtName;
    addPartnerValues.district.districtLink = req.body.district.districtLink;
    addPartnerValues.fullAddress = req.body.fullAddress;
    addPartnerValues.mobileNo = req.body.mobileNo;
    addPartnerValues.whatsAppNo = req.body.whatsAppNo;
    addPartnerValues.emailId = req.body.emailId;

    //Do database stuff
if(
  req.body.partnerName == undefined || req.body.partnerName == "" ||
  req.body.partnerLink == undefined || req.body.partnerLink == ""
){

  res.json({
    message: "Partner Name, Partner Link are Required field",
    variant: "error"
})  
    } else if(
        req.body.state?.stateName == undefined || req.body.state?.stateName == "" ||
        req.body.state?.stateLink == undefined || req.body.state?.stateLink == "" ||
        req.body.district?.districtName == undefined || req.body.district?.districtName == "" ||
        req.body.district?.districtLink == undefined || req.body.district?.districtLink == "" ||
        req.body.partnerType?.partnerTypeName == undefined || req.body.partnerType?.partnerTypeName == "" ||
        req.body.partnerType?.partnerTypeLink == undefined || req.body.partnerType?.partnerTypeLink == ""
    ){
        res.json({
            message: "state and district is Required field",
            variant: "error"
        }) 
    }
    
    else {
    
          AddPartner.findOne({
            partnerName: addPartnerValues.partnerName
          })
            .then(addPartner => {
              //Username already exists
              if (addPartner) {
                res.json({
                  message: "Title Already exist ",
                  variant: "error"
                });
              } else {
                AddPartner.findOne({
                  partnerLink: addPartnerValues.partnerLink
                })
                  .then(addPartner => {
                    //Username already exists
                    if (addPartner) {
                      res.json({
                        message: "partnerLink Already exist ",
                        variant: "error"
                      });
                    } else {
                      new AddPartner(addPartnerValues)
                      .save()
                      .then(
                        res.json({
                          message: "Successfully saved",
                          variant: "success"
                        })
                      )
                      .catch(err => console.log(err));
                      
                    }})
                    .catch(err => console.log(err));
              }
            })
            .catch(err => console.log(err));   

    }
    }
);

// @type    GET
//@route    /api/v1/addition/addPartner/allPartner
// @desc    route for getting all data from  addPartner
// @access  PRIVATE

router.get(
  "/allPartner",
  // passport.authenticate("jwt", { session: false }),
  async(req, res) => {
   let allData = await AddPartner.aggregate(
        [
            {$project:{partnerName:1,fullAddress:1}}
        ]
    )   .catch(err =>
        res
          .status(404)
          .json({ message: "No AddPartner Found", variant: "error" })
      );
      res.json(allData)
   
  }
);

// @type    get
//@route    /api/v1/addition/addPartner/get/:id
// @desc    route to get single addPartner by id
// @access  PRIVATE
router.get(
  "/get/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    AddPartner.findOne({
      _id: req.params.id
    }).then(AddPartner => res.json(AddPartner))
    .catch(err => res.json({message: "Problem in finding With this Id", variant: "error"}));
  }
);

// @type    POST
//@route    /api/v1/addition/addPartner/:id
// @desc    route to update/edit addPartner
// @access  PRIVATE
async function updateMe(req,res,addPartnerValues){

  AddPartner.findOneAndUpdate(
    { _id: req.params.id },
    { $set: addPartnerValues },
    { new: true }
  )
    .then(addPartner => {
      if (addPartner){
        res.json({ message: "Updated successfully!!", variant: "success" })

      } else {
        res.json({ message: "Id not found", variant: "error" })

      }
    }        
    )
    .catch(err =>
      console.log("Problem in updating addPartner value" + err)
    );
}

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {

    
    const addPartnerValues = {
        state:{},
        district:{},
        visibility:{}
    };
    addPartnerValues.user = req.user.id;
    if(req.body.visibility?.name)addPartnerValues.visibility.name = req.body.visibility.name;
    if(req.body.visibility?.id)addPartnerValues.visibility.id = req.body.visibility.id;
    console.log(req.body.isVerified)
    if(req.body.isVerified == true || req.body.isVerified == false)addPartnerValues.isVerified = req.body.isVerified;

    if(req.body.partnerName)addPartnerValues.partnerName = req.body.partnerName;
//partnerLink start
if(req.body.partnerLink)
   { var strs = req.body.partnerLink;
    var rests = strs.replace(/  | |   |    |      /gi, function (x) {
      return  "";
    });
    addPartnerValues.partnerLink = rests.toLowerCase()}
    if(req.body.state.stateName)addPartnerValues.state.stateName = req.body.state.stateName;
    if(req.body.state.stateLink)addPartnerValues.state.stateLink = req.body.state.stateLink;
    if(req.body.district.districtName)addPartnerValues.district.districtName = req.body.district.districtName;
    if(req.body.district.districtLink)addPartnerValues.district.districtLink = req.body.district.districtLink;
    if(req.body.fullAddress)addPartnerValues.fullAddress = req.body.fullAddress;
    if(req.body.mobileNo)addPartnerValues.mobileNo = req.body.mobileNo;
    if(req.body.whatsAppNo)addPartnerValues.whatsAppNo = req.body.whatsAppNo;
    if(req.body.emailId)addPartnerValues.emailId = req.body.emailId;


    AddPartner.findOne({
        partnerName: addPartnerValues.partnerName
      })
        .then(addPartner => {
          //Username already exists
          if (addPartner && addPartner._id != req.params.id) {
            res.json({
              message: "Title Already exist ",
              variant: "error"
            });
          } else {
            AddPartner.findOne({
              partnerLink: addPartnerValues.partnerLink
            })
              .then(addPartner => {
                //Username already exists
                if (addPartner&& addPartner._id != req.params.id) {
                  res.json({
                    message: "partnerLink Already exist ",
                    variant: "error"
                  });
                } else {
updateMe(req,res,addPartnerValues)
          
                }})
                .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));  



}
);

///////
// /api/v1/addition/addPartner/delete/:id
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    const id = req.params.id;
    AddPartner.findOne({ _id: id }).then(addPartnerData => {
      if (addPartnerData) {
        AddPartner.findOneAndDelete({ _id: id })
          .then(() =>
            res.json({ message: "Deleted successfully", variant: "success" })
          )
          .catch(err =>
            res.json("Failed to delete due to this error - " + err)
          );
      } else {
        res
          .status(400)
          .json({ message: "addPartner Not Found", variant: "error" });
      }
    });
 
  }
);

// @type    GET
//@route    /api/v1/addition/addPartner/alladdPartner/:searchaddPartner
// @desc    route for searching of addPartner from searchbox using any text
// @access  PRIVATE
router.get(
  "/alladdPartner/:searchaddPartner",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {

    const search = req.params.searchaddPartner;

    if (isNaN(search)) {
        let allData = await AddPartner.aggregate(
            [
                {$match:{
                    partnerName: new RegExp(search, "i")
                  }},
                {$project:{partnerName:1,fullAddress:1}}
            ]
        )   .catch(err =>
            res
              .status(404)
              .json({ message: "No AddPartner Found", variant: "error" })
          );
          res.json(allData)

    } 



  }
);

// @type    GET
//@route    /api/v1/addition/addPartner/allCatForPublic
// @desc    route for getting all data from  addPartner
// @access  PRIVATE

router.get(
  "/allAddPartnerForPublic/byDistrict/:districtLink",
  // passport.authenticate("jwt", { session: false }),
  async(req, res) => {

    let allData = await AddPartner.aggregate(
        [
            {$match:{"district.districtLink" : req.params.districtLink}},
        ]
    )   .catch(err =>
        res
          .status(404)
          .json({ message: "No AddPartner Found", variant: "error" })
      );
      res.json(allData)
  }
);


// @type    GET
//@route    /api/v1/addition/addPartner/allPartnerType
// To get all partner Type

router.get(
  "/allPartnerType",
  // passport.authenticate("jwt", { session: false }),
  async(req, res) => {
   let allData = [
    {
      partnerTypeName:"Cafe",
      partnerTypeLink:"cafe"
     },
    {
      partnerTypeName:"Shop",
      partnerTypeLink:"shop"
     },
   ]
      res.json(allData)
   
  }
);


module.exports = router;
