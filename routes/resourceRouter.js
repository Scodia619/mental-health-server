const { getAllResources, getResourcesByTopic, updateResourceStatus } = require('../Services/resourceService')

const resourceRouter = require('express').Router()

resourceRouter.route('/').get(getAllResources)
resourceRouter.route('/:topic').get(getResourcesByTopic)
resourceRouter.route('/approve/:resource_id').patch(updateResourceStatus)

module.exports = resourceRouter