require('dotenv').config()
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
});

const sendMail = (to, subject, message, res) => {
    let mailOptions = {
        from: 'ojoawolydia@gmail.com',
        to: to,
        subject: subject,
        text: message
    };

    transporter.sendMail(mailOptions, function(err, data) {
       
        if (err) {
            return res.status(400).send({status : "error", message :"An unknown error occurred. Please try again later"}); 
        } 
        else {
            return res.status(201).send({status : "success", message : "Please check mail for 8-digit password recovery code"}); 
        }
    })
}

module.exports = sendMail