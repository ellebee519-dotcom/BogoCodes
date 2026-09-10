"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function DeleteAccountPage() {
  const [email, setEmail] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [status, setStatus] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmText !== "DELETE") return;

    setLoading(true);
    try {
      const response = await fetch("/api/delete-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          targetEmail: "deleteaccount@bogocodes.com"
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setStatus("Your request has been received. For security purposes, a final verification link has been sent to your email. Your account will be purged once confirmed.");
      } else {
        alert("Something went wrong. Please try again or contact support.");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("A system network error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const globalStyles = `
    :root {
      --muted-green-border: #acc69b; 
      --light-green-shading: #f0f7f0; 
      --navy-text: #1d4370;
      --teal-aqua: #51a3a3;
      --warning-red: #d9534f;
      --white: #ffffff;
    }
    body {
      margin: 0; padding: 0;
      background-color: var(--white);
      border: 15px solid var(--muted-green-border);
      min-height: 100vh;
      box-sizing: border-box;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
  `;

  const localStyles = `
    .page-wrapper { max-width: 900px; margin: 0 auto; padding: 20px; }
    header { display: flex; justify-content: flex-start; padding: 20px 0 30px 0; }
    .logo-main { height: 113px; width: auto; cursor: pointer; }
    .contact-card {
      background-color: var(--light-green-shading);
      width: 100%; max-width: 800px; margin: 0 auto; padding: 50px;
      border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);
      border: 2px solid var(--muted-green-border); box-sizing: border-box;
    }
    .header-container { display: flex; justify-content: center; margin-bottom: 30px; }
    h1 {
      color: var(--navy-text); text-transform: uppercase; letter-spacing: 2px;
      font-size: 1.4rem; font-weight: 800; margin: 0;
      border: 3px solid var(--teal-aqua); padding: 15px 40px;
      border-radius: 100px; display: inline-block; background-color: var(--white);
      text-align: center;
    }
    .subtitle { color: var(--navy-text); text-align: center; margin-bottom: 30px; font-weight: 600; line-height: 1.4; }
    
    /* Policy and Warning Box Elements */
    .warning-box { 
      background-color: #fff5f5; border: 1px solid var(--warning-red); 
      padding: 15px; border-radius: 8px; margin-bottom: 25px; color: #b91c1c; font-size: 0.9rem;
    }
    .policy-box {
      background-color: var(--white); border: 2px solid var(--muted-green-border);
      padding: 20px; border-radius: 10px; margin-bottom: 25px; box-sizing: border-box;
    }
    .policy-title {
      font-size: 0.85rem; font-weight: bold; color: var(--navy-text);
      text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px 0;
    }
    .policy-list { padding-left: 20px; margin: 0; color: #4b5563; font-size: 0.9rem; line-height: 1.5; }
    .policy-list li { margin-bottom: 8px; }
    .policy-list li:last-child { margin-bottom: 0; }

    label { display: block; margin-bottom: 8px; color: var(--navy-text); font-weight: bold; font-size: 0.8rem; text-transform: uppercase; }
    input {
      width: 100%; padding: 14px; margin-bottom: 25px; border: 2px solid #ddd;
      border-radius: 10px; background-color: var(--white); font-size: 1rem; box-sizing: border-box;
    }
    input:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }
    .btn-delete {
      background-color: var(--navy-text); color: white; border: none; padding: 20px;
      border-radius: 50px; font-weight: 700; cursor: pointer; width: 100%; font-size: 1.1rem;
      transition: opacity 0.2s;
    }
    .btn-delete:hover { opacity: 0.9; }
    .btn-delete:disabled { opacity: 0.5; cursor: not-allowed; }
    .success-banner {
      background-color: var(--white); color: var(--teal-aqua); padding: 25px;
      border-radius: 8px; text-align: center; font-weight: bold; margin-top: 20px;
      border: 2px solid var(--teal-aqua); line-height: 1.5;
    }
  `;

  return (
    <div className="page-wrapper">
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <style dangerouslySetInnerHTML={{ __html: localStyles }} />

      <header>
        <Link href="/"><img src="/bogo-logo.png" alt="BogoCodes Logo" className="logo-main" /></Link>
      </header>

      <main className="contact-card">
        <div className="header-container">
          <h1>Delete Account</h1>
        </div>
        
        {submitted ? (
          <div className="success-banner">
            <span style={{fontSize: '2rem', display: 'block', marginBottom: '10px'}}>🛡️</span>
            {status}
            <br/><br/>
            <Link href="/" style={{color: 'var(--navy-text)', textDecoration: 'underline'}}>Return Home</Link>
          </div>
        ) : (
          <>
            <p className="subtitle">We’re sorry to see you go. Please confirm your details to begin the deletion process.</p>
            
            <div className="warning-box">
              <strong>Warning:</strong> This action is permanent. Deleting your account will immediately remove your active profile and access configurations.
            </div>

            {/* --- ADAPTED ADMINISTRATIVE REFUND POLICY SUMMARY --- */}
            <div className="policy-box">
              <h2 className="policy-title">Subscription & Refund Rules</h2>
              <ul className="policy-list">
                <li>
                  <strong>Monthly Plans ($5.99):</strong> Plan balances are strictly non-refundable. Service access continues dynamically until your current 30-day term expires, at which point account data purges automatically.
                </li>
                <li>
                  <strong>Quarterly ($22.50) & Annual ($60.00) Plans:</strong> Early cancellations are eligible for a prorated refund on remaining full, unused subscription months, subject to a flat <strong>$5.00 administrative refund processing fee</strong> deducted directly from your return layout balance.
                </li>
              </ul>
            </div>

            <form onSubmit={handleDeleteRequest}>
              <label htmlFor="email">Confirm Email Address</label>
              <input 
                type="email" 
                id="email" 
                placeholder="email@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required 
              />
              
              <label htmlFor="confirm">Type "DELETE" to confirm</label>
              <input 
                type="text" 
                id="confirm" 
                pattern="DELETE" 
                placeholder="DELETE" 
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                disabled={loading}
                required 
              />
              
              <button type="submit" className="btn-delete" disabled={loading}>
                {loading ? "PROCESSING REQUEST..." : "REQUEST PERMANENT DELETION"}
              </button>
            </form>

            <div style={{textAlign: 'center', marginTop: '25px'}}>
               <Link href="/sign-in" style={{color: 'var(--teal-aqua)', fontSize: '0.9rem', fontWeight: 'bold'}}>
                Changed your mind? Back to Sign In
               </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}