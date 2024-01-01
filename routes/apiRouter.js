const commentRouter = require('./commentRouter');
const goalRouter = require('./goalRouter');
const postRouter = require('./postRouter');
const topicRouter = require('./topicRouter');
const userRouter = require('./userRouter');

const apiRouter = require('express').Router()

apiRouter.use('/users', userRouter)
apiRouter.use('/posts', postRouter)
apiRouter.use('/topics', topicRouter)
apiRouter.use('/comments', commentRouter)
apiRouter.use('/goals', goalRouter)

module.exports = apiRouter;