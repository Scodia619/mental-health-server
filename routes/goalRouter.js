const { getAllGoalsByUser } = require('../Services/goalService')

const goalRouter = require('express').Router()

goalRouter.route("/").get(getAllGoalsByUser)

module.exports = goalRouter