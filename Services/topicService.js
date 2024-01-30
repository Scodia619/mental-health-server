const { selectPostById } = require("../Repositories/postRepository")
const { selectAllTopics, selectTopicByName, postNewTopic, selectTopicByPost } = require("../Repositories/topicRepository")
const { noTopicsError, incorrectDataError, missingDataError, topicExistsError, noPostsError } = require("../errorVariables")

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

exports.createNewTopic = (req, res, next) => {
    const {topic_name} = req.body

    if(!topic_name){
        throw missingDataError
    }
    if(!isNaN(parseInt(topic_name))){
        throw incorrectDataError
    }
    selectTopicByName(topic_name).then((topics)=>{
        if(topics){
            throw topicExistsError
        }
        return postNewTopic({topic_name})
    }).then((topics)=>{
        res.status(201).send({topics})
    }).catch(err => {
        next(err)
    })
}

exports.getTopicByPost = (req, res, next) => {
    const {id} = req.params

    if(isNaN(parseInt(id))){
        throw incorrectDataError
    }

    const parsedId = parseInt(id)

    selectPostById(parsedId).then((post)=>{
        if(!post){
            throw noPostsError
        }
        return selectTopicByPost(parsedId)
    }).then((topics)=>{
        res.status(200).send({topics})
    }).catch(err => {
        next(err)
    })
}