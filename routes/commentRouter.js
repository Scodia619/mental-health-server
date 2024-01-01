const { getsAllComments, getsCommentByPost, createNewComment } = require('../Services/commentService')

const commentRouter = require('express').Router()

commentRouter.route('/').get(getsAllComments)
commentRouter.route('/:post_id').get(getsCommentByPost).post(createNewComment)

module.exports = commentRouter