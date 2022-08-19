const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  
  name: {
    type: String,
    default:""
  },
  mobileNo: {
    type: String,
    required:true
  },
  mobileVerified:{
    type:Boolean,
    default:false
  },
  emailId: {
    type: String,
    default:""
  },
  emailVerified:{
    type:Boolean,
    default: false
  },
  password: {
    type: String,
    default:"createYourPassword"
  },
accountType:{
  type: String,
  default:"free"
},
validityStatus:{
    startDate:{
      type: String,
      default:""
    },
    endDate:{
      type: String,
      default:""
    }
},
state: {
    stateName:{
        type: String,
        default:"Bihar"
    },
    stateLink:{
        type: String,
        default:"bihar"
    }
},    
district: {
    districtName:{
        type: String,
        default:""
    },
    districtLink:{
        type: String,
        default:""
    }
},  
  // user , admin , 
  // supervisor , fieldPartner
  designation: {
    label:{
      type: String,
    default: "User"
  },
  id:{
    type: String,
    default: "user"
  }
},
validity:{
  type:String,
  default:"00000000"
},
isProUser:{
  type:Boolean,
  default:false
},

accountStatus:{
  type:String,
  default:"active"
},
  // distributor
  
  
  userName: {
    type: String,
    default:""
  },
  userImage: {
    type: String,
    default:""
  },
language:{
  type:String,
  default:"english"
},
gender: {
  type: String,
  default:""
},

  date: {
    type: Date,
    default: Date.now
  },
  value: {
    type: String,
    default:"createYourPassword"
  },
});

module.exports = User = mongoose.model("myUser", UserSchema);




