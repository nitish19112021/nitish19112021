
const nodemailer = require('nodemailer');
const sentEmail = async (email,subject, text) =>{
    try{
        const transporter = nodemailer.createTransport({
            service:'gmail',            
            secure:false,
            port:587,
            auth:{
                user:process.env.USER,
                pass:process.env.PASS
            }
        })
        await transporter.sendMail({
            from:process.env.USER,
            to:email,
            subject:"account activation",
            text:link
        })
        console.log("email sent successfully")
    }catch(err){
        console.log("email not sent"+err)
    }
}

module.exports = sentEmail;