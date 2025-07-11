const Course = require("../models/Course");
const User = require ("../models/User");
const CourseProgress = require("../models/CourseProgress");
const Category = require("../models/Category");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { convertSecondsToDuration } = require("../utils/secToDuration")

const mongoose = require("mongoose");
require('dotenv').config();
const {uploadImageToCloudinary} = require("../utils/imageUploader");

exports.createCourse = async (req, res) => {
    try{

      console.log("req" , req.body);

        const {courseName , courseDescription  , category, whatWillYouLearn , price , tags , instructions } = req.body;

        let description = courseDescription;
        let tag = JSON.parse(JSON.stringify(tags));
        let whatYouWillLearn = whatWillYouLearn
          const thumbnail = req.files.thumbnailImage;

          console.log(courseName);
           console.log(description);
             console.log(whatYouWillLearn);
              console.log(price);
               console.log(tag);
               console.log("Categoty : " , category);
               console.log(typeof(category));

          if(!courseName || !whatYouWillLearn ||  !price ||!description || !tag || !category || !instructions)
          {
            return res.status(401).json({
                success : false,
                message : "Please fill all the details",
            });
          }

          const instructorID = req.user.id;
          console.log("instructor ID" , instructorID);
          console.log(typeof(instructorID));

          const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

          const newCourse = await Course.create({
            courseName,
            description,
            whatYouWillLearn,
            category,
            instructor : instructorID,
            price,
            tag,
            thumbnail:thumbnailImage.secure_url,
            instructions : JSON.parse(JSON.stringify(instructions))

          });
          const uid = new mongoose.Types.ObjectId(instructorID);

          const newUser = await User.findByIdAndUpdate( uid ,
                {
                    $push : {
                      courses : newCourse._id
                }
                }
          )

      const newcategory = new mongoose.Types.ObjectId(category);
      console.log(newUser);
      

           const newCategory =  await Category.findByIdAndUpdate( newcategory ,
                {
                    $push : {
                      course : newCourse._id
                }
                }
          )
          console.log(newCategory);

         return res.status(200).json({
            success : true,
            message : "Course Created Successfully",
          })

         
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Error in creating new course",
        })
    }
}

exports.showAllCourses = async (req,res) => {
  try{
      const allCourses = Course.find({},{
        couserName : true,
        price : true,
        thumbnail : true,
        instructor : true,
        ratingAndReviews : true,
        studentsEnrolled : true,

      }).populate("instructor").exec();

      return res.status(200).json({
        success : true,
        data : allCourses,
        message : "All course details are fetched successfully"
      })
  }
  catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to show all Courses',
            error: error.message,
        })
    }
}


exports.getCourseDetails = async (req, res) => {
  try {
    //get id
    const {courseId} = req.body;
    //find course details
    const courseDetails = await Course.findById(courseId)
                                .populate(
                                    {
                                        path:"instructor",
                                        populate:{
                                            path:"additionalDetails",
                                        },
                                    }
                                )
                                .populate("category")
                                .populate("ratingAndReviews")
                                .populate({
                                    path:"courseContent",
                                    populate:{
                                        path:"subSection",
                                    },
                                })
                                .exec();

        //validation
        if(!courseDetails) {
            return res.status(400).json({
                success:false,
                message:`Could not find the course with ${courseId}`,
            });
        }

        let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
        //return response
        return res.status(200).json({
            success:true,
            message:"Course Details fetched successfully",
            data:{courseDetails,
              totalDuration
            },
        })

  }
  catch(error) {
      console.log(error);
      return res.status(500).json({
          success:false,
          message:error.message,
      });
  }
}

exports.editCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      const updates = req.body
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update")
        const thumbnail = req.files.thumbnailImage
        const thumbnailImage = await uploadImageToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbnail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
  if (Object.prototype.hasOwnProperty.call(updates, key)) {
    course[key] = updates[key];
    // If needed, you can still do conditional logic here
    // if (key === "tag" || key === "instructions") {
    //   course[key] = JSON.parse(updates[key]);
    // } else {
    //   course[key] = updates[key];
    // }
  }
}
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails", 
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  exports.getFullCourseDetails = async (req, res) => {
    try {
      const { courseId } = req.body
      const userId = req.user.id
      const courseDetails = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      let courseProgressCount = await CourseProgress.findOne({
        courseID: courseId,
        userId: userId,
      })
  
      console.log("courseProgressCount : ", courseProgressCount)
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }
  
      // if (courseDetails.status === "Draft") {
      //   return res.status(403).json({
      //     success: false,
      //     message: `Accessing a draft course is forbidden`,
      //   });
      // }
  
      let totalDurationInSeconds = 0
      courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
          completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
  
  // Get a list of Course for a given Instructor
  exports.getInstructorCourses = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const instructorId = req.user.id
      console.log("andcdddddeedeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"  , instructorId);
  
      // Find all courses belonging to the instructor
      const instructorCourses = await Course.find({
        instructor: instructorId,
      }).sort({ createdAt: -1 }).populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()
  
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        data: instructorCourses,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
  }
  // Delete the Course
  exports.deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.body
  
      // Find the course
      const course = await Course.findById(courseId)
      if (!course) {
        return res.status(404).json({ message: "Course not found" })
      }
  
      // Unenroll students from the course
      const studentsEnrolled = course.studentsEnrolled
      for (const studentId of studentsEnrolled) {
        await User.findByIdAndUpdate(studentId, {
          $pull: { courses: courseId },
        })
      }
  
      // Delete sections and sub-sections
      const courseSections = course.courseContent
      for (const sectionId of courseSections) {
        // Delete sub-sections of the section
        const section = await Section.findById(sectionId)
        if (section) {
          const subSections = section.subSection
          for (const subSectionId of subSections) {
            await SubSection.findByIdAndDelete(subSectionId)
          }
        }
  
        // Delete the section
        await Section.findByIdAndDelete(sectionId)
      }
      

      // Delete the course
      await Course.findByIdAndDelete(courseId)
  
      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
  }
