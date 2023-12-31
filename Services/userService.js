const { selectAllUsers } = require("../Repositories/userRepository")

exports.getUsers = (req, res, next) => {
  selectAllUsers().then((users)=>{
    res.status(200).send({users})
  }).catch(err => next(err))
}