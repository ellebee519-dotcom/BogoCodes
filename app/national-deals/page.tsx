"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SubscriberDashboard() {
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const pathname = usePathname();

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
    
    const fetchLiveNationalDeals = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/addresses?type=national');
        
        if (!response.ok) {
          throw new Error("Feeds server offline.");
        }
        
        const data = await response.json();
        setDeals(data.deals || []);
      } catch (err: any) {
        console.error("Live fetch error:", err);
        setError("National feed temporary connection sync down.");
      } finally {
        setLoading(false);
      }
    };

    fetchLiveNationalDeals();
  }, []);

  // Filter deals based on selected dropdown category
  const filteredDeals = deals.filter((deal) => {
    if (selectedCategory === "All Categories") return true;
    
    const dealCat = (deal.category || "").toLowerCase();
    const selectedCat = selectedCategory.toLowerCase();

    if (selectedCat === "food" && (dealCat.includes("food") || dealCat.includes("drink") || dealCat.includes("restaurant"))) return true;
    if (selectedCat === "retail" && (dealCat.includes("retail") || dealCat.includes("shopping"))) return true;
    if (selectedCat === "services" && dealCat.includes("service")) return true;
    if (selectedCat === "health & beauty" && (dealCat.includes("beauty") || dealCat.includes("spa") || dealCat.includes("health") || dealCat.includes("fitness"))) return true;
    if (selectedCat === "fun & recreation" && (dealCat.includes("entertainment") || dealCat.includes("recreation") || dealCat.includes("fun"))) return true;

    return dealCat === selectedCat;
  });

  return (
    <div style={{ backgroundColor: '#acc69b', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* HEADER SECTION */}
        <header style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px' }}>
          <Link href="/">
            <img src="/bogo-logo.png" alt="Logo" style={{ height: '103px', width: '150px', objectFit: 'contain' }} />
          </Link>
          
          <div style={{ background: '#f0f0f0', padding: '5px', borderRadius: '50px', display: 'flex', gap: '5px', alignItems: 'center' }}>
            {/* LINK TO HOME */}
            <Link href="/" style={{ padding: '10px 25px', borderRadius: '50px', fontWeight: 'bold', transition: '0.3s', fontSize: '0.9rem', textDecoration: 'none', background: pathname === '/' ? '#1d4370' : 'transparent', color: pathname === '/' ? 'white' : '#1d4370' }}>
              Home
            </Link>
            <Link href="/local-deals" style={{ padding: '10px 25px', borderRadius: '50px', fontWeight: 'bold', transition: '0.3s', fontSize: '0.9rem', textDecoration: 'none', background: pathname === '/local-deals' ? '#1d4370' : 'transparent', color: pathname === '/local-deals' ? 'white' : '#1d4370' }}>
              Local Deals
            </Link>
            <Link href="/national-deals" style={{ padding: '10px 25px', borderRadius: '50px', fontWeight: 'bold', transition: '0.3s', fontSize: '0.9rem', textDecoration: 'none', background: pathname === '/national-deals' ? '#1d4370' : 'transparent', color: pathname === '/national-deals' ? 'white' : '#1d4370' }}>
              National Deals
            </Link>
          </div>
        </header>

        {/* HERO BANNER */}
        <section style={{ backgroundColor: '#51a3a3', color: 'white', textAlign: 'center', padding: '40px 20px', borderRadius: '8px', border: '4px solid #ffffff' }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#1d4370', fontWeight: 800 }}>
            National Deals Live Feed
          </h2>
          <span style={{ fontSize: '3.5rem', fontWeight: 800, margin: '15px 0', display: 'block', lineHeight: 1.1 }}>
            National BOGO Deals
          </span>
          <div style={{ fontSize: '1.1rem', fontWeight: 400, fontStyle: 'italic', color: 'rgba(255, 255, 255, 0.9)' }}>
            Live Search for {currentDate}
          </div>
        </section>

        {/* CATEGORY FILTER DROPDOWN */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' }}>
          <label htmlFor="category-select" style={{ color: '#1d4370', fontWeight: 'bold', fontSize: '0.9rem' }}>Filter by Category:</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '10px 20px',
              borderRadius: '50px',
              border: '2px solid #ffffff',
              backgroundColor: '#ffffff',
              color: '#1d4370',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              cursor: 'pointer',
              outline: 'none',
              boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
            }}
          >
            <option value="All Categories">All Categories</option>
            <option value="Food">Food</option>
            <option value="Retail">Retail</option>
            <option value="Services">Services</option>
            <option value="Health & Beauty">Health & Beauty</option>
            <option value="Fun & Recreation">Fun & Recreation</option>
          </select>
        </div>

        {error && (
          <div style={{ background: '#d9534f', color: 'white', padding: '12px', borderRadius: '6px', fontWeight: 'bold', textAlign: 'center', fontSize: '0.9rem' }}>
            ⚠️ {error}
          </div>
        )}

        {/* FEED RENDERING STATES */}
        {loading ? (
          <div style={{ color: 'white', textAlign: 'center', padding: '100px', fontWeight: 'bold', fontSize: '1.2rem' }}>
            Querying live national data feeds for active BOGOs...
          </div>
        ) : (
          <>
            {filteredDeals.length === 0 ? (
              <div style={{ color: 'white', textAlign: 'center', padding: '60px', fontWeight: 'bold', fontSize: '1.1rem' }}>
                No active deals found in the "{selectedCategory}" category right now.
              </div>
            ) : (
              <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px', padding: '10px 0' }}>
                {filteredDeals.map((deal, index) => (
                  <div key={deal.id || index} style={{ background: 'white', borderRadius: '12px', display: 'flex', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', border: '2.5px solid #88b06d' }}>
                    <div style={{ width: '90px', height: '100%', backgroundImage: `url(${deal.logo})`, backgroundSize: '55%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundColor: '#fcfcfc', borderRight: '1px solid #eee', flexShrink: 0 }}></div>
                    <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <p style={{ color: '#88b06d', fontWeight: 800, fontSize: '0.75rem', margin: 0, textTransform: 'uppercase' }}>BUY ONE, GET ONE FREE</p>
                      <h4 style={{ color: '#1d4370', fontSize: '1.1rem', margin: '4px 0 2px 0', fontWeight: 700 }}>{deal.business || "Unknown Merchant"}</h4>
                      <p style={{ color: '#888', fontSize: '0.75rem', margin: '0 0 8px 0', fontStyle: 'italic' }}>📍 {deal.address || "Location not listed"}</p>
                      <p style={{ color: '#555', fontSize: '0.95rem', margin: 0 }}>Get a free <span style={{ color: '#51a3a3', fontWeight: 'bold' }}>{deal.item || "item"}</span></p>
                      <p style={{ fontSize: '0.75rem', color: '#cc6666', marginTop: '5px', fontWeight: 600 }}>{deal.detail}</p>
                    </div>
                  </div>
                ))}
              </main>
            )}

            {/* UPDATED DISCLAIMER SECTION */}
            <section style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', marginTop: '10px' }}>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#555', lineHeight: '1.5' }}>
                <span style={{ color: '#1d4370', fontWeight: 'bold' }}>Disclaimer:</span> BogoCodes utilizes a discovery method to aggregate national brand opportunities for our subscribers.
                Please be aware that <span style={{ color: '#1d4370', fontWeight: 'bold' }}>BogoCodes does not verify national deals</span> and is not responsible for the
                validity or honoring of these offers. Since national merchants do not input these deals personally, BogoCodes cannot require
                redemption.
                <br /><br />
                <span style={{ color: '#1d4370', fontWeight: 'bold' }}>No daily BogoCode is necessary</span> to redeem national deals. Daily BogoCodes are exclusively
                reserved for participating local community merchants.
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
}