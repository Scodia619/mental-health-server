const { getAllResources, getResourcesByTopic, postNewResource } = require('../Services/resourceService')

const resourceRouter = require('express').Router()

resourceRouter.route('/').get(getAllResources).post(postNewResource)
resourceRouter.route('/:topic').get(getResourcesByTopic)

module.exports = resourceRouter