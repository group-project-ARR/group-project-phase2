const { Op } = require("sequelize")
const { Post, Category, User } = require(`../models`)
class PostController {
    static async createPost(req, res, next) {
        try {
            const { name, price, location, condition, imageUrl, CategoryId } = req.body
            const post = await Post.create({ name, price, location, condition, imageUrl, CategoryId, UserId: req.user.id })
            res.status(201).json(post)
        } catch (error) {
            next(error)
        }
    }

    static async getSellingProduct(req, res, next) {
        const { search } = req.query;
        const queryParams = {
            where: {
                UserId: {
                    [Op.ne]: req.user.id
                  }
            },
            include: [Category, User]
        };

        if (search) {
            queryParams.where.name = {
                [Op.iLike]: `%${search}%`
            };
        }
        try {
            const post = await Post.findAll(queryParams)
            res.status(200).json(post)
        } catch (error) {
            next(error)
        }
    }

    static async getSellingProductById(req, res, next) {
        try {
            const post = await Post.findAll({
                where: {
                  UserId: {
                    [Op.ne]: req.user.id
                  }
                }
              })
              const detailSelling = await post.findByPk(req.params.id)
            res.status(200).json(detailSelling)
        } catch (error) {
            next(error)
        }
    }

    static async getPosts(req, res, next) {
        const { search } = req.query;
        const queryParams = {
            where: {},
            include: [Category, User]
        };

        if (search) {
            queryParams.where.name = {
                [Op.iLike]: `%${search}%`
            };
        }

        try {
            const posts = await Post.findAll(queryParams);
            res.status(200).json(posts);
        } catch (error) {
            next(error);
        }
    }

    static async getPostsByUserId(req, res, next) {
        try {
            const posts = await Post.findAll({
                where: {
                    UserId: req.user.id
                }
            });
            res.status(200).json(posts);
        } catch (error) {
            next(error);
        }
    }

    static async getPost(req, res, next) {
        try {
            const post = await Post.findByPk(req.params.id, {
                include: [Category, User]
            });

            if (!post) {
                throw { name: 'PostNotFound' };
            }

            res.status(200).json(post);
        } catch (error) {
            next(error);
        }
    }

    static async editPost(req, res, next) {
        try {
            const post = await Post.findByPk(req.params.id)
            if (!post) {
                throw ({ name: `PostNotFound` })
            }
            const { name, price, location, condition, imageUrl, CategoryId } = req.body
            const editPost = await post.update({ name, price, location, condition, imageUrl, CategoryId })
            res.status(200).json(editPost)
        } catch (error) {
            next(error)
        }
    }

    static async destroyPost(req, res, next) {
        try {
            const post = await Post.findByPk(req.params.id)
            if (!post) {
                throw ({ name: `PostNotFound` })
            }
            await post.destroy()
            res.status(200).json({ message: `${post.name} success to delete` })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = PostController