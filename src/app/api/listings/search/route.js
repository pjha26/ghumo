import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        // Extract filter parameters
        const query = searchParams.get('q') || '';
        const minPrice = parseFloat(searchParams.get('minPrice')) || 0;
        const maxPrice = parseFloat(searchParams.get('maxPrice')) || 999999;
        const location = searchParams.get('location') || '';
        const guests = parseInt(searchParams.get('guests')) || 0;
        const types = searchParams.get('types')?.split(',').filter(Boolean) || [];
        const minRating = parseFloat(searchParams.get('minRating')) || 0;
        const amenities = searchParams.get('amenities')?.split(',').filter(Boolean) || [];

        // Build dynamic Prisma query
        const where = {};

        // Search query (title, description, location)
        if (query) {
            where.OR = [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { location: { contains: query, mode: 'insensitive' } },
            ];
        }

        // Price range
        where.price = {
            gte: minPrice,
            lte: maxPrice,
        };

        // Location filter
        if (location) {
            where.location = { contains: location, mode: 'insensitive' };
        }

        // Guest capacity
        if (guests > 0) {
            where.maxGuests = { gte: guests };
        }

        // Property types
        if (types.length > 0) {
            where.type = { in: types };
        }

        // Rating
        if (minRating > 0) {
            where.rating = { gte: minRating };
        }

        // Amenities (must have all selected amenities)
        if (amenities.length > 0) {
            where.amenities = { hasEvery: amenities };
        }

        // Execute query
        const listings = await prisma.listing.findMany({
            where,
            orderBy: {
                rating: 'desc',
            },
        });

        return NextResponse.json({ listings, count: listings.length });
    } catch (error) {
        console.error('Search API Error:', error);
        return NextResponse.json(
            { error: 'Failed to search listings', details: error.message },
            { status: 500 }
        );
    }
}
