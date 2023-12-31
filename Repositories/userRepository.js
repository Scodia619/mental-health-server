const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

exports.selectAllUsers = async () => {
    const users = await prisma.user.findMany({})
    return users
}

exports.selectUserByName = async (characters) => {

    const users = await prisma.user.findMany({
        where: {
            first_name: {
                contains: characters
            }
        }
    })

    return users
}