const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required: [true, 'please provide title'],
        minlength: 3,
        maxlength: 100
    },
    body:{
        type:String,
        required: [true, 'please provide message'],
        minlength: 3,
        maxlength: 1000
    },
    comment:{
        type:String,
        minlength: 3,
        maxlength: 100
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref: 'user',
        required: [true, 'please provide user']
    }
},{timestamps:true})


module.exports = mongoose.model('post', postSchema)