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

      
    } catch (e) {

    }
  }, 
  login: async (req, res) => {
    try {

    } catch (e) {
      
    }
  }
}

module.exports = userController