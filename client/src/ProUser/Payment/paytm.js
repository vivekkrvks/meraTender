const checksum_lib = require('./../../Paytm_Web_Sample_Kit_NodeJs-master/checksum/checksum')
const https = require('https');
const keys = require('../../setup/myurl');

const port = process.env.PORT || 2040
const express = require("express");
const router = express.Router();
const passport = require("passport");
const axios = require("axios");

const Cpayment = require("../../models/Cpayment");
const Transaction = require("../../models/Other/Transaction");

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

    router.get('/payment/:id/:random/:user/:rate/:email/:mobile/:priceid/:refcode/:amou',(req,res)=>{
        const pId = req.params.id 
        const pUser = req.params.user
        const pRate = req.params.rate
        const pEmail = req.params.email
        const pMobile = req.params.mobile
        const priceId = req.params.priceid
        const refCode = req.params.refcode
        const amou = req.params.amou
        let params ={}
        params['MID'] = process.env.MID,
        params['WEBSITE'] = 'DEFAULT',
        params['CHANNEL_ID'] = 'WEB',
        params['INDUSTRY_TYPE_ID'] = 'Retail',
        params['ORDER_ID'] = pId,
        params['CUST_ID'] = pUser,
        params['TXN_AMOUNT'] = pRate,
        params['CALLBACK_URL'] = `${keys.localBackend}/api/paytm/callback/${pId}/${priceId}/${refCode}/${amou}/${pMobile}/${pEmail}`,
        // params['CALLBACK_URL'] =  req.body.redirect_url,
        params['EMAIL'] = pEmail,
        params['MOBILE_NO'] = pMobile
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
    })


    router.post("/callback/:pId/:priceid/:refcode/:amou/:pmobile/:pemail",  (req, res) => {
        const pId = req.params.pId
        const priceId = req.params.priceid
        const refCode = req.params.refcode
        const amou = req.params.amou
        const pMobile = req.params.pmobile
        const pEmail = req.params.pemail
        /**
        * import checksum generation utility
        * You can get this utility from https://developer.paytm.com/docs/checksum/
        */
        
        /* initialize an object */
        var paytmParams = {};
        
        /* Find your MID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
        paytmParams["MID"] = process.env.MID;
        
        /* Enter your order id which needs to be check status for */
        paytmParams["ORDERID"] = pId;
        
        /**
        * Generate checksum by parameters we have
        * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
        */

    async function get1(response){
           if(response){
            Cpayment.findOne({_id : pId})
            .then(cpay => {
                if(cpay){ 
                    if(response.STATUS != "TXN_SUCCESS") {
                        let cPaymentValues = {
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
                Cpayment.findOneAndUpdate({_id : pId},
                    { $set: cPaymentValues },
                    { new: true })
                    .catch(err => console.log(err))
                    } else {
                      let uPaymentValues = {
                            user: cpay.user,
                        
                        "category.categoryTitle" : cpay.category.categoryTitle,
                        "category.link" : cpay.category.link,
         
                        "course.courseTitle" : cpay.course.courseTitle,
                        "course.link" : cpay.course.link,
         
                        "subject.subjectTitle" : cpay.subject.subjectTitle,
                        "subject.link" : cpay.subject.link,
         
                        "chapter.chapterTitle" : cpay.chapter.chapterTitle,
                        "chapter.link" : cpay.chapter.link,
                       
                        // // No need of frontend
                        
                        paymentCompany: cpay.paymentCompany,
                        price:cpay.price,
         
                        "validity.from":cpay.validity.from,
                        "validity.to":cpay.validity.to,
         
                        referalCode:cpay.referalCode,
                        fullPass:cpay.fullPass,
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
         
                       
                        designation: cpay.designation,
                        //
                        priceId:cpay.priceId,
                        mrp:cpay.mrp,
                        sellingPrice:cpay.sellingPrice,
                        period:cpay.period,
                        plan:cpay.pla

                         }
                         
                   
         
                         new Upayment(uPaymentValues)
                         .save()
                        
                         .catch(err => console.log(err))
                         /////////////////////////////////////
// updating amount in User model and making a transaction
if(amou !="zero"){
            User.findOne({referalCode:refCode}).then(user => {
                if(user){
                    let uId = user._id
                    let pBal = user.balance
                    let nBal = Math.floor(+amou + pBal)
                    let newValues = {
                        
                        balance:nBal
                       }
              User.findOneAndUpdate({_id : uId},
                  { $set: newValues },
                  { new: true })
                  .catch(err => console.log(err))
             //saving tran
             transactionValue = {
                 user:user.id,
                 isDebit:false,
                 cPaymentId: pId,
                 amount:amou,
                 priceId:priceId,
                 refCode:refCode,
                 isPayBenf:true
                   }
             new Transaction(transactionValue)
             .save()
             
             .catch(err => console.log(err));

                   
                } else {
                    PromoCode.findOne({promoCode:refCode}).then(pcode => {
                        if(pcode){
                        let mId = pcode.influencerId
                        User.findOne({_id:mId}).then(user => {
                            if(user){
                                let uId = user._id
                                let pBal = user.balance
                                let nBal = Math.floor(+amou + pBal)
                                let newValues = {
                                    
                                    balance:nBal
                                   }
                          User.findOneAndUpdate({_id : uId},
                              { $set: newValues },
                              { new: true })
                              .catch(err => console.log(err))
                               
                            } })

                            transactionValue = {
                                user:pcode.influencerId,
                                isDebit:false,
                                cPaymentId: pId,
                                amount:amou,
                                priceId:priceId,
                                refCode:refCode,
                                isPayBenf:true
                                  }
                            new Transaction(transactionValue)
                            .save()
                         
                            .catch(err => console.log(err));
                     } })
                    

                }
            })
}


                         /////
                         let cPaymentValues = {
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
                  Cpayment.findOneAndUpdate({_id : pId},
                      { $set: cPaymentValues },
                      { new: true })
                      .catch(err => console.log(err))
                       }
                   
                } else {

                    return res.redirect(keys.localFrontend+ `/paymentverify/paytm/fail/${pId}`)

                }
            })
            .catch(err => console.log(err))   
         
            
           }



        // console.log('Response1: ', response);
    
    }
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
               
                        get1(JSON.parse(response))
                        get2(JSON.parse(response),pId)
                });


            });
        
            // post the data
            post_req.write(post_data);
         
            post_req.end();

    function get2(response,pId){
     //   await Upayment.create(newPayment);
     if(response.STATUS != "TXN_SUCCESS") {
        return res.redirect(keys.localFrontend+ `/paymentverify/paytm/fail/${pId}`)
       } 
    else 
    {

        paymentsucMSG(pMobile,pEmail,response)
     return res.redirect(keys.localFrontend+ `/paymentverify/paytm/success/${response.TXNID}`)
    };
    }
        });

          // Redirect the user to payment complete page.
     
      });

