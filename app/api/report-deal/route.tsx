import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { dealId, businessName, offer, location, reason, details } = body;

    // 1. Format the email layout structure
    const emailHtml = `
      <h2>BogoCodes Promotion Curation Request: ${businessName}</h2>
      <p>Hello BogoCodes Compliance Team,</p>
      <p>A user has reported a merchant deal for manual review via the application interface:</p>
      <hr />
      <ul>
        <li><strong>Merchant:</strong> ${businessName}</li>
        <li><strong>Offer:</strong> ${offer}</li>
        <li><strong>Location:</strong> ${location}</li>
        <li><strong>Deal ID:</strong> ${dealId}</li>
        <li><strong>Reason Selected:</strong> ${reason}</li>
      </ul>
      <p><strong>Additional Details Provided:</strong></p>
      <blockquote style="background: #f9f9f9; padding: 15px; border-left: 5px solid #d9534f;">
        ${details || "No additional context provided by the subscriber."}
      </blockquote>
    `;

    // 2. Bypass email sending if credentials are not configured yet
    const host = process.env.EMAIL_SERVER_HOST;
    if (!host || host === "smtp.your-email-provider.com") {
      console.log("=========================================");
      console.log("DEVELOPMENT MODE: Email not sent via network. Logging details:");
      console.log(`To: reported@bogocodes.com`);
      console.log(`Subject: BogoCodes Promotion Curation Request: ${businessName}`);
      console.log(`Reason: ${reason}`);
      console.log(`Details: ${details}`);
      console.log("=========================================");

      return NextResponse.json({ success: true, message: "Report simulated in development mode" });
    }

    // 3. Configure actual transport credentials when ready
    const transporter = nodemailer.createTransport({
      host: host,
      port: Number(process.env.EMAIL_SERVER_PORT) || 587,
      auth: {
        user: process.env.EMAIL_SERVER_USER, 
        pass: process.env.EMAIL_SERVER_PASSWORD, 
      },
    });

    // 4. Send the real notification behind the scenes
    await transporter.sendMail({
      from: `"BogoCodes App" <system@bogocodes.com>`,
      to: "reported@bogocodes.com",
      subject: `BogoCodes Promotion Curation Request: ${businessName}`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, message: "Report logged successfully" });
  } catch (error) {
    console.error("Reporting API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error mapping data structures" },
      { status: 500 }
    );
  }
}