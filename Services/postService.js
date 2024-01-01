const { selectAllPosts, selectPostsByTopic } = require("../Repositories/postRepository")
const { selectTopicByName } = require("../Repositories/topicRepository")
const { incorrectDataError, noTopicsError } = require("../errorVariables")

exports.getAllPosts = (req, res, next) => {

    selectAllPosts().then((posts)=>{
        res.status(200).send({posts})
    })
}

exports.getPostsByTopic = (req, res, next) => {
    const {topic} = req.params
    
    if(!isNaN(parseInt(topic))){
        throw incorrectDataError
    }

    selectTopicByName(topic).then((topics)=>{
        if(!topics){
            throw noTopicsError
        }
        return selectPostsByTopic(topics.id)
    }).then((posts)=>{
        res.status(200).send({posts})
    }).catch(err => {
        next(err)
    })

}