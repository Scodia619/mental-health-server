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

exports.postNewTopic = async (topicData) => {
    const topics = await prisma.topic.create({
        data: topicData
    })
    return topics
}

exports.selectTopicByPost = async (id) => {
    const topics = await prisma.postTopics.findFirst({
        where: {
            post_id: id
        },
        include: {
            topic: true
        }
    })
}