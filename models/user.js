const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
name:{
    type: String,
    required: [true,'please provide name'],
    minlength: 3,
    maxlength: 50
},
email:{
    type: String,
    required: [true,'please provide name'],
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'please provide valid email'],
    unique: true
},
password:{
    type: String,
    required: [true,'please provide name'],
    minlength: 6
    
}
})

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    next()
})
userSchema.methods.createJWT = function(){
    return  jwt.sign({userName:this.name,userId:this._id },process.env.SECRET,{expiresIn:process.env.LIFETIME})
}

module.exports = mongoose.model('user', userSchema)