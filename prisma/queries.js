const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getSubscribers() {
    const allSubscribers = await prisma.subscriber.findMany();
    return allSubscribers;
}

async function createSubscriber(email) {
    await prisma.subscriber.create({
        data: {
            email,
        },
    });

    return {
        email,
    };
}

module.exports = { getSubscribers, createSubscriber };
