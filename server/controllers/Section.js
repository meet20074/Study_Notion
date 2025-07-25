const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
    try{

        const {sectionName , courseId} = req.body;

        if(! sectionName || ! courseId) {
            return res.status(401).json({
                success : false,
                message : "Fill All the details",
            });
        }

        const newSection = await Section.create({sectionName});

        const updatedCoursedetails = await Course.findByIdAndUpdate(
                                        courseId,
                                        {
                                            $push :{
                                                courseContent : newSection._id
                                            }
                                        },
                                        { new : true}
        );
        return res.status(200).json({
            success : true,
            message : "Section created Successfully",
            updatedCoursedetails
        })

    }
    catch (err){
        return res.status(404).json({
            success : false,
            message : "Error in creating new section",
            error : err.message,
        });
    }
}


exports.updateSection = async (req,res) => {
    try {
        
        const {sectionId, sectionName, courseId} = req.body;

        if (!sectionId || !sectionName) {
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            });
        }

        const updatedSection = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true});
        const updatedCourse = await Course.findById(courseId)
          .populate({
              path:"courseContent",
              populate: {
                  path:"subSection"
              }});
        return res.status(200).json({
            success:true,
            message:'Section updated successfully',
            updatedCourse
        })   
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to update Section',
            error: error.message,
        })
    }
}

exports.deleteSection = async (req,res) => {
    try {
        
        const {sectionId, courseId} = req.body;

        if (!sectionId) {
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            });
        }

        const sectionDetails = await Section.findById(sectionId);
        
        // //Section ke ander ke subsections delete kiye hai 
        sectionDetails.subSection.forEach( async (ssid)=>{
            await SubSection.findByIdAndDelete(ssid);
        })
        console.log('Subsections within the section deleted')
        //NOTE: Due to cascading deletion, Mongoose automatically triggers the built-in middleware to perform a cascading delete for all the referenced 
        //SubSection documents. DOUBTFUL!

        //From course, courseContent the section gets automatically deleted due to cascading delete feature
        await Section.findByIdAndDelete(sectionId);
        console.log('Section deleted')

        const updatedCourse = await Course.findById(courseId)
          .populate({
              path:"courseContent",
              populate: {
                  path:"subSection"
              }});
        return res.status(200).json({
            success:true,
            message:'Section deleted successfully',
            updatedCourse
        })   
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to delete Section',
            error: error.message,
        })
    }
}