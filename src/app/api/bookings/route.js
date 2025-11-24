import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { listingId, startDate, endDate, totalPrice, guests } = body;

        console.log('Booking request:', { listingId, startDate, endDate, totalPrice, guests, userId: user.id });

        if (!listingId || !startDate || !endDate || !totalPrice) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Create booking with Clerk user ID (string format is fine for MongoDB)
        const booking = await prisma.reservation.create({
            data: {
                listingId,
                userId: user.id, // Clerk user ID
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                totalPrice: parseFloat(totalPrice),
            },
        });

        console.log('Booking created successfully:', booking.id);

        return NextResponse.json(booking, { status: 201 });
    } catch (error) {
        console.error('Error creating booking:', error);
        console.error('Error details:', error.message);
        return NextResponse.json({
            error: 'Internal Server Error',
            details: error.message
        }, { status: 500 });
    }
}
