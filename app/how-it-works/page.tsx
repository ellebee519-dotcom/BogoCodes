"use client";

import React from 'react';
import Link from 'next/link';

export default function HowItWorks() {
  return (
    <div className="page-container">
      <style jsx global>{`
        :root {
          --muted-green-border: #acc69b; 
          --light-green-btns: #88b06d;
          --navy-text: #1d4370;
          --teal-codes: #51a3a3;
          --white: #ffffff;
        }

        body {
          margin: 0;
          padding: 20px; 
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background-color: var(--muted-green-border);
          border: 10px solid var(--muted-green-border);
        }

        .page-container {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 20px; 
        }

        header, .main-card, .green-bar-banner {
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        header {
          background-color: var(--white);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 40px;
        }

        .logo { 
          height: 94px; /* Scaled 30% up from 72px */
          width: auto; 
        }

        /* Green layout divider strip styled between header and main card container */
        .green-bar-banner {
          background-color: var(--light-green-btns);
          height: 15px;
          width: 100%;
          margin: -5px 0 -5px 0;
        }

        .main-card { 
          background-color: var(--white);
          padding: 60px 40px; 
          box-sizing: border-box;
        }

        .section-title {
          color: var(--navy-text);
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 40px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .how-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
        }

        .path-box h3 {
          color: var(--teal-codes);
          font-size: 1.8rem;
          margin-bottom: 25px;
          border-bottom: 2px solid #f0f0f0;
          padding-bottom: 10px;
        }

        .step { 
          margin-bottom: 25px; 
          line-height: 1.6; 
          color: #444; 
          font-size: 1.05rem;
        }

        .step strong { color: var(--navy-text); }

        .pricing-row {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        .price-btn {
          flex: 1;
          padding: 15px 5px;
          text-align: center;
          background: var(--white);
          border: 2px solid var(--muted-green-border);
          border-radius: 8px;
          text-decoration: none;
          color: var(--navy-text);
          font-weight: bold;
          font-size: 0.9rem;
          transition: 0.3s ease;
          line-height: 1.4;
        }

        .price-btn:hover {
          background: var(--light-green-btns);
          color: white;
          border-color: var(--light-green-btns);
          transform: translateY(-2px);
        }

        .btn-large {
          display: inline-block;
          padding: 18px 40px;
          background: var(--navy-text);
          color: white;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          font-size: 1.2rem;
          transition: opacity 0.3s;
        }

        .btn-large:hover {
          opacity: 0.9;
        }

        @media (max-width: 850px) {
          .how-grid { grid-template-columns: 1fr; gap: 40px; }
          header { padding: 15px 20px; }
          .logo { height: 75px; }
          .main-card { padding: 40px 20px; }
        }

        @media (max-width: 480px) {
          .pricing-row { flex-direction: column; }
          .section-title { font-size: 1.8rem; }
        }
      `}</style>

      <header>
        <Link href="/">
          <img src="/bogo-logo.png" alt="BogoCodes" className="logo" />
        </Link>
        <nav style={{ display: 'flex', gap: '25px' }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'var(--navy-text)', fontWeight: '600' }}>
            Home
          </Link>
          <Link href="/sign-in" style={{ textDecoration: 'none', color: 'var(--navy-text)', fontWeight: '600' }}>
            Deals
          </Link>
          <Link href="/sign-in" style={{ textDecoration: 'none', color: 'var(--navy-text)', fontWeight: '600' }}>
            Sign In
          </Link>
        </nav>
      </header>

      {/* Structured Green Space Line element between upper header row box and main layout structure */}
      <div className="green-bar-banner" />

      <main className="main-card">
        <h1 className="section-title">How It Works</h1>

        <div className="how-grid">
          {/* Subscriber Path */}
          <div className="path-box">
            <h3>For Subscribers</h3>
            <div className="step">
              <strong>1. Join the Community:</strong> Choose a plan to unlock exclusive daily codes.
              <div className="pricing-row">
                <Link href="/checkout?plan=monthly" className="price-btn">
                  Monthly<br />$5.99
                </Link>
                <Link href="/checkout?plan=quarterly" className="price-btn">
                  Quarterly<br />$22.50
                </Link>
                <Link href="/checkout?plan=annual" className="price-btn">
                  Annually<br />$60.00
                </Link>
              </div>
            </div>
            <div className="step">
              <strong>2. Get Your Code:</strong> Log in daily to reveal a new, unique BogoCode. 
            </div>
            <div className="step">
              <strong>3. Redeem & Save:</strong> Show the live code at your favorite local business to get your second item FREE!
            </div>
            <p style={{ fontSize: '0.8rem', color: '#888', fontStyle: 'italic' }}>
              *Note: If membership lapses, the daily code will be hidden until payment is updated.
            </p>
          </div>

          {/* Business Path */}
          <div className="path-box">
            <h3>For Businesses</h3>
            <div className="step">
              <strong>1. List for Free:</strong> Showcase your best BOGO offer to our growing community of local shoppers at no cost to you.
            </div>
            <div className="step">
              <strong>2. Stay Flexible:</strong> Limit redemptions to once a month or once a week to keep your foot traffic balanced.
            </div>
            <div className="step">
              <strong>3. Simple Validation:</strong> No fancy tech needed. Just check the BogoCode on the customer's phone—we handle the rest.
            </div>
            <div style={{ marginTop: '40px' }}>
              <Link href="/sign-in" className="btn-large">
                List BOGO Deal
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '20px', color: '#666', fontSize: '0.85rem' }}>
        © 2026 BogoCodes | <Link href="/terms" style={{ color: '#666' }}>Terms of Service</Link>
      </footer>
    </div>
  );
}