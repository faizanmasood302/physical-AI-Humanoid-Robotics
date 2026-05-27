import React from 'react';
import { useAuth } from '@site/src/lib/AuthContext';
import Link from '@docusaurus/Link';

export default function AuthStatus() {
  const auth = useAuth();
  const user = auth?.user;
  const logout = auth?.logout;

  if (user) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
        <span style={{ fontSize: 14, color: 'var(--ifm-color-primary)' }}>
          {user.name || user.email}
        </span>
        <button
          onClick={logout}
          style={{
            background: 'none',
            border: '1px solid var(--ifm-color-primary)',
            borderRadius: 4,
            padding: '2px 8px',
            cursor: 'pointer',
            fontSize: 12,
            color: 'var(--ifm-color-primary)',
          }}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
      <Link
        to="/auth/login"
        style={{ fontSize: 14, padding: '4px 8px', textDecoration: 'none' }}
      >
        Login
      </Link>
      <Link
        to="/auth/signup"
        style={{
          background: 'var(--ifm-color-primary)',
          color: '#fff',
          borderRadius: 4,
          padding: '4px 10px',
          fontSize: 12,
          textDecoration: 'none',
        }}
      >
        Sign Up
      </Link>
    </div>
  );
}
