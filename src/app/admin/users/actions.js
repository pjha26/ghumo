'use server';

import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function toggleBlockUser(userId, isBlocked) {
    try {
        const user = await currentUser();
        if (!user || !user.emailAddresses?.[0]?.emailAddress) {
            throw new Error('Unauthorized');
        }

        const email = user.emailAddresses[0].emailAddress;
        const dbUser = await prisma.user.findUnique({
            where: { email },
        });

        if (!dbUser || !dbUser.isAdmin) {
            throw new Error('Unauthorized: Admin access required');
        }

        // Prevent blocking self
        if (dbUser.id === userId) {
            throw new Error('Cannot block yourself');
        }

        await prisma.user.update({
            where: { id: userId },
            data: { isBlocked: !isBlocked },
        });

        revalidatePath('/admin/users');
        return { success: true };
    } catch (error) {
        console.error('Error toggling user block status:', error);
        return { success: false, error: error.message };
    }
}
