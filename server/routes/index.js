const express = require('express')
const errorHandler = require('../middlewares/errorHandler')
const UserController = require('../controllers/UserController')
const router = express.Router()


router.post(`/register`, UserController.register)




router.use(errorHandler)


module.exports = router