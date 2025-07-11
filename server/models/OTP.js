const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mailTemplates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema ( {
    email : {
        type : String,
    },
    otp : {
        type : String,
        required : true,
    },
    createdAt : {
        type : Date,
        default : Date.now(),
        expires : 5*60*1000,
    }
});

async function sendVerification(email,otp){
  try{
     const mailresponse = await mailSender(email,"OTP for Email Verification" ,  otpTemplate(otp));
   console.log("Email sent successfull"  , mailresponse.response);

  }
  catch(e){
    console.log("error occured while sending mails", e);
  }
}

otpSchema.pre("save" , async function (next){
    console.log("mail is in pre hook" , this.email);
    await sendVerification(this.email, this.otp);
    next();
} )


module.exports = mongoose.model("OTP" , otpSchema);