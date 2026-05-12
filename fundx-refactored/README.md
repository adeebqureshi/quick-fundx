# Quick Fundx Full-Stack Platform

Quick Fundx is now structured as a production-ready full-stack fundraising, lending, and investment platform. The existing React/Vite frontend is connected to a versioned Node.js API with PostgreSQL persistence through Prisma.

## Architecture

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Query, protected routing, and a reusable Fetch API client.
- **Backend:** Express.js, TypeScript, Prisma ORM, PostgreSQL, JWT auth, Zod validation, modular controllers/services/routes, centralized errors, rate limiting, Helmet, CORS, logging, and upload-ready static serving.
- **Data:** Relational Prisma schema for users, campaigns, donations/investments, comments, likes, bookmarks, notifications, reports, chat messages, admin actions, updates, withdrawals, analytics, activity logs, OTPs, password resets, sessions, reviews, team members, and support tickets.
- **DevOps:** Docker Compose for PostgreSQL, Redis placeholder, and API; environment examples for frontend and backend.

## Local Setup

```bash
cd fundx-refactored
cp .env.example .env
cp server/.env.example server/.env
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev:api
npm run dev
```

The frontend defaults to `http://localhost:4000/api/v1` via `VITE_API_URL`.

### Run the UI with the dependency-free mock API

If you want to run and review the app before installing the full PostgreSQL/Prisma/Express stack, start the built-in mock API in one terminal and Vite in another:

```bash
npm run dev:mock-api
npm run dev
```

The mock API implements the frontend-facing health, auth, campaign marketplace, and dashboard endpoints at `http://localhost:4000/api/v1`. You can sign in with `customer@quickfundx.test` / `password123` or `admin@quickfundx.test` / `password123`.

## API Overview

All API routes are versioned under `/api/v1`.

### Auth

- `POST /auth/register` — create account, hash password, issue access/refresh tokens.
- `POST /auth/login` — validate credentials and create a server-side session.
- `POST /auth/logout` — logout hook for token/session revocation workflows.
- `GET /auth/me` — authenticated user profile.
- `POST /auth/forgot-password` and `POST /auth/reset-password` — provider-ready password reset flow.
- `POST /auth/verify-otp` — OTP/email verification structure.

### Campaigns and Payments

- `GET /campaigns` — paginated, searchable, filterable campaign marketplace.
- `POST /campaigns` — authenticated campaign creation with approval workflow.
- `POST /campaigns/:id/donations` — creates a pending donation/investment and returns Stripe/Razorpay hand-off placeholders.

### Admin

- `GET /admin/stats` — platform statistics.
- `PATCH /admin/campaigns/:id/moderate` — approve, reject, pause, or publish campaigns.
- `PATCH /admin/users/:id/suspend` — suspend or reinstate users.

## Database Migration Guide

1. Update `server/prisma/schema.prisma`.
2. Run `npm run prisma:migrate` during development.
3. Run `npm run prisma:deploy` in production deployment jobs.
4. Run `npm run prisma:generate` after schema changes when needed.

## Docker

```bash
docker compose up --build
```

This starts PostgreSQL, Redis, and the API container. Run the Vite frontend locally or extend the Compose file with a static web container for production.

## Deployment Notes

- Set strong `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` values.
- Restrict `CORS_ORIGIN` to deployed frontend domains.
- Run migrations before starting API instances.
- Use managed PostgreSQL backups and enable TLS at the load balancer.
- Replace payment placeholders with real Stripe/Razorpay SDK calls and webhook signature verification.
- Store uploaded files in S3/GCS/Cloudinary in production rather than local disk.
