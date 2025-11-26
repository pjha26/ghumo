import React from 'react';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import FavoritesClient from './FavoritesClient';

export const dynamic = 'force-dynamic';

async function getFavorites() {
    try {
        const user = await currentUser();

        if (!user || !user.emailAddresses?.[0]?.emailAddress) {
            return [];
        }

        const email = user.emailAddresses[0].emailAddress;
        const dbUser = await prisma.user.findUnique({
            where: { email },
            select: { favoriteIds: true },
        });

        if (!dbUser || !dbUser.favoriteIds || dbUser.favoriteIds.length === 0) {
            return [];
        }

        // Fetch all favorited listings
        const listings = await prisma.listing.findMany({
            where: {
                id: { in: dbUser.favoriteIds },
            },
        });

        return listings;
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return [];
    }
}

export default async function FavoritesPage() {
    const user = await currentUser();

    if (!user) {
        redirect('/sign-in');
    }

    const favorites = await getFavorites();

    return <FavoritesClient initialFavorites={favorites} />;
}
