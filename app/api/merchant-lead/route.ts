import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Logs the structured data to your local terminal server logs
    console.log("----------------------------------------");
    console.log("NEW MERCHANT SUBMISSION FOR INFO@BOGOCODES.COM:");
    console.log("Business Name:", body.businessName);
    console.log("Email:", body.email);
    console.log("Category:", body.category);
    console.log("Offer:", body.proposedOffer);
    console.log("Address:", `${body.street}, ${body.city}, ${body.state} ${body.zipCode}`);
    console.log("----------------------------------------");

    return NextResponse.json({ success: true, message: "Lead logged successfully" });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}