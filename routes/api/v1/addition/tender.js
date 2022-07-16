const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load Tender.js Model
const Tender = require("../../../../models/Addition/Tender");

// @type    POST
//@route    /api/v1/addition/tender/
// @desc    route for SAVING data for tender
// @access  PRIVATE
router.post(
  "/",
   passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    
    const tenderValues = {
        department:{},
        image:{}
    };
    tenderValues.user = req.user.id;
    tenderValues.creationDate = new Date();
    tenderValues.tenderName = req.body.tenderName;
//link start

    var strs = req.body.link;
    var rests = strs.replace(/  | |   |    |      /gi, function (x) {
      return  "";
    });
    tenderValues.openingDate = req.body.openingDate;
    tenderValues.closingDate = req.body.closingDate;
    tenderValues.tenderAmount = req.body.tenderAmount;
    tenderValues.shortDescription = req.body.shortDescription;
    tenderValues.department.departmentName = req.body.department.departmentName;
    tenderValues.department.link = req.body.department.link;
    tenderValues.state.stateName = req.body.state.stateName;
    tenderValues.state.link = req.body.state.link;
    tenderValues.district.districtName = req.body.district.districtName;
    tenderValues.district.link = req.body.district.link;
    tenderValues.file1 = req.body.file1;
    tenderValues.file2 = req.body.file2;

    tenderValues.link = rests.toLowerCase()
    tenderValues.image.url = req.body.imageUrl;
    tenderValues.image.publicId = req.body.imageId;
    tenderValues.blogBody = req.body.blogBody;


    //Do database stuff
if(
  req.body.tenderName == undefined || req.body.tenderName == "" ||
  tenderValues.link == undefined || tenderValues.link == ""
){

  res.json({
    message: "Title, link are Required field",
    variant: "error"
})  
    } else if(
        req.body.tenderAmount == undefined || req.body.tenderAmount == "" ||
        req.body.openingDate == undefined || req.body.openingDate == "" ||
        req.body.closingDate == undefined || req.body.closingDate == "" 
        
    ){
        res.json({
            message: "tender Amount opening & closing Date are Required field",
            variant: "error"
        })  
    }  else if(
        tenderValues.department.link == undefined || tenderValues.department.link == "" || 
        tenderValues.district.link == undefined || tenderValues.district.link == "" 
    ){
        res.json({
            message: "tender Amount opening & closing Date are Required field",
            variant: "error"
        })  
    }
    
    else {
    
          Tender.findOne({
            tenderName: tenderValues.tenderName
          })
            .then(tender => {
              //Username already exists
              if (tender) {
                res.json({
                  message: "Title Already exist ",
                  variant: "error"
                });
              } else {
                Tender.findOne({
                  link: tenderValues.link
                })
                  .then(tender => {
                    //Username already exists
                    if (tender) {
                      res.json({
                        message: "link Already exist ",
                        variant: "error"
                      });
                    } else {
                      new Tender(tenderValues)
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
//@route    /api/v1/addition/tender/alltender
// @desc    route for getting all data from  tender
// @access  PRIVATE

router.get(
  "/alltender",
  // passport.authenticate("jwt", { session: false }),
  async(req, res) => {
   let allData = await Tender.aggregate(
        [
            {$project:{tenderName:1,description:1}}
        ]
    )   .catch(err =>
        res
          .status(404)
          .json({ message: "No Tender Found", variant: "error" })
      );
      res.json(allData)
   
  }
);

// @type    get
//@route    /api/v1/addition/tender/get/:id
// @desc    route to get single tender by id
// @access  PRIVATE
router.get(
  "/get/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Tender.findOne({
      _id: req.params.id
    }).then(Tender => res.json(Tender)).catch(err => res.json({message: "Problem in finding With this Id", variant: "error"}));
  }
);

// @type    POST
//@route    /api/v1/addition/tender/:id
// @desc    route to update/edit tender
// @access  PRIVATE
async function updateMe(req,res,tenderValues){

  Tender.findOneAndUpdate(
    { _id: req.params.id },
    { $set: tenderValues },
    { new: true }
  )
    .then(tender => {
      if (tender){
        res.json({ message: "Updated successfully!!", variant: "success" })

      } else {
        res.json({ message: "Id not found", variant: "error" })

      }
    }        
    )
    .catch(err =>
      console.log("Problem in updating tender value" + err)
    );
}

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {

    
    const tenderValues = {
        department:{},
        image:{}
    };
    tenderValues.user = req.user.id;
    if(req.body.tenderName)tenderValues.tenderName = req.body.tenderName;

    if(req.body.openingDate)tenderValues.openingDate = req.body.openingDate;
    if(req.body.closingDate)tenderValues.closingDate = req.body.closingDate;
    if(req.body.tenderAmount)tenderValues.tenderAmount = req.body.tenderAmount;
    if(req.body.shortDescription)tenderValues.shortDescription = req.body.shortDescription;
    if(req.body.department.departmentName)tenderValues.department.departmentName = req.body.department.departmentName;
    if(req.body.department.link)tenderValues.department.link = req.body.department.link;
    if(req.body.state.stateName)tenderValues.state.stateName = req.body.state.stateName;
    if(req.body.state.link)tenderValues.state.link = req.body.state.link;
    if(req.body.district.districtName)tenderValues.district.districtName = req.body.district.districtName;
    if(req.body.district.link)tenderValues.district.link = req.body.district.link;
    if(req.body.file1)tenderValues.file1 = req.body.file1;
    if(req.body.file2)tenderValues.file2 = req.body.file2;
//link start

var strs = req.body.link;
var rests = strs.replace(/  | |   |    |      /gi, function (x) {
  return  "";
});
    if(req.body.link)tenderValues.link = rests.toLowerCase()
    if(req.body.imageUrl)tenderValues.image.url = req.body.imageUrl;
    if(req.body.imageId)tenderValues.image.publicId = req.body.imageId;
    if(req.body.blogBody)tenderValues.blogBody = req.body.blogBody;


    //Do database stuff
if(
  tenderValues.tenderName == undefined || tenderValues.tenderName == "" ||
  tenderValues.link == undefined || tenderValues.link == ""
){

  res.json({
    message: "Title, link are Required field",
    variant: "error"
})  
    } else if(
        tenderValues.tenderAmount == undefined || tenderValues.tenderAmount == "" ||
        tenderValues.openingDate == undefined || tenderValues.openingDate == "" ||
        tenderValues.closingDate == undefined || tenderValues.closingDate == "" 
        
    ){
        res.json({
            message: "tender Amount opening & closing Date are Required field",
            variant: "error"
        })  
    }  else if(
        tenderValues.department.link == undefined || tenderValues.department.link == "" || 
        tenderValues.district.link == undefined || tenderValues.district.link == "" 
    ){
        res.json({
            message: "tender Amount opening & closing Date are Required field",
            variant: "error"
        })  
    }
    
    else {

updateMe(req,res,tenderValues) }

}
);

///////
// /api/v1/addition/tender/delete/:id
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    const id = req.params.id;
    Tender.findOne({ _id: id }).then(catData => {
      if (catData) {
        Tender.findOneAndDelete({ _id: id })
          .then(() =>
            res.json({ message: "Deleted successfully", variant: "success" })
          )
          .catch(err =>
            res.json("Failed to delete due to this error - " + err)
          );
      } else {
        res
          .status(400)
          .json({ message: "tender Not Found", variant: "error" });
      }
    });
 
  }
);

// @type    GET
//@route    /api/v1/addition/tender/alltender/:searchtender
// @desc    route for searching of tender from searchbox using any text
// @access  PRIVATE
router.get(
  "/alltender/:searchtender",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {

    const search = req.params.searchtender;
console.log("search")
console.log(search)
    if (isNaN(search)) {
        let allData = await Tender.aggregate(
            [
                {$match:{
                    tenderName: new RegExp(search, "i")
                  }},
                {$project:{tenderName:1,description:1}}
            ]
        )   .catch(err =>
            res
              .status(404)
              .json({ message: "No Tender Found", variant: "error" })
          );
          res.json(allData)

    } else {

    }



  }
);




module.exports = router;
