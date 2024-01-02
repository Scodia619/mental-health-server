const { getIniviteByUsers, createNewInvite } = require('../Services/friendService')

const friendRouter = require('express').Router()

friendRouter.route('/').get(getIniviteByUsers).post(createNewInvite)

module.exports = friendRouter