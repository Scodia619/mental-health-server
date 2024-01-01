const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

exports.selectAllHabits = async () => {
    const habits = await prisma.habits.findMany({})
    return habits
}