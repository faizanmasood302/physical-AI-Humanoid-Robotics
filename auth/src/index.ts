import 'dotenv/config';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { auth } from './auth';

const app = new Hono();

const origins = (process.env.CORS_ORIGINS || 'http://localhost:3000').split(',').map(s => s.trim());

app.use('/api/auth/*', cors({
  origin: origins,
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.on(['POST', 'GET', 'OPTIONS'], '/api/auth/**', (c) => auth.handler(c.req.raw));

const port = parseInt(process.env.PORT || '4000', 10);
serve({ fetch: app.fetch, port });
console.log(`Auth server running on http://localhost:${port}`);
