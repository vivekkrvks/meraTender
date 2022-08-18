const express = require("express");
const router = express.Router();
const passport = require("passport");

const img = require("../../../../setup/myimageurl")

//Load User Model
const User = require("../../../../models/User");

//Load Price.js Model
const Price = require("../../../../models/Addition/Price");

// @type    POST
//@route    /api/v1/addition/price/
// @desc    route for SAVING data for price
// @access  PRIVATE
router.post(
  "/",
   passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    
    const priceValues = {
    
    };
    priceValues.user = req.user.id;
    priceValues.period = req.body.period;
    priceValues.perInDays = req.body.perInDays;
    priceValues.mrp = req.body.mrp;
    priceValues.sellingPrice = req.body.sellingPrice;




    //getting last voucher number and making new one 

    //Do database stuff
if(
  req.body.perInDays == undefined || req.body.perInDays == "" ||
  req.body.period == undefined || req.body.period == "" ||
  req.body.mrp == undefined || req.body.mrp == "" ||
  req.body.sellingPrice == undefined || req.body.sellingPrice == ""
){

  res.json({
    message: "Some Mandatory parameter is mising",
    variant: "error"
})

  
    }    
    
    else {
    
          Price.findOne({
            perInDays: priceValues.perInDays
          })
            .then(price => {
              //Username already exists
              if (price) {
                res.json({
                  message: "Same period in day Already exist ",
                  variant: "error"
                });
              } else {
                Price.findOne({
                    mrp: priceValues.mrp
                })
                  .then(price => {
                    //Username already exists
                    if (price) {
                      res.json({
                        message: "MRP Already exist ",
                        variant: "error"
                      });
                    } else {
                      new Price(priceValues)
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
//@route    /api/v1/addition/price/allprice
// @desc    route for getting all data from  price
// @access  PRIVATE

router.get(
  "/allprice",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Price.find({})
      .sort({ date: -1 })
      .then(Price => res.json(Price))
      .catch(err =>
        res
          .status(404)
          .json({ message: "No Price Found", variant: "error" })
      );
  }
);

// @type    get
//@route    /api/v1/addition/price/get/:id
// @desc    route to get single price by id
// @access  PRIVATE
router.get(
  "/get/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Price.findOne({
      _id: req.params.id
    }).then(Price => res.json(Price)).catch(err => res.json({message: "Problem in finding With this Id", variant: "error"}));
  }
);

// @type    POST
//@route    /api/v1/addition/price/:id
// @desc    route to update/edit price
// @access  PRIVATE
async function updateMe(req,res,priceValues){

  Price.findOneAndUpdate(
    { _id: req.params.id },
    { $set: priceValues },
    { new: true }
  )
    .then(price => {
      if (price){
        res.json({ message: "Updated successfully!!", variant: "success" })

      } else {
        res.json({ message: "Id not found", variant: "error" })

      }
    }        
    )
    .catch(err =>
      console.log("Problem in updating price value" + err)
    );
}

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {

    
    const priceValues = {    image:{},
    logo:{} };
    priceValues.user = req.user.id;
    if(req.body.priceName)priceValues.priceName = req.body.priceName;
   //link start
    if(req.body.link){
      var stru = req.body.link;
      var restu = stru.replace(/  | |   |    |      /gi, function (x) {
        return  "";
      });
      priceValues.link = restu.toLowerCase()
    };

//link end

if(req.body.imageUrl)priceValues.image.url = req.body.imageUrl;
if(req.body.imageId)priceValues.image.publicId = req.body.imageId;
if(req.body.logoUrl)priceValues.logo.url = req.body.logoUrl;
if(req.body.logoId)priceValues.logo.publicId = req.body.logoId;

    Price.findOne({priceName: priceValues.priceName})
          .then(price => {
            if(price){
              caId = price._id;
              if (caId == req.params.id) {
                Price.findOne({link:priceValues.link || "df#$@g#*&"})     
          .then(price => {
            if(price) {
              const catId = price._id;
              if (catId == req.params.id){
                updateMe(req,res,priceValues)
              } else {
res.json({message: "This Link Already Exist", variant: "error"})

              }

            }else{
              updateMe(req,res,priceValues)

            }
          })
          .catch(err => console.log( `error in link matching ${err}`))

              }else {
                  res.json ({message: "This title already exist", variant : "error"})

              }
            } else {

              Price.findOne({link:priceValues.link || "df#$@g#*&"})     
              .then(price => {
                if(price) {
                  const catId = price._id;
                  if (catId == req.params.id){
                    updateMe(req,res,priceValues)
                  } else {
    res.json({message: "This Link Already Exist", variant: "error"})
    
                  }
    
                }else{
                 updateMe(req,res,priceValues)
    
                }
              })
              .catch(err => console.log( `error in link matching ${err}`))

            }
          })
          .catch(err => console.log(`Error in title matching ${err}`))

}
);

///////
// /api/v1/addition/price/delete/:id
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    const id = req.params.id;
    Price.findOne({ _id: id }).then(catData => {
      if (catData) {
        Price.findOneAndDelete({ _id: id })
          .then(() =>
            res.json({ message: "Deleted successfully", variant: "success" })
          )
          .catch(err =>
            res.json("Failed to delete due to this error - " + err)
          );
      } else {
        res
          .status(400)
          .json({ message: "price Not Found", variant: "error" });
      }
    });
 
  }
);

// @type    GET
//@route    /api/v1/addition/price/allprice/:searchprice
// @desc    route for searching of price from searchbox using any text
// @access  PRIVATE
router.get(
  "/allprice/:searchprice",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var des = req.user.designation;
    var des1 = "Admin";
    const search = req.params.searchprice;

    if (des == des1   ) {
    if (isNaN(search)) {
      Price.find({
        priceName: new RegExp(search, "i")
      })
      .then(Price => res.json(Price))
      .catch(err => res.json({
        message: "Problem in Searching" + err, variant: "success"
      }));
    } 

  } else {
    res.json({ message: "You are not Authorised", variant: "error" })
  }

  }
);

// @type    GET
//@route    /api/v1/addition/price/allCatForPublic
// @desc    route for getting all data from  price
// @access  PRIVATE

router.get(
  "/allCatForPublic",
  // passport.authenticate("jwt", { session: false }),
  async(req, res) => {

      let priceData = await Price.aggregate([
       {$project: { priceName:1,
        link:1,
        logo:1,
          }  
         }    
       ]).exec()
       for(let i=0;i<priceData.length;i++){
        let catLink = priceData[i].link;
        let subPriceData = await SubPrice.aggregate([
          {$match: {"price.link": catLink}},
          {$project: { id:1,
             }  
            }    
          ]).exec()
          priceData[i].subPriceLenght = subPriceData.length;
       }
    res.json(priceData)
  }
);


module.exports = router;
