const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/checkAuth')
const userController = require('../controllers/user.controller')

// @route   GET api/users/
// @desc    Get user data
// @status  --
router.get('/', checkAuth, userController.getUser)

module.exports = router