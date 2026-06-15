-- SaaSRadar AI Database Initial Schema
-- Decoupled from pgvector for easy MVP startup; fully upgradeable.

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table (Mirroring Supabase auth.users or standalone setup)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for searching users by email quickly
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- 2. Searches Table (Captures primary validation query metadata)
CREATE TABLE IF NOT EXISTS searches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    keyword TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'collecting', 'analyzing', 'completed', 'failed'
    opportunity_score INTEGER DEFAULT 0,
    confidence_score INTEGER DEFAULT 0,
    revenue_potential TEXT DEFAULT 'N/A',
    market_demand TEXT DEFAULT 'N/A',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for user searches lookup
CREATE INDEX IF NOT EXISTS idx_searches_user_id ON searches(user_id);
CREATE INDEX IF NOT EXISTS idx_searches_keyword ON searches(keyword);

-- 3. Research Sources (The raw customer logs fetched by adapters)
CREATE TABLE IF NOT EXISTS research_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    search_id UUID REFERENCES searches(id) ON DELETE CASCADE,
    source TEXT NOT NULL, -- 'reddit', 'play_store'
    title TEXT,
    content TEXT NOT NULL,
    author TEXT,
    url TEXT,
    likes INTEGER DEFAULT 0,
    date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_research_sources_search_id ON research_sources(search_id);

-- 4. Pain Points (Synthesized user frustrations with supporting evidence)
CREATE TABLE IF NOT EXISTS pain_points (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    search_id UUID REFERENCES searches(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    mentions INTEGER DEFAULT 1,
    severity TEXT NOT NULL, -- 'low', 'medium', 'high'
    example_quotes JSONB NOT NULL, -- Array of { quote: string, source: string, url: string, confidence: number }
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pain_points_search_id ON pain_points(search_id);

-- 5. Competitors (Identified market players and customer-observed weaknesses)
CREATE TABLE IF NOT EXISTS competitors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    search_id UUID REFERENCES searches(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    mentions INTEGER DEFAULT 1,
    strengths TEXT[] DEFAULT '{}',
    weaknesses JSONB NOT NULL, -- Array of { weakness: string, quote: string, source: string, url: string }
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_competitors_search_id ON competitors(search_id);

-- 6. Opportunities (Actionable SaaS specifications)
CREATE TABLE IF NOT EXISTS opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    search_id UUID REFERENCES searches(id) ON DELETE CASCADE,
    recommended_saas TEXT NOT NULL,
    problem_solved TEXT NOT NULL,
    target_audience TEXT NOT NULL,
    core_features TEXT[] DEFAULT '{}',
    features_to_ignore TEXT[] DEFAULT '{}',
    tech_stack TEXT[] DEFAULT '{}',
    expected_build_time TEXT NOT NULL,
    pricing_recommendation TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_opportunities_search_id ON opportunities(search_id);

-- 7. Reports (Central analysis document, founder verdict, Claude code bootstrap instructions)
CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    search_id UUID REFERENCES searches(id) ON DELETE CASCADE,
    founder_verdict JSONB NOT NULL, -- { recommendation: 'YES'|'NO'|'MAYBE', why: string[], biggest_risk: string, validation_path: string, mvp_timeline: string, revenue_timeline: string }
    claude_prompt TEXT NOT NULL,
    market_overview TEXT NOT NULL,
    market_gaps JSONB NOT NULL, -- Array of { gap_name: string, description: string, demand_level: string, evidence: { quote: string, source: string, url: string } }
    buyer_intent_signals JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of { signal: string, quote: string, source: string, url: string, strength: 'low'|'medium'|'high' }
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reports_search_id ON reports(search_id);

-- 8. Search History (User-linked history logging)
CREATE TABLE IF NOT EXISTS search_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    search_id UUID REFERENCES searches(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_search_history_user_id ON search_history(user_id);

-- 9. Global Opportunity Moat (Index for overlapping category pattern recognition)
CREATE TABLE IF NOT EXISTS global_opportunity_moat (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL, -- 'productivity', 'health', 'finance', 'social', etc.
    insight_type TEXT NOT NULL, -- 'pain_point', 'market_gap', 'buyer_intent'
    keyword TEXT NOT NULL,
    content TEXT NOT NULL,
    evidence_quote TEXT NOT NULL,
    evidence_source TEXT NOT NULL,
    evidence_url TEXT,
    mentions INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_global_moat_category ON global_opportunity_moat(category);
CREATE INDEX IF NOT EXISTS idx_global_moat_insight_type ON global_opportunity_moat(insight_type);
