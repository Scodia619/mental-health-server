const { getAllResources, getResourcesByTopic, postNewResource, updateResourceStatus } = require('../Services/resourceService')

const resourceRouter = require('express').Router()

resourceRouter.route('/').get(getAllResources).post(postNewResource)
resourceRouter.route('/:topic').get(getResourcesByTopic)
resourceRouter.route('/approve/:resource_id').patch(updateResourceStatus)

module.exports = resourceRouter