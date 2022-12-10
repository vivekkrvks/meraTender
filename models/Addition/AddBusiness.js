// 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddBusinessSchema = new Schema({
    visibility:{
        name:{
            type:String,
            default:""
        },
        id:{
            type:String,
            default:""
        },
    },
    businessType:{
        businessTypeName:{
            type:String,
            required:true
        },
        businessTypeLink:{
            type:String,
            required:true
        },
    },
       state:{
        stateName:{
            type:String,
            required:true
        },
        stateLink:{
            type:String,
            required:true
        },
       },
       district:{
        districtName:{
            type:String,
            required:true
        },
        districtLink:{
            type:String,
            required:true
        },
       },
isVerified:{
        type:String,
        default:false
    },
user: {
        type: Schema.Types.ObjectId,
        ref: "myUser"
      },

businessName:{
       type:String,
       required:true
   },
businessLink:{
       type:String,
       required:true
   },
ownerName:{
    type:String,
    default:""
},
mobileNo:{
    type:String,
    default:""
},
whatsAppNo:{
    type:String,
    default:""
},
emailId:{
    type:String,
    default:""
},
website:{
    type:String,
    default:""
},
gstNumber:{
    type:String,
    default:""
},
shortDescription:{
    type:String,
    default:""
},
fullDescription:{
    type:String,
    default:""
},
fullAddress:{
    type:String,
    default:""
},
pinCode:{
    type:String,
    default:""
},
  
   date: {
    type: Date,
    default: Date.now
  },

});

module.exports = AddBusiness = mongoose.model("myAddBusiness", AddBusinessSchema);


