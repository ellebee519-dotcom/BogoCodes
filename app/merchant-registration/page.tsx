"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MerchantRegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API registration and routing the registration notice to hello@bogocodes.com
    setTimeout(() => {
      setIsSubmitting(false);
      setShowThankYou(true);
      
      // Automatically redirect to the dashboard after the merchant sees the thank you message
      setTimeout(() => {
        router.push('/merchant-dashboard');
      }, 4000);
    }, 1500);
  };

  return (
    <div className="register-page-wrapper">
      {/* @ts-ignore */}
      <style jsx global>{`
        :root {
          --light-green: #88b06d; 
          --navy-blue: #1d4370; 
          --soft-teal: #7fb5b5; 
          --white: #ffffff;
          --page-bg: #acc69b; 
        }

        .register-page-wrapper {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          background-color: var(--page-bg);
          margin: 0;
          padding: 20px;
          color: var(--navy-blue);
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100vh;
        }

        header {
          background: var(--white);
          width: 100%;
          max-width: 800px;
          padding: 25px 40px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          margin-bottom: 25px;
          box-sizing: border-box;
        }

        .logo-container {
          display: inline-flex;
          align-items: center;
        }

        .logo { 
          height: 103px; 
          width: 150px; 
          object-fit: contain;
        }

        .header-title-container {
          flex-grow: 1;
          text-align: center;
          padding-left: 40px; /* Slight offset to counter the right link space and balance center */
        }

        .header-title {
          font-size: 1.6rem;
          font-weight: bold;
          color: var(--navy-blue);
        }

        .home-link {
          color: var(--navy-blue);
          text-decoration: none;
          font-weight: bold;
          font-size: 1rem;
          white-space: nowrap;
        }

        .home-link:hover {
          color: var(--light-green);
        }

        .form-container {
          background: var(--white);
          width: 100%;
          max-width: 800px;
          padding: 50px;
          border-radius: 20px;
          box-sizing: border-box;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          min-height: 400px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .instruction-text {
          font-size: 0.95rem;
          color: #666;
          margin-bottom: 30px;
          text-align: center;
          line-height: 1.5;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 30px;
        }

        .full-width { grid-column: span 2; }
        
        .address-row {
          display: flex;
          gap: 15px;
          width: 100%;
          box-sizing: border-box;
        }

        .city-box { flex: 2; }
        .state-box { flex: 0 0 100px; }
        .zip-box { flex: 1; }

        label { 
          display: block; 
          font-weight: bold; 
          margin-bottom: 8px; 
          font-size: 0.8rem; 
          text-transform: uppercase;
        }
        
        input, select {
          width: 100%;
          padding: 12px;
          border: 2px solid #eee;
          border-radius: 10px;
          font-family: inherit;
          font-size: 0.95rem;
          box-sizing: border-box;
          background-color: var(--white);
        }

        select {
          height: 47px;
          cursor: pointer;
        }

        input:focus, select:focus {
          border-color: var(--light-green);
          outline: none;
        }

        .btn-green {
          background-color: var(--light-green);
          color: white;
          width: 100%;
          padding: 18px;
          border: none;
          border-radius: 50px;
          font-weight: bold;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .btn-green:hover { background-color: #769a5e; }
        .btn-green:disabled { background-color: #ccc; cursor: not-allowed; }

        .thank-you-message {
          text-align: center;
          animation: fadeIn 0.5s ease-in;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 700px) {
          header { flex-direction: column; gap: 15px; text-align: center; }
          .header-title-container { padding-left: 0; }
          .form-grid { grid-template-columns: 1fr; }
          .full-width { grid-column: span 1; }
          .address-row { flex-direction: column; gap: 20px; }
          .state-box { flex: 1 1 auto; }
          .header-title { font-size: 1.1rem; }
          .form-container { padding: 25px; }
        }
      `}</style>

      <header>
        <div className="logo-container">
          <img src="/bogo-logo.png" alt="BogoCodes" className="logo" />
        </div>
        <div className="header-title-container">
          <div className="header-title">Merchant Registration</div>
        </div>
        <Link href="/" className="home-link">
          Home
        </Link>
      </header>

      <div className="form-container">
        {showThankYou ? (
          <div className="thank-you-message">
            <h2 style={{ color: 'var(--navy-blue)', marginBottom: '15px' }}>Registration Successful!</h2>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🎉</div>
            <p style={{ fontSize: '1.1rem', color: '#444', lineHeight: '1.6' }}>
              Thank you for joining the BogoCodes Registry.
            </p>
            <p style={{ marginTop: '20px', color: '#888', fontStyle: 'italic' }}>
              Redirecting you to your dashboard now...
            </p>
          </div>
        ) : (
          <>
            <p className="instruction-text">Complete the registry profile for your business below.</p>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Legal Business Name</label>
                  <input type="text" placeholder="e.g. Tony's Pizzeria LLC" required />
                </div>

                {/* Split Address Setup: Street */}
                <div className="form-group full-width">
                  <label>Street Address</label>
                  <input type="text" placeholder="e.g. 123 Main St" required />
                </div>

                {/* Split Address Setup: City, State, & Zip Layout Wrapper */}
                <div className="form-group full-width address-row">
                  <div className="city-box">
                    <label>City</label>
                    <input type="text" placeholder="Ozark" required />
                  </div>

                  <div className="state-box">
                    <label>State</label>
                    <select name="state" defaultValue="" required>
                      <option value="" disabled>--</option>
                      <option value="AL">AL</option>
                      <option value="AK">AK</option>
                      <option value="AZ">AZ</option>
                      <option value="AR">AR</option>
                      <option value="CA">CA</option>
                      <option value="CO">CO</option>
                      <option value="CT">CT</option>
                      <option value="DE">DE</option>
                      <option value="FL">FL</option>
                      <option value="GA">GA</option>
                      <option value="HI">HI</option>
                      <option value="ID">ID</option>
                      <option value="IL">IL</option>
                      <option value="IN">IN</option>
                      <option value="IA">IA</option>
                      <option value="KS">KS</option>
                      <option value="KY">KY</option>
                      <option value="LA">LA</option>
                      <option value="ME">ME</option>
                      <option value="MD">MD</option>
                      <option value="MA">MA</option>
                      <option value="MI">MI</option>
                      <option value="MN">MN</option>
                      <option value="MS">MS</option>
                      <option value="MO">MO</option>
                      <option value="MT">MT</option>
                      <option value="NE">NE</option>
                      <option value="NV">NV</option>
                      <option value="NH">NH</option>
                      <option value="NJ">NJ</option>
                      <option value="NM">NM</option>
                      <option value="NY">NY</option>
                      <option value="NC">NC</option>
                      <option value="ND">ND</option>
                      <option value="OH">OH</option>
                      <option value="OK">OK</option>
                      <option value="OR">OR</option>
                      <option value="PA">PA</option>
                      <option value="RI">RI</option>
                      <option value="SC">SC</option>
                      <option value="SD">SD</option>
                      <option value="TN">TN</option>
                      <option value="TX">TX</option>
                      <option value="UT">UT</option>
                      <option value="VT">VT</option>
                      <option value="VA">VA</option>
                      <option value="WA">WA</option>
                      <option value="WV">WV</option>
                      <option value="WI">WI</option>
                      <option value="WY">WY</option>
                    </select>
                  </div>

                  <div className="zip-box">
                    <label>Zip Code</label>
                    <input 
                      type="text" 
                      placeholder="65721" 
                      maxLength={5} 
                      pattern="[0-9]{5}" 
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Business Phone</label>
                  <input type="tel" placeholder="(555) 000-0000" required />
                </div>

                <div className="form-group">
                  <label>Business Email</label>
                  <input type="email" placeholder="owner@business.com" required />
                </div>

                <div className="form-group">
                  <label>Rep. First Name</label>
                  <input type="text" required />
                </div>

                <div className="form-group">
                  <label>Rep. Last Name</label>
                  <input type="text" required />
                </div>

                <div className="form-group full-width">
                  <label>Account Password</label>
                  <input type="password" placeholder="••••••••" required />
                </div>
              </div>

              <button type="submit" className="btn-green" disabled={isSubmitting}>
                {isSubmitting ? "CREATING ACCOUNT..." : "CREATE MERCHANT ACCOUNT"}
              </button>
            </form>
          </>
        )}
      </div>

      <footer style={{ marginTop: '30px', color: 'white', fontSize: '0.8rem' }}>
        © 2026 BogoCodes | Registry Management System
      </footer>
    </div>
  );
}