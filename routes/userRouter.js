const { getUsers, getUsersByName, createUser, loginUser } = require('../Services/userService')

const userRouter = require('express').Router()

userRouter.route('/').get(getUsers)
userRouter.route('/:letters').get(getUsersByName)
userRouter.route('/create').post(createUser)
userRouter.route('/login').post(loginUser)

module.exports = userRouter