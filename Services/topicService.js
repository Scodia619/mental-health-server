const { selectAllTopics, selectTopicByName } = require("../Repositories/topicRepository")
const { noTopicsError, incorrectDataError } = require("../errorVariables")

exports.getAllTopics = (req, res, next) => {
    selectAllTopics().then((topics)=>{
        res.status(200).send({topics})
    })
}

exports.getTopicsByName = (req,res,next) => {
    const {topic} = req.params
    if(!isNaN(parseInt(topic))){
        throw incorrectDataError
    }
    selectTopicByName(topic).then((topics)=>{
        if(!topics){
            throw noTopicsError
        }
        res.status(200).send({topics})
    }).catch(err => {
        next(err)
    })
}