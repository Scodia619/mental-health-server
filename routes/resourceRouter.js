const { getAllResources, getResourcesByTopic, postNewResource, updateResourceStatus, getResourcesByReviewerAndStatus } = require('../Services/resourceService')

const resourceRouter = require('express').Router()

resourceRouter.route('/').get(getAllResources).post(postNewResource)
resourceRouter.route('/approve').get(getResourcesByReviewerAndStatus)
resourceRouter.route('/:topic').get(getResourcesByTopic)
resourceRouter.route('/approve/:resource_id').patch(updateResourceStatus)

module.exports = resourceRouter