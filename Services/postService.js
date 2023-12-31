const { selectAllPosts } = require("../Repositories/postRepository")

exports.getAllPosts = (req, res, next) => {
    selectAllPosts().then((posts)=>{
        res.status(200).send({posts})
    })
}