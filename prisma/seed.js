const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
            email: 'john@example.com',
            phone: '1234567890',
          },
          {
            username: 'JSmith',
            first_name: 'Jane',
            last_name: 'Smith',
            email: 'jane@example.com',
            phone: '9876543210',
          },
          {
            username: 'JPrince',
            first_name: 'Janice',
            last_name: 'Prince',
            email: 'janice@example.com',
            phone: '9876543220',
          },
          // Add more users as needed
        ],
      });
    
      // Seed Topics
      await prisma.topic.createMany({
        data: [
          { topic_name: 'Technology' },
          { topic_name: 'Science' },
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
    }

// seed()

module.exports = seed