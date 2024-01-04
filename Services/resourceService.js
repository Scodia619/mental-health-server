const {
  selectAllResources,
  selectResourcesByTopic,
  postResource,
  postResourceTopic,
} = require("../Repositories/resourceRepository");
const { selectTopicByName } = require("../Repositories/topicRepository");
const { selectUsersByUsername } = require("../Repositories/userRepository");
const {
  noTopicsError,
  incorrectDataError,
  missingDataError,
  noUserError,
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
    })
    .then((resources) => {
      res.status(200).send({ resources });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postNewResource = (req, res, next) => {
  const { posterId, url, image_url, name, topic, description } = req.body;

  if (!posterId || !url || !image_url || !name || !topic || !description) {
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
    typeof description !== "string"
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
