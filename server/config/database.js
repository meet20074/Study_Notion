const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
   mongoose.connect(process.env.MONGODB_URL , {
    useNewUrlParser : true,
    UseUnifiedTopology : true,
   }). then( ()=> console.log("Database connected Successfully"))
   .catch ( (error) => {
    console.log("Error in db connection");
    console.error(error);
    process.exit(1);
   })
   
};