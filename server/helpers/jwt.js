const jwt = require('jsonwebtoken')

const JWT_SECRET = `testdulubro`

const signToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET)
}

const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET)
}

module.exports = { signToken, verifyToken }