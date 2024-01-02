const { getAllResources } = require('../Services/resourceService')

const resourceRouter = require('express').Router()

resourceRouter.route('/').get(getAllResources)

module.exports = resourceRouter