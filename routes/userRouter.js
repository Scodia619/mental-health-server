const { getUsers, getUsersByName, createUser } = require('../Services/userService')

const userRouter = require('express').Router()

userRouter.route('/').get(getUsers)
userRouter.route('/:letters').get(getUsersByName)
userRouter.route('/create').post(createUser)

module.exports = userRouter