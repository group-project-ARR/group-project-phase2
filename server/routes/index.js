const express = require('express')
const errorHandler = require('../middlewares/errorHandler')
const UserController = require('../controllers/UserController')
const authentication = require('../middlewares/authentication')
const PostController = require('../controllers/PostController')
const authorization = require('../middlewares/authorization')
const CategoryController = require('../controllers/CategoryController')
const router = express.Router()


router.post(`/register`, UserController.register)
router.post(`/login`, UserController.login)

router.use(authentication)
router.post(`/posts`, PostController.createPost)
router.get(`/posts`, PostController.getPosts)
router.get(`/posts/:id`, PostController.getPost)

router.put(`/posts/:id`, authorization, PostController.editPost)
router.delete(`/posts/:id`, authorization, PostController.destroyPost)

router.get(`/categories`, CategoryController.getCategory)


router.use(errorHandler)


module.exports = router