//function to get current price
async function checkPId(req,res){
    await Price.findOne({_id:req.body.priceId}).then(pri => {
        if(pri) {
            getPrice(req,res,pri)
        } else {

            return res.redirect(keys.localFrontend+ `/paymentverify/paytm/fail/6546469`)
    
        }
    }).catch(err => console.log(err))
}



async function getPrice(req,res,pri){ 
   const Upayment1 = await Upayment.find({referalCode:req.body.referalCode}).catch(err => console.log(err))
   //for user referal start
   let promo1 = await PromoCode.find({isforOverall:true})
                                    .sort({date: -1})
                                        .catch(err => console.log(err))
            let promo2 = promo1[0]

const Upayment2 = await Upayment.find({user:req.user.id}).catch(err => console.log(err))

            //for user referal end
    await PromoCode.findOne({promoCode:req.body.referalCode}).then(pcod => {
        if(pcod ){ 
            if(pcod.count >=  Upayment1.length) {
            var kk = pcod.validity.to
            var date1 = kk.slice(0, 2)
            var month1 = kk.slice(3, 5)
            var year1 = kk.slice(6, 10)
var validity = year1 + '' + month1 + '' + date1
var today = new Date();
var t = 00
var l = 00
if(+today.getDate() <= +9){
    t = ("0" + today.getDate() +"")
} else {
     t = today.getDate()
}

if(+(today.getMonth()) <= 8){
     l = `0${today.getMonth()+1}`

} else {
   l = today.getMonth()+1
}

var today1 = today.getFullYear()+''+l+''+t;

if (validity>= today1){
    if(pcod.validCriteria == "all") {
const disc = +(100- +pcod.userDiscount)
     
         const tPrice1 = Math.floor((+pri.sellingPrice*disc)/100);
         const udis = pcod.maxDiscount
         const tPrice2 = Math.floor(+pri.sellingPrice - +udis);

         let fPrice
         if(tPrice2 >= tPrice1){
             fPrice = tPrice2
         } else {
             fPrice = tPrice1
         }
         
         const pDisc = +pcod.influencerCredit
         const pCredit = Math.floor((+pri.sellingPrice*pDisc)/100);
   const maxCredit = +pcod.maxCredit

let fCredit
if(maxCredit<=pCredit){
fCredit = maxCredit
}else{
    fCredit = pCredit

}
         post1(req,res,fPrice,pri,fCredit)
        
    } else {
        const disc = +(100- +pcod.userDiscount)

         if(+pri.period == +pcod.validTime || +pri.period >= +promo2.tMoreThan)
        { 
            const tPrice1 = Math.floor((+pri.sellingPrice*disc)/100);
         const udis = pcod.maxDiscount
         const tPrice2 = Math.floor(+pri.sellingPrice - +udis);

         let fPrice
         if(tPrice2 >= tPrice1){
             fPrice = tPrice2
         } else {
             fPrice = tPrice1
         }
            const pDisc = +pcod.influencerCredit
            const pCredit = Math.floor((+pri.sellingPrice*pDisc)/100);
   const maxCredit = +pcod.maxCredit

   let fCredit
   if(maxCredit<=pCredit){
   fCredit = maxCredit
   }else{
       fCredit = pCredit
   
   }
            post1(req,res,fPrice,pri,fCredit)
        }else{
            const fPrice = Math.floor(+pri.sellingPrice)
            let zr = "zero"
post1(req,res,fPrice,pri,zr)

        }


    }
} else {
    
    const fPrice = Math.floor(+pri.sellingPrice)
    let zr = "zero"
post1(req,res,fPrice,pri,zr)
}
}else{
    const fPrice = Math.floor(+pri.sellingPrice)
    let zr = "zero"
post1(req,res,fPrice,pri,zr)
}
        } else {
            //user referal start here
            User.findOne({referalCode:req.body.referalCode}).then(rUser =>{
                if(rUser){
                  if(promo2.uniqueMax >  Upayment2.length){
//
let promo3 =  promo2.userDiscount

const disc = +(100 - +promo3)


if(+pri.period == +promo2.validTime || promo2.validCriteria == "all" || +pri.period >= +promo2.tMoreThan)
{ 
    const tPrice1 = Math.floor((+pri.sellingPrice*disc)/100);
    const udis = promo2.maxDiscount
    const tPrice2 = Math.floor(+pri.sellingPrice - +udis);
// this is to compare two price
    let fPrice
    if(tPrice2 >= tPrice1){
        fPrice = tPrice2
    } else {
        fPrice = tPrice1
    }
    // this is for influencer credit
   const pDisc = +promo2.influencerCredit
   const pCredit = Math.floor((+pri.sellingPrice*pDisc)/100);
   const maxCredit = +promo2.maxCredit
let fCredit
if(maxCredit<=pCredit){
fCredit = maxCredit
}else{
fCredit = pCredit

}
   post1(req,res,fPrice,pri,fCredit)
}else{
   const fPrice = Math.floor(+pri.sellingPrice)
   let zr = "zero"
post1(req,res,fPrice,pri,zr)

}
//
                  } else {
                    const fPrice = Math.floor(+pri.sellingPrice)
                    let zr = "zero"
post1(req,res,fPrice,pri,zr)
                  }
                }
                else {
 const fPrice = Math.floor(+pri.sellingPrice)
            let zr = "zero"
post1(req,res,fPrice,pri,zr)
             } })
        
           
        }
    })

    ////////////////////////



}
 
