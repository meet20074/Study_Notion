const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName : {
    type : String,
    required : true,
    trim : true,
  },
   description : {
    type : String,
    required : true,
    trim : true,
  },
   whatYouWillLearn : {
    type : String,
    trim : true,
  },
   instructor:{
        type:mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true,
    },
  courseContent : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Section",
  }],
  category : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Category",
  },
  studentsEnrolled : [{
     type : mongoose.Schema.Types.ObjectId,
    ref : "User",
  }],
  price : {
    type : String
  },
  tag : {
    type : String,
  },
  thumbnail : {
    type : String,
  },
  ratingAndReviews : [{
     type : mongoose.Schema.Types.ObjectId,
    ref : "RatingAndReview",
    reuired : true,
  }],
    instructions: {
		type: String,
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
    createdAt: {
		type:Date,
		default:Date.now
	},
})

module.exports = mongoose.model("Course" , courseSchema);