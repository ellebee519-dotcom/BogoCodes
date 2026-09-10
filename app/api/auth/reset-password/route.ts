import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Email address is required.' },
        { status: 400 }
      );
    }

    // TODO: Connect to your database / email provider (e.g., Supabase, Resend, SendGrid)
    // 1. Check if user exists with this email
    // 2. Generate a reset token
    // 3. Send email containing: ${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}&email=${email}

    console.log(`Password reset requested for: ${email}`);

    return NextResponse.json(
      { message: 'Password reset link sent successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { message: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}