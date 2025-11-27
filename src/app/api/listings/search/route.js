import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { calculateAllScores, calculateBudgetComfortScore } from '@/lib/filterScores';

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

        // Advanced Filters
        const workTravelScore = parseFloat(searchParams.get('workTravelScore')) || 0;
        const petFriendlyScore = parseFloat(searchParams.get('petFriendlyScore')) || 0;
        const budgetComfortWeight = parseFloat(searchParams.get('budgetComfortWeight')); // Can be 0
        const travelMode = searchParams.get('travelMode') || 'none';

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

        // Travel Mode Filters (using stored scores)
        if (travelMode === 'romantic') {
            where.romanticScore = { gte: 7 }; // Threshold for romantic
        } else if (travelMode === 'family') {
            where.familyScore = { gte: 7 }; // Threshold for family
        } else if (travelMode === 'adventure') {
            where.adventureScore = { gte: 7 }; // Threshold for adventure
        }

        // Execute query
        let listings = await prisma.listing.findMany({
            where,
            orderBy: {
                rating: 'desc',
            },
        });

        // Post-processing for calculated scores
        listings = listings.map(listing => calculateAllScores(listing));

        // Filter by Work-from-Travel Score
        if (workTravelScore > 0) {
            listings = listings.filter(l => l.workTravelScore >= workTravelScore);
        }

        // Filter by Pet-Friendly Score
        if (petFriendlyScore > 0) {
            listings = listings.filter(l => l.petFriendlyScore >= petFriendlyScore);
        }

        // Sort by Budget vs Comfort if weight is set (and not default 0.5)
        if (budgetComfortWeight !== undefined && !isNaN(budgetComfortWeight) && budgetComfortWeight !== 0.5) {
            // Calculate max price in current result set for normalization
            const currentMaxPrice = Math.max(...listings.map(l => l.price), 1000);

            listings.sort((a, b) => {
                const scoreA = calculateBudgetComfortScore(a.price, currentMaxPrice, a.comfortScore, budgetComfortWeight);
                const scoreB = calculateBudgetComfortScore(b.price, currentMaxPrice, b.comfortScore, budgetComfortWeight);
                return scoreB - scoreA; // Descending
            });
        }

        return NextResponse.json({ listings, count: listings.length });
    } catch (error) {
        console.error('Search API Error:', error);
        return NextResponse.json(
            { error: 'Failed to search listings', details: error.message },
            { status: 500 }
        );
    }
}
