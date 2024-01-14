const {
  selectAllResources,
  selectResourcesByTopic,
  postResource,
  postResourceTopic,
  selectResourcesById,
  patchResourceApproved,
  selectResourceByReviewerAndStatus,
} = require("../Repositories/resourceRepository");
const { selectTopicByName } = require("../Repositories/topicRepository");
const { selectUsersByUsername, selectUserById } = require("../Repositories/userRepository");
const {
  noTopicsError,
  incorrectDataError,
  missingDataError,
  noUserError,
  noResourcesError,
} = require("../errorVariables");

exports.getAllResources = (req, res, next) => {
  const { status } = req.query;
  if (status !== "false" && status !== "true" && status) {
    throw incorrectDataError;
  }
  selectAllResources(status).then((resources) => {
    res.status(200).send({ resources });
  });
};

exports.getResourcesByTopic = (req, res, next) => {
  const { topic } = req.params;
  const { status } = req.query;

  if (
    (!isNaN(parseInt(topic)) && topic) ||
    (status !== "false" && status !== "true" && status)
  ) {
    throw incorrectDataError;
  }

  selectTopicByName(topic)
    .then((topics) => {
      if (!topics && topic) {
        throw noTopicsError;
      }
      return selectResourcesByTopic(topics.id, status);
    }).then((resources)=>{
        res.status(200).send({resources})
    }).catch((err)=>{
        next(err)
    })
}

exports.updateResourceStatus = (req, res, next) => {
    const {resource_id} = req.params
    if(isNaN(parseInt(resource_id))){
        throw incorrectDataError
    }

    selectResourcesById(parseInt(resource_id)).then((resources)=>{
        if(!resources){
            throw noResourcesError
        }
        return patchResourceApproved(parseInt(resource_id))
    }).then((resources)=>{
        res.status(200).send({resources})
    }).catch((err)=>{
        next(err)
    })
}

exports.postNewResource = (req, res, next) => {
  const { posterId, reviewer_id, url, image_url, name, topic, description } = req.body;

  if (!posterId || !url || !image_url || !name || !topic || !description || !reviewer_id) {
    throw missingDataError;
  }
  let poster;
  let topicId;
  let resource;

  if (
    typeof posterId !== "string" ||
    typeof url !== "string" ||
    typeof image_url !== "string" ||
    typeof name !== "string" ||
    typeof topic !== "string" ||
    typeof description !== "string" ||
    typeof reviewer_id !== "number"
  ) {
    throw incorrectDataError;
  }
  selectUsersByUsername(posterId)
    .then((users) => {
      if (!users) {
        throw noUserError;
      }
      poster = users.id;
      return selectTopicByName(topic);
    })
    .then((topics) => {
      if (!topics) {
        throw noTopicsError;
      }
      topicId = topics.id;
      const postData = {
        posterId: poster,
        reviewerId: reviewer_id,
        name,
        url,
        image_url,
        description,
      };
      return postResource(postData);
    })
    .then((resources) => {
      resource = resources;
      return postResourceTopic(resources.resource_id, topicId);
    })
    .then((newData) => {
      res.status(201).send({ resources: resource });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getResourcesByReviewerAndStatus = (req, res, next) => {
    const {reviewerId, status} = req.query
    let boolStatus;
    if(!reviewerId || !status){
        throw missingDataError
    }

    if(status === "false"){
        boolStatus = false
    }else{
        boolStatus = true
    }

    if(isNaN(parseInt(reviewerId)) || (status !== "true" & status !== "false")){
        throw incorrectDataError
    }

    selectUserById(parseInt(reviewerId)).then((users)=> {
        if(!users){
            throw noUserError
        }

        return selectResourceByReviewerAndStatus(reviewerId, boolStatus)
    }).then((resources)=>{
        res.status(200).send({resources})
    }).catch((err)=>{
        next(err)
    })
}