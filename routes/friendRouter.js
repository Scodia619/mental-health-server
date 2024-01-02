const { getIniviteByUsers, createNewInvite, getInvitesByUser, updateInvite } = require('../Services/friendService')

const friendRouter = require('express').Router()

friendRouter.route('/').get(getIniviteByUsers).post(createNewInvite)
friendRouter.route('/:username').get(getInvitesByUser).patch(updateInvite)

module.exports = friendRouter