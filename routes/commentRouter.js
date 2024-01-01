const { getsAllComments, getsCommentByPost } = require('../Services/commentService')

const commentRouter = require('express').Router()

commentRouter.route('/').get(getsAllComments)
commentRouter.route('/:post_id').get(getsCommentByPost)

module.exports = commentRouter