const express = require('express')
const router = express.Router()

const authController = require('../controller/auth')
const authorization = require('../middleware/authorization')

router.post('/login',authorization,authController.login)
router.post('/register',authController.register)


module.exports = router