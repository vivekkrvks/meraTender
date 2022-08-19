const checksum_lib = require('./../../../../Paytm_Web_Sample_Kit_NodeJs-master/checksum/checksum')
const https = require('https');
const keys = require('../../../../setup/myurl');

const port = process.env.PORT || 2040
const express = require("express");
const router = express.Router();
const passport = require("passport");
const axios = require("axios");

const SucTransaction = require("../../../../models/ProUser/Payment/AllTransaction");
const AllTransaction = require("../../../../models/ProUser/Payment/AllTransaction");

async function paymentsucMSG(pMobile,pEmail,response){

    let myMobile = pMobile
    let membertype = "Plus"
    let amount = response.TXNAMOUNT
    let data = {
  
      "flow_id":"5f2d8d31d6fc053aff2c5873",
      "sender" : "QULIFR",
       "recipients" : [
         {
           "mobiles":`91${myMobile}`,
           "MEMTYPE":membertype,
           "AMOUNT":amount,
         }
        ]
     }
    const config = {
      headers: {
        "authkey": "333850AfEnbZwLNW5f2d6714P1",
        "content-type": "application/json"
      }
    };
    //  console.log(data)   
     let url = 'https://api.msg91.com/api/v5/flow/';
  
    await axios.post(url, data, config)
      .then((res) => {
          // console.log(qs.stringify(data));
        //   console.log(`Status: ${res.status}`);
        //   console.log('Body: ', res.data);
      }).catch((err) => {
          console.error(err);
      });
  
  }

  // /api/v1/forPublicWeb/paytm/payment
    router.get('/payment/:random/:id',(req,res)=> {
console.log("received1")
console.log(req.params.id)
        AllTransaction.findOne({
            _id:req.params.id
        }).then(
            allData => {
                User.findOne({_id:allData.user})
                .then(myUser => {

                payIt(req,res,allData,myUser) 

                })
                .catch(Err => console.log(Err))
            }
        )
        .catch(Err => console.log(Err))
    })
    async function payIt(req,res,allData,myUser)
    {

        const allTranId = allData.id 
        const pUser = myUser._id
        const pRate = allData.sellingPrice
        const pEmail =  "email@meratender.com"
        const pMobile = myUser.mobileNo
        const priceId = allData.priceid
        const amou = allData.sellingPrice

        let params ={}
        params['CALLBACK_URL'] = `${keys.localBackend}/api/v1/forPublicWeb/paytm/callback/${allTranId}`,
        params['CHANNEL_ID'] = 'WEB',
        params['CUST_ID'] = pMobile,
        params['EMAIL'] = pEmail,
        params['INDUSTRY_TYPE_ID'] = 'Retail',
        params['MID'] = process.env.MID,
        params['MOBILE_NO'] = pMobile
        params['ORDER_ID'] = allTranId,
        params['TXN_AMOUNT'] = pRate,
        params['WEBSITE'] = 'DEFAULT';

        const Key = process.env.M_KEY
        checksum_lib.genchecksum(params,Key,function(err,checksum){
            let txn_url = "https://securegw.paytm.in/order/process"

            let form_fields = ""
            for(x in params)
            {
                form_fields += "<input type='hidden' name='"+x+"' value='"+params[x]+"'/>"

            }

            form_fields+="<input type='hidden' name='CHECKSUMHASH' value='"+checksum+"' />"

            var html = '<html><body><center><h1>Please wait! Do not refresh the page</h1></center><form method="post" action="'+txn_url+'" name="f1">'+form_fields +'</form><script type="text/javascript">document.f1.submit()</script></body></html>'
            res.writeHead(200,{'Content-Type' : 'text/html'})

            res.write(html)
            
            res.end()

        })
    }

