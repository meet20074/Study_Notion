const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  dateOfBIrth : {
    type : String,
  },
  contactNumber : {
    type : Number,
    trim : true,
  },
  about : {
    type : String,
    trim : true,
  },
  gender : {
    type : String,
  }

})

module.exports = mongoose.model("Profile" , profileSchema);