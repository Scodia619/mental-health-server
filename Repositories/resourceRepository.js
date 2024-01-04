const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

exports.selectAllResources = async (status) => {
    const resources = await prisma.resources.findMany({
        where: {
            status: status
        }
    })
    return resources
}

exports.selectResourcesByTopic = async (topic_id) => {
    const resources = await prisma.resourceTopics.findMany({
        where: {
            topic_id: topic_id
        },
        include: {resource: true}
    })
    return resources
}