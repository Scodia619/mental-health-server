const { selectAllPosts, selectPostsByTopic, postNewPost, postNewPostTopics } = require("../Repositories/postRepository")
const { selectTopicByName } = require("../Repositories/topicRepository")
const { selectUsersByUsername } = require("../Repositories/userRepository")
const { incorrectDataError, noTopicsError, missingDataError, noUserError } = require("../errorVariables")

exports.getAllPosts = (req, res, next) => {
    
    const {private: isPrivate, username} = req.query


    if(!isNaN(parseInt(username)) && username){
        throw incorrectDataError
    }

    selectUsersByUsername(username).then((users)=>{
        if(!users && username){
            throw noUserError
        }
        return selectAllPosts(isPrivate ? isPrivate === 'true': undefined, users ? users.id : undefined)
    }).then((posts)=>{
        res.status(200).send({posts})
    }).catch(err => {
        next(err)
    })

}

exports.getPostsByTopic = (req, res, next) => {
    const {topic} = req.params
    const {private: isPrivate, username} = req.query
    let user_id = undefined;

    if(!isNaN(parseInt(topic)) || (isPrivate !== 'false' && isPrivate !== 'true' && isPrivate) || (!isNaN(parseInt(username) && username))){
        throw incorrectDataError
    }

    selectUsersByUsername(username).then((users)=>{
        if(!users && username){
            throw noUserError
        }else if(users && username){
            user_id = users.id
        }
        return selectTopicByName(topic)
    }).then((topics)=>{
        if(!topics){
            throw noTopicsError
        }
        return selectPostsByTopic(topics.id, isPrivate === 'true', user_id)
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
        if(!users){
            throw noUserError
        }
        user_id = users.id
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