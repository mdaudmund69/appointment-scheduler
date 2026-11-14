# Appointment Scheduler

A Next.js and TypeScript appointment-scheduling prototype for barbers, with public booking pages, barber dashboards, administration screens, Supabase integration, and Stripe-related subscription/payment flows.

## Application areas

- Public booking and checkout routes under `app/book/`.
- Barber signup, login, services, opening hours, bookings, and subscription screens.
- Admin login, barber management, and analytics screens.
- Embeddable booking widget routes.
- API routes for bookings, payment status, reminders, and calendar synchronization.

These are source-code components, not a claim that every external integration has been verified in production.

## Stack

Next.js 15, React 19, TypeScript, Tailwind CSS, Radix UI, Supabase, and Stripe SDKs. The frontend was scaffolded with v0.

## Structure

| Directory | Purpose |
| --- | --- |
| `app/` | Pages, server actions, and API routes |
| `components/` | Shared UI |
| `lib/supabase/` | Browser and server database clients |
| `lib/hooks/` | Authentication hooks |
| `lib/email/` | Email templates and delivery scaffold |
| `scripts/` | Database schema and admin-role SQL |

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000. Connected features require your own development services and configuration.

The source reads `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and server-side `STRIPE_SECRET_KEY`. Some files use differently named Supabase variables: reconcile those names before expecting the application to work end to end. Keep server secrets out of browser-exposed variables and git.

Review the SQL in `scripts/` and apply it only to a suitable development Supabase project. Configure Stripe with test credentials while developing.

## Integration status and next steps

- Verify the database schema, row-level access policies, and server authorization for each workflow.
- Standardize Supabase environment-variable names across clients, middleware, and subscription code.
- The email delivery module contains provider-integration scaffolding; configure and test a real delivery implementation before promising reminders.
- Verify payment, calendar, and SMS integrations separately rather than assuming route existence proves delivery.
- Add documented end-to-end tests for booking creation, access control, and payment reconciliation.

This README was checked against repository structure and configuration references. No payment, email, SMS, or production-service requests were made during the documentation update, and the complete app has not been run for this review.
