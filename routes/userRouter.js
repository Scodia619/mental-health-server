const { getUsers } = require('../Services/userService')

const userRouter = require('express').Router()

userRouter.route('/').get(getUsers)

module.exports = userRouter