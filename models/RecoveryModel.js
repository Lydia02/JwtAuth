const mongoose = require('mongoose')

//todo model schema
let RecoveryModel = mongoose.Schema({
    email : { 
        type : String, 
        required : [true, 'Please fill in email field']
    }, 
    token: String,
    
},
{
    timestamps : true 
})

module.exports = mongoose.model("Recovery", RecoveryModel)