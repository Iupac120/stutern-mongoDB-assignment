const jwt = require('jsonwebtoken')
const {StatusCodes} = require('http-status-codes')


const authorization = async(req,res,next)=>{
    const auth = req.headers.authorization
    if(!auth ||!auth.startsWith('Bearer')){
        return res.sendStatus(StatusCodes.BAD_REQUEST)
    }
    const token = auth.split(' ')[1]
    try{
        const decode = jwt.verify(token,process.env.SECRET)
        console.log(decode)
        req.authUser = {username:decode.userName,userid:decode.userId}
        next()
    }catch(error){
        res.sendStatus(StatusCodes.BAD_REQUEST)
    }
    
}

module.exports = authorization
