//MongoDb was the cause of failure in the heroku;

const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
  
    useUnifiedTopology: true,
  })
}


module.exports = connectDB