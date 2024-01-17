const { getUsers, getUsersByName, createUser, loginUser, getUsersById } = require('../Services/userService')

const userRouter = require('express').Router()

userRouter.route('/').get(getUsers)
userRouter.route('/id/:id').get(getUsersById)
userRouter.route('/:letters').get(getUsersByName)
userRouter.route('/create').post(createUser)
userRouter.route('/login').post(loginUser)

module.exports = userRouter