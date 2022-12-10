const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load AddBusiness.js Model
const AddBusiness = require("../../../../models/Addition/AddBusiness");

// @type    POST
//@route    /api/v1/addition/addBusiness/
// @desc    route for SAVING data for addBusiness
// @access  PRIVATE
router.post(
  "/",
   passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const addBusinessValues = {
        state:{},
        district:{},
        visibility:{},
        businessType:{}
    };
    addBusinessValues.user = req.user.id;
    addBusinessValues.visibility.name = req.body.visibility.name;
    addBusinessValues.visibility.id = req.body.visibility.id;
    addBusinessValues.businessType.businessTypeName = req.body.businessType.businessTypeName;
    addBusinessValues.businessType.businessTypeLink = req.body.businessType.businessTypeLink;
    addBusinessValues.state.stateName = req.body.state.stateName;
    addBusinessValues.state.stateLink = req.body.state.stateLink;
    addBusinessValues.district.districtName = req.body.district.districtName;
    addBusinessValues.district.districtLink = req.body.district.districtLink;
    //// 
    addBusinessValues.isVerified = req.body.isVerified;
    addBusinessValues.businessName = req.body.businessName;
//businessLink start

    var strs = req.body.businessLink;
    var rests = strs.replace(/  | |   |    |      /gi, function (x) {
      return  "";
    });
    addBusinessValues.businessLink = rests.toLowerCase()
    addBusinessValues.ownerName = req.body.ownerName;
    addBusinessValues.mobileNo = req.body.mobileNo;
    addBusinessValues.whatsAppNo = req.body.whatsAppNo;
    addBusinessValues.emailId = req.body.emailId;
    addBusinessValues.website = req.body.website;
    addBusinessValues.gstNumber = req.body.gstNumber;
    addBusinessValues.shortDescription = req.body.shortDescription;
    addBusinessValues.fullDescription = req.body.fullDescription;
    addBusinessValues.fullAddress = req.body.fullAddress;
    addBusinessValues.pinCode = req.body.pinCode;


    //Do database stuff
if(
  req.body.businessName == undefined || req.body.businessName == "" ||
  req.body.businessLink == undefined || req.body.businessLink == ""
){

  res.json({
    message: "Business Name, Business Link are Required field",
    variant: "error"
})  
    } else if(
        req.body.state?.stateName == undefined || req.body.state?.stateName == "" ||
        req.body.state?.stateLink == undefined || req.body.state?.stateLink == "" ||
        req.body.district?.districtName == undefined || req.body.district?.districtName == "" ||
        req.body.district?.districtLink == undefined || req.body.district?.districtLink == "" ||
        req.body.businessType?.businessTypeName == undefined || req.body.businessType?.businessTypeName == "" ||
        req.body.businessType?.businessTypeLink == undefined || req.body.businessType?.businessTypeLink == ""
    ){
        res.json({
            message: "state and district is Required field",
            variant: "error"
        }) 
    }
    
    else {
    
          AddBusiness.findOne({
            businessName: addBusinessValues.businessName
          })
            .then(addBusiness => {
              //Username already exists
              if (addBusiness) {
                res.json({
                  message: "Title Already exist ",
                  variant: "error"
                });
              } else {
                AddBusiness.findOne({
                  businessLink: addBusinessValues.businessLink
                })
                  .then(addBusiness => {
                    //Username already exists
                    if (addBusiness) {
                      res.json({
                        message: "businessLink Already exist ",
                        variant: "error"
                      });
                    } else {
                      new AddBusiness(addBusinessValues)
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
//@route    /api/v1/addition/addBusiness/allBusiness
// @desc    route for getting all data from  addBusiness
// @access  PRIVATE

router.get(
  "/allBusiness",
  // passport.authenticate("jwt", { session: false }),
  async(req, res) => {
   let allData = await AddBusiness.aggregate(
        [
            {$project:{businessName:1,fullAddress:1}}
        ]
    )   .catch(err =>
        res
          .status(404)
          .json({ message: "No AddBusiness Found", variant: "error" })
      );
      res.json(allData)
   
  }
);

// @type    get
//@route    /api/v1/addition/addBusiness/get/:id
// @desc    route to get single addBusiness by id
// @access  PRIVATE
router.get(
  "/get/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    AddBusiness.findOne({
      _id: req.params.id
    }).then(AddBusiness => res.json(AddBusiness))
    .catch(err => res.json({message: "Problem in finding With this Id", variant: "error"}));
  }
);

// @type    POST
//@route    /api/v1/addition/addBusiness/:id
// @desc    route to update/edit addBusiness
// @access  PRIVATE
async function updateMe(req,res,addBusinessValues){

  AddBusiness.findOneAndUpdate(
    { _id: req.params.id },
    { $set: addBusinessValues },
    { new: true }
  )
    .then(addBusiness => {
      if (addBusiness){
        res.json({ message: "Updated successfully!!", variant: "success" })

      } else {
        res.json({ message: "Id not found", variant: "error" })

      }
    }        
    )
    .catch(err =>
      console.log("Problem in updating addBusiness value" + err)
    );
}

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {

    
    const addBusinessValues = {
        state:{},
        district:{},
        visibility:{},
        businessType:{}
    };
    addBusinessValues.user = req.user.id;
    if(req.body.visibility?.name)addBusinessValues.visibility.name = req.body.visibility.name;
    if(req.body.visibility?.id)addBusinessValues.visibility.id = req.body.visibility.id;
    console.log(req.body.isVerified)
    if(req.body.isVerified == true || req.body.isVerified == false)addBusinessValues.isVerified = req.body.isVerified;

    if(req.body.businessName)addBusinessValues.businessName = req.body.businessName;
//businessLink start
if(req.body.businessLink)
   { var strs = req.body.businessLink;
    var rests = strs.replace(/  | |   |    |      /gi, function (x) {
      return  "";
    });
    addBusinessValues.businessLink = rests.toLowerCase()}
    if(req.body.state.stateName)addBusinessValues.state.stateName = req.body.state.stateName;
    if(req.body.state.stateLink)addBusinessValues.state.stateLink = req.body.state.stateLink;
    if(req.body.district.districtName)addBusinessValues.district.districtName = req.body.district.districtName;
    if(req.body.district.districtLink)addBusinessValues.district.districtLink = req.body.district.districtLink;
    if(req.body.fullAddress)addBusinessValues.fullAddress = req.body.fullAddress;
    if(req.body.ownerName)addBusinessValues.ownerName = req.body.ownerName;
    if(req.body.mobileNo)addBusinessValues.mobileNo = req.body.mobileNo;
    if(req.body.whatsAppNo)addBusinessValues.whatsAppNo = req.body.whatsAppNo;
    if(req.body.emailId)addBusinessValues.emailId = req.body.emailId;
    if(req.body.website)addBusinessValues.website = req.body.website;
    if(req.body.gstNumber)addBusinessValues.gstNumber = req.body.gstNumber;
    if(req.body.shortDescription)addBusinessValues.shortDescription = req.body.shortDescription;
    if(req.body.fullDescription)addBusinessValues.fullDescription = req.body.fullDescription;
    if(req.body.pinCode)addBusinessValues.pinCode = req.body.pinCode;


    AddBusiness.findOne({
        businessName: addBusinessValues.businessName
      })
        .then(addBusiness => {
          //Username already exists
          if (addBusiness && addBusiness._id != req.params.id) {
            res.json({
              message: "Title Already exist ",
              variant: "error"
            });
          } else {
            AddBusiness.findOne({
              businessLink: addBusinessValues.businessLink
            })
              .then(addBusiness => {
                //Username already exists
                if (addBusiness&& addBusiness._id != req.params.id) {
                  res.json({
                    message: "businessLink Already exist ",
                    variant: "error"
                  });
                } else {
updateMe(req,res,addBusinessValues)
          
                }})
                .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));  



}
);

///////
// /api/v1/addition/addBusiness/delete/:id
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    const id = req.params.id;
    AddBusiness.findOne({ _id: id }).then(addBusinessData => {
      if (addBusinessData) {
        AddBusiness.findOneAndDelete({ _id: id })
          .then(() =>
            res.json({ message: "Deleted successfully", variant: "success" })
          )
          .catch(err =>
            res.json("Failed to delete due to this error - " + err)
          );
      } else {
        res
          .status(400)
          .json({ message: "addBusiness Not Found", variant: "error" });
      }
    });
 
  }
);

// @type    GET
//@route    /api/v1/addition/addBusiness/alladdBusiness/:searchaddBusiness
// @desc    route for searching of addBusiness from searchbox using any text
// @access  PRIVATE
router.get(
  "/alladdBusiness/:searchaddBusiness",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {

    const search = req.params.searchaddBusiness;

    if (isNaN(search)) {
        let allData = await AddBusiness.aggregate(
            [
                {$match:{
                    businessName: new RegExp(search, "i")
                  }},
                {$project:{businessName:1,fullAddress:1}}
            ]
        )   .catch(err =>
            res
              .status(404)
              .json({ message: "No AddBusiness Found", variant: "error" })
          );
          res.json(allData)

    } 



  }
);

// @type    GET
//@route    /api/v1/addition/addBusiness/allCatForPublic
// @desc    route for getting all data from  addBusiness
// @access  PRIVATE

router.get(
  "/allAddBusinessForPublic/byDistrict/:districtLink",
  // passport.authenticate("jwt", { session: false }),
  async(req, res) => {

    let allData = await AddBusiness.aggregate(
        [
            {$match:{"district.districtLink" : req.params.districtLink}},
        ]
    )   .catch(err =>
        res
          .status(404)
          .json({ message: "No AddBusiness Found", variant: "error" })
      );
      res.json(allData)
  }
);


// @type    GET
//@route    /api/v1/addition/addBusiness/allBusinessType
// To get all business Type

router.get(
  "/allBusinessType",
  // passport.authenticate("jwt", { session: false }),
  async(req, res) => {
   let allData = [
    {
      businessTypeName:"Cafe",
      businessTypeLink:"cafe"
     },
    {
      businessTypeName:"Shop",
      businessTypeLink:"shop"
     },
   ]
      res.json(allData)
   
  }
);


// @type    GET
//@route    /api/v1/addition/addBusiness/forPublic/business/:districtLink/:businessType
// @desc    route for getting all business for public by district
// @access  PRIVATE

router.get(
  "/forPublic/business/:districtLink/:businessType",
  // passport.authenticate("jwt", { session: false }),
  async(req, res) => {
   let allData = await AddBusiness.aggregate(
        [
          {$match:{
            "district.districtLink":req.params.districtLink,
            "businessType.businessTypeLink":req.params.businessType,
            "visibility.id":"public",
          }},
            {$project:{isVerified:1,fullAddress:1,mobileNo:1,whatsAppNo:1,emailId:1,businessName:1}}
        ]
    )   .catch(err =>
        res
          .status(404)
          .json({ message: "No AddBusiness Found", variant: "error" })
      );
      res.json(allData)
   
  }
);

module.exports = router;
