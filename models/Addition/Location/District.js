// 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DistrictSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "myUser"
      },
   districtName:{
       type:String,
       required:true
   },
   districtLink:{
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
   date: {
    type: Date,
    default: Date.now
  },

});

module.exports = District = mongoose.model("myDistrict", DistrictSchema);


