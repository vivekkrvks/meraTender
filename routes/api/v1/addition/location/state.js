const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load State.js Model
const State = require("../../../../../models/Addition/Location/State");

// @type    POST
//@route    /api/v1/addition/location/state/
// @desc    route for SAVING data for state
// @access  PRIVATE
router.post(
  "/",
   passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    
    const stateValues = {
    };
    stateValues.user = req.user.id;
    stateValues.stateName = req.body.stateName;
//stateLink start

    var strs = req.body.stateLink;
    var rests = strs.replace(/  | |   |    |      /gi, function (x) {
      return  "";
    });
    stateValues.stateLink = rests.toLowerCase()



    //Do database stuff
if(
  req.body.stateName == undefined || req.body.stateName == "" ||
  req.body.stateLink == undefined || req.body.stateLink == ""
){

  res.json({
    message: "Title, stateLink are Required field",
    variant: "error"
})  
    } 
    
    else {
    
          State.findOne({
            stateName: stateValues.stateName
          })
            .then(state => {
              //Username already exists
              if (state) {
                res.json({
                  message: "Title Already exist ",
                  variant: "error"
                });
              } else {
                State.findOne({
                  stateLink: stateValues.stateLink
                })
                  .then(state => {
                    //Username already exists
                    if (state) {
                      res.json({
                        message: "stateLink Already exist ",
                        variant: "error"
                      });
                    } else {
                      new State(stateValues)
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
//@route    /api/v1/addition/location/state/allstate
// @desc    route for getting all data from  state
// @access  PRIVATE

router.get(
  "/allstate",
  // passport.authenticate("jwt", { session: false }),
  async(req, res) => {
   let allData = await State.aggregate(
        [
            {$project:{stateName:1,stateLink:1}}
        ]
    )   .catch(err =>
        res
          .status(404)
          .json({ message: "No State Found", variant: "error" })
      );
      res.json(allData)
   
  }
);

// @type    get
//@route    /api/v1/addition/location/state/get/:id
// @desc    route to get single state by id
// @access  PRIVATE
router.get(
  "/get/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    State.findOne({
      _id: req.params.id
    }).then(State => res.json(State))
    .catch(err => res.json({message: "Problem in finding With this Id", variant: "error"}));
  }
);

// @type    POST
//@route    /api/v1/addition/location/state/:id
// @desc    route to update/edit state
// @access  PRIVATE
async function updateMe(req,res,stateValues){

  State.findOneAndUpdate(
    { _id: req.params.id },
    { $set: stateValues },
    { new: true }
  )
    .then(state => {
      if (state){
        res.json({ message: "Updated successfully!!", variant: "success" })

      } else {
        res.json({ message: "Id not found", variant: "error" })

      }
    }        
    )
    .catch(err =>
      console.log("Problem in updating state value" + err)
    );
}

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {

    
    const stateValues = {  
    };
    stateValues.user = req.user.id;
    if(req.body.stateName)stateValues.stateName = req.body.stateName;
if(req.body.description)stateValues.description = req.body.description;

updateMe(req,res,stateValues)

}
);

///////
// /api/v1/addition/location/state/delete/:id
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    const id = req.params.id;
    State.findOne({ _id: id }).then(stateData => {
      if (stateData) {
        State.findOneAndDelete({ _id: id })
          .then(() =>
            res.json({ message: "Deleted successfully", variant: "success" })
          )
          .catch(err =>
            res.json("Failed to delete due to this error - " + err)
          );
      } else {
        res
          .status(400)
          .json({ message: "state Not Found", variant: "error" });
      }
    });
 
  }
);

// @type    GET
//@route    /api/v1/addition/location/state/allstate/:searchstate
// @desc    route for searching of state from searchbox using any text
// @access  PRIVATE
router.get(
  "/allstate/:searchstate",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {

    const search = req.params.searchstate;

    if (isNaN(search)) {
        let allData = await State.aggregate(
            [
                {$match:{
                    stateName: new RegExp(search, "i")
                  }},
                {$project:{stateName:1,stateLink:1}}
            ]
        )   .catch(err =>
            res
              .status(404)
              .json({ message: "No State Found", variant: "error" })
          );
          res.json(allData)

    } 



  }
);

// @type    GET
//@route    /api/v1/addition/location/state/allCatForPublic
// @desc    route for getting all data from  state
// @access  PRIVATE

router.get(
  "/allStateForPublic",
  // passport.authenticate("jwt", { session: false }),
  async(req, res) => {

    let allData = await State.aggregate(
        [
            {$project:{stateName:1,stateLink:1}}
        ]
    )   .catch(err =>
        res
          .status(404)
          .json({ message: "No State Found", variant: "error" })
      );
      res.json(allData)
  }
);


module.exports = router;
