const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
require("dotenv").config();
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");

exports.sendOtp = async (req, res) => {
   try{
       const {email} = req.body;
    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.status(401).json({
            success : false,
            message : "User is already Registered"
        });
    }

    let otp = otpGenerator.generate( 6 , {
        upperCaseAlphabets : false,
        lowerCaseAlphabets : false,
        specialChars : false
    });

    let result = await OTP.findOne({otp : otp});

    while(result){
          otp = otpGenerator.generate( 6 , {
        upperCaseAlphabets : false,
        lowerCaseAlphabets : false,
        specialChars : false
    });

     result = await OTP.findOne({otp : otp});
    }

    //Create entry of this otp in DB


    const otpPayload = {email,otp};
    let otpBody = await OTP.create(otpPayload);
    console.log("OTP sent successfully" , otpBody);

    return res.status(200).json({
        success : true,
        message : "Otp Sent Successfully",
        otp
    });
   }
   catch(error){
     console.error(error);
     return res.status(500).json({
        success : false,
        message : "Error in generating and storing otp in DB",
     })
   }
}

exports.signUp = async  (req,res) => {
    try {
         const{
            email,
            firstName ,
            lastName,
            contactNumber,
            accountType,
            password,
            confirmPassword,
            otp
         } = req.body;

         if(!firstName || !lastName || !email || !password || !confirmPassword ||!otp) {
            return res.status(401).json({
                success : false,
                message : "Please fill all the required Fields"
            })
         }

         console.log(email);
         console.log(otp);
         console.log(password);
         console.log(confirmPassword);

         const existingUser = await User.findOne({email});

        if(existingUser){
        return res.status(401).json({
            success : false,
            message : "User is already Registered"
        });
    }

    
        if(password !== confirmPassword){
            return res.status(401).json({
                success : false,
                message : "Password and Confirm Password Do not match",
            });
        }

        // Find the most recent OTP for the email
            const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log("Otp in signup page is:",recentOtp);
        if (recentOtp.length == 0) {
            return res.status(400).json({
                success:false,
                message:'OTP Not Found',
            })
        } else if(otp !== recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP",
            });
        }

            let hashedPassword = await bcrypt.hash( password , 10);

            const profileDetails = await Profile.create({
                gender : null,
                contactNumber : null,
                dateOfBIrth : null,
                about : null,

            });

            let newresponse = await User.create({
                email,
                password : hashedPassword,
                firstName,
                lastName,
                contactNumber,
                additionalDetails : profileDetails._id,
                accountType: accountType,
                 image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
            });
            

            res.status(200).json({
                success : true,
                message : "New User registered Successfully",
                UserDetails : newresponse
            })

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success : false,
            message : " Error in Sign up Page"
        })
    }
}

exports.login = async (req, res)=> {
   
    try {
         const { email , password} = req.body;

    if(!email || !password) {
        return res.status(401).json({
            success : false,
            message : "Please fill all the fields",
        });
    }

    const user = await User.findOne({email});

    if(!user){
        return res.status(401).json({
            success : false,
            message : "User is Not Registered , Please Sign Up first",
        });
    }

    if( await bcrypt.compare (password , user.password) ){
           const token = jwt.sign(
            { email : user.email , accountType : user.accountType , id : user._id },
            process.env.JWT_SECRET,
            { expiresIn : "24h" }
           )

           user.token = token;
           user.password = undefined;

           const options = {
            expires : new Date(Date.now() + 3*24*60*60*1000 ),
            httpOnly : true,
           }
           res.cookie("token" , token , options).status(200).json({
            success : true,
            token,
            user,
            message : "User Login Success"
           })
    }
    else
    {
        return res.status(401).json({
            success : false,
            message : " Password is Incorrect"
        })
    }
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success : false,
            message : " Error in Login in Page"
        })
    }

    
}

exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		// if (newPassword !== confirmNewPassword) {
		// 	// If new password and confirm new password do not match, return a 400 (Bad Request) error
		// 	return res.status(400).json({
		// 		success: false,
		// 		message: "The password and confirm password does not match",
		// 	});
		// }

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};
