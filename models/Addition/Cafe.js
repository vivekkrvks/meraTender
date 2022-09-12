// 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CafeSchema = new Schema({
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
    isVerified:{
        type:String,
        default:false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "myUser"
      },
   cafeName:{
       type:String,
       required:true
   },
   cafeLink:{
       type:String,
       required:true
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
   fullAddress:{
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
   date: {
    type: Date,
    default: Date.now
  },

});

module.exports = Cafe = mongoose.model("myCafe", CafeSchema);


