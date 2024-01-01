const { selectAllComments, selectCommentsByPost } = require("../Repositories/commentRepository")
const { incorrectDataError } = require("../errorVariables")

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