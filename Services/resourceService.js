const { selectAllResources, selectResourcesByTopic, selectResourcesById, patchResourceApproved } = require("../Repositories/resourceRepository")
const { selectTopicByName } = require("../Repositories/topicRepository")
const { noTopicsError, incorrectDataError, noResourcesError } = require("../errorVariables")

exports.getAllResources = (req, res, next) => {
    selectAllResources().then((resources)=>{
        res.status(200).send({resources})
    })
}

exports.getResourcesByTopic = (req, res, next) => {
    const {topic} = req.params

    if(!isNaN(parseInt(topic)) && topic){
        throw incorrectDataError
    }

    selectTopicByName(topic).then((topics)=>{
        if(!topics && topic){
            throw noTopicsError
        }
        return selectResourcesByTopic(topics.id)
    }).then((resources)=>{
        res.status(200).send({resources})
    }).catch(err => {
        next(err)
    })
}

exports.updateResourceStatus = (req, res, next) => {
    const {resource_id} = req.params
    if(isNaN(parseInt(resource_id))){
        throw incorrectDataError
    }

    selectResourcesById(parseInt(resource_id)).then((resources)=>{
        if(!resources){
            throw noResourcesError
        }
        return patchResourceApproved(parseInt(resource_id))
    }).then((resources)=>{
        res.status(200).send({resources})
    }).catch((err)=>{
        next(err)
    })
}