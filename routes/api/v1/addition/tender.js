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
        visibility:{},
        department:{},
        state:{},
        district:{},
        file1:{},
        file2:{},
        coverImg:{},
    };
    tenderValues.user = req.user.id;
    tenderValues.creationDate = new Date();

    tenderValues.visibility.name = req.body.visibility.name;
    tenderValues.visibility.id = req.body.visibility.id;
    tenderValues.tenderNumber = req.body.tenderNumber;
    tenderValues.tenderTitle = req.body.tenderTitle;
    tenderValues.openingDate = req.body.openingDate;
    tenderValues.closingDate = req.body.closingDate;
    tenderValues.tenderAmount = req.body.tenderAmount;
    tenderValues.department.departmentName = req.body.department.departmentName;
    tenderValues.department.departmentLink = req.body.department.departmentLink;
    tenderValues.state.stateName = req.body.state.stateName;
    tenderValues.state.stateLink = req.body.state.stateLink;
    tenderValues.district.districtName = req.body.district.districtName;
    tenderValues.district.districtLink = req.body.district.districtLink;
    tenderValues.file1.url = req.body.file1Url;
    tenderValues.file1.publicId = req.body.file1Id;
    tenderValues.file2.url = req.body.file2Url;
    tenderValues.file2.publicId = req.body.file2Id;
    tenderValues.shortDescription = req.body.shortDescription;

    tenderValues.isAdvance = req.body.isAdvance;
    //link start

    var strs = req.body.tenderLink;
    var rests = strs.replace(/  | |   |    |      /gi, function (x) {
      return  "";
    });
    tenderValues.tenderLink = rests.toLowerCase();
    tenderValues.coverImg.url = req.body.coverImgUrl;
    tenderValues.coverImg.publicId = req.body.coverImgId;
    tenderValues.isHtml = req.body.isHtml;
    tenderValues.longDescription = req.body.longDescription;

    //Do database stuff
if(
  req.body.tenderTitle == undefined || req.body.tenderTitle == "" ||
  tenderValues.tenderLink == undefined || tenderValues.tenderLink == ""
){

  res.json({
    message: "Title, link are Required field",
    variant: "error"
})  
    
    }  else if(
        tenderValues.department.departmentLink == undefined || tenderValues.department.departmentLink == "" || 
        tenderValues.district.districtLink == undefined || tenderValues.district.districtLink == "" 
    ){
        res.json({
            message: "Please Select Department and District",
            variant: "error"
        })  
    }
    
    else {
    
          Tender.findOne({
            tenderTitle: tenderValues.tenderTitle
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
                  link: tenderValues.tenderLink
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
            {$project:{tenderTitle:1,shortDescription:1}}
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
    }).then(Tender => (res.json(Tender))).catch(err => res.json({message: "Problem in finding With this Id", variant: "error"}));
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

  };
  if(req.user.id)tenderValues.user = req.user.id;

  if(req.body.visibility?.id){
    tenderValues.visibility = {
      id : req.body.visibility.id,
      name : req.body.visibility.name
    }
  }
  if(req.body.tenderNumber)tenderValues.tenderNumber = req.body.tenderNumber;
  if(req.body.tenderTitle)tenderValues.tenderTitle = req.body.tenderTitle;
  if(req.body.openingDate)tenderValues.openingDate = req.body.openingDate;
  if(req.body.closingDate)tenderValues.closingDate = req.body.closingDate;
  if(req.body.tenderAmount)tenderValues.tenderAmount = req.body.tenderAmount;
  if(req.body.department?.departmentLink){
    tenderValues.department ={
      departmentLink : req.body.department.departmentLink,
      departmentName : req.body.department.departmentName
    }
  }
  if(req.body.state?.stateLink){
    tenderValues.state = {
      stateLink : req.body.state.stateLink,
      stateName : req.body.state.stateName
    }
  }
  if(req.body.district?.districtLink){
    tenderValues.district = {
      districtLink : req.body.district.districtLink,
      districtName : req.body.district.districtName
    }}
  if(req.body.file1Id){
    tenderValues.file1 = {
      publicId : req.body.file1Id,
      url : req.body.file1Url
    }}
  if(req.body.file1Id == ""){
    tenderValues.file1 = {
      url: req.body.file1Url,
      publicId: req.body.file1Id
    }
  }
  if(req.body.file2Id){
    tenderValues.file2 = {
      publicId : req.body.file2Id,
      url : req.body.file2Url
    }}
  if(req.body.file2Id == ""){
    tenderValues.file2 = {
      url: req.body.file2Url,
      publicId: req.body.file2Id
    }
  }
  if(req.body.shortDescription)tenderValues.shortDescription = req.body.shortDescription;

  if(req.body.isAdvance==true || req.body.isAdvance==false )tenderValues.isAdvance = req.body.isAdvance;
  //link start
  if(req.body.tenderLink){
  var strs = req.body.tenderLink;
  var rests = strs.replace(/  | |   |    |      /gi, function (x) {
    return  "";
  });
  tenderValues.tenderLink = rests.toLowerCase();}
  if(req.body.coverImgId){
    tenderValues.coverImg = {
      publicId : req.body.coverImgId,
      url : req.body.coverImgUrl
    }}
  if(req.body.coverImgId == ""){
    tenderValues.coverImg = {
      url: req.body.coverImgUrl,
      publicId: req.body.coverImgId
    }
  }
  if(req.body.isHtml == true || req.body.isHtml == false )tenderValues.isHtml = req.body.isHtml;
  if(req.body.longDescription)tenderValues.longDescription = req.body.longDescription;   

  Tender.findOne({
    tenderTitle: tenderValues.tenderTitle
  })
    .then(tender => {
      //Username already exists
      if (tender) {
        if(tender._id != req.params.id)
        {
          res.json({
          message: "Title Already exist ",
          variant: "error"
        });
      } else {
          Tender.findOne({
            link: tenderValues.tenderLink
          })
            .then(tender => {
              //Username already exists
              if (tender) {
                if(tender._id != req.params.id){
                  res.json({
                    message: "link Already exist ",
                    variant: "error"
                  });
                } else {
                updateMe(req,res,tenderValues) 
                }             
              } else {
                updateMe(req,res,tenderValues) 
  
                
              }})
              .catch(err => console.log(err));
        }
      } else {
        Tender.findOne({
          link: tenderValues.tenderLink
        })
          .then(tender => {
            //Username already exists
            if (tender) {
              if(tender._id != req.params.id){
                res.json({
                  message: "link Already exist ",
                  variant: "error"
                });
              } else {
              updateMe(req,res,tenderValues) 
              }             
            } else {
              updateMe(req,res,tenderValues) 

              
            }})
            .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err)); 

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
                    tenderTitle: new RegExp(search, "i")
                  }},
                  {$project:{tenderTitle:1,shortDescription:1}}
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
