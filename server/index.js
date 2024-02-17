const express = require('express')
const connectDB = require('./config/db.config')
const cors = require('cors')
const bodyParser = require('body-parser')

const authRoutes = require('./routes/auth.routes')


const app = express()

app.use(express.json())
app.use(cors({ origin: true, credentials: true }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)

connectDB()

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})