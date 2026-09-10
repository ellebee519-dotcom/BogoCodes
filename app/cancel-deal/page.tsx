"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function CancelDealForm() {
  const searchParams = useSearchParams();
  const [dealNumber, setDealNumber] = useState('');
  const [merchantTitle, setMerchantTitle] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [password, setPassword] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const num = searchParams.get('dealNumber');
    if (num) {
      setDealNumber(num);
    }
  }, [searchParams]);

  const handleCancellation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConfirmed) return;

    const confirmed = window.confirm("Are you absolutely sure? This action cannot be undone.");
    if (!confirmed) return;

    setLoading(true);

    try {
      const response = await fetch('/api/deals/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          dealId: dealNumber, // Changed key from dealNumber to dealId to match backend validation rules
          merchantTitle, 
          zipCode, 
          password,
          targetEmail: "canceldeal@bogocodes.com"
        }),
      });

      if (response.ok) {
        alert("Deal removed successfully. Your business is restricted from new postings for 24 hours.");
        window.location.href = '/merchant-dashboard'; 
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to cancel deal.");
      }
    } catch (err) {
      alert("A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="management-card">
      <form onSubmit={handleCancellation}>
        <label className="form-label">Deal Number (#)</label>
        <input 
          type="text" 
          placeholder="e.g. 10432"
          required 
          value={dealNumber}
          onChange={(e) => setDealNumber(e.target.value)}
          disabled={loading}
        />

        <label className="form-label">Professional Title</label>
        <input 
          type="text" 
          placeholder="e.g. General Manager / Owner"
          required 
          value={merchantTitle}
          onChange={(e) => setMerchantTitle(e.target.value)}
          disabled={loading}
        />

        <label className="form-label">Business Zip Code</label>
        <input 
          type="text" 
          placeholder="e.g. 90210" 
          required 
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          disabled={loading}
        />

        <label className="form-label">Merchant Password</label>
        <input 
          type="password" 
          placeholder="Enter merchant password" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <div className="checkbox-container">
          <input 
            type="checkbox" 
            id="confirm-check"
            checked={isConfirmed}
            onChange={(e) => setIsConfirmed(e.target.checked)}
            disabled={loading}
            required 
          />
          <label htmlFor="confirm-check" style={{ fontSize: '0.85rem', color: '#822' }}>
            I understand that cancelling this deal is <strong>permanent</strong>. 
            This business location will be restricted from posting new deals for 24 hours.
          </label>
        </div>

        <button 
          type="submit" 
          className="btn-cancel"
          disabled={!isConfirmed || loading}
        >
          {loading ? "PROCESSING..." : "REMOVE DEAL IMMEDIATELY"}
        </button>
      </form>
    </div>
  );
}

export default function CancelDealPage() {
  return (
    <div className="cancel-page-wrapper">
      <style jsx global>{`
        :root {
          --muted-green-border: #acc69b; 
          --light-green-btns: #88b06d;
          --navy-text: #1d4370;
          --teal-codes: #51a3a3;
          --white: #ffffff;
          --danger-red: #d9534f;
        }

        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background-color: var(--muted-green-border);
          color: var(--navy-text);
          margin: 0;
          padding: 40px 20px;
        }

        .cancel-page-wrapper {
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: 960px;
          margin: 0 auto;
          border: 12px solid var(--muted-green-border); 
          background-color: var(--muted-green-border);
        }

        header, section {
          background-color: var(--white);
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          box-sizing: border-box;
        }

        header {
          padding: 20px 40px; 
          display: flex; 
          justify-content: space-between; 
          align-items: center;
        }

        .logo { 
          height: 113px;
          width: auto; 
        }

        .btn-back-teal {
          background-color: var(--teal-codes);
          color: white !important;
          padding: 12px 28px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.9rem;
          transition: opacity 0.2s;
          letter-spacing: 0.5px;
        }

        .portal-header {
          background-color: var(--teal-codes);
          color: var(--white);
          text-align: center;
          padding: 30px;
        }

        .management-card {
          max-width: 600px;
          margin: 0 auto;
        }

        .form-label {
          text-align: left; 
          display: block; 
          font-weight: bold;
          margin-bottom: 8px;
          font-size: 1.1rem;
        }

        input[type="text"], 
        input[type="password"] {
          width: 100%;
          padding: 16px;
          margin-bottom: 24px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1.1rem;
          box-sizing: border-box;
          color: var(--navy-text);
        }

        input:disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
        }

        .checkbox-container {
          background: #fff5f5; 
          border: 1px solid #fabebb; 
          padding: 15px; 
          border-radius: 8px; 
          margin-top: 20px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          text-align: left;
        }

        .btn-cancel {
          background-color: var(--danger-red);
          color: white;
          padding: 18px 30px;
          border: none;
          border-radius: 50px;
          font-weight: bold;
          cursor: pointer;
          width: 100%;
          margin-top: 25px;
          font-size: 1.1rem;
          letter-spacing: 0.5px;
        }

        .btn-cancel:disabled {
          background-color: #eea5a2;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          header { padding: 20px; flex-direction: column; gap: 15px; }
          .logo { height: 85px; }
          body { padding: 20px 10px; }
          .cancel-page-wrapper { border: 6px solid var(--muted-green-border); }
        }
      `}</style>

      <header>
        <Link href="/">
          <img src="/bogo-logo.png" alt="BogoCodes" className="logo" />
        </Link>
        <Link href="/merchant-dashboard" className="btn-back-teal">
          ← DASHBOARD
        </Link>
      </header>

      <section className="portal-header">
        <h2 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '1.6rem' }}>Cancel Active Deal</h2>
      </section>

      <section>
        <Suspense fallback={<div>Loading form configuration...</div>}>
          <CancelDealForm />
        </Suspense>
      </section>
    </div>
  );
}