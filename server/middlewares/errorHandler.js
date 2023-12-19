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
    } else {
        console.log(error)
        res.status(500).json({ message: `Internal Server Error` })
    }
}

module.exports = errorHandler