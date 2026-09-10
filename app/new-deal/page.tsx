"use client";

import React, { useState, useRef, ChangeEvent } from 'react';
import Link from 'next/link';
import { Turnstile } from '@marsidev/react-turnstile';

import { loadStripe } from '@stripe/stripe-js';
import { 
  Elements, 
  CardElement, 
  useStripe, 
  useElements 
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder");

function NewDealForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [businessName, setBusinessName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("Ozark");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [merchantTitle, setMerchantTitle] = useState(""); 
  const [category, setCategory] = useState("");
  const [freeItem, setFreeItem] = useState("Latte");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [verified, setVerified] = useState(false);
  
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmittedForReview, setIsSubmittedForReview] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const fullAddressPreview = [streetAddress, city, state, zipCode].filter(Boolean).join(', ');

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      setErrorMessage("Payment processor failed to initialize. Please refresh.");
      return;
    }
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setErrorMessage("Please complete the card details input matrix.");
        setIsSubmitting(false);
        return;
      }

      const { paymentMethod, error: stripeError } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: `${firstName} ${lastName}`.trim(),
          phone: phoneNumber,
        },
      });

      if (stripeError) {
        setErrorMessage(stripeError.message || "Card verification processing error.");
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('/api/deals/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: businessName || "Brew & Bean",
          phoneNumber,
          merchantAddress: fullAddressPreview,
          firstName,
          lastName,
          merchantTitle,
          category,
          freeItem,
          logoPreview: logoPreview || "DEFAULT_PLACEHOLDER", 
          paymentMethodId: paymentMethod.id, 
          token: turnstileToken,
          status: "pending_approval"
        })
      });

      if (response.ok) {
        setIsSubmittedForReview(true);
      } else {
        const data = await response.json();
        setErrorMessage(data.error || "Failed to submit deal.");
      }
    } catch (err) {
      setErrorMessage("A network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingLogo(true);
    setErrorMessage("");

    try {
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        body: file,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error(`Upload API error [${response.status}]:`, errorData);
        throw new Error(`Logo upload failed (${response.status}: ${errorData.error || response.statusText})`);
      }

      const blob = await response.json();
      setLogoPreview(blob.url);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to upload logo image. Please try again.");
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const isFormValid = verified && (businessName || "Brew & Bean") && phoneNumber && streetAddress && city && state && zipCode && firstName && lastName && category && !isUploadingLogo;

  return (
    <>
      <header>
        <Link href="/">
          <img src="/bogo-logo.png" alt="Logo" className="logo-main" />
        </Link>
        <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link href="/merchant-dashboard" style={{ color: 'var(--navy-text)', fontWeight: '600', textDecoration: 'none' }}>Dashboard</Link>
          <Link href="/terms" style={{ color: 'var(--navy-text)', fontWeight: '600', textDecoration: 'none' }}>Terms</Link>
          <Link href="/" style={{ color: 'var(--navy-text)', fontWeight: '600', textDecoration: 'none' }}>Logout</Link>
        </nav>
      </header>

      {isSubmittedForReview ? (
        <main className="success-card">
          <h1 style={{ color: 'var(--teal-codes)', margin: '0 0 10px 0' }}>DEAL SUBMITTED FOR REVIEW</h1>
          <p style={{ color: 'var(--navy-text)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 20px auto', lineHeight: '1.5' }}>
            Your offer is queued for security verification.
          </p>
          <div className="conf-box" style={{ background: '#fcf8e3', borderColor: '#fbeed5', padding: '25px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#c09853', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>
              Status: Pending Administrator Approval
            </span>
            <p style={{ margin: 0, color: '#555', fontSize: '0.9rem' }}>
              BogoCode administrators review submissions within 72 hours. Your $10 listing fee payment will remain on authorization hold until approved and live. Rejected listings are not charged.
            </p>
          </div>
          <Link href="/merchant-dashboard" className="btn-save" style={{ textDecoration: 'none', display: 'inline-block', width: 'auto', padding: '15px 40px', marginTop: '20px' }}>
            RETURN TO DASHBOARD
          </Link>
        </main>
      ) : (
        <div className="unified-form-wrapper">
          <section className="portal-header">
            <h2>List Merchant BOGO Deal</h2>
          </section>

          <main className="profile-layout">
            {/* Left Inputs Section */}
            <section className="profile-card-left">
              <label>Merchant Display Name</label>
              <input 
                className="input-field" 
                type="text" 
                placeholder="Brew & Bean" 
                value={businessName} 
                onChange={(e) => setBusinessName(e.target.value)} 
              />

              <label>Phone Number</label>
              <input 
                className="input-field" 
                type="tel" 
                placeholder="(555) 000-0000" 
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)} 
              />

              <label>Street Address</label>
              <input 
                className="input-field" 
                type="text" 
                placeholder="e.g. 123 Main St"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
              />

              <div className="address-row" style={{ display: 'flex', gap: '15px', width: '100%', marginBottom: '25px' }}>
                <div style={{ flex: 2 }}>
                  <label>City</label>
                  <input 
                    className="input-field" 
                    type="text" 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{ marginBottom: 0 }}
                  />
                </div>

                <div style={{ flex: '0 0 110px' }}>
                  <label>State</label>
                  <select 
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    style={{ 
                      width: '100%', height: '47px', padding: '0 10px', 
                      border: '2px solid #eee', borderRadius: '10px', 
                      fontFamily: 'inherit', fontSize: '0.9rem',
                      backgroundColor: '#fff', cursor: 'pointer',
                      lineHeight: '43px'
                    }}
                  >
                    <option value="" disabled>--</option>
                    <option value="AL">AL</option><option value="AK">AK</option><option value="AZ">AZ</option><option value="AR">AR</option><option value="CA">CA</option><option value="CO">CO</option><option value="CT">CT</option><option value="DE">DE</option><option value="FL">FL</option><option value="GA">GA</option><option value="HI">HI</option><option value="ID">ID</option><option value="IL">IL</option><option value="IN">IN</option><option value="IA">IA</option><option value="KS">KS</option><option value="KY">KY</option><option value="LA">LA</option><option value="ME">ME</option><option value="MD">MD</option><option value="MA">MA</option><option value="MI">MI</option><option value="MN">MN</option><option value="MS">MS</option><option value="MO">MO</option><option value="MT">MT</option><option value="NE">NE</option><option value="NV">NV</option><option value="NH">NH</option><option value="NJ">NJ</option><option value="NM">NM</option><option value="NY">NY</option><option value="NC">NC</option><option value="ND">ND</option><option value="OH">OH</option><option value="OK">OK</option><option value="OR">OR</option><option value="PA">PA</option><option value="RI">RI</option><option value="SC">SC</option><option value="SD">SD</option><option value="TN">TN</option><option value="TX">TX</option><option value="UT">UT</option><option value="VT">VT</option><option value="VA">VA</option><option value="WA">WA</option><option value="WV">WV</option><option value="WI">WI</option><option value="WY">WY</option>
                  </select>
                </div>

                <div style={{ flex: 1 }}>
                  <label>Zip Code</label>
                  <input 
                    className="input-field" 
                    type="text" 
                    placeholder="65721"
                    maxLength={5}
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ''))}
                    style={{ marginBottom: 0 }}
                  />
                </div>
              </div>

              <label>Merchant Representative Name</label>
              <div className="name-row">
                <input 
                  className="input-field" 
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input 
                  className="input-field" 
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <label>Professional Title</label>
              <input 
                className="input-field" 
                placeholder="e.g. General Manager / Owner"
                value={merchantTitle}
                onChange={(e) => setMerchantTitle(e.target.value)}
              />

              <label>Store Logo</label>
              <div className="upload-area" onClick={() => fileInputRef.current?.click()}>
                <span style={{ fontSize: '1.5rem', display: 'block' }}>🖼️</span>
                <span style={{ fontSize: '0.85rem', color: '#666' }}>
                  {isUploadingLogo ? 'Uploading Cloud Logo...' : logoPreview ? '✅ Custom Image Uploaded' : 'Using Default (Click to Upload Custom 1x1 Logo)'}
                </span>
                <input type="file" ref={fileInputRef} onChange={handleLogoUpload} accept="image/*" style={{ display: 'none' }} />
              </div>

              <label>Business Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ 
                  width: '100%', height: '47px', padding: '0 12px', 
                  border: '2px solid #eee', borderRadius: '10px', 
                  fontFamily: 'inherit', fontSize: '0.9rem',
                  backgroundColor: '#fff', cursor: 'pointer',
                  marginBottom: '20px', lineHeight: '43px'
                }}
              >
                <option value="" disabled>-- Select Category --</option>
                <option value="Food & Drink">Food & Drink</option>
                <option value="Retail & Shopping">Retail & Shopping</option>
                <option value="Beauty & Spa">Beauty & Spa</option>
                <option value="Health & Fitness">Health & Fitness</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Services">Services</option>
              </select>

              <label>Which item is FREE?</label>
              <input 
                className="input-field" 
                type="text" 
                value={freeItem} 
                onChange={(e) => setFreeItem(e.target.value)} 
              />
            </section>

            {/* Right Billing/Verification Section */}
            <section className="profile-card-right">
              <div style={{ 
                backgroundColor: "#fcf8e3", 
                color: "#c09853", 
                padding: "15px 20px", 
                borderRadius: "10px", 
                border: "1px solid #fbeed5",
                marginBottom: "25px",
                fontSize: "0.85rem",
                lineHeight: "1.4"
              }}>
                <strong style={{ color: "#a47e3c", textTransform: "uppercase", display: "block", marginBottom: "5px" }}>
                  ⚠️ Age & Safety Restrictions
                </strong>
                BogoCodes is a family-friendly platform. We do not host listings containing or relating to alcohol, cannabis/THC, commercial tobacco, vaping, firearms, weapons, or adult services. Submissions violating these parameters will be rejected during review. Rejected BOGO listings will not be processed and therefore not charged.
              </div>

              <div style={{ background: '#fcfcfc', border: '1px solid #acc69b', borderRadius: '10px', padding: '20px', marginBottom: '25px' }}>
                <label style={{ marginBottom: '6px' }}>Listing Fee Authorization ($10.00 USD)</label>
                <p style={{ margin: '0 0 14px 0', fontSize: '0.75rem', color: '#666', lineHeight: '1.4' }}>
                  💳 A <strong>$10.00 fee</strong> applies to each separate BOGO deal submitted to the BogoCodes Registry. Listings remain in a "hold" status for up to 72 hours until reviewed and live. Rejected listings will not be processed or charged. Merchants may list multiple deals, with each deal charged as an individual $10 listing.
                </p>
                <div style={{ background: '#fff', border: '2px solid #eee', padding: '14px', borderRadius: '8px' }}>
                  <CardElement options={{ style: { base: { fontSize: '16px', color: '#1d4370', '::placeholder': { color: '#aab7c4' } } } }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', alignItems: 'flex-start' }}>
                <input 
                  type="checkbox" 
                  id="verify" 
                  checked={verified} 
                  onChange={(e) => setVerified(e.target.checked)} 
                  style={{ width: '24px', height: '24px', flexShrink: 0 }}
                />
                <label htmlFor="verify" style={{ textTransform: 'none', fontWeight: '500', fontSize: '0.85rem', lineHeight: '1.4' }}>
                  I affirm that I am acting in my official capacity as Merchant Representative and 
                  I hereby verify my authority to bind to this promotional offer. 
                  By publishing, the Merchant agrees to the $10.00 listing fee per offer upon approval and to honor all deals displayed live on the BogoCodes Registry at the time of customer redemption. Listing payments remain on hold until live (up to 72 hours); rejected listings are not charged. Approved deals must be honored for 30 days, or may be cancelled early by the Merchant with no refund. Merchant understands that listings can take up to 72 hours to post or cancel and agrees to honor all listings while displayed live on the BogoCodes Registry. BogoCodes reserves the right to refuse service.  BogoCodes reserves the right to remove listings for good cause. If a listing is removed by BogoCodes for good cause, the Merchant will receive a refund, less a $5.00 processing fee for the removed listing. 
                </label>
              </div>

              {/* Subscriber Preview Box */}
              <div className="preview-container-box" style={{ margin: '0 auto 25px auto', width: '100%', maxWidth: '420px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                <p style={{ color: 'var(--navy-text)', fontWeight: 'bold', marginBottom: '15px', letterSpacing: '1px', fontSize: '0.75rem', textAlign: 'center', textTransform: 'uppercase' }}>
                  SUBSCRIBER PREVIEW
                </p>
                <div className="coupon-card">
                  {logoPreview ? (
                    <div className="coupon-logo" style={{ backgroundImage: `url(${logoPreview})` }}></div>
                  ) : (
                    <div 
                      className="coupon-logo default-logo-box"
                      style={{ 
                        backgroundColor: 'var(--teal-codes)', display: 'flex', 
                        alignItems: 'center', justifyContent: 'center',
                        padding: '8px', boxSizing: 'border-box', textAlign: 'center'
                      }}
                    >
                      <span style={{ color: 'white', fontWeight: '800', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: '1.2' }}>
                        BogoCodes<br/>Deal
                      </span>
                    </div>
                  )}
                  <div className="coupon-details">
                    <p className="bogo-badge">Buy One, Get One Free</p>
                    <h4 style={{ color: 'var(--navy-text)', fontSize: '1.1rem', margin: '2px 0' }}>
                      {businessName || "Brew & Bean"}
                    </h4>
                    <p style={{ color: '#888', fontSize: '0.75rem', margin: '0 0 6px 0' }}>
                      📍 {fullAddressPreview || "Address Area"}
                    </p>
                    <p style={{ color: '#555', margin: 0, fontSize: '0.85rem' }}>
                      Get a free <span style={{ color: 'var(--teal-codes)', fontWeight: 'bold' }}>{freeItem}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ margin: '0 auto 20px auto', display: 'flex', justifyContent: 'center' }}>
                <Turnstile 
                  siteKey="1x00000000000000000000AA"
                  onSuccess={(token) => setTurnstileToken(token)}
                  onExpire={() => setTurnstileToken(null)}
                  onError={() => setTurnstileToken(null)}
                />
              </div>

              {errorMessage && (
                <p style={{ color: 'red', fontSize: '0.9rem', marginBottom: '15px', fontWeight: 'bold' }}>{errorMessage}</p>
              )}

              <button 
                className="btn-save" 
                onClick={handlePublish} 
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? "AUTHORIZING PAYMENT..." : "AUTHORIZE $10.00 & SUBMIT DEAL"}
              </button>
            </section>
          </main>
        </div>
      )}
    </>
  );
}

