const { getAllTopics, getTopicsByName, createNewTopic } = require('../Services/topicService')

const topicRouter = require('express').Router()

topicRouter.route('/').get(getAllTopics).post(createNewTopic)
topicRouter.route('/:topic').get(getTopicsByName)

module.exports = topicRouter