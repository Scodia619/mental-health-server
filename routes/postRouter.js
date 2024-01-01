const { getAllPosts, getPostsByTopic, createNewPost } = require('../Services/postService')

const postRouter = require('express').Router()

postRouter.route('/').get(getAllPosts).post(createNewPost)
postRouter.route('/:topic').get(getPostsByTopic)

module.exports = postRouter