const { selectAllResources, selectResourcesByTopic } = require("../Repositories/resourceRepository")
const { selectTopicByName } = require("../Repositories/topicRepository")
const { noTopicsError, incorrectDataError } = require("../errorVariables")

exports.getAllResources = (req, res, next) => {
    const {status} = req.query
    if(status !== 'false' && status !== 'true' && status){
        throw incorrectDataError
    }
    selectAllResources(status).then((resources)=>{
        res.status(200).send({resources})
    })
}

exports.getResourcesByTopic = (req, res, next) => {
    const {topic} = req.params
    const {status} = req.query

    if(!isNaN(parseInt(topic)) && topic || (status !== 'false' && status !== 'true' && status)){
        throw incorrectDataError
    }

    selectTopicByName(topic).then((topics)=>{
        if(!topics && topic){
            throw noTopicsError
        }
        return selectResourcesByTopic(topics.id, status)
    }).then((resources)=>{
        res.status(200).send({resources})
    }).catch(err => {
        next(err)
    })
}