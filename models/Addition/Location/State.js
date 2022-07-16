// 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StateSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "myUser"
      },
   stateName:{
       type:String,
       required:true
   },
   stateLink:{
       type:String,
       required:true
   },
   stateLogo:{
    url:{
     type:String,
     default:"https://res.cloudinary.com/mera-tender/image/upload/v1657983613/defaultLogo/biharLogo_bqdrr5.jpg"
    },
    publicId:{
     type:String,
     default:"defaultLogo/biharLogo_bqdrr5"

    }
},
   date: {
    type: Date,
    default: Date.now
  },

});

module.exports = State = mongoose.model("myState", StateSchema);


