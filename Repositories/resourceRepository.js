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