import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

// GET - Fetch user's favorites
export async function GET() {
    try {
        const user = await currentUser();

        if (!user || !user.emailAddresses?.[0]?.emailAddress) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const email = user.emailAddresses[0].emailAddress;
        const dbUser = await prisma.user.findUnique({
            where: { email },
            select: { favoriteIds: true },
        });

        return NextResponse.json({ favoriteIds: dbUser?.favoriteIds || [] });
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return NextResponse.json({ error: 'Failed to fetch favorites' }, { status: 500 });
    }
}

// POST - Add to favorites
export async function POST(request) {
    try {
        const user = await currentUser();

        if (!user || !user.emailAddresses?.[0]?.emailAddress) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { listingId } = await request.json();

        if (!listingId) {
            return NextResponse.json({ error: 'Listing ID required' }, { status: 400 });
        }

        const email = user.emailAddresses[0].emailAddress;
        const dbUser = await prisma.user.findUnique({
            where: { email },
        });

        if (!dbUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Add to favoriteIds array
        const updatedUser = await prisma.user.update({
            where: { id: dbUser.id },
            data: {
                favoriteIds: {
                    push: listingId,
                },
            },
        });

        // Create Favorite record
        await prisma.favorite.create({
            data: {
                userId: dbUser.id,
                listingId,
            },
        });

        return NextResponse.json({ favoriteIds: updatedUser.favoriteIds });
    } catch (error) {
        console.error('Error adding favorite:', error);
        return NextResponse.json({ error: 'Failed to add favorite' }, { status: 500 });
    }
}

// DELETE - Remove from favorites
export async function DELETE(request) {
    try {
        const user = await currentUser();

        if (!user || !user.emailAddresses?.[0]?.emailAddress) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const listingId = searchParams.get('listingId');

        if (!listingId) {
            return NextResponse.json({ error: 'Listing ID required' }, { status: 400 });
        }

        const email = user.emailAddresses[0].emailAddress;
        const dbUser = await prisma.user.findUnique({
            where: { email },
        });

        if (!dbUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Remove from favoriteIds array
        const updatedUser = await prisma.user.update({
            where: { id: dbUser.id },
            data: {
                favoriteIds: {
                    set: dbUser.favoriteIds.filter(id => id !== listingId),
                },
            },
        });

        // Delete Favorite record
        await prisma.favorite.deleteMany({
            where: {
                userId: dbUser.id,
                listingId,
            },
        });

        return NextResponse.json({ favoriteIds: updatedUser.favoriteIds });
    } catch (error) {
        console.error('Error removing favorite:', error);
        return NextResponse.json({ error: 'Failed to remove favorite' }, { status: 500 });
    }
}
