const moment = require('moment')
const fs = require('fs');
const consola = require('consola')

const User = require("../models/User");
const Post = require("../models/Post");
const constants = require("../constants/index");
const apiResponse = require('../helpers/apiResponse');
const uploadImage = require('../services/cloudinary')

/**
 * @DESC Upload Image
 */
async function uploadImages(req, res) {
    try {
        const urls = [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const {
                    path
                } = file;
                urls.push(uploadImage(path));
                fs.unlinkSync(path);
            }
            const imageUrls = await Promise.all(urls);
            const data = [];
            for (const imageUrl of imageUrls) {
                const postImages = new PostImage({
                    imageUrl
                });
                data.push(postImages.save());
            }
            return data
        } else {
            return
        }
    } catch (error) {
        consola.error(error);
        return apiResponse.validationErrorWithData(res, "Image not uploaded", error)
    }
}
/**
 * @DESC Create new post
 */
async function createPost(req, res) {
    try {
        const {
            title,
            content
        } = req.body
        const user = req.user;
        let urls = await uploadImages(req, res)

        const post = new Post({
            title,
            content,
            imageUrls: urls,
            _user: user._id
        })
        const pt = await post.save()
        let filter = {
            '_id': (user._id)
        }
        let update = {
            $push: {
                posts: [pt._id]
            }
        }
        await User.updateOne(filter, update)
        return apiResponse.createdResponse(res, "Post Sent")

    } catch (error) {
        consola.error("Create Post", error.toString());

        return apiResponse.errorResponse(res, `${error}`);
    }
}
/**
 * @DESC Delete a post
 */
async function deletePost(req, res) {
    try {
        const {
            _post
        } = req.params.id;
        const post = await Post.findOne({
            '_id': _post
        })
        if (!post) {
            return apiResponse.notFoundResponse(res, "Post does not exist")
        }
        await Post.deleteOne({
            '_id': _post
        })

        return apiResponse.successResponse(res, "Post removed")
    } catch (error) {
        consola.error("Delete Post", error.toString());

        return apiResponse.errorResponse(res, `${error}`);
    }
}



/**
 * @DESC Edit post
 */
async function editPost(req, res) {
    try {
        const {
            _post,
            title,
            content
        } = req.body
        const post = await Post.findOne({
            '_id': _post
        })
        if (!post) {
            return apiResponse.notFoundResponse(res, "Post does not exist")
        }
        post.content = content
        post.title = title

        await post.save()
        return apiResponse.successResponse(res, "Post Edited")
    } catch (error) {
        consola.error("Delete Post", error.toString());

        return apiResponse.errorResponse(res, `${error}`);
    }
}

/**
 * @DESC Get all posts
 */
async function getAllPosts(req, res) {
    try {
        const posts = await Post.find()
            //cache the request
            .cache({
                key: constants.ALL
            })

        return apiResponse.successResponseWithData(res, "Gotten all posts", posts)
    } catch (error) {
        consola.error("Get all Posts", error.toString());

        return apiResponse.errorResponse(res, `${error}`);
    }
}

/**
 * @DESC Get user posts
 */
async function getUserPosts(req, res) {
    try {
        const posts = await Post.find({
                _user: req.user._id

            })
            // cache using redis
            .cache({
                key: req.user._id
            })

        return apiResponse.successResponseWithData(res, "Gotten user posts", posts)
    } catch (error) {
        consola.error("Get User Posts", error.toString());

        return apiResponse.errorResponse(res, `${error}`);
    }
}
/**
 * @DESC Get single post
 */
async function getSinglePost(req, res) {
    try {
        const post = await Post.findOne({
                _id: req.params.id

            })
            // cache using redis
            .cache({
                key: req.params.id
            })

        return apiResponse.successResponseWithData(res, "Gotten post", post)
    } catch (error) {
        consola.error("Get single Post", error.toString());

        return apiResponse.errorResponse(res, `${error}`);
    }
}



module.exports = {
    createPost,
    deletePost,
    editPost,
    getAllPosts,
    getUserPosts,
    getSinglePost
}