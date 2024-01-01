const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

exports.selectAllPosts = async (isPrivate) => {
    const posts = await prisma.posts.findMany({
        where: {
            is_private: isPrivate !== undefined ? isPrivate : undefined,
        }
    })
    return posts
}

exports.selectPostsByTopic = async (topic_id, isPrivate) => {
    const posts = await prisma.postTopics.findMany({
        where: {
          topic_id: topic_id,
          post: {
            is_private: isPrivate !== undefined ? isPrivate : undefined,
          },
        },
        include: {
          post: true,
        },
      });

      return posts
}