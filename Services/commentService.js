const { selectAllComments } = require("../Repositories/commentRepository")

exports.getsAllComments = (req, res, next) => {
    selectAllComments().then((comments)=>{
        res.status(200).send({comments})
    })
}