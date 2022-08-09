const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/UserModel')
const Recovery = require('../models/RecoveryModel')
const handleError = require('../utilities/ErrorHandler')
const sendMail = require('../utilities/Mailer')

let db = mongoose.connection
//collection connection
mongoose.connect("mongodb://localhost:27017/authentication", {
    useNewUrlParser : true,
    useUnifiedTopology : true
})

exports.forgotpassword = (req,res) => {
    let newRecovery = new Recovery(); 
    let token = Math.floor(Math.random() * 1000000) + 9999999
    newRecovery.email = req.body.email
    newRecovery.token = token

    User.findOne({ email : req.body.email }, function(err, user) { 
        if (user === null) { 
            return res.status(400).send({status : "error", message : "No account with such email found."}); 
        }
        else{
            newRecovery.save((err, Rec) => { 
                if (err) { 
                    let error = handleError(err)
                    return res.status(400).send({status : "error", message : error}); 
                } 
                else { 
                    //send token via mail
                    let msg = 'Below is an 8-digit password recovery code. Use this to reset your account password<br/><b>'+token +'</b><p>Code expires in 15 minutes</p>'
                    /*if (sendMail(req.body.email, "Password Recovery", msg)) {
                        return res.status(201).send({status : "success", message : "Please check mail for 8-digit password recovery code"}); 
                    } 
                    else {
                        return res.status(400).send({status : "error", message :"An unknown error occurred. Please try again later"}); 
                    }*/
                    sendMail(req.body.email, "Password Recovery", msg, res)
                } 
            }); 
        }
    })
}

exports.verifytoken = (req,res) => {
    Recovery.findOne({ email : req.body.email, token : req.body.token }, function(err, user) {
        if (user === null) { 
            return res.status(400).send({status : "error", message : "Invalid or expired token"}); 
        }
        else{
            return res.status(201).send({status : "success", message : "Password recovery code verified"}); 
        }
    })
}

exports.resetpassword = async(req,res) => {
    const password = await bcrypt.hash(req.body.password, 12)
    
    User.updateOne({password : password})
    .where('email').equals(req.body.email)
    .exec((err, result) => {
        if (err) {
            return res.status(400).send({status : "error", message : "Error resetting password.Try again later"}); 
        }
        else{
            return res.status(201).send({status : "success", message : "Password recovery successful."})
        }
    })
}