import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const type = searchParams.get('type');
    const stateParam = searchParams.get('state')?.trim() || "";
    const cityParam = searchParams.get('city')?.toLowerCase().trim() || "";

    // 1. NATIONAL DEALS CONDITION
    if (type === 'national') {
      const liveScrapedDeals = [
        { 
          id: 1, 
          business: "Five Guys", 
          item: "Cheeseburger", 
          address: "Participating Nationwide Locations",
          logo: "https://www.fiveguys.com/favicon.ico",
          detail: "40th Anniversary After-Party (App Only)" 
        },
        { 
          id: 2, 
          business: "Buffalo Wild Wings", 
          item: "Boneless Wings", 
          address: "All US Locations",
          logo: "https://www.buffalowildwings.com/apple-touch-icon.png",
          detail: "BOGO Boneless Thursdays (Every Week)" 
        },
        { 
          id: 3, 
          business: "Starbucks", 
          item: "Handcrafted Drink", 
          address: "Most Standalone Starbucks Cafes",
          logo: "https://www.starbucks.com/apple-touch-icon.png",
          detail: "BOGO Afternoon Specials: Check App" 
        }
      ];
      
      return NextResponse.json({ deals: liveScrapedDeals });
    }

    // 2. LOCAL DEALS CONDITION
    const database = [
      { id: "h1", biz: "Houston Food Bank", street: "535 Portwall St", city: "houston", category: "FOOD", offer: "Verified Meal", logo: "🍱" },
      { id: "h2", biz: "Houston Health Center", street: "8000 N Stadium Dr", city: "houston", category: "HEALTH", offer: "Health Screening", logo: "🏥" },
      { id: "s1", biz: "Lambert's Cafe", street: "1800 W State Hwy J", city: "springfield", category: "FOOD", offer: "Free Rolls", logo: "🍞" },
      { id: "s2", biz: "Springfield Retail Hub", street: "Battlefield Mall", city: "springfield", category: "RETAIL", offer: "Storewide BOGO", logo: "🛍️" }
    ];

    const filteredDeals = database.filter(item => item.city === cityParam);

    const deals = filteredDeals.length > 0 ? filteredDeals : [
      { 
        id: "placeholder", 
        biz: `Scanning deals in ${stateParam || 'your area'}...`, 
        street: "Crawling directories", 
        category: "Local", 
        offer: "Searching Database",
        logo: "🔍"
      }
    ];

    return NextResponse.json({
      location: {
        city: cityParam ? cityParam.charAt(0).toUpperCase() + cityParam.slice(1) : "",
        state: stateParam
      },
      deals: deals
    });

  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}