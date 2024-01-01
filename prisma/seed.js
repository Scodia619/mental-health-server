const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passwordHash = require('password-hash')

const seed = async() => {

    await prisma.$executeRaw`TRUNCATE TABLE "PostTopics" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Posts" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Topic" RESTART IDENTITY CASCADE`;

    await prisma.user.createMany({
        data: [
          {
            username: 'JDoe',
            first_name: 'John',
            last_name: 'Doe',
            password: 'sha1$91a1f66d$1$917563ed687289a9329578ac9384246fd3da4226',
            email: 'john@example.com',
            phone: '1234567890',
          },
          {
            username: 'JSmith',
            first_name: 'Jane',
            last_name: 'Smith',
            email: 'jane@example.com',
            phone: '9876543210',
            password: 'sha1$18970629$1$0aa11b7fa71125c6711eb31bde91524b9ec34418',
          },
          {
            username: 'JPrince',
            first_name: 'Janice',
            last_name: 'Prince',
            email: 'janice@example.com',
            phone: '9876543220',
            password: 'sha1$18970629$1$0aa11b7fa71125c6711eb31bde91524b9ec34418',
          },
          // Add more users as needed
        ],
      });
    
      // Seed Topics
      await prisma.topic.createMany({
        data: [
          { topic_name: 'Technology' },
          { topic_name: 'Science' },
          { topic_name: 'Self Harm'}
          // Add more topics as needed
        ],
      });
    
      // Seed Posts
      await prisma.posts.createMany({
        data: [
          {
            user_id: 1, // User ID from the seeded users
            is_private: false,
            title: 'Introduction to Prisma',
            content: 'Prisma is a modern database toolkit...',
          },
          {
            user_id: 2, // User ID from the seeded users
            is_private: true,
            title: 'Exploring Quantum Physics',
            content: 'Quantum physics is the study of...',
          },
          // Add more posts as needed
        ],
      });
    
      // Seed PostTopics (Associations between posts and topics)
      await prisma.postTopics.createMany({
        data: [
          { post_id: 1, topic_id: 1 }, // Link post 1 to topic 1 (Technology)
          { post_id: 2, topic_id: 2 }, // Link post 2 to topic 2 (Science)
          // Add more associations as needed
        ],
      });

      await prisma.postComments.createMany({
        data: [
          {
            post_id: 1, // Comment related to Post 1
            user_id: 2, // Commented by User 2
            comment: "Great explanation of Prisma!", // Comment content
          },
          {
            post_id: 2, // Comment related to Post 2
            user_id: 1, // Commented by User 1
            comment: "I'm fascinated by quantum physics!", // Comment content
          },
          // Add more comments as needed
        ],
      });
    }

// seed()

module.exports = seed