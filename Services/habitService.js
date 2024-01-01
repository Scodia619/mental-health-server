const { selectAllHabits, selectHabitByName, postHabit } = require("../Repositories/habitRepository")
const { incorrectDataError, noHabitError, missingDataError, habitExistsError } = require("../errorVariables")

exports.getAllHabits = (req, res, next) => {
    selectAllHabits().then((habits)=>{
        res.status(200).send({habits})
    })
}

exports.getHabitByName = (req, res, next) => {
    const {name} = req.params
    if(!isNaN(parseInt(name))){
        throw incorrectDataError
    }
    selectHabitByName(name).then((habits)=>{
        if(!habits){
            throw noHabitError
        }
        res.status(200).send({habits})
    }).catch(err => {
        next(err)
    })
}

exports.createNewHabit = (req, res, next) => {
    const {name, description} = req.body

    if(!name || !description){
        throw missingDataError
    }
    if(!isNaN(parseInt(name)) || !isNaN(parseInt(description))){
        throw incorrectDataError
    }

    selectHabitByName(name).then((habits)=> {
        if(habits){
            throw habitExistsError
        }
        const habitData = {
            name,
            description
        }
        return postHabit(habitData)
    }).then((habits)=>{
        res.status(201).send({habits})
    }).catch(err => {
        next(err)
    })
}