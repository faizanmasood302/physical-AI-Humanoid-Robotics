import 'dotenv/config';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { auth } from './auth';

const app = new Hono();

app.use('/api/auth/*', cors({
  origin: ['http://localhost:3000'],
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.on(['POST', 'GET', 'OPTIONS'], '/api/auth/**', (c) => auth.handler(c.req.raw));

serve({ fetch: app.fetch, port: 4000 });
console.log('Auth server running on http://localhost:4000');
