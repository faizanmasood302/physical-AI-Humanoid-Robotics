import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAuth } from '@site/src/lib/AuthContext';

export default function SignupPage() {
  const { signup } = useAuth();
  const {siteConfig} = useDocusaurusContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(email, password, name || undefined);
      window.location.href = siteConfig.baseUrl || '/';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout title="Sign Up" description="Create an account">
      <div style={{ maxWidth: 400, margin: '60px auto', padding: '0 20px' }}>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label>Name (optional)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: 8, marginTop: 4 }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: 8, marginTop: 4 }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              style={{ width: '100%', padding: 8, marginTop: 4 }}
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ padding: '8px 24px', cursor: 'pointer' }}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        <p style={{ marginTop: 16 }}>
          Already have an account? <Link to="/auth/login">Login</Link>
        </p>
      </div>
    </Layout>
  );
}