async function 
post1(req,res,fPrice,pri,amou){
    function randomStr(len, arr) { 
        var ans = ''; 
        for (var i = len; i > 0; i--) { 
            ans +=  
              arr[Math.floor(Math.random() * arr.length)]; 
        } 
        return ans;    
    } 
// Upayment.find({user:req.user.id})
//         .then(upay => {
//     if(upay){
//         let upay1 = upay[upay1.length - 1]
//         let date1 = upay1.validity.to
//     }
//     else {
//         let date1 = "00/00/0000"
//     }
// })
    // .catch(err => console.log(err))

    var someDate = new Date();
    var numberOfDaysToAdd = +pri.period;
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
 
   var someFormattedDate = dd + '/'+ mm + '/'+ y;


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
   var today = dd1 + '/'+ mm1 + '/'+ y1;
 

    let newPayment = {
        // user:req.user.id,
        referalCode:req.body.referalCode,
        fullPass:req.body.fullPass,
        paymentCompany:"Paytm",
        price:fPrice,
        "paymentDetails.STATUS": "Pending",
        designation:req.user.designation,
        user:req.user.id,
        "validity.from":today,
        "validity.to":someFormattedDate,
        priceId:pri._id,
        mrp:pri.mrp,
        sellingPrice:pri.sellingPrice,
        period:pri.period,
        plan:pri.plan
      };
    
      let payResponse = await Cpayment.create(newPayment);
      const id1 = payResponse._id
      const id2 = randomStr(5, '687asdfkjdilfisd54691cgaa65412')
      const id3 = payResponse.user
      const id4 = payResponse.price
      const id5 = req.user.emailId || "qualifier.co.in@gmail.com"
      const id6 = req.user.mobileNo || "9460117770"
      const id7 = req.body.priceId
      const id8 = req.body.referalCode || "687asdfkjdilfisd54691cgaa65412"
      const id9 = amou
    res.status(200).json(keys.localBackend+ `/api/paytm/payment/${id1}/${id2}/${id3}/${id4}/${id5}/${id6}/${id7}/${id8}/${id9}`);
}




      router.post("/pay", passport.authenticate("jwt",{session: false}),async(req,res) => {
          if (req.body.fullPass != true) {

            return res.redirect(keys.localFrontend+ `/paymentverify/paytm/fail/6546469`)

          } else {

            checkPId(req,res)
    }

      })
    module.exports = router;
