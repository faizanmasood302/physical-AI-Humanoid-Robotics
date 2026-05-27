---
id: 5
title: Fix Vercel SSG build localStorage crash
stage: green
date: 2026-05-27
surface: agent
model: deepseek-v4-flash-free
feature: 2-docusaurus-textbook
branch: 2-docusaurus-textbook
user: DELL
command: what did we do so far?
labels: [ssg, build, localStorage, docusaurus, vercel]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - website/src/lib/AuthContext.tsx
tests:
 - npm run build (success)
---

## Prompt

What did we do so far?

## Response snapshot

Provided a comprehensive summary of all work done (auth service, backend, ingestion, chat history, navbar auth, etc.), then diagnosed and fixed the Vercel SSG build crash: `localStorage is not defined` in `AuthProvider` caused by `useState(() => localStorage.getItem('auth_token'))` running during Node.js SSG. Fixed by importing `ExecutionEnvironment` from `@docusaurus/ExecutionEnvironment` and guarding the initializer.

## Outcome

- ✅ Impact: Vercel build succeeds — all 26+ pages compile without `localStorage is not defined` error.
- 🧪 Tests: `npm run build` passes (Client + Server: Compiled successfully, static files generated in "build").
- 📁 Files: `website/src/lib/AuthContext.tsx` — import `ExecutionEnvironment`; wrap `useState` initializer in `ExecutionEnvironment.canUseDOM ? localStorage.getItem(...) : null`.
- 🔁 Next prompts: Deploy to Vercel, verify live site.
- 🧠 Reflection: Any module-level or `useState` initializer accessing browser-only APIs (`localStorage`, `window`, `document`) will crash Docusaurus SSG. Always guard with `ExecutionEnvironment.canUseDOM` or defer to `useEffect`. The `@docusaurus/ExecutionEnvironment` utility is the idiomatic solution for this class of problem.

## Evaluation notes (flywheel)

- Failure modes observed: ReferenceError: localStorage is not defined during SSG build; affected all 26+ routes.
- Graders run and results (PASS/FAIL): `npm run build` — PASS.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
