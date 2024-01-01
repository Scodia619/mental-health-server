const { selectAllHabits, selectHabitByName } = require("../Repositories/habitRepository")
const { incorrectDataError, noHabitError } = require("../errorVariables")

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