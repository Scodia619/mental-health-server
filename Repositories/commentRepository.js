const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

exports.selectAllComments = async () => {
    const comments = await prisma.postComments.findMany({})
    return comments
}

exports.selectCommentsByPost = async (post_id) => {
    const comments = await prisma.postComments.findMany({
        where: {
            post_id: post_id
        }
    })
    return comments
}

exports.postCommentByPost = async (comment_data) => {
    const comments = await prisma.postComments.create({
        data: comment_data
    })
    return comments
}