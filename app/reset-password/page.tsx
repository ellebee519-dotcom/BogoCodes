'use client';

import React, { useState, FormEvent, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function ResetPasswordForm(): React.ReactElement {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [status, setStatus] = useState<{ loading: boolean; success: boolean; error: string }>({
    loading: false,
    success: false,
    error: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    if (password !== confirmPassword) {
      setStatus({ loading: false, success: false, error: 'Passwords do not match.' });
      return;
    }

    if (password.length < 8) {
      setStatus({ loading: false, success: false, error: 'Password must be at least 8 characters long.' });
      return;
    }

    try {
      // Step 3: API call to update password in database
      const res = await fetch('/api/auth/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, email, newPassword: password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to reset password.');
      }

      setStatus({ loading: false, success: true, error: '' });

      // Automatically redirect to sign in after 3 seconds
      setTimeout(() => {
        router.push('/signin');
      }, 3000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred.';
      setStatus({ loading: false, success: false, error: errorMessage });
    }
  };

  if (!token || !email) {
    return (
      <div style={{ padding: '1rem', backgroundColor: '#fce8e6', color: '#c5221f', borderRadius: '6px' }}>
        Invalid password reset link. Please request a new one.
      </div>
    );
  }

  return (
    <div>
      {status.success ? (
        <div style={{ padding: '1rem', backgroundColor: '#e6f4ea', color: '#137333', borderRadius: '6px' }}>
          Password successfully updated! Redirecting to sign in...
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {status.error && (
            <div style={{ padding: '0.75rem', backgroundColor: '#fce8e6', color: '#c5221f', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.9rem' }}>
              {status.error}
            </div>
          )}

          <div style={{ marginBottom: '1.25rem' }}>
            <label htmlFor="password" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              New Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
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

          <div style={{ marginBottom: '1.25rem' }}>
            <label htmlFor="confirmPassword" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
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
            {status.loading ? 'Updating Password...' : 'Reset Password'}
          </button>
        </form>
      )}
    </div>
  );
}

export default function ResetPasswordPage(): React.ReactElement {
  return (
    <div style={{ maxWidth: '420px', margin: '4rem auto', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
        Set new password
      </h2>
      <p style={{ color: '#666', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
        Please enter your new password below.
      </p>

      <Suspense fallback={<div>Loading form...</div>}>
        <ResetPasswordForm />
      </Suspense>

      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <Link href="/signin" style={{ color: '#0066cc', textDecoration: 'none', fontSize: '0.9rem' }}>
          &larr; Back to Sign In
        </Link>
      </div>
    </div>
  );
}