const { getAllPosts, getPostsByTopic } = require('../Services/postService')

const postRouter = require('express').Router()

postRouter.route('/').get(getAllPosts)
postRouter.route('/:topic').get(getPostsByTopic)

module.exports = postRouter