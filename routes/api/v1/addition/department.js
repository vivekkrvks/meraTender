const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load Department.js Model
const Department = require("../../../../models/Addition/Department");

// @type    POST
//@route    /api/v1/addition/department/
// @desc    route for SAVING data for department
// @access  PRIVATE
router.post(
  "/",
   passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    
    const departmentValues = {
      logo:{}
    };
    departmentValues.user = req.user.id;
    departmentValues.creationDate = new Date();
    departmentValues.departmentName = req.body.departmentName;
//link start

    var strs = req.body.link;
    var rests = strs.replace(/  | |   |    |      /gi, function (x) {
      return  "";
    });

    departmentValues.link = rests.toLowerCase()
    departmentValues.logo.url = req.body.logoUrl;
    departmentValues.logo.publicId = req.body.logoId;
    departmentValues.description = req.body.description;


    //Do database stuff
if(
  req.body.departmentName == undefined || req.body.departmentName == "" ||
  req.body.link == undefined || req.body.link == ""
){

  res.json({
    message: "Title, link are Required field",
    variant: "error"
})  
    } 
   
    
    else {
    
          Department.findOne({
            departmentName: departmentValues.departmentName
          })
            .then(department => {
              //Username already exists
              if (department) {
                res.json({
                  message: "Title Already exist ",
                  variant: "error"
                });
              } else {
                Department.findOne({
                  link: departmentValues.link
                })
                  .then(department => {
                    //Username already exists
                    if (department) {
                      res.json({
                        message: "link Already exist ",
                        variant: "error"
                      });
                    } else {
                      new Department(departmentValues)
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
//@route    /api/v1/addition/department/alldepartment
// @desc    route for getting all data from  department
// @access  PRIVATE

router.get(
  "/alldepartment",
  // passport.authenticate("jwt", { session: false }),
  async(req, res) => {
   let allData = await Department.aggregate(
        [
            {$project:{departmentName:1,description:1}}
        ]
    )   .catch(err =>
        res
          .status(404)
          .json({ message: "No Department Found", variant: "error" })
      );
      res.json(allData)
   
  }
);

// @type    get
//@route    /api/v1/addition/department/get/:id
// @desc    route to get single department by id
// @access  PRIVATE
router.get(
  "/get/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Department.findOne({
      _id: req.params.id
    }).then(Department => res.json(Department)).catch(err => res.json({message: "Problem in finding With this Id", variant: "error"}));
  }
);

// @type    POST
//@route    /api/v1/addition/department/:id
// @desc    route to update/edit department
// @access  PRIVATE
async function updateMe(req,res,departmentValues){

  Department.findOneAndUpdate(
    { _id: req.params.id },
    { $set: departmentValues },
    { new: true }
  )
    .then(department => {
      if (department){
        res.json({ message: "Updated successfully!!", variant: "success" })

      } else {
        res.json({ message: "Id not found", variant: "error" })

      }
    }        
    )
    .catch(err =>
      console.log("Problem in updating department value" + err)
    );
}

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {

    
    const departmentValues = {  
    logo:{} };
    departmentValues.user = req.user.id;

if(req.body.logoUrl)departmentValues.logo.url = req.body.logoUrl;
if(req.body.logoId)departmentValues.logo.publicId = req.body.logoId;
if(req.body.description)departmentValues.description = req.body.description;

updateMe(req,res,departmentValues)

}
);

///////
// /api/v1/addition/department/delete/:id
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    const id = req.params.id;
    Department.findOne({ _id: id }).then(catData => {
      if (catData) {
        Department.findOneAndDelete({ _id: id })
          .then(() =>
            res.json({ message: "Deleted successfully", variant: "success" })
          )
          .catch(err =>
            res.json("Failed to delete due to this error - " + err)
          );
      } else {
        res
          .status(400)
          .json({ message: "department Not Found", variant: "error" });
      }
    });
 
  }
);

// @type    GET
//@route    /api/v1/addition/department/alldepartment/:searchdepartment
// @desc    route for searching of department from searchbox using any text
// @access  PRIVATE
router.get(
  "/alldepartment/:searchdepartment",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {

    const search = req.params.searchdepartment;
console.log("search")
console.log(search)
    if (isNaN(search)) {
        let allData = await Department.aggregate(
            [
                {$match:{
                    departmentName: new RegExp(search, "i")
                  }},
                {$project:{departmentName:1,description:1}}
            ]
        )   .catch(err =>
            res
              .status(404)
              .json({ message: "No Department Found", variant: "error" })
          );
          res.json(allData)

    } else {

    }



  }
);

// @type    GET
//@route    /api/v1/addition/department/allCatForPublic
// @desc    route for getting all data from  department
// @access  PRIVATE

router.get(
  "/allDepForPublic",
  // passport.authenticate("jwt", { session: false }),
  async(req, res) => {

      let departmentData = await Department.aggregate([
       {$project: { departmentName:1,
        link:1,
        logo:1,
          }  
         }    
       ]).exec()

    res.json(departmentData)
  }
);


module.exports = router;
