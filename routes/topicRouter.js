const { getAllTopics, getTopicsByName, createNewTopic, getTopicByPost } = require('../Services/topicService')

const topicRouter = require('express').Router()

topicRouter.route('/').get(getAllTopics).post(createNewTopic)
topicRouter.route('/:topic').get(getTopicsByName)
topicRouter.route('/post/:id').get(getTopicByPost)

module.exports = topicRouter