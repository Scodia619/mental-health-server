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

exports.selectUsersByUsername = async (username) => {
    const users = await prisma.user.findMany({
        where: {
            username: username
        }
    })

    return users
}

exports.selectUsersByEmail = async (email) => {
    const users = await prisma.user.findMany({
        where: {
            email: email
        }
    })
    return users
}

exports.postUser = async (userData) => {
    const users = await prisma.user.create({
        data: userData
    })
    return users
}

exports.selectUserByUserAndPass = async (username, password) => {
    const users = await prisma.user.findUnique({
        where: {
            username: username,
            password: password
        }
    })
    return users
}