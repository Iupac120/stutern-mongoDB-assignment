const express = require('express')
const app = express()
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const yaml = require('yamljs')
const swaggerDoc = yaml.load('./swagger.yaml')
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(cors())



require('dotenv').config()
const connectDB = require('./db/connect')
//const bodyParser = require('body-parser')
//app.use(bodyParser.urlencoded({extended: false}))
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const authorization = require('./middleware/authorization')
app.get('/',(req,res)=>{
    res.send('<h1>post API</h1><a href="/api-docs">Swagger Documentation</a>')
})
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDoc))
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/post',authorization,postRouter)

const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT,()=>{
            console.log(`server listens at port ${PORT}`)
        })

    }catch(err){
        console.log(err)
    }
}

start()