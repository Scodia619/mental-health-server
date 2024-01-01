const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

exports.selectGoalsByUser = async (user_id) => {
    const goals = await prisma.userGoals.findMany({
        where: {
            user_id: user_id
        }
    })
    return goals
}