const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

exports.selectAllResources = async (status) => {
    console.log(status)
    let whereCondition = {};
  if (status !== undefined) {
    whereCondition = {where: {
      status: Boolean(status)},
    }};
    const resources = await prisma.resources.findMany(whereCondition)

    console.log(resources)
    return resources
}

exports.selectResourcesByTopic = async (topic_id, status) => {
    const resources = await prisma.resourceTopics.findMany({
        where: {
          topic_id: topic_id,
        },
        include: {resource: true}
      });

      if(status){
          const filteredResources = resources.filter((resourceTopic) => {
            return resourceTopic.resource.status === Boolean(status); // Assuming 'status' is a boolean
          });
          return filteredResources
      }

      return resources
}

exports.postResource = async (postData) => {
    const resources = await prisma.resources.create({
        data: postData
    })
    return resources
}

exports.postResourceTopic = async (resource_id, topic_id) => {
    const resources = await prisma.resourceTopics.create({
        data: {
            resource_id, topic_id
        }
    })

    return resources
}

exports.patchResourceApproved = async (resource_id) => {
    const resources = await prisma.resources.update({
        where: {
            resource_id: resource_id
        },
        data: {
            status: true
        }
    })
    return resources
}

exports.selectResourcesById = async (resource_id) => {
    const resources = await prisma.resources.findUnique({
        where: {
            resource_id: resource_id
        }
    })

    return resources
}

exports.selectResourceByReviewerAndStatus = async (reviewerId, status) => {
    const resources = await prisma.resources.findMany({
        where: {
            reviewerId: parseInt(reviewerId),
            status: status
        }
    })

      return resources
}