import { NextResponse } from 'next/server';

// Strict array of forbidden keywords across categories, business names, or offers
const RESTRICTED_KEYWORDS = [
  'alcohol', 'beer', 'wine', 'liquor', 'bar', 'pub', 'brewery', 'dispensary',
  'thc', 'cbd', 'marijuana', 'cannabis', 'weed', 'vape', 'smoke', 'tobacco',
  'cigarette', 'weapon', 'gun', 'firearm', 'knife', 'ammo', 'ammunition'
];

/**
 * Utility helper to scan a deal object for safety violations.
 * Returns true if the item is clean, false if it contains age-restricted or dangerous keywords.
 */
function isSafeDeal(deal: any): boolean {
  // Combine all descriptive text fields into one lowercase string for deep parsing
  const searchableText = [
    deal.category,
    deal.business,
    deal.biz,
    deal.item,
    deal.offer,
    deal.detail,
    deal.street
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  // If any keyword is found in the combined text string, fail the safety check
  return !RESTRICTED_KEYWORDS.some(keyword => searchableText.includes(keyword));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const state = searchParams.get('state');
  const city = searchParams.get('city');

  // 1. Handle National Feed Requests
  if (type === 'national') {
    const nationalDeals = [
      {
        id: 'nat-1',
        business: "Subway",
        logo: "https://logo.clearbit.com/subway.com",
        address: "All Nationwide Locations",
        item: "Footlong Sub",
        detail: "Valid on online orders or via app purchases."
      },
      {
        id: 'nat-2',
        business: "Chipotle",
        logo: "https://logo.clearbit.com/chipotle.com",
        address: "Participating Brand Stores",
        item: "Burrito or Bowl",
        detail: "Rewards members promotion only."
      }
    ];

    // Filter national deals for safety
    const safeNationalDeals = nationalDeals.filter(isSafeDeal);
    return NextResponse.json({ deals: safeNationalDeals });
  }

  // 2. Dynamic Local Deals Handling for ALL States and Cities
  if (state && city) {
    const dynamicDeals = [
      {
        id: `deal-${state}-${city}-1`,
        category: "Food & Drink",
        logo: "🍔", 
        biz: `${city} Burger Co.`,
        offer: "Buy One Burger, Get One FREE",
        street: `123 Main Street, ${city}, ${state}`
      },
      {
        id: `deal-${state}-${city}-2`,
        category: "Coffee & Cafe",
        logo: "☕",
        biz: `The Daily Grind ${city}`,
        offer: "Buy One Cold Brew, Get One FREE",
        street: `456 Broadway Avenue, ${city}, ${state}`
      },
      {
        id: `deal-${state}-${city}-3`,
        category: "Entertainment",
        logo: "🎬",
        biz: `${city} Cinema Central`,
        offer: "Buy One Evening Ticket, Get One FREE",
        street: `789 Theater Way, ${city}, ${state}`
      }
    ];

    // Filter local dynamic deals for safety
    const safeLocalDeals = dynamicDeals.filter(isSafeDeal);

    return NextResponse.json({
      location: { city, state },
      deals: safeLocalDeals
    });
  }
  
  return NextResponse.json({ deals: [] });
}