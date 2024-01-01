const { selectGoalsByUser } = require("../Repositories/goalsRepository")
const { selectUsersByUsername } = require("../Repositories/userRepository")
const { incorrectDataError, noUserError } = require("../errorVariables")

exports.getAllGoalsByUser = (req, res, next) => {
    const {username} = req.query

    if(!isNaN(parseInt(username))){
        throw incorrectDataError
    }

    selectUsersByUsername(username).then((users)=>{
        if(!users){
            throw noUserError
        }
        return selectGoalsByUser(users.id)
    }).then((goals)=>{
        res.status(200).send({goals})
    }).catch(err => {
        next(err)
    })
}