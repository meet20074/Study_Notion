const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.isStudent =  (req, res, next) => {
    try {
         const accountType = req.user.accountType;

    if(accountType !== "Student"){
        return res.status(401).json({
            success : false,
            message : "This Route is protected for Students",
        })
    }
    next();
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : "User Role cannot be verified",
        })
    }
}

exports.isAdmin =  (req, res, next) => {
    try {
         const accountType = req.user.accountType;

    if(accountType !== "Admin"){
        return res.status(401).json({
            success : false,
            message : "This Route is protected for Admin",
        })
    }
    next();
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : "User Role cannot be verified",
        })
    }
}

exports.isInstructor =  (req, res, next) => {
    try {
         const accountType = req.user.accountType;

    if(accountType !== "Instructor"){
        return res.status(403).json({
            success : false,
            message : "This Route is protected for Instructor",
        })
    }
    next();
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : "User Role cannot be verified",
        })
    }
}

exports.auth = async (req, res, next) => {
    try{

        
        
           console.log("req in auth" , req);
     
                let  token = req.get("Authorization")?.replace("Bearer " , "") || req.body.token ||  req.cookies.token ;
                console.log("token" , token);
        
        
       
        
        if(!token ){
            return res.status(405).json({
                success : false,
                message : "Token is Missing"
            })
        }

        try {
            const payload =  jwt.verify(token , process.env.JWT_SECRET);
        req.user  = payload;
        }
        catch(err){
             console.log(err)
        return res.status(405).json({
            success:false,
            token : token,
            message:"Invalid Token"
        })
        }
        next();

    }
    catch(error){
        console.log(error)
        return res.status(401).json({
            success:false,
            message:"Error in validating token",
            error : error
        })
    }
}