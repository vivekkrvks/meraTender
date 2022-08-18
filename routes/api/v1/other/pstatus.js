const express = require("express");
const router = express.Router();
const passport = require("passport");
var mongoose = require('mongoose');


var mongoose = require('mongoose');
const AllTransaction = require("../../../../models/ProUser/Payment/AllTransaction");

// /api/v1/other/pstatus/:sorf/:id

    router.get(
        "/:sorf/:id",
        async (req,res) => {
            console.log("i am called")

            if(mongoose.Types.ObjectId.isValid(req.params.id) == false && req.params.sorf == "fail"){
    
                
                const data = [
                    { name: "Amount", value: "000" },
                    { name: "Ref. No.", value: "000" },
                    { name: "Payment Date", value: "00/00/0000" },
                    { name: "Access Type", value: "Unknown" },
                    { name: "Reason of Failure", value: "Payment Id not valid" },
        
                ];
        
          res.json(data)
               
            }else {
    
    
    
    
          const sorf = req.params.sorf
          const id = req.params.id
                 if(sorf == "fail"){
          
                  AllTransaction.findOne({_id: id}).then(
                      cpay => {
                          if (cpay){
                              let reason 
                              if (cpay.paymentDetails.RESPMSG == undefined || 
                                  cpay.paymentDetails.RESPMSG == "") {
                                     reason =  "Payment failed due to a technical error. Please try after some time."
          
                                  }else {
                                      reason = cpay.paymentDetails.RESPMSG 
          
                                  }
                              const data = [
                                  { name: "Amount", value: cpay.sellingPrice },
                                  { name: "Ref. No.", value: id },
                                  { name: "Payment Date", value: cpay.validity.from },
                                  { name: "Access Type", value: "All Access" },
                                  { name: "Reason of Failure", value: reason },
          
                              ];
          
                        res.json(data)
                          
                          } else {
                              const data = [
                                  { name: "Amount", value: "000" },
                                  { name: "Ref. No.", value: "000" },
                                  { name: "Payment Date", value: "00/00/0000" },
                                  { name: "Access Type", value: "Unknown" },
                                  { name: "Reason of Failure", value: "Payment Id not valid" },
          
                              ];
          
                        res.json(data)
                          }
                      }
                  ).catch(err => console.log(err))
          
                 }else {
          SucTransaction.findOne({"paymentDetails.ORDERID":id})
          .then(upay => {
              if(upay){
                  const data = [
                      { name: "Amount", value: upay.paymentDetails.TXNAMOUNT },
                      { name: "Ref. No.", value:  upay.paymentDetails.TXNID },
                      { name: "Payment Date", value: upay.validity.from },
                      { name: "Valid Upto", value: upay.validity.to },
                      { name: "Access Type", value: "All Access" },
          
                  ];
          
            res.json(data)
          
                  
              }else {
                  const data = [
                      { name: "Amount", value: "000" },
                      { name: "Ref. No.", value: "000" },
                      { name: "Payment Date", value: "00/00/0000" },
                      { name: "Access Type", value: "Unknown" },
                      { name: "Reason of Failure", value: "Payment Id not valid" },
          
                  ];
          
            res.json(data)
              }
          })
          
                 }
            }
    
         
        }
    );






module.exports = router;
