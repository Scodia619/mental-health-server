const postRouter = require('./postRouter');
const topicRouter = require('./topicRouter');
const userRouter = require('./userRouter');

const apiRouter = require('express').Router()

apiRouter.use('/users', userRouter)
apiRouter.use('/posts', postRouter)
apiRouter.use('/topics', topicRouter)

module.exports = apiRouter;