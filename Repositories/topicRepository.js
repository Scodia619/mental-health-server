const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

exports.selectAllTopics = async () => {
    const topics = await prisma.topic.findMany({})
    return topics
}