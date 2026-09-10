import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const { plan } = await request.json();
    
    // Determine the amount based on the selected plan (Stripe calculates in cents)
    // FIXED: Synchronized tier values with the $5.99, $22.50, and $60.00 frontend pricing structure
    let amount = 6000; // Default Annual: $60.00
    if (plan === 'monthly') amount = 599; // Monthly: $5.99
    if (plan === 'quarterly') amount = 2250; // Quarterly: $22.50

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}