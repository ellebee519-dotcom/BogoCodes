"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage(): React.JSX.Element {
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

        .btn-signin {
          background-color: var(--light-green-btns);
          color: white !important;
          padding: 10px 25px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          margin-left: 20px;
        }

        .hero { display: flex; min-height: 350px; }
        .hero-text { flex: 1; padding: 60px 40px; }
        .hero-text h1 { color: var(--navy-text); font-size: 2.8rem; margin: 0; }
        
        /* Relative container for Next.js Hero Image */
        .hero-img-container { 
          flex: 1.5; 
          position: relative;
          min-height: 350px;
          background-color: #eee;
        }

        .section-row { display: flex; min-height: 300px; }
        .teal-bg { background-color: var(--teal-codes); }
        .teal-bg .content-side h3 { color: white; }
        
        .content-side { flex: 1; padding: 40px; }
        .content-side h3 { color: var(--navy-text); font-size: 2rem; margin-top: 0; }

        .icon-group { display: flex; gap: 20px; margin-top: 20px; }
        
        .icon-link {
          text-decoration: none;
          flex: 1;
          transition: transform 0.2s ease;
        }
        
        .icon-link:hover { transform: translateY(-5px); }

        .icon-box { text-align: center; font-weight: bold; color: var(--navy-text); }
        .teal-bg .icon-box { color: white; }
        
        .white-circle {
          background: white;
          width: 75px; 
          height: 75px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 10px;
          font-size: 2.2rem;
          position: relative;
          overflow: hidden;
          border: 2px solid white;
        }

        .image-side {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          padding: 40px;
          align-items: center;
        }

        /* Relative container for Next.js Grid Images */
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
          <Link href="/how-it-works">How It Works</Link>
          <Link href="/sign-in">Deals</Link>
          <Link href="/sign-in">Business Portal</Link>
        </nav>
        <Link href="/sign-in" className="btn-signin">Sign In</Link>
      </header>

      {/* 2. HERO SECTION */}
      <section className="hero">
        <div className="hero-text">
          <h1>Unlock Double the Value</h1>
          <Link href="/how-it-works" style={{
            background: 'var(--light-green-btns)', 
            color: 'white', 
            padding: '15px 30px', 
            textDecoration: 'none', 
            borderRadius: '50px', 
            display: 'inline-block', 
            marginTop: '20px',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(136, 176, 109, 0.4)'
          }}>
            Subscribe
          </Link>
        </div>
        <div className="hero-img-container">
          {/* Optimization fixes added here */}
          <Image 
            src="/friends.jpg" 
            alt="Friends enjoying deals" 
            fill 
            style={{ objectFit: 'cover' }} 
            priority 
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* 3. LETS BOGO SECTION */}
      <section className="section-row teal-bg">
        <div className="content-side">
          <h3>Let's BOGO</h3>
          <div className="icon-group">
            <Link href="/sign-in" className="icon-link">
              <div className="icon-box"><div className="white-circle">🔍</div>Discover</div>
            </Link>
            
            <Link href="/sign-in" className="icon-link">
              <div className="icon-box">
                <div className="white-circle">
                  <span style={{ position: 'relative', zIndex: 1 }}>📍</span>
                </div>
                Region
              </div>
            </Link>

            <Link href="/terms" className="icon-link">
              <div className="icon-box"><div className="white-circle">📄</div>Terms</div>
            </Link>
          </div>
        </div>
        <div className="image-side">
          <div className="sq-container">
            <Image src="/capuccino.jpg" alt="Cappuccino" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="sq-container">
            <Image src="/pizza.jpg" alt="Pizza" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="sq-container">
            <Image src="/zuccini.jpg" alt="Zucchini dish" fill style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* 4. BUSINESS SECTION */}
      <section className="section-row">
        <div className="content-side">
          <h3>Got a Business?</h3>
          <p>List your deal with BogoCodes</p>
          <Link href="/contact" style={{
            background: 'var(--light-green-btns)', 
            color: 'white', 
            padding: '12px 25px', 
            textDecoration: 'none', 
            borderRadius: '50px',
            fontWeight: 'bold',
            display: 'inline-block',
            marginTop: '10px'
          }}>
            Contact Us
          </Link>
        </div>
        <div className="image-side">
          <div className="sq-container">
            <Image src="/shopping.png" alt="Shopping bags" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="sq-container">
            <Image src="/coke.jpg" alt="Cold drink" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="sq-container">
            <Image src="/fries.jpg" alt="French fries" fill style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </section>
    </div>
  );
}