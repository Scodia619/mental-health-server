const commentRouter = require('./commentRouter');
const friendRouter = require('./friendRouter');
const goalRouter = require('./goalRouter');
const habitRouter = require('./habitRouter');
const postRouter = require('./postRouter');
const resourceRouter = require('./resourceRouter');
const topicRouter = require('./topicRouter');
const userRouter = require('./userRouter');

const apiRouter = require('express').Router()

apiRouter.use('/users', userRouter)
apiRouter.use('/posts', postRouter)
apiRouter.use('/topics', topicRouter)
apiRouter.use('/comments', commentRouter)
apiRouter.use('/goals', goalRouter)
apiRouter.use('/habits', habitRouter)
apiRouter.use('/friends', friendRouter)
apiRouter.use('/resources', resourceRouter)

module.exports = apiRouter;