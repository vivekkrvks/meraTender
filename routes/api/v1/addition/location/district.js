const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load District.js Model
const District = require("../../../../../models/Addition/Location/District");

// @type    POST
//@route    /api/v1/addition/location/district/
// @desc    route for SAVING data for district
// @access  PRIVATE
router.post(
  "/",
   passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    
    const districtValues = {
        state:{}
    };
    districtValues.user = req.user.id;
    districtValues.districtName = req.body.districtName;
//districtLink start

    var strs = req.body.districtLink;
    var rests = strs.replace(/  | |   |    |      /gi, function (x) {
      return  "";
    });
    districtValues.districtLink = rests.toLowerCase()
    districtValues.state.stateName = req.body.state.stateName;
    districtValues.state.stateLink = req.body.state.stateLink;




    //Do database stuff
if(
  req.body.districtName == undefined || req.body.districtName == "" ||
  req.body.districtLink == undefined || req.body.districtLink == ""
){

  res.json({
    message: "Title, districtLink are Required field",
    variant: "error"
})  
    } else if(
        req.body.state?.stateName == undefined || req.body.state?.stateName == "" ||
        req.body.state?.stateLink == undefined || req.body.state?.stateLink == ""
    ){
        res.json({
            message: "state is Required field",
            variant: "error"
        }) 
    }
    
    else {
    
          District.findOne({
            districtName: districtValues.districtName
          })
            .then(district => {
              //Username already exists
              if (district) {
                res.json({
                  message: "Title Already exist ",
                  variant: "error"
                });
              } else {
                District.findOne({
                  districtLink: districtValues.districtLink
                })
                  .then(district => {
                    //Username already exists
                    if (district) {
                      res.json({
                        message: "districtLink Already exist ",
                        variant: "error"
                      });
                    } else {
                      new District(districtValues)
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
//@route    /api/v1/addition/location/district/alldistrict
// @desc    route for getting all data from  district
// @access  PRIVATE

router.get(
  "/alldistrict",
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
// @type    GET
//@route    /api/v1/addition/location/district/alldistrict
// @desc    route for getting all data from  district
// @access  PRIVATE

router.get(
  "/bystate/:stateLink",
  // passport.authenticate("jwt", { session: false }),
  async(req, res) => {
    let stateLink=req.params.stateLink;
   let allData = await District.aggregate(
        [
            {$match:{"state.stateLink":stateLink}},
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

// @type    get
//@route    /api/v1/addition/location/district/get/:id
// @desc    route to get single district by id
// @access  PRIVATE
router.get(
  "/get/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    District.findOne({
      _id: req.params.id
    }).then(District => res.json(District))
    .catch(err => res.json({message: "Problem in finding With this Id", variant: "error"}));
  }
);

// @type    POST
//@route    /api/v1/addition/location/district/:id
// @desc    route to update/edit district
// @access  PRIVATE
async function updateMe(req,res,districtValues){

  District.findOneAndUpdate(
    { _id: req.params.id },
    { $set: districtValues },
    { new: true }
  )
    .then(district => {
      if (district){
        res.json({ message: "Updated successfully!!", variant: "success" })

      } else {
        res.json({ message: "Id not found", variant: "error" })

      }
    }        
    )
    .catch(err =>
      console.log("Problem in updating district value" + err)
    );
}

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {

    
    const districtValues = {  
        state:{}
    };
    districtValues.user = req.user.id;
    if(req.body.districtName)districtValues.districtName = req.body.districtName;
    if(req.body.state?.stateName)districtValues.state.stateName = req.body.state.stateName;
    if(req.body.state?.stateLink)districtValues.state.stateLink = req.body.state.stateLink;

updateMe(req,res,districtValues)

}
);

///////
// /api/v1/addition/location/district/delete/:id
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    const id = req.params.id;
    District.findOne({ _id: id }).then(districtData => {
      if (districtData) {
        District.findOneAndDelete({ _id: id })
          .then(() =>
            res.json({ message: "Deleted successfully", variant: "success" })
          )
          .catch(err =>
            res.json("Failed to delete due to this error - " + err)
          );
      } else {
        res
          .status(400)
          .json({ message: "district Not Found", variant: "error" });
      }
    });
 
  }
);

// @type    GET
//@route    /api/v1/addition/location/district/alldistrict/:searchdistrict
// @desc    route for searching of district from searchbox using any text
// @access  PRIVATE
router.get(
  "/alldistrict/:searchdistrict",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {

    const search = req.params.searchdistrict;

    if (isNaN(search)) {
        let allData = await District.aggregate(
            [
                {$match:{
                    districtName: new RegExp(search, "i")
                  }},
                {$project:{districtName:1,districtLink:1}}
            ]
        )   .catch(err =>
            res
              .status(404)
              .json({ message: "No District Found", variant: "error" })
          );
          res.json(allData)

    } 



  }
);

// @type    GET
//@route    /api/v1/addition/location/district/allCatForPublic
// @desc    route for getting all data from  district
// @access  PRIVATE

router.get(
  "/allDistrictForPublic",
  // passport.authenticate("jwt", { session: false }),
  async(req, res) => {

    let allData = await District.aggregate(
        [
            {$project:{districtName:1,districtLink:1,state:1}}
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
