'use server';

import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteListing(listingId) {
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

        await prisma.listing.delete({
            where: { id: listingId },
        });

        revalidatePath('/admin/listings');
        return { success: true };
    } catch (error) {
        console.error('Error deleting listing:', error);
        return { success: false, error: error.message };
    }
}
