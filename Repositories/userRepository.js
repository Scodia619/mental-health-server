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
    if(!username){
        username = 'user'
    }
    const users = await prisma.user.findUnique({
        where: {
            username: username
        }
    })

    console.log(users)

    return users
}

exports.selectUsersByEmail = async (email) => {
    const users = await prisma.user.findUnique({
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