const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

exports.selectAllPosts = async (isPrivate, username) => {
    const posts = await prisma.posts.findMany({
        where: {
            is_private: isPrivate !== undefined ? isPrivate : undefined,
            user_id: username !== undefined ? username : undefined
        }
    })
    return posts
}

exports.selectPostsByTopic = async (topic_id, isPrivate, user_id) => {
    const posts = await prisma.postTopics.findMany({
        where: {
          topic_id: topic_id,
          post: {
            is_private: isPrivate !== undefined ? isPrivate : undefined,
            user_id: user_id !== undefined ? user_id : undefined
          },
        },
        include: {
          post: true,
        },
      });

      return posts
}

exports.postNewPost = async (postData) => {
  const posts = await prisma.posts.create({
    data: postData
  })
  return posts
}

exports.postNewPostTopics = async (post_id, topic_id) => {
  const postTopics = await prisma.postTopics.create({
    data: {post_id, topic_id}
  })
  return postTopics
}