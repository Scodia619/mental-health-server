const { getAllResources, getResourcesByTopic } = require('../Services/resourceService')

const resourceRouter = require('express').Router()

resourceRouter.route('/').get(getAllResources)
resourceRouter.route('/:topic').get(getResourcesByTopic)

module.exports = resourceRouter