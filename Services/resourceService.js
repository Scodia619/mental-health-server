const { selectAllResources } = require("../Repositories/resourceRepository")

exports.getAllResources = (req, res, next) => {
    selectAllResources().then((resources)=>{
        res.status(200).send({resources})
    })
}