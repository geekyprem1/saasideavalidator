# SaaSRadar AI - AI SaaS Opportunity Intelligence Platform

SaaSRadar AI is a premium, validation-first platform helping founders answer the ultimate question: **"Should I build this SaaS idea and why?"** Instead of just showing raw customer search listings, it synthesizes customer complaints from Reddit and Play Store reviews, calculates viability ratings, outlines build blueprints, and generates copy-pasteable prompts to feed directly into Claude Code.

---

## 🚀 Key Features

1. **Founder Verdict (Hero Section)**: Each validation report begins with a clear trinary recommendation (**YES / NO / MAYBE**) supported by 3 rationale bullets, validation paths, risks, and timelines.
2. **Moat Architecture (Opportunity Database)**: Every search registers insights into a category-linked moat directory. Future searches in matching spaces query historical trends to map overlapping pattern recognition.
3. **Source Evidence Layer**: High-confidence quotes, source domains (Reddit / Play Store), date stamps, and verified URLs are attached to every single pain point, competitor weakness, and market gap.
4. **Claude Code Prompt Generator**: Produces a comprehensive markdown blueprint designed for Claude Code to generate the recommended application scaffolding instantly.
5. **Vercel/Linear Aesthetics**: Clean dark design utilizing glassmorphism, responsive SVG charts, and interactive tab-segment controls.

---

## 🛠 Tech Stack

- **Frontend & Routing**: Next.js 16.2 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Lucide Icons, Glassmorphic UI utilities
- **Database (Optional/Supported)**: Supabase PostgreSQL (Auth & Schema)
- **AI Credentials (Optional/Supported)**: DeepSeek V3 (insight parsing) & Gemini 2.5 Flash (verdicts & prompt compilations)
- **Fallback Engine**: Local context-aware heuristic analyzer (fully functional offline/without API keys)

---

## 📂 Project Structure

```
/
├── supabase/
│   └── migrations/
│       ├── 20260615000000_initial_schema.sql  # Database schema (decoupled from pgvector)
│       └── 20260615000001_seed_data.sql      # Rich default datasets (Calorie Counter, Habit Tracker)
├── src/
│   ├── app/
│   │   ├── actions/
│   │   │   └── research.ts                   # Next.js Server Actions (runs validation pipelines)
│   │   ├── dashboard/
│   │   │   ├── history/                      # Search run log index page
│   │   │   ├── reports/
│   │   │   │   ├── [id]/                     # Detailed Executive Opportunity Report
│   │   │   │   └── page.tsx                  # Generated blueprints list page
│   │   │   ├── search/                       # Interactive SaaS validation page with loader states
│   │   │   ├── layout.tsx                    # Shared dashboard layout wrapper
│   │   │   └── page.tsx                      # Overview stats panel & inline SVG charts
│   │   ├── login/                            # Glassmorphic Login with sandbox demo login
│   │   ├── globals.css                       # Global Tailwind v4 configuration
│   │   ├── layout.tsx                        # Global document layout wrapper
│   │   └── page.tsx                          # Marketing landing index page
│   ├── components/
│   │   ├── ui/
│   │   │   └── glass-card.tsx                # Reusable glassmorphic cards
│   │   └── sidebar.tsx                       # Collapsible navigation side panel
│   ├── lib/
│   │   ├── db.ts                             # Unified DB wrapper (Supabase / Local Memory database)
│   │   ├── supabase.ts                       # Supabase client instantiation
│   │   └── types.ts                          # TypeScript schema interfaces
│   └── services/
│       ├── adapters.ts                       # Scraper adapters (Reddit, Google Play Store)
│       ├── ai.ts                             # DeepSeek & Gemini APIs + Heuristic Mock generator
│       └── pipeline.ts                       # Research Pipeline orchestrator
├── .env.example                              # Env configurations blueprint
└── tsconfig.json                             # TypeScript setup compiler configuration
```

---

## ⚙️ Environment Setup & Running

### 1. Configure Credentials (Optional)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
*If keys are omitted, the application runs in a fully functional **Sandbox Demo Mode** utilizing rich local mock datasets for any entered query.*

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to access the platform.

---

## 🗄 Database Setup (Supabase)
To host the database on Supabase:
1. Create a new Supabase Project.
2. Go to **SQL Editor** -> Create a New Query.
3. Paste the contents of `supabase/migrations/20260615000000_initial_schema.sql` and click **Run**.
4. Paste the contents of `supabase/migrations/20260615000001_seed_data.sql` and click **Run** to load seed data.
5. In your project settings, copy your API URL and Service/Anon keys into your `.env.local` file.
