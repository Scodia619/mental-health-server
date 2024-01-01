const { selectAllComments, selectCommentsByPost, postCommentByPost } = require("../Repositories/commentRepository")
const { selectPostById } = require("../Repositories/postRepository")
const { incorrectDataError, missingDataError, noPostsError } = require("../errorVariables")

exports.getsAllComments = (req, res, next) => {
    
    selectAllComments().then((comments)=>{
        res.status(200).send({comments})
    })
}

exports.getsCommentByPost = (req, res, next) => {
    const {post_id} = req.params

    if(isNaN(parseInt(post_id))){
        throw incorrectDataError
    }

    selectCommentsByPost(parseInt(post_id)).then((comments)=>{
        res.status(200).send({comments})
    }).catch(err => {
        next(err)
    })
}

exports.createNewComment = (req, res, next) => {
    const {post_id} = req.params
    const {user_id, comment} = req.body;

    if(!user_id || !comment){
        throw missingDataError
    }

    if(!isNaN(parseInt(comment)) || isNaN(parseInt(post_id)) || isNaN(parseInt(user_id))){
        throw incorrectDataError
    }

    const parsePostId = parseInt(post_id);

    selectPostById(parsePostId).then((posts)=>{
        if(!posts.length){
            throw noPostsError
        }
        const commentData = {
            post_id: parsePostId,
            user_id: parseInt(user_id),
            comment: comment
        }
        return postCommentByPost(commentData)
    }).then((comments)=> {
        res.status(201).send({comments})
    }).catch(err => {
        next(err)
    })
}