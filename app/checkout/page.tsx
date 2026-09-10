"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutForm({ planDetails, plan }: { planDetails: any, plan: string | null }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return; 
    }

    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: plan }),
      });
      
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      const cardElement = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement!,
          billing_details: { email: email },
        }
      });

      if (result.error) {
        setErrorMessage(result.error.message || "An error occurred.");
        setIsProcessing(false);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          // Trigger a welcome email behind the scenes on successful sign up
          try {
            await fetch('/api/send-welcome-email', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                email: email, 
                sender: "hello@bogocodes.com" 
              }),
            });
          } catch (emailErr) {
            console.error("Failed to route welcome email request:", emailErr);
          }

          setIsProcessing(false);
          alert("Real sandbox charge successful! Your account is active.");
          router.push('/sign-in');
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong.");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <div className="form-section">
        <h2>1. Create Your Account</h2>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isProcessing} />
        </div>
        <div className="row">
          <div className="form-group">
            <label>Create Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isProcessing} />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required disabled={isProcessing} />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h2>2. Payment Details</h2>
        <div className="form-group" style={{ padding: '15px', border: '2px solid #eee', borderRadius: '10px' }}>
          <label style={{ marginBottom: '12px' }}>Credit or Debit Card</label>
          <CardElement options={{ style: { base: { fontSize: '16px', color: '#1d4370' } } }} />
        </div>
      </div>

      {errorMessage && <p style={{ color: 'red', fontSize: '0.9rem', fontWeight: 'bold' }}>{errorMessage}</p>}

      <button type="submit" className="btn-complete" disabled={isProcessing || !stripe}>
        {isProcessing ? "VERIFYING PAYMENT..." : "ACTIVATE MEMBERSHIP"}
      </button>
    </form>
  );
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');
  
  const [planDetails, setPlanDetails] = useState({
    name: "Annual Membership",
    price: "$60.00",
    billing: "Once per year"
  });

  useEffect(() => {
    if (plan === 'monthly') {
      setPlanDetails({ name: "Monthly Membership", price: "$5.99", billing: "Once per month" });
    } else if (plan === 'quarterly') {
      setPlanDetails({ name: "Quarterly Membership", price: "$22.50", billing: "Every three months" });
    }
  }, [plan]);

  return (
    <div className="checkout-wrapper">
      <style jsx global>{`
        :root {
          --muted-green-border: #acc69b; 
          --light-green-btns: #88b06d;
          --navy-text: #1d4370;
          --teal-codes: #51a3a3;
          --white: #ffffff;
        }
        body {
          margin: 0; padding: 0;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background-color: var(--white);
          border: 15px solid var(--muted-green-border);
          min-height: 100vh;
          box-sizing: border-box;
        }
        .checkout-wrapper { max-width: 1100px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px; padding: 20px; }
        header, .checkout-panel, .footer-panel { background-color: var(--white); box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-radius: 8px; }
        header { display: flex; justify-content: space-between; align-items: center; padding: 15px 40px; }
        .logo { height: 103px; width: 150px; object-fit: contain; }
        .nav-links { display: flex; gap: 20px; align-items: center; }
        .home-link { text-decoration: none; color: var(--navy-text); font-weight: 600; font-size: 1rem; }
        .home-link:hover { text-decoration: underline; }
        .divider-green { width: 100%; height: 4px; background-color: var(--muted-green-border); border-radius: 2px; }
        .checkout-panel { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 30px; padding: 40px; border: 1px solid #eee; }
        h2 { margin-top: 0; text-transform: uppercase; letter-spacing: 1.5px; font-size: 1.1rem; color: var(--navy-text); margin-bottom: 25px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
        .form-section { margin-bottom: 40px; }
        .form-group { margin-bottom: 20px; }
        label { display: block; font-weight: bold; margin-bottom: 8px; font-size: 0.8rem; text-transform: uppercase; }
        input { width: 100%; padding: 14px; border: 2px solid #eee; border-radius: 10px; box-sizing: border-box; font-size: 1rem; }
        input:focus { border-color: var(--light-green-btns); outline: none; }
        .row { display: flex; gap: 15px; }
        .row div { flex: 1; }
        .summary-box { background-color: #f9fbf8; padding: 30px; border-radius: 12px; border: 2px dashed var(--muted-green-border); position: sticky; top: 20px; }
        .summary-item { display: flex; justify-content: space-between; margin-bottom: 15px; font-weight: bold; font-size: 0.95rem; }
        .total-line { border-top: 2px solid var(--muted-green-border); padding-top: 15px; margin-top: 15px; font-size: 1.6rem; color: var(--navy-text); }
        .btn-complete { width: 100%; padding: 20px; background-color: var(--light-green-btns); color: var(--white); border: none; border-radius: 50px; font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: all 0.2s; margin-top: 20px; }
        .secure-lock { display: flex; align-items: center; gap: 8px; color: var(--light-green-btns); font-weight: 800; font-size: 0.75rem; letter-spacing: 1px; }
        @media (max-width: 850px) { .checkout-panel { grid-template-columns: 1fr; padding: 25px; } .row { flex-direction: column; gap: 0; } }
      `}</style>

      <header>
        <Link href="/"><img src="/bogo-logo.png" alt="BogoCodes" className="logo" /></Link>
        <div className="nav-links">
          <Link href="/" className="home-link">Home</Link>
          <div className="secure-lock">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            SECURE CHECKOUT
          </div>
        </div>
      </header>

      <div className="divider-green" />

      <main className="checkout-panel">
        <section>
          <Elements stripe={stripePromise}>
            <CheckoutForm planDetails={planDetails} plan={plan} />
          </Elements>
        </section>

        <section>
          <h2>Subscription Summary</h2>
          <div className="summary-box">
            <div className="summary-item">
              <span>Plan Type:</span>
              <span style={{ color: 'var(--teal-codes)' }}>{planDetails.name}</span>
            </div>
            <div className="summary-item total-line">
              <span>Amount Due:</span>
              <span>{planDetails.price}</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading Secure Checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}