const postRouter = require('./postRouter');
const userRouter = require('./userRouter');

const apiRouter = require('express').Router()

apiRouter.use('/users', userRouter)
apiRouter.use('/posts', postRouter)

module.exports = apiRouter;