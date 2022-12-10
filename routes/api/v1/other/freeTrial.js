const express = require("express");
const router = express.Router();
const passport = require("passport");

// /api/v1/other/freeTrial/checkAndStart

router.post ("/checkAndStart",
passport.authenticate("jwt", { session: false }),
async(req, res) => { 
  console.log("hi")
if(req.user.freeTrialUsed == true){
        res.json({"message":"We only allow free trial once per user","variant":"error"})
}else {
  let dateData = await getPrice(req,res,30)

    let SucTransactionValues = {
        user: req.user.id,                     
        status:"success",
   
    // // No need of frontend
    
    paymentCompany: "NA",

    "validity.from":dateData.validity.from,
    "validity.to":dateData.validity.to,
    lastFormatedDay:dateData.lastFormatedDay,
    referalCode:"1FREEMONTH",


    
      "paymentDetails.TXNID":"freeTrial",
      "paymentDetails.BANKTXNID":"freeTrial",
      "paymentDetails.ORDERID":"freeTrial",
      "paymentDetails.TXNAMOUNT":"00",
      "paymentDetails.STATUS":"success",
      "paymentDetails.TXNTYPE":"freeTrial",
      "paymentDetails.GATEWAYNAME":"freeTrial",
      "paymentDetails.RESPCODE":"freeTrial",
      "paymentDetails.RESPMSG":"freeTrial",
      "paymentDetails.BANKNAME":"freeTrial",
      "paymentDetails.MID":"freeTrial",
      "paymentDetails.PAYMENTMODE":"freeTrial",
      "paymentDetails.REFUNDAMT":"freeTrial",
      "paymentDetails.TXNDATE":"freeTrial",

      priceId:dateData.priceId,
      mrp:dateData.mrp,
      sellingPrice:dateData.sellingPrice,
    period:dateData.period,

    designation: dateData.designation,
    //
    

     }
     


     new SucTransaction(SucTransactionValues)
     .save()  
     .then(console.log("i was done"))                      
     .catch(err => console.log(err))
     /////////////////////////////////////
     let AllTransactionValues = {                         
        status:"success"
       }
       let UserValue = {
        validity:dateData.lastFormatedDay,
        isProUser:true
       }
User.findOneAndUpdate({_id : dateData.user},
  { $set: UserValue },
  { new: true })
  .then(console.log(dateData.user))
  .catch(err => console.log(err))

AllTransaction.findOneAndUpdate({_id : allTranId},
  { $set: AllTransactionValues },
  { new: true })
  .catch(err => console.log(err))
// updating amount in User model and making a transaction
     /////
}
})




async function getPrice(req,res,dayToAdd){ 
    var someDate = new Date();
    var numberOfDaysToAdd = dayToAdd;
    someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 
 
    var dd = someDate.getDate();
     var mm = someDate.getMonth() + 1;
     var y = someDate.getFullYear();
 if(mm<=9) {
     mm = "0"+mm
 }
 if(dd<=9) {
     dd = "0"+dd
 }
 
   var toDate = dd + '/'+ mm + '/'+ y;
var lastFormatedDay = +(y + ''+  mm + '' + dd)

    var today = new Date();
 
    var dd1 = today.getDate();
     var mm1 = today.getMonth() + 1;
     var y1 = today.getFullYear();
 if(mm1<=9) {
     mm1 = "0"+mm1
 }
 if(dd1<=9) {
     dd1 = "0"+dd1
 }
   var fromDate = dd1 + '/'+ mm1 + '/'+ y1;

   let dataToAdd = {validity:{}}
   dataToAdd.user = req.user.id
   dataToAdd.paymentCompany = "free1month"
   dataToAdd.validity.from = fromDate
   dataToAdd.validity.to = toDate
   dataToAdd.lastFormatedDay = lastFormatedDay
   dataToAdd.priceId = "na"
   dataToAdd.mrp = 499
   dataToAdd.sellingPrice = 0
   dataToAdd.period = "30 Days"

 new AllTransaction(dataToAdd).save()
 .then()
 .catch(err => console.log(err))
return dataToAdd
}

module.exports = router;