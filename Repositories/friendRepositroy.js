const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

exports.selectInviteByUsers = async (senderId, receiverId) => {
    const friends = await prisma.friends.findFirst({
        where: {
          OR: [
            { senderId: senderId, recieverId: receiverId },
            { senderId: receiverId, recieverId: senderId },
          ],
        },
    })
    return friends
}

exports.postInvite = async (senderId, recieverId) => {
    const friends = await prisma.friends.create({
        data: {senderId, recieverId}
    })
    return friends
}