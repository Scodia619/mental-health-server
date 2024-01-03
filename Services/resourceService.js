const { selectAllResources, selectResourcesByTopic } = require("../Repositories/resourceRepository")
const { selectTopicByName } = require("../Repositories/topicRepository")
const { noTopicsError, incorrectDataError } = require("../errorVariables")

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