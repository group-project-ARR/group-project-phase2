const {Post} = require(`../models`)

async function authorization(req, res, next) {
    try {
        let post = await Post.findByPk(req.params.id)
        if (!post) {
            throw ({ name: `PostNotFound` })
        }
        if (post.UserId !== req.user.id) {
            throw ({ name: `Forbidden` })
        }
        next()
    } catch (error) {
        next(error)
    }
}


module.exports = authorization