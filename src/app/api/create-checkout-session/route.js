import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(req) {
    console.log('==========================');
    console.log('CHECKOUT SESSION CALLED');
    console.log('Stripe key exists?', !!process.env.STRIPE_SECRET_KEY);
    console.log('==========================');
    console.log("CHECK CLERK KEY:", process.env.CLERK_SECRET_KEY);

    try {
        // Clerk Auth
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: "You must be signed in to make a reservation." },
                { status: 401 }
            );
        }

        // Parse body safely
        const body = await req.json();
        const { listingId, listingTitle, startDate, endDate, guests, totalPrice, nights } = body;

        // IMPORTANT: Prevent HTML error when env is missing
        if (!process.env.STRIPE_SECRET_KEY) {
            return NextResponse.json(
                { error: "Stripe secret key missing. Check .env.local" },
                { status: 500 }
            );
        }

        // Load Stripe
        const Stripe = (await import("stripe")).default;
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: "2023-10-16",
        });

        // Create Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: listingTitle,
                            description: `${nights} night(s) • ${guests.adults + guests.children} guests`,
                        },
                        unit_amount: Math.round(totalPrice * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${req.headers.get("origin")}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get("origin")}/payment/cancel`,
            metadata: {
                userId,
                listingId,
                startDate,
                endDate,
                guests: JSON.stringify(guests),
                totalPrice: totalPrice.toString(),
            },
        });

        console.log("Stripe session created:", session.id);

        return NextResponse.json({
            sessionId: session.id,
            url: session.url,
        });

    } catch (error) {
        console.error("CHECKOUT SESSION ERROR:", error);

        // Prevent HTML error leaking to frontend
        return NextResponse.json(
            {
                error: error.message || "Failed to create Stripe session",
            },
            { status: 500 }
        );
    }
}
