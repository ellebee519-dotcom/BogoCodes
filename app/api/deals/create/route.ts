import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      token, 
      paymentMethodId, 
      businessName, 
      merchantAddress, 
      firstName, 
      lastName, 
      freeItem 
    } = body;

    // 1. Verify Cloudflare Turnstile
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${token}`,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    });
    
    const result = await verifyRes.json();
    if (!result.success) {
      return NextResponse.json({ error: 'Bot verification failed' }, { status: 403 });
    }

    // 2. Authorize the full $10.00 fee on the merchant's card
    const verificationHold = await stripe.paymentIntents.create({
      amount: 1000, // <--- CHANGED: $10.00 in cents
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
      capture_method: 'manual', // Holds the $10.00 without capturing yet
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never'
      }
    });

    if (verificationHold.status !== 'requires_capture') {
      return NextResponse.json({ error: 'Card authorization failed.' }, { status: 400 });
    }

    // 3. Save the deal AND paymentIntentId to your database
    // IMPORTANT: Save `paymentIntentId: verificationHold.id` alongside the deal record
    console.log("Saving deal profile with $10 authorization hold:", {
      businessName,
      merchantAddress,
      paymentIntentId: verificationHold.id
    });

    const dynamicConfToken = "BOGO-" + Math.floor(100000 + Math.random() * 900000);

    return NextResponse.json({ 
      message: 'Deal submitted for review!', 
      confNumber: dynamicConfToken 
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}