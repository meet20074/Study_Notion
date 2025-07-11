const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        trim : true
    },
    lastName : {
          type : String,
        required : true,
        trim : true
    },
    email : {
          type : String,
        required : true,
        trim : true
    },
    password : {
         type : String,
        required : true,
    },
    confirmPassword : {
         type : String,
       
    },
    token : {
        type : String
    },
     resetPasswordExpires : {
         type : Date
    },
    courses : [
        {
              type : mongoose.Schema.Types.ObjectId,
        ref : "Course",
       

        }
    ],
    accountType : {
        type : String,
        required : true,
        enum : ["Admin","Student","Instructor"]
    },
    additionalDetails :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Profile",
        required : true
    },
    image : {
        type : String,
    },
    courseProgress : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "CourseProgress"
        }
    ]
})

module.exports = mongoose.model("User", userSchema);