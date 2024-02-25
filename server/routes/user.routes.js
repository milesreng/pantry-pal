const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/checkAuth')
const uploadImage = require('../middleware/uploadImage')
const userController = require('../controllers/user.controller')

// @route   GET api/users/
// @desc    Get user data
// @status  --
router.get('/', checkAuth, userController.getUser)

// @route   PUT api/users/
// @desc    Update user data
// @status  --
router.put('/', checkAuth, userController.getUser)

// @route   POST api/users/
// @desc    Update user data
// @status  --
// router.post('/image', upload.single('file'), userController.uploadUserImage)

module.exports = router