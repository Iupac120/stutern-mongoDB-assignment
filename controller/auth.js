
const userDB = require('../models/user')
const bcrypt = require('bcrypt')
const {StatusCodes} = require('http-status-codes')
//const jwt = require('jsonwebtoken')
//register a new user
const register = async(req,res)=>{
    const newUser = await userDB.create({...req.body})
    //const token = jwt.sign({userId:newUser._id, name:newUser.name},process.env.SECRET,{expiresIn:'2d'})
    const token = newUser.createJWT()
    res.status(StatusCodes.CREATED).json({newUser,token})
}
// a user can login
const login = async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.send('please provide email and password')
    }
    const returnUser = await userDB.findOne({email})
    if(!returnUser){
        return res.send('user does not exist')
    }
    const loginUser = await bcrypt.compare(password,returnUser.password)
    if(!loginUser){
        return res.send('incorrect password, try again later')
    }
    const token = returnUser.createJWT()
    res.status(StatusCodes.ACCEPTED).json({loginUser:{name:returnUser.name}, token})
}

module.exports = {
    register,
    login
}