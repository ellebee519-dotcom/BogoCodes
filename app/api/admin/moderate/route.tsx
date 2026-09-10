import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Database helper function updated to fetch or handle the paymentIntentId
async function updateDealStatus(dealId: string, status: "active" | "rejected", denialReason?: string) {
  // Replace this with your actual database fetch/update logic
  console.log(`Database update: Deal ${dealId} is now ${status}. Reason: ${denialReason || 'None'}`);
  
  // Example return object: replace with your actual DB query result
  // return await db.deal.update({ where: { id: dealId }, data: { status, denialReason } });
  return { id: dealId, paymentIntentId: "pi_example_12345" }; 
}

async function sendEmailToMerchant(dealId: string, subject: string, message: string) {
  console.log(`Email sent to merchant for deal ${dealId}. Subject: ${subject}`);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const dealId = searchParams.get("dealId");
    const action = searchParams.get("action"); // 'approve' or 'deny'
    const reasonCode = searchParams.get("reason"); 

    if (!dealId || !action) {
      return new NextResponse("Missing required parameters.", { status: 400 });
    }

    if (action === "approve") {
      // 1. Update database status
      const deal = await updateDealStatus(dealId, "active");

      // 2. CAPTURE THE $10.00 HOLD IN STRIPE
      if (deal?.paymentIntentId) {
        await stripe.paymentIntents.capture(deal.paymentIntentId);
      }

      // 3. Return success response webpage
      return new NextResponse(`
        <html>
          <body style="font-family: sans-serif; text-align: center; padding: 50px; background: #b2cba2; color: #1d4370;">
            <div style="background: white; padding: 30px; border-radius: 8px; display: inline-block; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <h2>✅ Deal Successfully Approved!</h2>
              <p>Deal ID <strong>${dealId}</strong> is live and the $10.00 fee has been captured.</p>
            </div>
          </body>
        </html>
      `, { headers: { "Content-Type": "text/html" } });
    } 
    
    if (action === "deny") {
      let cannedMessage = "";
      let publicReason = "";

      if (reasonCode === "verify_failed") {
        publicReason = "Verification Unsuccessful";
        cannedMessage = "We were unable to successfully verify your merchant legitimacy or credentials. As a result, your submission has been declined.";
      } else if (reasonCode === "restricted_item") {
        publicReason = "Restricted Item / Age Limit Exceeded";
        cannedMessage = "BogoCodes caters to users under the age of 21. Promotional offers for restricted industries (including alcohol, tobacco, vape, or cannabis products) are strictly prohibited.";
      } else {
        publicReason = "Policy Violation";
        cannedMessage = "Your deal submission does not meet our standard merchant program guidelines.";
      }

      // 1. Update database status
      const deal = await updateDealStatus(dealId, "rejected", publicReason);

      // 2. CANCEL THE $10.00 HOLD IN STRIPE (Releases merchant funds immediately)
      if (deal?.paymentIntentId) {
        await stripe.paymentIntents.cancel(deal.paymentIntentId);
      }

      // 3. Email the merchant
      await sendEmailToMerchant(
        dealId, 
        `Update on your BogoCodes Deal Submission: ${publicReason}`, 
        cannedMessage
      );

      // 4. Return denial response webpage
      return new NextResponse(`
        <html>
          <body style="font-family: sans-serif; text-align: center; padding: 50px; background: #e0a8a8; color: #701d1d;">
            <div style="background: white; padding: 30px; border-radius: 8px; display: inline-block; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <h2>❌ Deal Rejected</h2>
              <p>Deal ID <strong>${dealId}</strong> was declined and card authorization hold released.</p>
              <p><strong>Reason Sent:</strong> ${publicReason}</p>
            </div>
          </body>
        </html>
      `, { headers: { "Content-Type": "text/html" } });
    }

    return new NextResponse("Invalid action specified.", { status: 400 });

  } catch (error: any) {
    console.error("Moderation link handling error:", error);
    return new NextResponse(`An internal server error occurred: ${error.message}`, { status: 500 });
  }
}