const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

exports.selectAllResources = async () => {
    const resources = await prisma.resources.findMany({})
    return resources
}