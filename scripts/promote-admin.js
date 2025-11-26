const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const email = process.argv[2];

    if (!email) {
        console.log('Please provide an email address to promote to admin.');
        console.log('Usage: node scripts/promote-admin.js <email>');
        console.log('\nExisting Users:');
        const users = await prisma.user.findMany();
        users.forEach(u => console.log(`- ${u.email} (Admin: ${u.isAdmin})`));
        return;
    }

    try {
        const user = await prisma.user.update({
            where: { email },
            data: { isAdmin: true },
        });
        console.log(`✅ Successfully promoted ${user.email} to Admin!`);
    } catch (error) {
        console.error('❌ Error promoting user:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
