const { selectAllPosts, selectPostsByTopic, postNewPost, postNewPostTopics } = require("../Repositories/postRepository")
const { selectTopicByName } = require("../Repositories/topicRepository")
const { selectUsersByUsername } = require("../Repositories/userRepository")
const { incorrectDataError, noTopicsError, missingDataError, noUserError } = require("../errorVariables")

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

exports.createNewPost = (req, res, next) => {
    const {username, title, topic, content, is_private} = req.body
    
    if(!username || !title || !topic || !content || !is_private){
        throw missingDataError
    }

    if(!isNaN(parseInt(username)) || !isNaN(parseInt(title)) || !isNaN(parseInt(topic)) || !isNaN(parseInt(content)) || (is_private !== 'true' && is_private !== 'false')){
        throw incorrectDataError
    }

    let user_id;
    let topic_id;
    let returnedPost;

    selectUsersByUsername(username).then((users)=>{
        if(users.length === 0){
            throw noUserError
        }
        user_id = users[0].id
        return selectTopicByName(topic)
    }).then((topics)=>{
        if(!topics){
            throw noTopicsError
        }
        topic_id = topics.id
        const postData = {
            user_id,
            is_private: is_private === 'true',
            content,
            title
        }
        return postNewPost(postData).then((posts)=>{
            returnedPost = posts
            return postNewPostTopics(posts.post_id, topic_id)
        }).then((postTopics)=>{
            res.status(201).send({posts: returnedPost})
        })
    }).catch(err => {
        next(err)
    })
}