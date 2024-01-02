const { selectInviteByUsers, postInvite } = require("../Repositories/friendRepositroy");
const { selectUsersByUsername } = require("../Repositories/userRepository");
const { missingDataError, incorrectDataError, noUserError, inviteExistsError } = require("../errorVariables")

exports.getIniviteByUsers = (req, res, next) => {
    const {sender, reciever} = req.query
    let senderId;
    let recieverId;

    if(!sender || !reciever){
        throw missingDataError
    }

    if(!isNaN(parseInt(sender)) || !isNaN(parseInt(reciever))){
        throw incorrectDataError
    }

    selectUsersByUsername(sender).then((users)=>{
        if(!users){
            throw noUserError
        }
        senderId = users.id
        return selectUsersByUsername(reciever)
    }).then((users)=>{
        if(!users){
            throw noUserError
        }
        recieverId = users.id
        return selectInviteByUsers(senderId, recieverId)
    }).then((friends)=>{
        res.status(200).send({friends})
    }).catch(err => {
        next(err)
    })

}

exports.createNewInvite = (req, res, next) => {
    const {sender, reciever} = req.body
    let senderId;
    let recieverId;

    if(!sender || !reciever){
        throw missingDataError
    }

    if(!isNaN(parseInt(sender)) || !isNaN(parseInt(reciever))){
        throw incorrectDataError
    }

    selectUsersByUsername(sender).then((users)=>{
        if(!users){
            throw noUserError;
        }
        senderId = users.id
        return selectUsersByUsername(reciever)
    }).then((users)=>{
        if(!users){
            throw noUserError
        }
        recieverId = users.id
        return selectInviteByUsers(senderId, recieverId)
    }).then((friends)=>{
        if(friends){
            throw inviteExistsError
        }
        return postInvite(senderId, recieverId)
    }).then((friends)=>{
        res.status(201).send({friends})
    }).catch(err => {
        next(err)
    })
}