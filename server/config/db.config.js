const mongoose = require('mongoose')
require('dotenv').config()

const db = process.env.MONGODB_URI

mongoose.set('strictQuery', true, 'useNewUrlParser', true)

const connectDB = async () => {
  try {
    await mongoose.connect(db)
    console.log('MongoDB is connected')
  } catch (e) {
    console.log(e.message)
    process.exit(1)
  }
}

module.exports = connectDB