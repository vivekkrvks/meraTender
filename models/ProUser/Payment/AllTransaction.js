 // only success
 const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AllTransactionSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: "myUser"
      },
 status:{
  type:String,
  default:"pending"
 },
// // No need of frontend

paymentCompany:{
  type:String,
  required:true
},

validity: {
    from:{
        type:String,
        // required:true
    },
    to:{
        type:String,
        // required:true
    }
},
lastFormatedDay:{
  type:String,
  // required:true
},
referalCode: {
    type:String,
    default:"Noreferal"
},
tenderId: {
    type:String,
    default:""
},

paymentDetails:{
  "TXNID":{
    type: String,
   default:""
  },"BANKTXNID":{
    type: String,
   default:""
  },"ORDERID":{
    type: String,
   default:""
  },"TXNAMOUNT":{
    type: String,
   default:""
  },"STATUS":{
    type: String,
   default:""
  },"TXNTYPE":{
    type: String,
   default:""
  },"GATEWAYNAME":{
    type: String,
   default:""
  },"RESPCODE":{
    type: String,
   default:""
  },"RESPMSG":{
    type: String,
   default:""
  },"BANKNAME":{
    type: String,
   default:""
  },"MID":{
    type: String,
   default:""
  },"PAYMENTMODE":{
    type: String,
   default:""
  },"REFUNDAMT":{
    type: String,
   default:""
  },"TXNDATE":{
    type: String,
   default:""
  }

          
},
// pricing details
priceId:{
  type:String,
  default: ""
},
mrp:{
  type:String,
  default: ""

},
sellingPrice:{
  type:String,
  default: ""

},

period:{
    type:String,
  default: ""

},

date:{
    type: Date,
    default: Date.now
},

});

module.exports = AllTransaction= mongoose.model("myAllTransaction", AllTransactionSchema);