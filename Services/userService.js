const { selectAllUsers, selectUserByName } = require("../Repositories/userRepository")
const { noUserError } = require("../errorVariables")

exports.getUsers = (req, res, next) => {
  selectAllUsers().then((users)=>{
    res.status(200).send({users})
  }).catch(err => next(err))
}

exports.getUsersByName = (req, res, next) => {
    const {letters} = req.params
    selectUserByName(letters).then((users) =>{
        if(users.length === 0){
            throw noUserError
        }
        res.status(200).send({users})
    }).catch(err => {
        next(err)
    })
}