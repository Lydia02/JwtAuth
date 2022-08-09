const mongoose = require('mongoose')
const User = require('../models/UserModel')

let db = mongoose.connection
//collection connection
mongoose.connect("mongodb://localhost:27017/authentication", {
    useNewUrlParser : true,
    useUnifiedTopology : true
})


exports.addRole = (req,res) => {
    if (req.body.role) {
        User.updateOne({role : req.body.role})
        .where('email').equals(req.body.email)
        .exec((err, result) => {
           if (err) {
                return res.status(400).send({status : "error", message : "Error adding role. Try again later"}); 
            }
            else{
                
                return res.status(201).send({status : "success", message : "Role added successfully."})
            }
        })
    }
    else{
        return res.status(400).send({status : "error", message : "Please select user role"}); 
    }
    
}