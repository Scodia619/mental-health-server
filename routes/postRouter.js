const { getAllPosts } = require('../Services/postService')

const postRouter = require('express').Router()

postRouter.route('/').get(getAllPosts)

module.exports = postRouter