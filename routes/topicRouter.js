const { getAllTopics, getTopicsByName } = require('../Services/topicService')

const topicRouter = require('express').Router()

topicRouter.route('/').get(getAllTopics)
topicRouter.route('/:topic').get(getTopicsByName)

module.exports = topicRouter