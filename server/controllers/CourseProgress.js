const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");


exports.updateCourseProgress = async( req , res) => {
    try{
        const userID = req.user.id;
        console.log("req" , req);
        const { subSectionId , courseId} = req.body;

        const subSection = await SubSection.findById(subSectionId);

        console.log("subsection ID" , subSectionId);
        console.log("courseID",courseId);

        if(!subSection) {
            return res.status(401).json({
                success : false,
                message : "No subsection found with such id",
            });
        }

        const courseProgressDetails = await CourseProgress.findOne({
                                          courseID : courseId,
                                          userId : userID
        });

        if(!courseProgressDetails) {
            return res.status(401).json({
                success : false,
                message : "No Course Progress found",
            });
        }


       console.log("course progress details completed videos" , courseProgressDetails);
        if(courseProgressDetails.completedVideos.includes(subSectionId)){
            return res.status(401).json({
                success : false,
                message : "This Video is already marked as completed"
            });
        }

        courseProgressDetails.completedVideos.push(subSectionId);
        await courseProgressDetails.save();
        
        return res.status(200).json({
            success : true,
            message : "Video is marked as completed",
            
        })

    }
     catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Error in finding course progress",
        })
    }
    
}