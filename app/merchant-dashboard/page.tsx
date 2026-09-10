"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MerchantDashboard() {
  const [activeDeals] = useState([
    { 
      id: "BOGO-772188", 
      dealNumber: "10432",
      businessName: "Brew & Bean", 
      freeItem: "Latte", 
      image: "☕", 
      status: "Active",
      date: "March 01, 2026"
    },
    { 
      id: "BOGO-884291", 
      dealNumber: "10433",
      businessName: "Brew & Bean", 
      freeItem: "Croissant", 
      image: "🥐", 
      status: "Active",
      date: "March 05, 2026"
    }
  ]);

  const monthlyCodes = [
    "SAVE01", "BOGO02", "DEAL03", "GRAB04", "CITY05", 
    "ZONE06", "CODE07", "FREE08", "LUCKY09", "PLUS10",
    "STAR11", "COUP12", "EAT13", "SHOP14", "FIND15", 
    "BOGO16", "OFFER17", "GIFT18", "LOCAL19", "BEST20",
    "NOW21", "YES22", "CLUB23", "HOT24", "COOL25", 
    "WIN26", "FAST27", "NEW28", "GOLD29", "TOP30", "ACE31"
  ];

  const [currentDate, setCurrentDate] = useState("");
  const [dailyCode, setDailyCode] = useState("");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const updateDashboard = () => {
      const now = new Date();
      setCurrentDate(now.toLocaleDateString('en-US', { 
        month: 'long', day: 'numeric', year: 'numeric' 
      }));
      const dayIndex = now.getDate() - 1; 
      setDailyCode(monthlyCodes[dayIndex] || "BOGO2026");
    };

    updateDashboard();
    const timer = setInterval(updateDashboard, 60000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="dashboard-wrapper">
      <style jsx global>{`
        :root {
          --muted-green-border: #acc69b; 
          --navy-text: #1d4370;
          --teal-codes: #51a3a3;
          --white: #ffffff;
          --danger-red: #d9534f;
          --light-green: #88b06d;
        }

        @media (max-width: 700px) {
          .verification-banner { flex-direction: column; text-align: center; gap: 20px; }
          .deal-card { flex-direction: column; }
          header { flex-direction: column; gap: 15px; }
        }

        body {
          margin: 0; padding: 0;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background-color: var(--white);
          border: 15px solid var(--muted-green-border);
          min-height: 100vh;
          box-sizing: border-box;
        }

        .dashboard-wrapper {
          max-width: 1000px; margin: 0 auto; padding: 20px;
          display: flex; flex-direction: column; gap: 25px;
        }

        header {
          background-color: var(--white); box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          border-radius: 12px; display: flex; justify-content: space-between;
          align-items: center; padding: 20px 40px;
        }

        .logo-container {
          display: inline-flex;
          align-items: center;
        }

        .logo-small { height: 103px; width: 150px; object-fit: contain; }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .home-link {
          color: var(--navy-text);
          text-decoration: none;
          font-weight: bold;
          font-size: 1rem;
        }

        .home-link:hover {
          color: var(--light-green);
        }

        .logout-link {
          color: var(--navy-text);
          font-weight: bold;
          text-decoration: none;
        }

        .verification-banner {
          background-color: var(--teal-codes); color: white;
          padding: 30px 40px; border-radius: 15px;
          display: flex; justify-content: space-between; align-items: center;
        }

        .code-display {
          background: white; color: var(--navy-text);
          padding: 12px 30px; border-radius: 10px;
          font-family: 'Courier New', monospace; font-size: 2.4rem;
          font-weight: 900; letter-spacing: 2px;
          box-shadow: 0 0 0 0 rgba(81, 163, 163, 0.4);
          min-width: 180px; text-align: center;
        }

        .deal-card {
          display: flex; background: white; border: 1px solid #eee;
          border-radius: 15px; overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .deal-img {
          width: 140px; background-color: #f0f4f0;
          display: flex; align-items: center; justify-content: center;
          font-size: 3rem; border-right: 1px solid #eee;
        }

        .deal-info { padding: 25px; flex-grow: 1; }

        .deal-badge {
          background-color: var(--navy-text);
          color: white;
          font-size: 0.75rem;
          font-weight: bold;
          padding: 4px 10px;
          border-radius: 4px;
        }

        .btn-cancel {
          background-color: var(--danger-red); color: white;
          padding: 10px 20px; border-radius: 6px;
          font-weight: 600; text-decoration: none;
          display: inline-block; border: none; font-size: 0.9rem;
        }

        .btn-add-new {
          background-color: var(--navy-text); color: white; padding: 15px 30px;
          border-radius: 50px; text-decoration: none; font-weight: bold;
          text-transform: uppercase; font-size: 0.85rem;
        }
      `}</style>

      <header>
        <div className="logo-container">
          <Link href="/"><img src="/bogo-logo.png" alt="BogoCodes" className="logo-small" /></Link>
        </div>
        <nav className="nav-links">
          <Link href="/" className="home-link">Home</Link>
          <Link href="/" className="logout-link">LOGOUT</Link>
        </nav>
      </header>

      <section className="verification-banner">
        <div>
          <h3 style={{ margin: 0, textTransform: 'uppercase' }}>Daily Verification Code</h3>
          {hasMounted && <p style={{ margin: '5px 0 0 0', opacity: 0.9 }}>{currentDate}</p>}
        </div>
        <div className="code-display">
          {hasMounted ? dailyCode : "---"}
        </div>
      </section>

      <main>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ color: 'var(--navy-text)', margin: 0 }}>Your Live BOGO Deals</h2>
          <Link href="/new-deal" className="btn-add-new">+ Add New Deal</Link>
        </div>

        <div className="deals-list">
          {activeDeals.map((deal) => (
            <div key={deal.id} className="deal-card" style={{ marginBottom: '20px' }}>
              <div className="deal-img">{deal.image}</div>
              <div className="deal-info">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                      <h3 style={{ margin: 0, color: 'var(--navy-text)' }}>{deal.businessName}</h3>
                      <span className="deal-badge">Deal #{deal.dealNumber}</span>
                    </div>
                    <p style={{ margin: '5px 0', fontSize: '1.1rem' }}>
                      Buy One, Get One <strong>{deal.freeItem}</strong>
                    </p>
                    <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: 'var(--navy-text)', fontWeight: 500 }}>
                      System ID: {deal.id}
                    </p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#888' }}>Published: {deal.date}</span>
                  <Link href={`/cancel-deal?id=${deal.id}&dealNumber=${deal.dealNumber}`} className="btn-cancel">
                    Cancel Deal
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}