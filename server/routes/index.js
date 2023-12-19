const express = require('express')
const errorHandler = require('../middlewares/errorHandler')
const router = express.Router()


router.use(errorHandler)


module.exports = router