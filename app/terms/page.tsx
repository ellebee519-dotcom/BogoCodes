"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function CombinedTermsPage() {
  const [view, setView] = useState<'subscriber' | 'merchant' | 'faq' | 'privacy'>('subscriber');

  return (
    <div className="page-wrapper">
      <style jsx global>{`
        :root {
          --muted-green-border: #acc69b; 
          --light-green-btns: #88b06d;
          --navy-text: #1d4370;
          --teal-codes: #51a3a3;
          --white: #ffffff;
          --soft-teal: #7fb5b5;
        }

        body {
          margin: 0; padding: 0;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background-color: var(--white);
          border: 15px solid var(--muted-green-border);
          min-height: 100vh;
          box-sizing: border-box;
        }
      `}</style>

      <style jsx>{`
        .page-wrapper { max-width: 1100px; margin: 0 auto; padding: 15px; display: flex; flex-direction: column; gap: 15px; }
        
        header { 
          display: flex; justify-content: space-between; align-items: center; 
          padding: 30px 40px; background: white; border-radius: 8px; 
          box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #eee; 
        }

        /* Updated dimensions for logo.png */
        .logo { 
          width: 150px; 
          height: 103px; 
          object-fit: contain;
          cursor: pointer; 
        }

        /* Updated to sit flat on the page as non-interactive text */
        .header-title-container { 
          color: var(--navy-text); 
          font-weight: bold; 
          font-size: 2.2rem; 
          text-align: center; 
          cursor: default;
          user-select: none;
        }
        
        .toggle-section { 
          padding: 20px; display: flex; justify-content: center; 
          background: white; border-radius: 8px; border: 1px solid #eee; 
        }

        .toggle-container { 
          background: #f0f0f0; padding: 5px; border-radius: 50px; 
          display: flex; gap: 5px; flex-wrap: wrap; justify-content: center;
        }
        
        .toggle-btn { 
          padding: 10px 25px; border-radius: 50px; border: none; 
          cursor: pointer; font-weight: bold; transition: 0.3s; 
          background: transparent; color: var(--navy-text); font-size: 0.9rem; 
        }

        .toggle-btn.active { background: var(--navy-text); color: white; }

        .terms-container { 
          padding: 60px; line-height: 1.7; color: #444; position: relative; 
          background: white; border-radius: 8px; border: 1px solid #eee; min-height: 500px;
          margin-bottom: 20px;
        }

        .terms-container::before { 
          content: ""; position: absolute; top: 0; left: 0; right: 0; 
          height: 8px; background: var(--soft-teal); 
        }
        
        .effective-date { display: block; text-align: center; font-style: italic; color: #777; margin-bottom: 30px; }
        h1 { font-size: 2rem; text-align: center; color: var(--navy-text); margin-bottom: 10px; }
        h2 { 
          font-size: 1.2rem; color: var(--navy-text); margin-top: 35px; 
          border-bottom: 2px solid var(--teal-codes); padding-bottom: 5px; 
          text-transform: uppercase; letter-spacing: 1px; 
        }

        .clause { margin-bottom: 20px; font-size: 0.95rem; white-space: pre-line; }
        
        .contact-info { margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; font-style: normal; line-height: 1.5; }

        @media (max-width: 900px) {
          header { flex-direction: column; gap: 20px; text-align: center; justify-content: center; }
          .header-title-container { font-size: 1.8rem; width: 100%; box-sizing: border-box; }
        }

        @media (max-width: 768px) {
          .toggle-container { border-radius: 20px; }
          .terms-container { padding: 30px; }
        }
      `}</style>

      <header>
        <Link href="/"><img src="/bogo-logo.png" alt="BogoCodes" className="logo" /></Link>
        <div className="header-title-container">Legal Framework</div>
      </header>

      <section className="toggle-section">
        <div className="toggle-container">
          <button className={`toggle-btn ${view === 'subscriber' ? 'active' : ''}`} onClick={() => setView('subscriber')}>Subscriber Terms</button>
          <button className={`toggle-btn ${view === 'merchant' ? 'active' : ''}`} onClick={() => setView('merchant')}>Merchant Terms</button>
          <button className={`toggle-btn ${view === 'faq' ? 'active' : ''}`} onClick={() => setView('faq')}>FAQ</button>
          <button className={`toggle-btn ${view === 'privacy' ? 'active' : ''}`} onClick={() => setView('privacy')}>Privacy Policy</button>
        </div>
      </section>

      <main className="terms-container">
        <span className="effective-date">Last Updated: July 4, 2026</span>

        {view === 'subscriber' && (
          <>
            <h1>Subscriber Terms of Service</h1>
            <h2>1. The Service & Safe Harbor</h2>
            <div className="clause">
              BogoCodes provides a digital directory of coupons and promotional offers uploaded directly by independent third-party Merchants.
              {"\n"}• Directory Venue Only: BogoCodes acts purely as a passive conduit and interactive computer service provider. We do not author, issue, or validate the coupons ourselves.
              {"\n"}• No Host Liability: In accordance with online publisher protections, BogoCodes is not responsible or legally liable for the accuracy, quality, safety, legality, or fulfillment of any merchant-generated listings or promotions.
              {"\n"}• No Guarantee: While we require Merchants to provide accurate information, BogoCodes does not guarantee that a Merchant will honor a coupon or that the Merchant's business is currently open or in operation.
            </div>
            <h2>2. Subscription & Billing</h2>
            <div className="clause">
              • Fees: Access to the coupon directory requires an active, paid subscription. All fees are disclosed at the time of purchase.
              {"\n"}• Automatic Renewal: For your convenience, subscriptions renew automatically at the end of each billing cycle (monthly/quarterly/annually) unless canceled.
              {"\n"}• Easy Cancellation: You may cancel your subscription at any time. To avoid the next charge, you must cancel at least 72 hours before your renewal date.
            </div>
            <h2>3. Refunds</h2>
            <div className="clause">
              • Digital Access Policy: Because the service provides immediate access to digital content (the coupon directory), we generally do not offer pro-rated refunds for partial months.
              {"\n"}• Termination of Access: Upon cancellation, you will continue to have access to the directory until the end of your current paid billing period.
            </div>
            <h2>4. User Conduct & Account Security</h2>
            <div className="clause">
              • One User per Account: Your subscription is for your personal use only. Sharing login credentials with others is prohibited.
              {"\n"}• Security: You are responsible for maintaining the confidentiality of your email and password. BogoCodes is not liable for unauthorized access to your account.
            </div>
            <h2>5. Disclaimer of Warranties & Limitation of Liability</h2>
            <div className="clause">
              • Merchant Disputes: Any dispute regarding the quality of goods, services, or the redemption of a coupon is strictly between you and the Merchant. BogoCodes is not a party to any transaction between you and a Merchant.
              {"\n"}• "As-Is" Basis: The site is provided "as is" and "as available." We do not warrant that the site will be error-free or that access will be uninterrupted.
              {"\n"}• Liability Limitation: To the maximum extent permitted by law, BogoCodes and its operators shall not be liable for any direct, indirect, incidental, or consequential damages arising out of your use of the directory. In all events, our total cumulative liability is strictly capped at the total amount paid by you to BogoCodes during the past 12 months.
              {"\n"}• Class Action Waiver: You agree that any legal claim or dispute against BogoCodes must be resolved on an individual basis, and you explicitly waive the right to participate as a plaintiff or class member in any class, collective, or representative legal action.
            </div>
            <h2>6. Data & Privacy</h2>
            <div className="clause">
              Your use of the site is also governed by our Privacy Policy, which outlines our commitment to minimal data collection (Email and Password only).
            </div>
          </>
        )}

        {view === 'merchant' && (
          <>
            <h1>Merchant Terms of Service</h1>
            <h2>1. Merchant Responsibility & Accuracy</h2>
            <div className="clause">
              By uploading a coupon or business profile, you (the "Merchant") represent and warrant that the offer is accurate, truthful, and active.
              {"\n"}• You are solely responsible for the description, address accuracy, expiration date, and any constraints associated with the coupon.
              {"\n"}• You agree to honor the coupon for any Subscriber who presents it during the valid period.
              {"\n"}• Venue Disclaimer: BogoCodes provides the digital space only. We do not verify, endorse, or guarantee the validity of any merchant offer.
            </div>
            <h2>2. Compliance with Local & State Laws</h2>
            <div className="clause">
              You agree that your coupons comply with all applicable laws in the state(s) where you operate, including but not limited to:
              {"\n"}• Liquor Laws: (e.g., Many states prohibit "Free Drink" coupons).
              {"\n"}• Health/Medical Regulations: (e.g., HIPAA or state-specific wellness discount rules).
              {"\n"}• Tax Laws: You are responsible for calculating and collecting any applicable sales tax on the discounted transaction.
            </div>
            <h2>3. Restricted Content & Immediate Removal Rights</h2>
            <div className="clause">
              BogoCodes maintains a family-friendly platform to serve local communities. Merchants are strictly prohibited from submitting content or promotions relating to:
              {"\n"}• Alcohol, cannabis/THC, commercial tobacco, vaping, firearms, ammunition, weapons, adult entertainment, or illegal goods/services.
              {"\n"}• Any content that is defamatory, obscene, or infringes on third-party intellectual property or trademarks.
              {"\n"}• <strong>Immediate Removal Enforcement:</strong> In the rare event a listing is published that violates these restrictions, or goes against platform safety standards, BogoCodes reserves the right, in its sole discretion, to <strong>immediately remove the listing or deactivate the account upon discovery without prior notice</strong>.
              {"\n"}• Platform Immunity: Merchants acknowledge and agree that BogoCodes is immune from litigation, damages, or claims arising from the removal or suppression of content deemed unsafe or non-compliant under these standards.
            </div>
            <h2>4. Zero-Endorsement & Indemnification</h2>
            <div className="clause">
              • No Agency: There is no partnership, joint venture, or employment relationship between the Merchant and BogoCodes.
              {"\n"}• Indemnification: You agree to defend, indemnify, and hold completely harmless BogoCodes, its subsidiaries, and its owners from and against any and all claims, legal actions, damages, obligations, or attorney fees arising from a dispute between you and a Subscriber, or any third-party claims relating to the promotions you publish on the platform.
            </div>
            <h2>5. Automated Management & Account Standing</h2>
            <div className="clause">
              • Self-Service: While BogoCodes performs standard backend security reviews, you are responsible for keeping your profile updated, including editing, and deleting old promotions.
              {"\n"}• Account Termination: We reserve the right to permanently remove any coupon or terminate any Merchant account that receives repeated user complaints, fails to honor posted coupons, or violates these terms, without a refund of any validation or service fees.
            </div>
            <h2>6. Intellectual Property</h2>
            <div className="clause">
              By uploading a logo or business images, you grant BogoCodes a non-exclusive, worldwide, royalty-free license to display that content to Subscribers for the purpose of promoting your coupon.
            </div>
          </>
        )}

        {view === 'faq' && (
          <>
            <h1>Frequently Asked Questions</h1>
            <h2>1. How do I use a coupon?</h2>
            <div className="clause">
              Simply log in to your account, find the coupon you want to use, and present the digital coupon on your mobile device to the merchant at the time of purchase. Some merchants may require you to show the coupon before the transaction begins, so it’s always best to mention it upfront!
            </div>
            <h2>2. What if a merchant refuses to honor a coupon?</h2>
            <div className="clause">
              Since merchants upload their own offers, they are legally responsible for honoring them under our terms. If a business refuses a valid, non-expired coupon, please use the "Report This Coupon" link found on the offer page. While we cannot force a merchant to provide a discount, we investigate all reports and will remove merchants who fail to uphold their posted offers to keep the directory reliable for everyone.
            </div>
            <h2>3. How do I cancel my subscription?</h2>
            <div className="clause">
              We make it easy! You don't need to email or call anyone.
              {"\n"}• Log in to your account.
              {"\n"}• Click "Cancel Subscription."
              {"\n"}Your access will remain active until the end of your current paid period, and you will not be charged again.
            </div>
            <h2>4. Can I share my account with friends or family?</h2>
            <div className="clause">
              To keep our subscription costs low for everyone, accounts are limited to one user. If our system detects simultaneous logins from multiple locations, or suspicious activity, the account may be automatically flagged or paused for security purposes. We encourage friends to sign up for their own accounts to support the local businesses providing these deals.
            </div>
            <h2>5. Content Filtering & Marketplace Oversight</h2>
            <div className="clause">
              Because our listings are compiled via merchant self-service inputs, what protections exist against harmful posts? 
              {"\n"}BogoCodes exercises strict oversight policies. We completely bar adult items, firearms, tobacco, vaping, cannabis, and alcohol promotions. Any unauthorized listing that bypasses standard checks will be instantly purged from our infrastructure upon discovery or user notification. BogoCodes assumes no liability for volatile third-party text inputs before their discovery and removal.
            </div>
          </>
        )}

        {view === 'privacy' && (
          <>
            <h1>PRIVACY POLICY</h1>
            <h2>1. Information We Collect</h2>
            <div className="clause">
              We believe in your privacy. Our platform is designed to function with the absolute minimum amount of data possible:
              {"\n"}• Account Information: To use the service, we collect only an email address and a password.
              {"\n"}• Merchant Data: Merchants must provide a physical address for each coupon location to ensure users can find the offer.
              {"\n"}• Payment Data: Subscription payments are handled by Stripe/PayPal. We do not store your credit card or billing details on our servers.
            </div>
            <h2>2. How We Use Your Information</h2>
            <div className="clause">
              We use your email address solely to:
              {"\n"}• Manage your login and subscription status.
              {"\n"}• Send you requested information or account-related alerts.
              {"\n"}• We do not sell, rent, or share your email address with third parties for their marketing purposes.
            </div>
            <h2>3. Data Retention</h2>
            <div className="clause">
              We do not keep your personal information longer than necessary.
              {"\n"}• Subscribers: If you cancel your subscription, your account and email are purged from our active database once the billing cycle ends.
              {"\n"}• Merchants: Data is kept only as long as your coupons are active on the site.
            </div>
            <h2>4. Your Rights</h2>
            <div className="clause">
              Regardless of where you live, you have the right to:
              {"\n"}• Access: Log in at any time to see the data we have (your email).
              {"\n"}• Deletion: You may delete your account at any time via your dashboard.
              {"\n"}• Opt-Out: Every automated email includes an "Unsubscribe" link.
            </div>
            <h2>5. Subscription & Cancellation</h2>
            <div className="clause">
              In compliance with FTC guidelines, you may cancel your subscription at any time through your Account Settings. Your access will remain active until the end of the current paid period, at which point no further charges will occur.
            </div>
            <h2>6. Contact Us</h2>
            <div className="clause">
              If you have questions about this policy, please use our contact form or email us at:

              info@bogocodes.com
            </div>
          </>
        )}
      </main>
    </div>
  );
}