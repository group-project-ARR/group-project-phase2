const express = require('express')
const errorHandler = require('../middlewares/errorHandler')
const UserController = require('../controllers/UserController')
const authentication = require('../middlewares/authentication')
const router = express.Router()


router.post(`/register`, UserController.register)
router.post(`/login`, UserController.login)

router.use(authentication)

router.use(errorHandler)


module.exports = router