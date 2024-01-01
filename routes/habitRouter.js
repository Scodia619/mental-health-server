const { getAllHabits, getHabitByName, createNewHabit } = require('../Services/habitService')

const habitRouter = require('express').Router()

habitRouter.route('/').get(getAllHabits).post(createNewHabit)
habitRouter.route('/:name').get(getHabitByName)

module.exports = habitRouter