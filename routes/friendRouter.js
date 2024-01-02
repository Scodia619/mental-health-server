const { getIniviteByUsers, createNewInvite, getInvitesByUser, updateInvite, getAcceptedFriends } = require('../Services/friendService')

const friendRouter = require('express').Router()

friendRouter.route('/').get(getIniviteByUsers).post(createNewInvite)
friendRouter.route('/:username').get(getInvitesByUser).patch(updateInvite)
friendRouter.route('/:username/accepted').get(getAcceptedFriends)

module.exports = friendRouter