// http://localhost:2040/api/v1/forPublicWeb/paytm/callback/62fe90704de8aba379b57fce
    router.get("/callback/:allTranId",  (req, res) => {
        const allTranId = req.params.allTranId
//    
        /* initialize an object */
        var paytmParams = {};
        
        /* Find your MID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
        paytmParams["MID"] = process.env.MID;
        
        /* Enter your order id which needs to be check status for */
        paytmParams["ORDERID"] = allTranId;
        
        /**
        * Generate checksum by parameters we have
        * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
        */

    async function get1(response,allTranId){
           if(response){
            AllTransaction.findOne({_id : allTranId})
            .then(allTran => {
                if(allTran){ 
                    let AllTransactionValues = {
                        "paymentDetails.TXNID":response.TXNID,
                        "paymentDetails.BANKTXNID":response.BANKTXNID,
                        "paymentDetails.ORDERID":response.ORDERID,
                        "paymentDetails.TXNAMOUNT":response.TXNAMOUNT,
                        "paymentDetails.STATUS":response.STATUS,
                        "paymentDetails.TXNTYPE":response.TXNTYPE,
                        "paymentDetails.GATEWAYNAME":response.GATEWAYNAME,
                        "paymentDetails.RESPCODE":response.RESPCODE,
                        "paymentDetails.RESPMSG":response.RESPMSG,
                        "paymentDetails.BANKNAME":response.BANKNAME,
                        "paymentDetails.MID":response.MID,
                        "paymentDetails.PAYMENTMODE":response.PAYMENTMODE,
                        "paymentDetails.REFUNDAMT":response.REFUNDAMT,
                        "paymentDetails.TXNDATE":response.TXNDATE,
                       }
              AllTransaction.findOneAndUpdate({_id : allTranId},
                  { $set: AllTransactionValues },
                  { new: true })
                  .catch(err => console.log(err))

                    if(response.STATUS != "TXN_SUCCESS") {
                        let AllTransactionValues = {                         
                          status:"failed"
                         }
                AllTransaction.findOneAndUpdate({_id : allTranId},
                    { $set: AllTransactionValues },
                    { new: true })
                    .catch(err => console.log(err))
                    } else {
                      let SucTransactionValues = {
                            user: allTran.user,                     
                            status:"success",
                       
                        // // No need of frontend
                        
                        paymentCompany: allTran.paymentCompany,
         
                        "validity.from":allTran.validity.from,
                        "validity.to":allTran.validity.to,
                        lastFormatedDay:allTran.lastFormatedDay,
                        referalCode:allTran.referalCode,
                  
                        paymentDetails:response,
                        
                          "paymentDetails.TXNID":response.TXNID,
                          "paymentDetails.BANKTXNID":response.BANKTXNID,
                          "paymentDetails.ORDERID":response.ORDERID,
                          "paymentDetails.TXNAMOUNT":response.TXNAMOUNT,
                          "paymentDetails.STATUS":response.STATUS,
                          "paymentDetails.TXNTYPE":response.TXNTYPE,
                          "paymentDetails.GATEWAYNAME":response.GATEWAYNAME,
                          "paymentDetails.RESPCODE":response.RESPCODE,
                          "paymentDetails.RESPMSG":response.RESPMSG,
                          "paymentDetails.BANKNAME":response.BANKNAME,
                          "paymentDetails.MID":response.MID,
                          "paymentDetails.PAYMENTMODE":response.PAYMENTMODE,
                          "paymentDetails.REFUNDAMT":response.REFUNDAMT,
                          "paymentDetails.TXNDATE":response.TXNDATE,
         
                          priceId:allTran.priceId,
                          mrp:allTran.mrp,
                          sellingPrice:allTran.sellingPrice,
                        period:allTran.period,

                        designation: allTran.designation,
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
                            validity:allTran.lastFormatedDay,
                            isProUser:true
                           }
                  User.findOneAndUpdate({_id : allTran.user},
                      { $set: UserValue },
                      { new: true })
                      .then(console.log(allTran.user))
                      .catch(err => console.log(err))

                  AllTransaction.findOneAndUpdate({_id : allTranId},
                      { $set: AllTransactionValues },
                      { new: true })
                      .catch(err => console.log(err))
// updating amount in User model and making a transaction
                         /////
                      
                        
                   
                 
            }}}
            )
            .catch(err => console.log(err))   
         
            
           }    
    }
    // get 1 function end
const Key = process.env.M_KEY
    
        checksum_lib.genchecksum(paytmParams, Key, function(err, checksum){
        
            /* put generated checksum value here */
            paytmParams["CHECKSUMHASH"] = checksum;
        
            /* prepare JSON string for request */
            var post_data = JSON.stringify(paytmParams);
        
            var options = {
        
                /* for Staging */
                // hostname: 'https://securegw.paytm.in',
        
                /* for Production */
                hostname: 'securegw.paytm.in',
        
                port: 443,
                path: '/order/status',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': post_data.length
                }
            };
            // Set up the request
            var response = "";
            var post_req = https.request(options, function(post_res) {
                post_res.on('data', function (chunk) {
                    response += chunk;
                });
        
                post_res.on('end', function(){
               
                        get1(JSON.parse(response),allTranId)
                        get2(JSON.parse(response),allTranId)
                });


            });
        
            // post the data
            post_req.write(post_data);
         
            post_req.end();

    function get2(response,allTranId){
     //   await AllTransaction.create(newPayment);
     if(response.STATUS != "TXN_SUCCESS") {
        return res.redirect(keys.localFrontend+ `/paymentverify/paytm/fail/${allTranId}`)
       } 
    else 
    {

        // paymentsucMSG(pMobile,pEmail,response)
     return res.redirect(keys.localFrontend+ `/paymentverify/paytm/success/${allTranId}`)
    };
    }
        });

          // Redirect the user to payment complete page.
     
      });







      
//function to get current price




async function getPrice(req,res,pri){ 
    var someDate = new Date();
    var numberOfDaysToAdd = pri.perInDays;
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
   dataToAdd.paymentCompany = "paytm"
   dataToAdd.validity.from = fromDate
   dataToAdd.validity.to = toDate
   dataToAdd.lastFormatedDay = lastFormatedDay
   dataToAdd.priceId = pri._id
   dataToAdd.mrp = pri.mrp
   dataToAdd.sellingPrice = pri.sellingPrice
   dataToAdd.period = pri.period

 new AllTransaction(dataToAdd).save()
 .then(
    allTran => {
        if(allTran){
            sendNewLink(req,res,allTran)
        }else {
            return res.redirect(keys.localFrontend+ `/paymentverify/paytm/fail/6546469`)

        }
    }
 )
 .catch(err => console.log(err))

}
 
async function 
sendNewLink(req,res,allTran){
    function randomStr(len, arr) { 
        var ans = ''; 
        for (var i = len; i > 0; i--) { 
            ans +=  
              arr[Math.floor(Math.random() * arr.length)]; 
        } 
        return ans;    
    } 
      const id1 = randomStr(5, '687asdfkjdilfisd54691cgaa65412')
      const allTranId = allTran._id
    console.log(allTranId)
    res.status(200).json(keys.localBackend+ `/api/v1/forPublicWeb/paytm/payment/${id1}/${allTranId}`);
}




      router.post("/pay", passport.authenticate("jwt",{session: false}),async(req,res) => {
      
        await Price.findOne({_id:req.body.priceId}).then(pri => {
            if(pri) {
                getPrice(req,res,pri)
            } else {
    
                return res.redirect(keys.localFrontend+ `/paymentverify/paytm/fail/6546469`)
        
            }
        }).catch(err => console.log(err))

      })
    module.exports = router;
