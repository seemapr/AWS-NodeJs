const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        trim:true,
        required: [true,'Please add a name']
    },
    email:{
        type:String,
        unique:true,
        required:true,
        validate:[validator.isEmail , "Please enter a valid Email"]

    },
    password:{
        type:String,
        required:[true,"Please set a password"],
        minLength:6,
        select:false
    }
})

userSchema.pre('save',async function(next){
    this.password = bcrypt.hashSync(this.password,10)
    next()

})

// Export the User model created from the schema
module.exports = mongoose.model("User", userSchema);