export default function NewDealPage() {
  return (
    <div className="page-outer-container">
      <div className="page-container">
        {/* @ts-ignore */}
        <style jsx global>{`
          :root {
            --muted-green-border: #acc69b; 
            --light-green-btns: #88b06d;
            --navy-text: #1d4370;
            --teal-codes: #51a3a3;
            --white: #ffffff;
          }

          html, body {
            background-color: #b2cba2 !important;
            margin: 0; padding: 0;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            min-height: 100vh;
            box-sizing: border-box;
          }

          .page-outer-container {
            background-color: #b2cba2;
            min-height: 100vh;
            padding: 30px 15px;
            box-sizing: border-box;
          }

          .page-container {
            max-width: 1100px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          header, .unified-form-wrapper, .success-card {
            background-color: var(--white);
            box-shadow: 0 4px 12px rgba(0,0,0,0.06);
            border-radius: 8px;
          }

          header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 40px;
          }

          .logo-main { height: 113px; width: auto; }

          .unified-form-wrapper {
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }

          .portal-header {
            background-color: var(--teal-codes);
            color: var(--white);
            text-align: center;
            padding: 20px;
          }

          .portal-header h2 {
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-size: 1.4rem;
            font-weight: 800;
          }

          .profile-layout {
            display: grid;
            grid-template-columns: 1fr 1fr;
            background-color: var(--white);
          }

          .profile-card-left { 
            padding: 30px; 
            border-right: 1px solid #f0f0f0; 
          }

          .profile-card-right { 
            padding: 30px; 
          }
          
          label { 
            display: block; 
            margin-bottom: 6px; 
            color: var(--navy-text); 
            font-weight: bold;
            font-size: 0.78rem;
            text-transform: uppercase;
          }

          .input-field {
            width: 100%;
            padding: 12px;
            margin-bottom: 20px;
            border: 2px solid #eee;
            border-radius: 10px;
            font-size: 0.95rem;
            outline: none;
            box-sizing: border-box;
            font-family: inherit;
          }

          .name-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
          }

          .upload-area {
            border: 2px dashed var(--muted-green-border);
            padding: 18px;
            text-align: center;
            border-radius: 10px;
            margin-bottom: 20px;
            cursor: pointer;
            background: #fdfdfd;
          }

          .btn-save {
            background-color: var(--navy-text);
            color: white; border: none; padding: 16px;
            border-radius: 50px; font-weight: 700; cursor: pointer;
            width: 100%; font-size: 1rem;
            text-align: center;
            display: block;
          }

          .btn-save:disabled { opacity: 0.3; cursor: not-allowed; }

          .coupon-card {
            background: white; border-radius: 12px; display: flex; overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #eee; width: 100%; margin: 0 auto;
          }

          .coupon-logo { width: 100px; height: 100px; background-size: cover; background-position: center; flex-shrink: 0; }
          .coupon-details { padding: 12px; display: flex; flex-direction: column; justify-content: center; }
          .bogo-badge { color: var(--light-green-btns); font-weight: 800; font-size: 0.68rem; margin: 0; text-transform: uppercase; }

          .success-card {
            text-align: center;
            padding: 50px 20px;
          }

          .conf-box {
            border: 2px solid var(--muted-green-border);
            margin: 20px auto;
            display: inline-block;
            border-radius: 10px;
          }

          @media (max-width: 850px) { 
            .profile-layout { grid-template-columns: 1fr; }
            .profile-card-left { border-right: none; border-bottom: 1px solid #f0f0f0; }
            .address-row { flex-direction: column; gap: 20px !important; }
          }
        `}</style>
        <Elements stripe={stripePromise}>
          <NewDealForm />
        </Elements>
      </div>
    </div>
  );
}