const express = require('express')
const router = express.Router()
// routes for new users
const authController = require('../controller/auth')

router.post('/login',authController.login)
router.post('/register',authController.register)


module.exports = router