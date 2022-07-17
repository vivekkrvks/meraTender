// 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TenderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "myUser"
      },
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
      tenderNumber:{
        type:String,
        default:""
    },
    tenderTitle:{
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
    departmentLink:{
        type:String,
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
   isAdvance:{
    type:Boolean,
    default:false
},
tenderLink:{
    type:String,
    required:true
},
coverImg:{
    url:{
     type:String,
     default:""
    },
    publicId:{
     type:String,
     default:""

    }
},
isHtml:{
    type:Boolean,
    default:false
},
longDescription:{
       type:String,
       default:""
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