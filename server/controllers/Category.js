const Category = require("../models/Category");
const Course = require("../models/Course");

const {getRandomInt} = require("../utils/functions");



exports.createCategory = async (req,res) => {
   try{
    const {name , description} = req.body;

    if(!name || !description) {
        return res.status(401).json({
            success : false,
            message : " please fill all the details",
        });
    }

    const result = Category.create({
        name : name ,
        description : description
    });
    console.log(result);

    return res.status(200).json({
        success : true,
        message : "Category created successfully",
    });

   }
   catch(error){
     console.log(error);
     return res.status(500).json({
        success : false,
        message : "Error in creating category",
     })
   }
}

exports.showAllCategory = async (req,res) => {
    try{

        const allCategory = await Category.find({} , {name : true, description : true});
        res.status(200).json({
            success : true,
            allCategory,
            message : "all category are fetched successfully",
        })

    }
    catch(error){
     console.log(error);
     return res.status(500).json({
        success : false,
        message : "Error in finding all Category",
     })
   }
}

exports.categoryPageDetails = async (req,res) => {
    try {
        const { categoryId } = req.body
      console.log("PRINTING CATEGORY ID: ", categoryId);
      // Get courses for the specified category
      const selectedCourses = await Category.findById(categoryId)
        .populate({
          path: "course",
        //   match: { status: "Published" },
        //   populate: "ratingAndReviews",
        })
        .exec()
  
      console.log("SELECTED COURSE", selectedCourses)
    //  Handle the case when the category is not found
      if (!selectedCourses) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
       // Handle the case when there are no courses
      if (selectedCourses.course.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
         course: { $not: { $size: 0 } }
      })
      console.log("categoriesExceptSelected", categoriesExceptSelected)
      console.log("hii");
       try {
            let differentCourses = await Category.findOne({
  _id: categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id
})
.populate({
  path: "course",
  // match: { status: "Published" },
  // populate: "ratingAndReviews",
})
.exec();
console.log("Different COURSE", differentCourses);

      const mostSellingCourses = await Course.find({ status: 'Published' })
      .sort({ "studentsEnrolled.length": -1 }).populate("ratingAndReviews") // Sort by studentsEnrolled array length in descending order
      .exec();

      console.log("most selling Courses" , mostSellingCourses);
       res.status(200).json({
			selectedCourses: selectedCourses,
			differentCourses: differentCourses,
			mostSellingCourses,
            name: selectedCourses.name,
            description: selectedCourses.description,
            success:true
		})
       }
       catch(err)
       {
        console.log("error : "  , err);
       }
        
    
       
    } catch (error) {
        return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
    }
}