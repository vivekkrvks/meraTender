// 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "myUser"
      },
   departmentName:{
       type:String,
       required:true
   },
   link:{
       type:String,
       required:true
   },
   logo:{
       url:{
        type:String,
        default:""
       },
       publicId:{
        type:String,
        default:""

       }
   },
   description:{
       type:String,
       default:""
   },
   visibility:{
       type:String,
       default:"Public"
   },

   date: {
    type: Date,
    default: Date.now
  },
   creationDate: {
    type: Date,
    required:true
  },

});

module.exports = Department = mongoose.model("myDepartment", DepartmentSchema);


// /department