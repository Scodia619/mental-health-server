const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

exports.selectAllUsers = async () => {
    const users = await prisma.user.findMany({})
    return users
}