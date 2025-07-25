const nodemailer = require("nodemailer");

const mailSender = async (email,title,body) => {
   try {

    let transporter = nodemailer.createTransport({
        host : process.env.MAIL_HOST,
        auth : {
            user : process.env.MAIL_USER,
            pass : process.env.MAIL_PASS,
        }
    });

    let info = await transporter.sendMail({
        from : "Meet Agrawl's Study-Notion",
        to : `${email}` ,
        subject : `${title}`,
        html : `${body}`
    });
    console.log(info);
    return info;
    

   }
   catch (error)
   {
    console.log("Error while sending mail for otp" , error);
    console.error(error);
   }
}

module.exports = mailSender;