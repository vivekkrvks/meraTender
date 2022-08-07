// 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SavedTenderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "myUser"
      },
tenderId:{
    type: Schema.Types.ObjectId,
    ref: "myTender"
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
department:{
  departmentName:{
      type:String,
      default:""
  },
  departmentLink:{
      type:String,
      default:""
  }
 },
   date: {
    type: Date,
    default: Date.now
  },


});

module.exports = SavedTender = mongoose.model("mySavedTender", SavedTenderSchema);


// /SavedTender