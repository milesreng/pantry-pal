const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

// @route   POST api/auth/login
// @desc    Login user
// @status  Functional
router.post('/login', userController.login)

// @route   GET api/auth/refresh
// @desc    Refresh user token
// @status  Functional
router.get('/refresh', userController.refresh)

// @route   POST api/auth/register
// @desc    Register new user
// @status  Functional
router.post('/register', userController.register)

module.exports = router