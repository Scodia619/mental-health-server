const { getsAllComments } = require('../Services/commentService')

const commentRouter = require('express').Router()

commentRouter.route('/').get(getsAllComments)

module.exports = commentRouter