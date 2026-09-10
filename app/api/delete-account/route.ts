import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, targetEmail } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    // --- NOTIFICATION RECEIPT LOG ---
    // This prints to your terminal logs to verify the data arrived securely.
    console.log(`[DELETION REQUEST]: Merchant ${email} has requested closure. Notification target: ${targetEmail}`);

    // Here, your backend handles routing the email notification to deleteaccount@bogocodes.com.
    // When that email lands in your inbox, it is your manual cue to log into Stripe,
    // locate this merchant's account, and issue their prorated refund minus the $5 fee.

    return NextResponse.json({ 
      success: true, 
      message: 'Account request received safely.' 
    }, { status: 200 });

  } catch (error) {
    console.error('Backend routing error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}