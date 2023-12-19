const { verifyToken } = require("../helpers/jwt")
const {User} = require(`../models`)

async function authentication(req, res, next) {
    try {
        let access_token = req.headers.authorization
        if (!access_token) {
            throw ({ name: `InvalidUser` })
        }
        if (!access_token.split(` `)[0] === `Bearer`) {
            throw ({ name: `InvalidUser` })
        }
        let payload = verifyToken(access_token.split(` `)[1])
        let user = await User.findByPk(payload.id)
        if (!user) {
            throw ({ name: `InvalidUser` })
        }
        req.user = {
            id: user.id,
            username: user.username,
            email: user.email
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication