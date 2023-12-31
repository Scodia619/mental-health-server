const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

exports.selectAllPosts = async () => {
    const posts = await prisma.posts.findMany({})
    return posts
}