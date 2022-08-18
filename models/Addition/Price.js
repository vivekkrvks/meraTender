 // only success
 const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PriceSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: "myUser"
      },
period:{
type:String,
required:true
},
perInDays:{
    type:Number,
    required:true
},
mrp:{
    type:String,
    required:true
},
sellingPrice:{
    type:String,
    required:true
},

date:{
    type: Date,
    default: Date.now
},

});

module.exports = Price= mongoose.model("myPrice", PriceSchema);