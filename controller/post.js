const postDB = require('../models/post')
const bcrypt = require('bcrypt')
const {StatusCodes} = require('http-status-codes')

const getAllJobs = async(req,res)=>{
    const posts = await postDB.find({createdBy:req.authUser.userid}).sort('createdAt')
    res.status(StatusCodes.OK).json({posts,count:posts.length})
}

const getJob = async(req,res)=>{
    const {authUser:{userid},params:{id}} = req
    const post = await postDB.findOne({_id:id,createdBy:userid})
    if(!post){
        return res.status(StatusCodes.NOT_FOUND).json({message:'cannot find job'})
    }
    res.status(StatusCodes.ACCEPTED).json(post)
}

const createJob = async(req,res)=>{
    req.body.createdBy = req.authUser.userid
    const post = await postDB.create({...req.body})
    res.status(StatusCodes.CREATED).json(post)

}
//creating a new branch for assignment review
const updateJob = async(req,res)=>{
    const {params:{id},body:{title,body}, authUser:{userid}} = req
    if (title ==='' || body === ''){
        return res.sendStatus(StatusCodes.BAD_REQUEST)
    }
    const newPost = await postDB.findByIdAndUpdate({_id:id,createdBy:userid},req.body,{new:true,runValidators: true})
    res.status(StatusCodes.ACCEPTED).json({newPost})
}
const deleteJob = async(req,res)=>{
    const {id} = req.params
    const newPost = await postDB.findByIdAndUpdate({_id:id})
    res.status(StatusCodes.ACCEPTED).json({msg:`The post with this id:${id} has been deleted`})

}
 
module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}
