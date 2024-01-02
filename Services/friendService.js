const { selectInviteByUsers, postInvite, selectInvitesByUser, patchAcceptInvite } = require("../Repositories/friendRepositroy");
const { selectUsersByUsername } = require("../Repositories/userRepository");
const { missingDataError, incorrectDataError, noUserError, inviteExistsError, noInvitesError } = require("../errorVariables")

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

exports.getInvitesByUser = (req, res, next) => {
    const {username} = req.params

    if(!isNaN(parseInt(username))){
        throw incorrectDataError
    }

    selectUsersByUsername(username).then((users)=>{
        if(!users){
            throw noUserError
        }
        return selectInvitesByUser(users.id)
    }).then((friends)=>{
        res.status(200).send({friends})
    }).catch(err => {
        next(err)
    })
}

exports.updateInvite = (req, res, next) => {
    const {username} = req.params
    const {sender, inviteAccepted} = req.body
    let recieverId;
    let senderId;

    if(!inviteAccepted || !sender){
        throw missingDataError
    }
    if(!isNaN(parseInt(username)) || !isNaN(parseInt(sender)) ||(inviteAccepted !== true && inviteAccepted !== false)){
        throw incorrectDataError
    }

    selectUsersByUsername(username).then((users)=>{
        if(!users){
            throw noUserError
        }
        recieverId = users.id
        return selectUsersByUsername(sender)
    }).then((users) => {
        if(!users){
            throw noUserError
        }
        senderId = users.id
        return selectInviteByUsers(senderId, recieverId)
    }).then((friends)=>{
        if(!friends){
            throw noInvitesError
        }
        return patchAcceptInvite(friends.id, inviteAccepted)
    }).then((friends)=>{
        res.status(200).send({friends})
    }).catch(err => {
        next(err)
    })
}