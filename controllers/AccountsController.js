const mongoose = require('mongoose')
const User = require('../models/UserModel')
const generateAccessToken = require('../utilities/TokenGenerator')
const handleError = require('../utilities/ErrorHandler')

let db = mongoose.connection
//collection connection
mongoose.connect("mongodb://localhost:27017/authentication", {
    useNewUrlParser : true,
    useUnifiedTopology : true
})

exports.welcome = (req, res) => {
    console.log("welcome")
}

exports.register = (req, res) => {
    let newUser = new User(); 
    newUser.name = req.body.name
    newUser.email = req.body.email
    newUser.role = req.body.role
    newUser.password = req.body.password
        
    newUser.save((err, User) => { 
        if (err) { 
            let error = handleError(err)
            return res.status(400).send({status : "error", message : error}); 
        } 
        else { 
            return res.status(201).send({status : "success", message : "User registered successfully."}); 
        } 
    });
}

exports.login = (req, res) => {
    User.findOne({ email : req.body.email }, function(err, user) { 
        if (user === null) { 
            return res.status(400).send({status : "error", message : "No account with such email found."}); 
        } 
        else {
            user.validatePassword(req.body.password,(error, match)=>{
                if (error) {
                    return res.status(400).send({ status : "error",message : "Error signing in. Try again later"}); 
                }
                else if (!match) {
                    return res.status(400).send({ status : "error",message : "Wrong account Password"}); 
                }
                else{
                    let token = generateAccessToken(req.body.email, user.role)
                    res.cookie('session',token)
                    return res.status(201).send({status : "success", message : "User Logged In successfully", token : token})                    
                    
                }
            })
            
            
        } 
    }); 
}

exports.logout = (req, res) => {
    res.cookie('session',false)
    return res.status(201).send({status : "success", message : "User Logged out successfully"})
}

