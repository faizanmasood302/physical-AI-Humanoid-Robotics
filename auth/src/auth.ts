import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { bearer } from 'better-auth/plugins/bearer';
import { db } from './db.js';

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg', schema: db._.fullSchema }),
  emailAndPassword: {
    enabled: true,
  },
  baseURL: `${process.env.BETTER_AUTH_URL || 'http://localhost:4000'}/api/auth`,
  trustedOrigins: (process.env.CORS_ORIGINS || 'http://localhost:3000').split(',').map(s => s.trim()),
  plugins: [bearer()],
});
