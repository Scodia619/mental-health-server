const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

exports.selectAllComments = async () => {
    const comments = await prisma.postComments.findMany({})
    return comments
}