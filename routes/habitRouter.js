const { getAllHabits, getHabitByName } = require('../Services/habitService')

const habitRouter = require('express').Router()

habitRouter.route('/').get(getAllHabits)
habitRouter.route('/:name').get(getHabitByName)

module.exports = habitRouter