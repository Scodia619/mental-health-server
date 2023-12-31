const { getUsers, getUsersByName } = require('../Services/userService')

const userRouter = require('express').Router()

userRouter.route('/').get(getUsers)
userRouter.route('/:letters').get(getUsersByName)

module.exports = userRouter