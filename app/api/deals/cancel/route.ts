import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { dealId, businessName } = await request.json();
    
    if (!dealId) {
      return NextResponse.json({ error: 'Missing Required Field: dealId' }, { status: 400 });
    }

    // --- DATABASE CORRECTION PLACEHOLDER ---
    // Here is where you hook up your system database update connection logic, e.g.:
    // await db.select('deals').where({ id: dealId }).update({ is_active: false });
    console.log(`BOGO Deal cancellation request finalized for ID: ${dealId} under entity: ${businessName}`);

    return NextResponse.json({ 
      success: true, 
      message: `BOGO promotion offer registration ${dealId} was successfully deactivated.` 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}