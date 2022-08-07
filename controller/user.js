const {validationResult} =require('express-validator')
const User = require("../models/user");
var jwt = require('jsonwebtoken')
var expressJwt = require('express-jwt')
exports.register = (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty) {
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }
    const user = new User(req.body)
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({
                error: "unable to add user"
            })
        }

        return res.json({
            mesage: "Success",
            user
        })
    })
}
exports.signin = (req, res) => {
    const {email, password} = req.body

    User.findOne({email}, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "Email not found!"
            })
        }

        //Authenticate user

        if(!user.authenticate(password)) {
            return  res.status(400).json({
                error: "Email and password do not match"
            })
        }

// Create token
const token = jwt.sing({_id: user, _id}, process.env.SECRET)

// Put token in cookies

res.cookie('token', token, {expire: new Date() + 1})

// Semd respond
const { _id, name, email} = user
return res.json({
    token,
    user: {
        _id, 
        name,
        email
    }
})
    })
}
exports.signout = (req, res) => {
    res.clearCookie("token")
    return res.json({
        message: "User signout successful"
    })
}