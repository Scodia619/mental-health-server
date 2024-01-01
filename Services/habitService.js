const { selectAllHabits } = require("../Repositories/habitRepository")

exports.getAllHabits = (req, res, next) => {
    selectAllHabits().then((habits)=>{
        res.status(200).send({habits})
    })
}