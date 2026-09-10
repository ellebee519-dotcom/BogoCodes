"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
          targetEmail: "contact@bogocodes.com"
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setStatus("Thank you! A confirmation email has been sent to your inbox. Our team will reach out within 24 hours.");
      } else {
        alert("Something went wrong. Please try again or contact support directly.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("A system network error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Move CSS to a string to avoid the TypeScript 'jsx' property error
  const globalStyles = `
    :root {
      --muted-green-border: #acc69b; 
      --light-green-shading: #f0f7f0; 
      --navy-text: #1d4370;
      --teal-aqua: #51a3a3;
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
    header { display: flex; justify-content: space-between; align-items: center; padding: 20px 0 30px 0; }
    .logo-main { height: 113px; width: auto; cursor: pointer; }
    .header-nav { display: flex; gap: 20px; }
    .nav-link { text-decoration: none; color: var(--navy-text); font-weight: 600; font-size: 1rem; }
    .nav-link:hover { text-decoration: underline; }
    .contact-card {
      background-color: var(--light-green-shading);
      width: 100%; max-width: 800px; margin: 0 auto; padding: 50px;
      border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);
      border: 2px solid var(--muted-green-border); box-sizing: border-box;
    }
    .header-container { display: flex; justify-content: center; margin-bottom: 30px; }
    h1 {
      color: var(--navy-text); text-transform: uppercase; letter-spacing: 2px;
      font-size: 1.6rem; font-weight: 800; margin: 0;
      border: 3px solid var(--teal-aqua); padding: 15px 40px;
      border-radius: 100px; display: inline-block; background-color: var(--white);
    }
    .subtitle { color: var(--navy-text); text-align: center; margin-bottom: 40px; font-weight: 600; }
    label { display: block; margin-bottom: 8px; color: var(--navy-text); font-weight: bold; font-size: 0.8rem; text-transform: uppercase; }
    input, textarea {
      width: 100%; padding: 14px; margin-bottom: 25px; border: 2px solid #ddd;
      border-radius: 10px; background-color: var(--white); font-size: 1rem; box-sizing: border-box;
    }
    input:disabled, textarea:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }
    .btn-send {
      background-color: var(--navy-text); color: white; border: none; padding: 20px;
      border-radius: 50px; font-weight: 700; cursor: pointer; width: 100%; font-size: 1.1rem;
      transition: opacity 0.2s;
    }
    .btn-send:hover { opacity: 0.9; }
    .btn-send:disabled { opacity: 0.5; cursor: not-allowed; }
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
        <nav className="header-nav">
          <Link href="/" className="nav-link">Home</Link>
        </nav>
      </header>

      <main className="contact-card">
        <div className="header-container">
          <h1>Contact Support</h1>
        </div>
         
        {submitted ? (
          <div className="success-banner">
            <span style={{fontSize: '2rem', display: 'block', marginBottom: '10px'}}>✉️</span>
            {status}
            <br/><br/>
            <Link href="/" style={{color: 'var(--navy-text)', textDecoration: 'underline'}}>Return Home</Link>
          </div>
        ) : (
          <>
            <p className="subtitle">How can we help you today?</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                disabled={loading} 
                required 
              />
               
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                disabled={loading} 
                required 
              />
               
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                rows={5} 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                disabled={loading} 
                required
              ></textarea>
               
              <button type="submit" className="btn-send" disabled={loading}>
                {loading ? "SENDING..." : "SEND MESSAGE"}
              </button>
            </form>
          </>
        )}
      </main>
    </div>
  );
}