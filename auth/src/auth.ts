import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { bearer } from 'better-auth/plugins/bearer';
import { db } from './db';

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg', schema: db._.fullSchema }),
  emailAndPassword: {
    enabled: true,
  },
  baseURL: `${process.env.BETTER_AUTH_URL || 'http://localhost:4000'}/api/auth`,
  trustedOrigins: ['http://localhost:3000'],
  plugins: [bearer()],
});
