const { getIniviteByUsers } = require('../Services/friendService')

const friendRouter = require('express').Router()

friendRouter.route('/').get(getIniviteByUsers)

module.exports = friendRouter