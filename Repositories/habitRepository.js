const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

exports.selectAllHabits = async () => {
    const habits = await prisma.habits.findMany({})
    return habits
}

exports.selectHabitByName = async (name) => {
    const habits = await prisma.habits.findUnique({
        where: {
            name: name
        }
    })
    return habits
}

exports.postHabit = async (habitData) => {
    const habits = prisma.habits.create({
        data: habitData
    })
    return habits
}