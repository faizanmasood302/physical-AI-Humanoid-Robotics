const AUTH_URL = 'http://localhost:4000';

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

export async function signup(email: string, password: string, name?: string): Promise<{ user: AuthUser; token: string }> {
  const res = await fetch(`${AUTH_URL}/api/auth/sign-up/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Signup failed');
  }
  return res.json();
}

export async function login(email: string, password: string): Promise<{ user: AuthUser; token: string }> {
  const res = await fetch(`${AUTH_URL}/api/auth/sign-in/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Login failed');
  }
  return res.json();
}

export async function logout(token: string): Promise<void> {
  await fetch(`${AUTH_URL}/api/auth/sign-out`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getSession(token: string): Promise<AuthUser | null> {
  try {
    const res = await fetch(`${AUTH_URL}/api/auth/get-session`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.user ?? data;
  } catch {
    return null;
  }
}
