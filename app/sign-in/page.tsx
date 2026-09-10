"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const [authType, setAuthType] = useState<'subscriber' | 'business' | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const router = useRouter();

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>, type: 'subscriber' | 'business') => {
    e.preventDefault();
    
    const form = e.currentTarget;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    const simulatedEmail = emailInput?.value || "";
    
    if (type === 'subscriber' && simulatedEmail.toLowerCase().includes('expired')) {
      setIsExpired(true);
      return;
    }

    if (type === 'business') {
      router.push('/merchant-dashboard');
    } else {
      router.push('/local-deals');
    }
  };

  return (
    <div className="signin-wrapper">
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
          background-color: var(--white);
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          border: 15px solid var(--muted-green-border);
          box-sizing: border-box;
        }

        /* Standardized Action Buttons matching Choice Button shapes exactly */
        .action-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 54px;
          padding: 8px 16px;
          border-radius: 12px; /* Uniform layout shape matching choice boxes */
          font-weight: bold;
          font-size: 0.85rem;
          text-align: center;
          text-decoration: none !important;
          transition: all 0.2s ease;
          box-sizing: border-box;
          cursor: pointer;
          line-height: 1.2;
        }

        /* Standard Matching Outline State */
        .action-button.standard-outline {
          background: transparent;
          border: 2px solid var(--muted-green-border);
          color: var(--navy-text) !important;
        }
        .action-button.standard-outline:hover {
          background-color: var(--light-green-btns);
          border-color: var(--light-green-btns);
          color: white !important;
        }

        /* Danger state matching geometry but keeping color constraint */
        .action-button.danger-outline {
          background: transparent;
          border: 2px solid #d9534f;
          color: #d9534f !important;
        }
        .action-button.danger-outline:hover {
          background: #d9534f;
          color: white !important;
        }
      `}</style>

      <style jsx>{`
        .signin-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .signin-card {
          background-color: var(--white);
          max-width: 500px;
          width: 100%;
          padding: 50px 40px;
          border-radius: 8px;
          border: 10px solid var(--muted-green-border);
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          text-align: center;
        }

        .logo { 
          width: 150px;
          height: 103px; 
          object-fit: contain;
          margin-bottom: 25px; 
          cursor: pointer;
        }

        h2 { color: var(--navy-text); margin-bottom: 10px; font-size: 1.8rem; }
        .subtitle { color: #666; margin-bottom: 30px; font-size: 0.95rem; }

        .choice-row {
          display: flex;
          gap: 15px;
          margin-bottom: 30px;
        }

        .choice-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          flex: 1;
          width: 100%;
        }

        .btn-choice {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 54px;
          padding: 8px 16px;
          border: 2px solid var(--muted-green-border);
          background: none;
          border-radius: 12px;
          color: var(--navy-text);
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s ease;
          font-size: 0.85rem;
          line-height: 1.2;
        }

        .btn-choice.active {
          background-color: var(--light-green-btns);
          color: white;
          border-color: var(--light-green-btns);
          box-shadow: 0 4px 10px rgba(136, 176, 109, 0.3);
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          text-align: left;
          animation: fadeIn 0.4s ease;
          margin-bottom: 20px;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        label { color: var(--navy-text); font-weight: bold; font-size: 0.85rem; }

        input {
          padding: 14px;
          border: 2px solid #eee;
          border-radius: 10px;
          font-size: 1rem;
          outline: none;
        }

        input:focus { border-color: var(--light-green-btns); }

        .forgot-password-link {
          align-self: flex-end;
          color: var(--navy-text);
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          margin-top: -5px;
          transition: color 0.2s ease;
        }

        .forgot-password-link:hover {
          color: var(--light-green-btns);
          text-decoration: underline;
        }

        .btn-submit {
          background-color: var(--navy-text);
          color: white;
          padding: 16px;
          border: none;
          border-radius: 50px;
          font-weight: bold;
          font-size: 1rem;
          cursor: pointer;
          margin-top: 10px;
          transition: 0.3s;
          text-align: center;
        }

        .btn-submit:hover { background-color: var(--light-green-btns); }

        /* Expiration UI */
        .expired-container {
          padding: 10px 0;
          animation: fadeIn 0.4s ease;
        }

        .expired-msg {
          color: #d9534f;
          font-weight: bold;
          font-size: 1.3rem;
          margin-bottom: 25px;
        }

        .btn-renew {
          display: block;
          background-color: var(--teal-codes);
          color: white;
          padding: 18px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: bold;
          font-size: 1rem;
          transition: 0.3s;
          text-align: center;
        }

        .btn-renew:hover { background-color: var(--navy-text); }

        .footer-links {
          margin-top: 25px;
          border-top: 1px solid #eee;
          padding-top: 25px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-items: center;
          width: 100%;
        }
      `}</style>

      <div className="signin-card">
        <Link href="/">
          <img src="/bogo-logo.png" alt="BogoCodes" className="logo" />
        </Link>
        
        {isExpired ? (
          <div className="expired-container">
            <div className="expired-msg">Your subscription has expired</div>
            <Link href="/how-it-works" className="btn-renew">
              RENEW SUBSCRIPTION
            </Link>
            <div className="footer-links" style={{ marginTop: '20px' }}>
              <button 
                onClick={() => setIsExpired(false)} 
                style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}
              >
                Sign in with a different account
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2>{authType === 'business' ? 'Business Portal' : "Let's BogoCode!"}</h2>
            <p className="subtitle">Please choose your account type to continue.</p>

            <div className="choice-row">
              <div className="choice-group">
                <button 
                  className={`btn-choice ${authType === 'subscriber' ? 'active' : ''}`}
                  onClick={() => setAuthType('subscriber')}
                >
                  I'm a Subscriber
                </button>
                <Link href="/how-it-works" className="action-button standard-outline">
                  Create Account
                </Link>
              </div>
              <div className="choice-group">
                <button 
                  className={`btn-choice ${authType === 'business' ? 'active' : ''}`}
                  onClick={() => setAuthType('business')}
                >
                  I'm a Business
                </button>
                <Link href="/merchant-registration" className="action-button standard-outline">
                  Create Business Account
                </Link>
              </div>
            </div>

            {authType && (
              <form onSubmit={(e) => handleSignIn(e, authType)}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                  <label>{authType === 'business' ? 'Work Email' : 'Email Address'}</label>
                  <input type="email" name="email" placeholder="example@email.com" required />
                </div>
                
                <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                  <label>Password</label>
                  <input type="password" name="password" placeholder="••••••••" required />
                </div>

                <Link href="/forgot-password" className="forgot-password-link">
                  Forgot Password?
                </Link>

                <button type="submit" className="btn-submit">
                  Sign In {authType === 'business' ? 'to Portal' : 'to Deals'}
                </button>
              </form>
            )}
          </>
        )}

        <div className="footer-links">
          <Link href="/" className="action-button standard-outline">
            ← Back to Home Page
          </Link>
          <Link href="/delete-account" className="action-button danger-outline">
            Cancel my account
          </Link>
        </div>
      </div>
    </div>
  );
}