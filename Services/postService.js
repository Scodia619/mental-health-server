const { selectAllPosts, selectPostsByTopic } = require("../Repositories/postRepository")
const { selectTopicByName } = require("../Repositories/topicRepository")
const { incorrectDataError, noTopicsError } = require("../errorVariables")

exports.getAllPosts = (req, res, next) => {
    
    const {private: isPrivate} = req.query

    selectAllPosts(isPrivate ? isPrivate === 'true': undefined).then((posts)=>{
        res.status(200).send({posts})
    })
}

exports.getPostsByTopic = (req, res, next) => {
    const {topic} = req.params
    const {private: isPrivate} = req.query

    if(!isNaN(parseInt(topic)) || (isPrivate !== 'false' && isPrivate !== 'true' && isPrivate)){
        throw incorrectDataError
    }

    selectTopicByName(topic).then((topics)=>{
        if(!topics){
            throw noTopicsError
        }
        return selectPostsByTopic(topics.id, isPrivate === 'true')
    }).then((posts)=>{
        res.status(200).send({posts})
    }).catch(err => {
        next(err)
    })

}