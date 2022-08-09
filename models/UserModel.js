const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//todo model schema
let UserModel = mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please fill in name field']
    },
    email : { 
        type : String, 
        required : [true, 'Please fill in email field'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    }, 
    role: {
      type : String,
      enum: {
          values: ['user', 'staff','manager','admin'],
          message: 'Invalid User role.'
      },
      default : 'user',
      required : [true, 'Please select user role.']
    } ,
    password:{
        type : String,
        required : [true, 'Please enter account password']
    },
    
},{ timestamps : true })

UserModel.pre("save", function (next) {
    const user = this
  
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError)
        } else {
          bcrypt.hash(user.password, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError)
            }
  
            user.password = hash
            next()
          })
        }
      })
    } else {
      return next()
    }
  })

UserModel.methods.validatePassword = async function(password, callback) {
    bcrypt.compare(password, this.password, function(error, isMatch) {
        if (error) {
          return callback(error)
        } else {
          callback(null, isMatch)
        }
    })
   
   
}; 

module.exports = mongoose.model("User", UserModel)
