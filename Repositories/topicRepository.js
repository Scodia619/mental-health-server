const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

exports.selectAllTopics = async () => {
    const topics = await prisma.topic.findMany({})
    return topics
}

exports.selectTopicByName = async (topic) => {
    const topics = await prisma.topic.findUnique({
        where: {
            topic_name: topic
        }
    })
    return topics
}