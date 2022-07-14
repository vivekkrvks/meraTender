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
  state: {
    type: String,
    default:""
},    
district: {
type: String,
default:""
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




