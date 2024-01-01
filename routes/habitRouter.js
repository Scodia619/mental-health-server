const { getAllHabits } = require('../Services/habitService')

const habitRouter = require('express').Router()

habitRouter.route('/').get(getAllHabits)

module.exports = habitRouter