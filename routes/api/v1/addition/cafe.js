const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load Cafe.js Model
const Cafe = require("../../../../models/Addition/Cafe");

// @type    POST
//@route    /api/v1/addition/cafe/
// @desc    route for SAVING data for cafe
// @access  PRIVATE
router.post(
  "/",
   passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log(req.body)
    const cafeValues = {
        state:{},
        district:{},
        visibility:{}
    };
    cafeValues.user = req.user.id;
    cafeValues.visibility.name = req.body.visibility.name;
    cafeValues.visibility.id = req.body.visibility.id;
    cafeValues.isVerified = req.body.isVerified;

    cafeValues.cafeName = req.body.cafeName;
//cafeLink start

    var strs = req.body.cafeLink;
    var rests = strs.replace(/  | |   |    |      /gi, function (x) {
      return  "";
    });
    cafeValues.cafeLink = rests.toLowerCase()
    cafeValues.state.stateName = req.body.state.stateName;
    cafeValues.state.stateLink = req.body.state.stateLink;
    cafeValues.district.districtName = req.body.district.districtName;
    cafeValues.district.districtLink = req.body.district.districtLink;
    cafeValues.fullAddress = req.body.fullAddress;
    cafeValues.mobileNo = req.body.mobileNo;
    cafeValues.whatsAppNo = req.body.whatsAppNo;
    cafeValues.emailId = req.body.emailId;

    //Do database stuff
if(
  req.body.cafeName == undefined || req.body.cafeName == "" ||
  req.body.cafeLink == undefined || req.body.cafeLink == ""
){

  res.json({
    message: "Cafe name, cafeLink are Required field",
    variant: "error"
})  
    } else if(
        req.body.state?.stateName == undefined || req.body.state?.stateName == "" ||
        req.body.state?.stateLink == undefined || req.body.state?.stateLink == "" ||
        req.body.district?.districtName == undefined || req.body.district?.districtName == "" ||
        req.body.district?.districtLink == undefined || req.body.district?.districtLink == ""
    ){
        res.json({
            message: "state and district is Required field",
            variant: "error"
        }) 
    }
    
    else {
    
          Cafe.findOne({
            cafeName: cafeValues.cafeName
          })
            .then(cafe => {
              //Username already exists
              if (cafe) {
                res.json({
                  message: "Title Already exist ",
                  variant: "error"
                });
              } else {
                Cafe.findOne({
                  cafeLink: cafeValues.cafeLink
                })
                  .then(cafe => {
                    //Username already exists
                    if (cafe) {
                      res.json({
                        message: "cafeLink Already exist ",
                        variant: "error"
                      });
                    } else {
                      new Cafe(cafeValues)
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
//@route    /api/v1/addition/cafe/allcafe
// @desc    route for getting all data from  cafe
// @access  PRIVATE

router.get(
  "/allcafe",
  // passport.authenticate("jwt", { session: false }),
  async(req, res) => {
   let allData = await Cafe.aggregate(
        [
            {$project:{cafeName:1,fullAddress:1}}
        ]
    )   .catch(err =>
        res
          .status(404)
          .json({ message: "No Cafe Found", variant: "error" })
      );
      res.json(allData)
   
  }
);

// @type    get
//@route    /api/v1/addition/cafe/get/:id
// @desc    route to get single cafe by id
// @access  PRIVATE
router.get(
  "/get/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Cafe.findOne({
      _id: req.params.id
    }).then(Cafe => res.json(Cafe))
    .catch(err => res.json({message: "Problem in finding With this Id", variant: "error"}));
  }
);

// @type    POST
//@route    /api/v1/addition/cafe/:id
// @desc    route to update/edit cafe
// @access  PRIVATE
async function updateMe(req,res,cafeValues){

  Cafe.findOneAndUpdate(
    { _id: req.params.id },
    { $set: cafeValues },
    { new: true }
  )
    .then(cafe => {
      if (cafe){
        res.json({ message: "Updated successfully!!", variant: "success" })

      } else {
        res.json({ message: "Id not found", variant: "error" })

      }
    }        
    )
    .catch(err =>
      console.log("Problem in updating cafe value" + err)
    );
}

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {

    
    const cafeValues = {
        state:{},
        district:{},
        visibility:{}
    };
    cafeValues.user = req.user.id;
    if(req.body.visibility?.name)cafeValues.visibility.name = req.body.visibility.name;
    if(req.body.visibility?.id)cafeValues.visibility.id = req.body.visibility.id;
    console.log(req.body.isVerified)
    if(req.body.isVerified == true || req.body.isVerified == false)cafeValues.isVerified = req.body.isVerified;

    if(req.body.cafeName)cafeValues.cafeName = req.body.cafeName;
//cafeLink start
if(req.body.cafeLink)
   { var strs = req.body.cafeLink;
    var rests = strs.replace(/  | |   |    |      /gi, function (x) {
      return  "";
    });
    cafeValues.cafeLink = rests.toLowerCase()}
    if(req.body.state.stateName)cafeValues.state.stateName = req.body.state.stateName;
    if(req.body.state.stateLink)cafeValues.state.stateLink = req.body.state.stateLink;
    if(req.body.district.districtName)cafeValues.district.districtName = req.body.district.districtName;
    if(req.body.district.districtLink)cafeValues.district.districtLink = req.body.district.districtLink;
    if(req.body.fullAddress)cafeValues.fullAddress = req.body.fullAddress;
    if(req.body.mobileNo)cafeValues.mobileNo = req.body.mobileNo;
    if(req.body.whatsAppNo)cafeValues.whatsAppNo = req.body.whatsAppNo;
    if(req.body.emailId)cafeValues.emailId = req.body.emailId;


    Cafe.findOne({
        cafeName: cafeValues.cafeName
      })
        .then(cafe => {
          //Username already exists
          if (cafe && cafe._id != req.params.id) {
            res.json({
              message: "Title Already exist ",
              variant: "error"
            });
          } else {
            Cafe.findOne({
              cafeLink: cafeValues.cafeLink
            })
              .then(cafe => {
                //Username already exists
                if (cafe&& cafe._id != req.params.id) {
                  res.json({
                    message: "cafeLink Already exist ",
                    variant: "error"
                  });
                } else {
updateMe(req,res,cafeValues)
          
                }})
                .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));  



}
);

///////
// /api/v1/addition/cafe/delete/:id
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    const id = req.params.id;
    Cafe.findOne({ _id: id }).then(cafeData => {
      if (cafeData) {
        Cafe.findOneAndDelete({ _id: id })
          .then(() =>
            res.json({ message: "Deleted successfully", variant: "success" })
          )
          .catch(err =>
            res.json("Failed to delete due to this error - " + err)
          );
      } else {
        res
          .status(400)
          .json({ message: "cafe Not Found", variant: "error" });
      }
    });
 
  }
);

// @type    GET
//@route    /api/v1/addition/cafe/allcafe/:searchcafe
// @desc    route for searching of cafe from searchbox using any text
// @access  PRIVATE
router.get(
  "/allcafe/:searchcafe",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {

    const search = req.params.searchcafe;

    if (isNaN(search)) {
        let allData = await Cafe.aggregate(
            [
                {$match:{
                    cafeName: new RegExp(search, "i")
                  }},
                {$project:{cafeName:1,fullAddress:1}}
            ]
        )   .catch(err =>
            res
              .status(404)
              .json({ message: "No Cafe Found", variant: "error" })
          );
          res.json(allData)

    } 



  }
);

// @type    GET
//@route    /api/v1/addition/cafe/allCatForPublic
// @desc    route for getting all data from  cafe
// @access  PRIVATE

router.get(
  "/allCafeForPublic/byDistrict/:districtLink",
  // passport.authenticate("jwt", { session: false }),
  async(req, res) => {

    let allData = await Cafe.aggregate(
        [
            {$match:{"district.districtLink" : req.params.districtLink}},
        ]
    )   .catch(err =>
        res
          .status(404)
          .json({ message: "No Cafe Found", variant: "error" })
      );
      res.json(allData)
  }
);


module.exports = router;
