const { signToken } = require("../helpers/jwt")
const {User} = require(`../models`)
class UserController {
    static async register(req, res, next) {
        try {
            const {username, email, password} = req.body
            const user = await User.create({username, email, password})
            res.status(201).json({"id": user.id, "email": user.email})
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const {email, password} = req.body
            if(!email) {
                throw ({name: `EmailNotFill`})             
            }
            if(!password) {
                throw ({name: `PasswordNotFill`})
            }
            const user = await User.findOne({where: {email: email}})
            if(!user) {
                throw ({name: `UserNotFound`})              
            }
            const isValidPasword = comparePassword(password, user.password)
            if(!isValidPasword) {
                throw ({name: `UserNotFound`})
            }
            const access_token = signToken({id: user.id})
            res.status(200).json({access_token})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController