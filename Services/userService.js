const { selectAllUsers, selectUserByName, selectUsersByUsername, selectUsersByEmail, postUser } = require("../Repositories/userRepository")
const { noUserError, missingDataError, incorrectDataError, usernameExistsError, emailExistsError } = require("../errorVariables")

const passwordHash = require('password-hash')

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

exports.createUser = (req,res,next) => {

    const {username, first_name, last_name, email, phone, password} = req.body

    if(!username || !first_name || !last_name || !email || !phone || !password){
        throw missingDataError
    }

    const hashedPassword = passwordHash.generate(password)

    if(!isNaN(parseInt(username)) || !isNaN(parseInt(first_name)) || !isNaN(parseInt(last_name)) || !isNaN(parseInt(email))){
        throw incorrectDataError
    }

    selectUsersByUsername(username).then((users)=>{
        if(users.length){
            throw usernameExistsError
        }
        return selectUsersByEmail(email)
    }).then((users) =>{
        if(users.length) {
            throw emailExistsError
        }
        const userData = {
            username,
            first_name,
            last_name,
            email,
            phone,
            password: hashedPassword
        }
        return postUser(userData)
    }).then((users)=>{
        res.status(201).send({users})
    }).catch(err => {
        next(err)
    })
}