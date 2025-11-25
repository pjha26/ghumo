import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(req) {
    console.log('========================================');
    console.log('CREATE CHECKOUT SESSION API CALLED');
    console.log('========================================');

    try {
        // Get auth
        const { userId } = await auth();
        console.log('Auth userId:', userId);

        if (!userId) {
            console.log('ERROR: No userId - user not authenticated');
            return NextResponse.json({
                error: 'You must be signed in to make a reservation.'
            }, { status: 401 });
        }

        // Get request body
        const body = await req.json();
        console.log('Request body received:', JSON.stringify(body, null, 2));

        // Import Stripe dynamically
        console.log('Importing Stripe...');
        const Stripe = (await import('stripe')).default;

        console.log('Initializing Stripe with secret key...');
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2023-10-16',
        });

        const { listingId, listingTitle, startDate, endDate, guests, totalPrice, nights } = body;

        console.log('Creating Stripe checkout session...');
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: listingTitle,
                            description: `${nights} night${nights > 1 ? 's' : ''} • ${guests.adults + guests.children} guest${guests.adults + guests.children > 1 ? 's' : ''}`,
                        },
                        unit_amount: Math.round(totalPrice * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.headers.get('origin')}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get('origin')}/payment/cancel`,
            metadata: {
                userId: userId,
                listingId,
                startDate,
                endDate,
                guests: JSON.stringify(guests),
                totalPrice: totalPrice.toString(),
            },
        });

        console.log('SUCCESS: Stripe session created:', session.id);
        console.log('Checkout URL:', session.url);
        console.log('========================================');

        return NextResponse.json({
            sessionId: session.id,
            url: session.url
        });

    } catch (error) {
        console.error('========================================');
        console.error('ERROR IN CREATE CHECKOUT SESSION:');
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        console.error('========================================');

        return NextResponse.json(
            {
                error: error.message || 'Failed to create checkout session',
                errorType: error.name
            },
            { status: 500 }
        );
    }
}
