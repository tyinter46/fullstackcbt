require('dotenv').config
const nodemailer = require("nodemailer")
const smtpTransport = require('nodemailer-smtp-transport');

const mailService = async (adminmail)=> {
//    const testAccount = await nodemailer.createTestAccount()
   const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD
    }
  }));
try {
   const verify = await transporter.verify()
//    console.log(verify)
     
const info = await transporter.sendMail({
    
        from: '"Teewhy 👻" <elitetech46@gmail.com.com>', // sender address
        to:`${adminmail}` , // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      
})

console.log("Message sent: %s", info.messageId);
// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

// Preview only available when sending through an Ethereal account
console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (error) {
    console.log(error)
}
  
}





module.exports = mailService

