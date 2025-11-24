import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
});

export async function POST(req) {
    try {
        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { listingId, listingTitle, startDate, endDate, guests, totalPrice, nights } = await req.json();

        // Create Stripe Checkout Session
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
                        unit_amount: Math.round(totalPrice * 100), // Convert to paise
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.headers.get('origin')}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get('origin')}/payment/cancel`,
            metadata: {
                userId: user.id,
                listingId,
                startDate,
                endDate,
                guests: JSON.stringify(guests),
                totalPrice: totalPrice.toString(),
            },
        });

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (error) {
        console.error('Stripe checkout error:', error);
        return NextResponse.json(
            { error: 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}
