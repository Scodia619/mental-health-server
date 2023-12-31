const { getAllTopics } = require('../Services/topicService')

const topicRouter = require('express').Router()

topicRouter.route('/').get(getAllTopics)

module.exports = topicRouter