const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const mongoose = require("mongoose");




exports.createRating = async (req , res) => {
    try{

        const userID = req.user.id;
        const {rating , review , courseId} = req.body;

        if(!rating || !review || !courseId) {
            return res.status(401).json({
                success : false ,
                message : "Fields are missing in Rating and Review",
            })
        }

        let courseDetails = await Course.findById(courseId);

        if(!courseDetails.studentsEnrolled.includes(userID)){
            return res.status(401).json({
                success : false,
                message : "Student is not enrolled in this Course"
            });
        }

        const alreadyReviewed = await RatingAndReview.findOne({
                                       user : userID,
                                       course : courseId
        });
       // console.log("alrady reviwed" , alreadyReviewed);

        if(alreadyReviewed){
            return res.status(401).json({
                success : false,
                message : "Student has already rated on this course",
            });
        }

        const RatingDetails = await RatingAndReview.create({
                                  rating , review ,
                                  user : userID,
                                  course : courseId
        });
 

        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                              {_id : courseId},
                                              {
                                                $push : {
                                                    RatingAndReview : RatingDetails._id
                                                }
                                              },
                                              {new : true}
        );

        console.log(updatedCourseDetails);



        return res.status(200).json({
            success : true,
            message : "Rating and Review has been created successfully",
            RatingDetails
        })


    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "Error in creating Rating And Reviews",
            error : error.message
        });
    }
}

exports.getAverageRating = async (req,res) => {
    try{
        const {rating , courseId} = req.body;
        const userID = req.user.id;

        const result = await RatingAndReview.aggregate([
            {
                $match : {course : courseId}
            },
            {
                $group : {
                    _id: null,
                    averageRating : {$avg : rating}
                }
            }
        ]);

        if(result.length > 0){
            return res.status(200).json({
                success : true,
                message : " Average Rating has been fetched",
                averageRating :result[0].averageRating
            })
        }
        else{
            return res.status(200).json({
                success : true,
                message : " No ratings so far for this course",
            })
        }

    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "Error in fetching Average Rating Data",
            error : error.message
        });
    }
}

exports.getAllRatings = async (req, res) => {
    try{
            const allReviews = await RatingAndReview.find({})
                                    .sort({rating: "desc"})
                                    .populate({
                                        path:"user",
                                        select:"firstName lastName email image",
                                    })
                                    .populate({
                                        path:"course",
                                        select: "courseName",
                                    })
                                    .exec();
            return res.status(200).json({
                success:true,
                message:"All reviews fetched successfully",
                data:allReviews,
            });
    }   
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    } 
}