// 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TenderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "myUser"
      },
      tenderNumber:{
        type:String,
        default:""
    },
   tenderName:{
       type:String,
       required:true
   },

   openingDate:{
       type:String,
       default:""
   },
   closingDate:{
       type:String,
       default:""
   },
   tenderAmount:{
       type:String,
       default:""
   },

   department:{
    departmentName:{
        type:String,
        default:""
    },
    link:{
        type:String,
        default:""
    }
   },
   state: {
        stateName:{
            type: String,
            default:"Bihar"
        },
        link:{
            type: String,
            default:"bihar"
        }
    },    
    district: {
        districtName:{
            type: String,
            default:""
        },
        link:{
            type: String,
            default:""
        }
    },  
    file1:{
        url:{
            type:String,
            default:""
           },
           publicId:{
            type:String,
            default:""
       
           }
    },
    file2:{
        url:{
            type:String,
            default:""
           },
           publicId:{
            type:String,
            default:""
       
           }
    },
    shortDescription:{
        type:String,
        default:""
    },
   /////////////////////////////
   link:{
    type:String,
    required:true
},
image:{
    url:{
     type:String,
     default:""
    },
    publicId:{
     type:String,
     default:""

    }
},
   blogBody:{
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

module.exports = Tender = mongoose.model("myTender", TenderSchema);


// /tender