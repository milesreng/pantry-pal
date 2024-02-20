const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')
const { ObjectId } = require('mongodb')

const User = require('../models/user.model')

const userController = {
  register: async (req, res) => {
    try {
      const user = req.body

      if (!validator.isEmail(user.email)) {
        return res.status(400).json({error: 'incorrect email format'})
      }

      // confirm password strength
      // 8+ char, at least one lower/uppercase, number and symbol
      if (!validator.isStrongPassword(user.password)) {
        return res.status(400).json({error: 'password is too weak'})
      }

      // confirm username format
      if (!validator.matches(user.username, '^[a-zA-Z0-9_.-]*$')) {
        return res.status(400).json({error: 'username not valid'})
      }

      const takenUsername = await User.findOne({username: user.username})
      const takenEmail = await User.findOne({email: user.email})

      if (takenUsername) {
        return res.status(400).json({error: 'username has been taken'})
      } else if (takenEmail) {
        return res.status(400).json({error: 'there is already an account connected to this email'})
      }

      const hashedPassword = await bcrypt.hash(user.password, 10)
      const lowerUsername = user.username.toLowerCase()

      const newUser = new User({ 
        username: lowerUsername, 
        firstname: user.firstname,
        email: user.email,
        password: hashedPassword})

      await newUser.save()

      return res.status(201).json({ 
        message: 'user successfully registered'})
    } catch (e) {
      return res.status(402).json({ error: 'user could not be created' })
    }
  }, 
  login: async (req, res) => {
    try {
      const { email, password } = req.body
      const dbUser = await User.findOne({ email })

      if (dbUser) {
        var isMatch = await bcrypt.compare(password, dbUser.password)
      } else {
        return res.status(404).json({ error: 'user not found' })
      }
  
      // Match password with database password
      if (!isMatch) {
        return res.status(400).json({ error:'invalid username or password' })
      }
  
      // Create a JSON web token
      const accessToken = jwt.sign({ userId: dbUser._id, email: dbUser.email }, process.env.SECRET_KEY, {
        expiresIn: '1h'
      })

      const refreshToken = jwt.sign({ userId: dbUser._id, email: dbUser.email }, process.env.SECRET_KEY, {
        expiresIn: '1d'
      })

      res.status(200).json({ accessToken, refreshToken, ...dbUser })
    } catch (e) {
      console.log(e)
      return res.status(402).json({ error: 'user authentication failed' })
    }
  },
  refresh: async (req, res) => {
    try {
      const token = req.headers['x-refresh-token']

      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) throw err

        const userId = decoded.userId
        const email = decoded.email
        
        const accessToken = jwt.sign({ userId, email }, process.env.SECRET_KEY, {
          expiresIn: '1h'
        })
  
        const refreshToken = jwt.sign({ userId, email }, process.env.SECRET_KEY, {
          expiresIn: '1d'
        })

        return res.status(200).json({ accessToken, refreshToken })
      })

      
    } catch (e) {
      console.log(e)
      return res.status(402).json({ error: 'token refresh failed' })
    }
  },
  getUser: async (req, res) => {
    try {
      const dbUser = await User.findOne({ email: req.userData.email })

      if (dbUser) {
        return res.status(200).json(dbUser)
      } else {
        return res.status(404).json({ error: 'user not found' })
      } 
    } catch (e) {
      return res.status(404).json({ error: 'could not retrieve user data' })
    }
  }
}

module.exports = userController