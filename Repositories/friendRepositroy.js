const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

exports.selectInviteByUser = async (senderId, receiverId) => {
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