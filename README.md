# JobHive — Modern Job Board Platform

A full-stack job board application built with Next.js 16, connecting job seekers with employers through an intuitive, role-based interface.

**Live Demo:** [https://jobhive-gamma.vercel.app](https://jobhive-gamma.vercel.app)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Architecture](#architecture)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [CI/CD Pipeline](#cicd-pipeline)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Project Structure](#project-structure)

---

## Overview

JobHive is a complete job board platform where:

- **Job Seekers** can browse jobs, search with filters, view job details, and submit applications
- **Employers** can post job listings, view applicants, and accept or reject applications

The platform features role-based access control, real-time form validation, responsive design, and a polished UI with loading skeletons throughout.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Frontend | React 19, Tailwind CSS 4, shadcn/ui |
| Database | PostgreSQL (Neon) |
| ORM | Prisma 7.8 |
| Authentication | NextAuth v4 (JWT + Credentials) |
| Forms | React Hook Form + Zod validation |
| Icons | Lucide React |
| Deployment | Vercel |
| CI/CD | GitHub Actions |

---

## Features

### Landing Page
- Hero section with search functionality
- Company logos marquee
- Job categories with icons
- Featured jobs grid (8 cards)
- Latest jobs list
- Call-to-action section
- Responsive footer

### Authentication & Authorization
- Email/password registration with role selection (Seeker or Employer)
- JWT-based session management
- Protected routes with role-based access control
- Auto-redirect for unauthenticated users

### Job Seeker Features
- **Browse Jobs** — search by keyword, location, category, and job type
- **Job Detail Page** — full description, requirements, company info, and one-click apply
- **Application Tracking** — dashboard showing all applications with status (Pending, Reviewed, Accepted, Rejected)
- **Stats Overview** — total applied, pending, accepted, and rejected counts

### Employer Features
- **Post a Job** — form with real-time salary validation, job type, category, description, and requirements
- **My Job Listings** — view all posted jobs with applicant counts
- **Manage Applicants** — expandable applicant panel with Accept/Reject buttons per application
- **Delete Jobs** — remove listings with confirmation dialog

### Browse Companies
- Dynamic company directory pulled from job data
- Company logos displayed alongside job count and location
- Search and filter companies

### UX & Design
- Fully responsive (mobile, tablet, desktop)
- Loading skeletons for all async data
- Consistent indigo/slate color palette
- Smooth hover transitions and micro-interactions
- Form validation with inline error messages
- Role-aware navigation and dashboard

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│                   Client (React 19)              │
│  ┌───────────┐  ┌──────────┐  ┌──────────────┐ │
│  │  Landing  │  │   Jobs   │  │  Dashboard   │ │
│  │   Page    │  │  Browse  │  │ (Role-based) │ │
│  └───────────┘  └──────────┘  └──────────────┘ │
└──────────────────────┬──────────────────────────┘
                       │ fetch / REST
┌──────────────────────▼──────────────────────────┐
│              API Routes (Next.js)                │
│  /api/auth  /api/jobs  /api/applications        │
│  /api/employer/jobs  /api/applications/[id]      │
└──────────────────────┬──────────────────────────┘
                       │ Prisma ORM
┌──────────────────────▼──────────────────────────┐
│            PostgreSQL (Neon Serverless)          │
│     Users  │  Jobs  │  Applications             │
└─────────────────────────────────────────────────┘
```

---

## Database Schema

```prisma
enum Role { SEEKER, EMPLOYER }
enum JobType { FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP, REMOTE }
enum JobStatus { OPEN, CLOSED }
enum ApplicationStatus { PENDING, REVIEWED, ACCEPTED, REJECTED }

model User {
  id, name, email, password, role, avatar
  postedJobs → Job[]
  applications → Application[]
}

model Job {
  id, title, company, logo, location, type, category,
  salary, description, requirements, status, featured
  employer → User
  applications → Application[]
}

model Application {
  id, coverLetter, resume, status, appliedAt
  job → Job
  seeker → User
  @@unique([jobId, seekerId])  // one application per user per job
}
```

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user with role | Public |
| GET/POST | `/api/auth/[...nextauth]` | NextAuth handler | Public |
| GET | `/api/jobs` | List jobs (with search, filters) | Public |
| POST | `/api/jobs` | Create a job | Employer |
| GET | `/api/jobs/[id]` | Get job detail | Public |
| DELETE | `/api/jobs/[id]` | Delete a job | Employer |
| GET | `/api/applications` | List applications (role-aware) | Authenticated |
| POST | `/api/applications` | Submit application | Seeker |
| PATCH | `/api/applications/[id]` | Update application status | Employer |
| GET | `/api/employer/jobs` | Employer's jobs with counts | Employer |

### Query Parameters for `GET /api/jobs`

| Param | Description |
|-------|-------------|
| `q` | Search by title, company, or description |
| `location` | Filter by location |
| `category` | Filter by category |
| `type` | Filter by job type (FULL_TIME, REMOTE, etc.) |
| `featured` | Filter featured jobs (`true`) |
| `limit` | Limit number of results |

---

## CI/CD Pipeline

The project uses **GitHub Actions** for continuous integration and deployment.

### Pipeline Stages

```yaml
# Trigger: push to main, pull requests to main

1. Build & Lint (ubuntu-latest)
   ├── Checkout code
   ├── Setup Node.js 20
   ├── Install dependencies (npm ci)
   ├── Generate Prisma Client
   ├── Run ESLint
   └── Build project (next build)

2. Deploy (runs only on push to main)
   ├── Checkout code
   ├── Install Vercel CLI
   └── Deploy to Vercel (production)
```

### Required Secrets

| Secret | Purpose |
|--------|---------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | JWT signing secret |
| `VERCEL_TOKEN` | Vercel deployment token |
| `VERCEL_ORG_ID` | Vercel organization ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |

---

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database (or [Neon](https://neon.tech) account)

### Installation

```bash
# Clone the repository
git clone https://github.com/shouqat/job-board.git
cd job-board

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed the database
npm run seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Employer | employer@jobhive.com | password123 |
| Seeker | seeker@jobhive.com | password123 |

---

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

---

## Deployment

The app is deployed to **Vercel** via GitHub Actions CI/CD pipeline:

1. Push code to `main` branch
2. GitHub Actions runs lint and build checks
3. On success, automatically deploys to Vercel production

Manual deployment:
```bash
npm install -g vercel
vercel deploy --prod
```

---

## Project Structure

```
job-board/
├── .github/workflows/
│   └── ci-cd.yml              # GitHub Actions pipeline
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed data (19 jobs, 2 demo users)
├── public/
│   └── logos/                  # Company SVG logos
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   │   ├── applications/  # Application CRUD + status update
│   │   │   ├── auth/          # Register + NextAuth
│   │   │   ├── employer/      # Employer-specific endpoints
│   │   │   └── jobs/          # Job CRUD with filters
│   │   ├── companies/         # Browse companies page
│   │   ├── dashboard/         # Protected dashboard pages
│   │   │   ├── applications/  # Seeker's application list
│   │   │   ├── my-jobs/       # Employer's job listings + applicants
│   │   │   ├── post-job/      # Job creation form
│   │   │   └── profile/       # User profile
│   │   ├── jobs/              # Job listing + detail pages
│   │   ├── login/             # Sign in page
│   │   ├── register/          # Sign up page
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── landing/           # Landing page sections
│   │   ├── layout/            # Navbar, Footer, Sidebar
│   │   ├── providers/         # Session provider
│   │   ├── skeletons/         # Loading skeleton components
│   │   └── ui/               # shadcn/ui primitives
│   ├── generated/prisma/      # Prisma generated client
│   └── lib/                   # Auth config, Prisma client
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## UX Design Decisions

### User Experience Philosophy

The platform is designed around **reducing friction** at every step — from browsing to applying to managing applicants.

### Key UX Choices

**Progressive Disclosure**
- Landing page surfaces featured and latest jobs without requiring sign-up
- Detailed filters are tucked into a sidebar, not overwhelming the initial view
- Employer applicant list is expandable inline — no page navigation needed to review candidates

**Role-Aware Interface**
- Dashboard, navigation, and stats adapt based on whether the user is a Seeker or Employer
- Seekers see application status tracking; Employers see job posting management
- Irrelevant actions are hidden, not disabled — keeping the interface clean

**Feedback & Loading States**
- Every async operation shows skeleton loaders (not spinners) to reduce perceived load time
- Form validation is real-time on blur + while typing (salary field) to catch errors early without interrupting the flow
- Application submission shows instant confirmation without page reload
- Accept/Reject buttons disable during API call with a spinner to prevent double-clicks

**Visual Hierarchy**
- Featured jobs use a prominent 4-column card grid with badges
- Status badges use semantic colors (yellow = pending, green = accepted, red = rejected)
- Company logos are uniformly sized in consistent containers across all pages
- Typography scales from headings to body text with clear hierarchy

**Accessibility & Responsiveness**
- Mobile-first responsive design with a slide-out navigation drawer on small screens
- Fixed sidebar on desktop for quick dashboard navigation
- Proper form labels, required indicators, and error messages
- Semantic HTML with appropriate ARIA attributes (sheet titles, button labels)

**Error Prevention**
- Duplicate application prevention (unique constraint + API check)
- Salary field accepts only valid currency formats with inline guidance
- Required fields validated both client-side and server-side
- Confirmation dialogs before destructive actions (delete job)

---

## License

This project is open source under the [MIT License](LICENSE).
