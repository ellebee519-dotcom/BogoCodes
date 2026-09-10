'use client';

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage(): React.ReactElement {
  const [email, setEmail] = useState<string>('');
  const [status, setStatus] = useState<{ loading: boolean; success: boolean; error: string }>({
    loading: false,
    success: false,
    error: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to send reset email.');
      }

      setStatus({ loading: false, success: true, error: '' });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred.';
      setStatus({ loading: false, success: false, error: errorMessage });
    }
  };

  return (
    <div style={{ maxWidth: '420px', margin: '4rem auto', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
        Reset your password
      </h2>
      <p style={{ color: '#666', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
        Enter your email address and we'll send you a link to reset your password.
      </p>

      {status.success ? (
        <div style={{ padding: '1rem', backgroundColor: '#e6f4ea', color: '#137333', borderRadius: '6px' }}>
          Check your email! If an account exists for {email}, a password reset link has been sent.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {status.error && (
            <div style={{ padding: '0.75rem', backgroundColor: '#fce8e6', color: '#c5221f', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.9rem' }}>
              {status.error}
            </div>
          )}

          <div style={{ marginBottom: '1.25rem' }}>
            <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '1rem',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={status.loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#0066cc',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: status.loading ? 'not-allowed' : 'pointer',
              opacity: status.loading ? 0.7 : 1,
            }}
          >
            {status.loading ? 'Sending link...' : 'Send Reset Link'}
          </button>
        </form>
      )}

      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <Link href="/sign-in" style={{ color: '#0066cc', textDecoration: 'none', fontSize: '0.9rem' }}>
          &larr; Back to Sign In
        </Link>
      </div>
    </div>
  );
}