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
}

module.exports = UserController