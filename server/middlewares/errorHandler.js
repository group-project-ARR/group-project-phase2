function errorHandler(error, req, res, next) {
    if (error.name === `SequelizeValidationError`) {
        let errors = error.errors.map((isi) => {
            return isi.message
        })
        res.status(400).json({ message: errors })
    } else if (error.name === `SequelizeUniqueConstraintError`) {
        let errors = error.errors.map((isi) => {
            return isi.message
        })
        res.status(400).json({ message: errors })
    } else if (error.name === `EmailNotFill`) {
        res.status(400).json({ message: `Email is Required` })
    } else if (error.name === `PasswordNotFill`) {
        res.status(400).json({ message: `Password is Required` })
    } else if (error.name === `UserNotFound`) {
        res.status(401).json({ message: `Invalid email/password` })
    } else if (error.name === `InvalidUser`) {
        res.status(401).json({ message: `Invalid token` })
    } else if (error.name === `PostNotFound`) {
        res.status(404).json({ message: `Post not found` })
    } else if (error.name === `Forbidden`) {
        res.status(403).json({ message: `You are not authorized` })
    } else {
        console.log(error)
        res.status(500).json({ message: `Internal Server Error` })
    }
}

module.exports = errorHandler