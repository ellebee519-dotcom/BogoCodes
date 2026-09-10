"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage(): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Backend/Supabase waitlist connection gets wired here
      setSubmitted(true);
    }
  };

  // Sample listing availability data (wired to Supabase in backend stage)
  const categorySpots = [
    { name: 'Retail', filled: 12, max: 25 },
    { name: 'Food', filled: 18, max: 25 },
    { name: 'Services', filled: 8, max: 25 },
    { name: 'Entertainment', filled: 15, max: 25 },
    { name: 'Health & Beauty', filled: 9, max: 25 },
  ];

  return (
    <div className="page-container">
      <style>{`
        :root {
          --muted-green-border: #acc69b; 
          --light-green-btns: #88b06d;
          --navy-text: #1d4370;
          --teal-codes: #51a3a3;
          --white: #ffffff;
        }

        * { 
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0; 
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background-color: var(--muted-green-border);
        }

        .page-container {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 15px; 
          padding: 15px;
          background-color: var(--muted-green-border);
        }

        header, .hero, .section-row {
          background-color: var(--white);
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          border-radius: 8px;
          overflow: hidden;
        }

        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 40px;
        }

        .logo-container {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        nav { 
          display: flex; 
          gap: 35px; 
          align-items: center; 
          flex-grow: 1; 
          justify-content: center; 
        }
        
        nav a { 
          text-decoration: none; 
          color: var(--navy-text); 
          font-weight: 600; 
          font-size: 0.95rem;
          transition: color 0.3s;
        }

        nav a:hover {
          color: var(--light-green-btns);
        }

        .hero { display: flex; min-height: 380px; }
        .hero-text { flex: 1.2; padding: 50px 40px; }
        .hero-text h1 { color: var(--navy-text); font-size: 2.5rem; margin: 0 0 10px 0; }
        .hero-text p { color: #555; font-size: 1.1rem; margin-bottom: 25px; line-height: 1.4; }
        
        .waitlist-form {
          display: flex;
          gap: 10px;
          max-width: 450px;
        }

        .waitlist-input {
          flex: 1;
          padding: 12px 20px;
          border: 2px solid var(--muted-green-border);
          border-radius: 50px;
          font-size: 1rem;
          outline: none;
        }

        .waitlist-btn {
          background: var(--light-green-btns);
          color: white;
          padding: 12px 25px;
          border: none;
          border-radius: 50px;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(136, 176, 109, 0.4);
          transition: transform 0.2s;
        }

        .waitlist-btn:hover {
          transform: translateY(-2px);
        }

        .hero-img-container { 
          flex: 1; 
          position: relative;
          min-height: 350px;
          background-color: #eee;
        }

        .section-row { display: flex; min-height: 300px; }
        .teal-bg { background-color: var(--teal-codes); }
        .teal-bg .content-side h3, .teal-bg .content-side p { color: white; }
        
        .content-side { flex: 1; padding: 40px; }
        .content-side h3 { color: var(--navy-text); font-size: 2rem; margin-top: 0; }

        .tracker-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 20px;
        }

        .tracker-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .tracker-label {
          display: flex;
          justify-content: space-between;
          font-weight: 600;
          color: white;
          font-size: 0.9rem;
        }

        .progress-bar-bg {
          width: 100%;
          height: 10px;
          background-color: rgba(255,255,255,0.3);
          border-radius: 5px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background-color: white;
          border-radius: 5px;
        }

        .image-side {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          padding: 30px;
          align-content: center;
          justify-content: center;
        }

        .sq-container {
          width: 100%;
          aspect-ratio: 1 / 1;
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          background-color: #f0f0f0; 
        }

        @media (max-width: 768px) {
          header { flex-direction: column; gap: 15px; text-align: center; }
          nav { flex-direction: column; gap: 10px; }
          .section-row, .hero { flex-direction: column; }
          .hero-img-container { min-height: 250px; }
          .waitlist-form { flex-direction: column; }
        }
      `}</style>

      {/* 1. NAVIGATION HEADER */}
      <header>
        <Link href="/" className="logo-container">
          <Image 
            src="/bogo-logo.png" 
            alt="BogoCodes Logo" 
            width={150} 
            height={103} 
            style={{ objectFit: 'contain' }}
            priority 
          />
        </Link>
        <nav>
          <Link href="#waitlist">Subscriber VIP Waitlist</Link>
          <Link href="#business">Business Partner Intake</Link>
        </nav>
      </header>

      {/* 2. HERO SECTION: CONSUMER WAITLIST */}
      <section className="hero" id="waitlist">
        <div className="hero-text">
          <h1>Exclusive Local Deals Are Launching Soon</h1>
          <p>Be the first to know when buy-one-get-one deals go live in your area. Join our VIP subscriber waitlist today!</p>
          
          {submitted ? (
            <div style={{ padding: '15px 20px', background: '#eaf4e6', color: 'var(--navy-text)', borderRadius: '8px', fontWeight: 'bold' }}>
              🎉 You're on the list! We'll notify you as soon as deals go live.
            </div>
          ) : (
            <form onSubmit={handleWaitlistSubmit} className="waitlist-form">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="waitlist-input"
              />
              <button type="submit" className="waitlist-btn">
                Join 
              </button>
            </form>
          )}
        </div>
        <div className="hero-img-container">
          <Image 
            src="/friends.jpg" 
            alt="Friends enjoying local deals" 
            fill 
            style={{ objectFit: 'cover' }} 
            priority 
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* 3. LIVE CATEGORY CAPACITY TRACKER */}
      <section className="section-row teal-bg">
        <div className="content-side">
          <h3>Category Availability</h3>
          <p>We strictly cap each category to ensure maximum visibility for our partners.</p>
          
          <div className="tracker-grid">
            {categorySpots.map((cat) => {
              const spotsLeft = cat.max - cat.filled;
              return (
                <div key={cat.name} className="tracker-item">
                  <div className="tracker-label">
                    <span>{cat.name}</span>
                    <span>{spotsLeft} Spots Left</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${(cat.filled / cat.max) * 100}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="image-side">
          {/* Row 1 */}
          <div className="sq-container">
            <Image src="/capuccino.jpg" alt="Cappuccino" fill sizes="(max-width: 768px) 33vw, 15vw" style={{ objectFit: 'cover' }} />
          </div>
          <div className="sq-container">
            <Image src="/pizza.jpg" alt="Pizza" fill sizes="(max-width: 768px) 33vw, 15vw" style={{ objectFit: 'cover' }} />
          </div>
          <div className="sq-container">
            <Image src="/zuccini.jpg" alt="Zucchini dish" fill sizes="(max-width: 768px) 33vw, 15vw" style={{ objectFit: 'cover' }} />
          </div>

          {/* Row 2 */}
          <div className="sq-container">
            <Image src="/service.jpg" alt="Local services" fill sizes="(max-width: 768px) 33vw, 15vw" style={{ objectFit: 'cover' }} />
          </div>
          <div className="sq-container">
            <Image src="/spa.jpg" alt="Spa and wellness" fill sizes="(max-width: 768px) 33vw, 15vw" style={{ objectFit: 'cover' }} />
          </div>
          <div className="sq-container">
            <Image src="/entertainment.jpg" alt="Entertainment events" fill sizes="(max-width: 768px) 33vw, 15vw" style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* 4. BUSINESS INTAKE CTA */}
      <section className="section-row" id="business">
        <div className="content-side">
          <h3>Are You a Local Business Owner?</h3>
          <p>Lock in your 30-day listing for just <strong>$10</strong> before your category fills up.</p>
          <Link href="/merchant-registration" style={{
            background: 'var(--light-green-btns)', 
            color: 'white', 
            padding: '14px 30px', 
            textDecoration: 'none', 
            borderRadius: '50px',
            fontWeight: 'bold',
            display: 'inline-block',
            marginTop: '10px',
            boxShadow: '0 4px 15px rgba(136, 176, 109, 0.4)'
          }}>
            Submit Your BoGo
          </Link>
        </div>
        <div className="image-side">
          <div className="sq-container">
            <Image src="/shopping.png" alt="Shopping bags" fill sizes="(max-width: 768px) 33vw, 15vw" style={{ objectFit: 'cover' }} />
          </div>
          <div className="sq-container">
            <Image src="/coke.jpg" alt="Cold drink" fill sizes="(max-width: 768px) 33vw, 15vw" style={{ objectFit: 'cover' }} />
          </div>
          <div className="sq-container">
            <Image src="/fries.jpg" alt="French fries" fill sizes="(max-width: 768px) 33vw, 15vw" style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </section>
    </div>
  );
}