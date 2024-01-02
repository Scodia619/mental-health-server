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

exports.selectInvitesByUser = async (user_id) => {
    const friends = await prisma.friends.findMany({
        where: {
            recieverId: user_id
        }
    })
    return friends
}

exports.patchAcceptInvite = async (friend_id, patchData) => {
    const friends = await prisma.friends.update({
        where: {
            id: friend_id
        },
        data: {
            inviteAccepted: patchData
        }
    });
    return friends
}

exports.selectAcceptedFriends = async (user_id) => {
    const friends = await prisma.friends.findMany({
        where: {
            inviteAccepted: true,
            OR: [
                {senderId: user_id},
                {recieverId: user_id}
            ]
        }
    })
    return friends
}