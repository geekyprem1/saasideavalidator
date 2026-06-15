// SaaSRadar AI TypeScript Interfaces

export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Search {
  id: string;
  user_id?: string;
  keyword: string;
  status: 'pending' | 'collecting' | 'analyzing' | 'completed' | 'failed';
  opportunity_score: number;
  confidence_score: number;
  revenue_potential: string;
  market_demand: string;
  created_at: string;
}

export interface ResearchSource {
  id: string;
  search_id: string;
  source: 'reddit' | 'play_store';
  title?: string;
  content: string;
  author?: string;
  url?: string;
  likes: number;
  date: string;
  created_at: string;
}

export interface EvidenceQuote {
  quote: string;
  source: string;
  url: string;
  confidence: number;
}

export interface PainPoint {
  id: string;
  search_id: string;
  title: string;
  description: string;
  mentions: number;
  severity: 'low' | 'medium' | 'high';
  example_quotes: EvidenceQuote[];
  created_at: string;
}

export interface CompetitorWeakness {
  weakness: string;
  quote: string;
  source: string;
  url: string;
}

export interface Competitor {
  id: string;
  search_id: string;
  name: string;
  mentions: number;
  strengths: string[];
  weaknesses: CompetitorWeakness[];
  created_at: string;
}

export interface Opportunity {
  id: string;
  search_id: string;
  recommended_saas: string;
  problem_solved: string;
  target_audience: string;
  core_features: string[];
  features_to_ignore: string[];
  tech_stack: string[];
  expected_build_time: string;
  pricing_recommendation: string;
  created_at: string;
}

export interface FounderVerdict {
  recommendation: 'YES' | 'NO' | 'MAYBE';
  why: string[];
  biggest_risk: string;
  validation_path: string;
  mvp_timeline: string;
  revenue_timeline: string;
}

export interface MarketGap {
  gap_name: string;
  description: string;
  demand_level: 'low' | 'medium' | 'high';
  evidence: {
    quote: string;
    source: string;
    url: string;
  };
}

export interface BuyerIntentSignal {
  signal: string;
  quote: string;
  source: string;
  url: string;
  strength: 'low' | 'medium' | 'high';
}

export interface Report {
  id: string;
  search_id: string;
  founder_verdict: FounderVerdict;
  claude_prompt: string;
  market_overview: string;
  market_gaps: MarketGap[];
  buyer_intent_signals: BuyerIntentSignal[];
  created_at: string;
}

export interface SearchHistory {
  id: string;
  user_id: string;
  search_id: string;
  created_at: string;
}

export interface GlobalOpportunityMoat {
  id: string;
  category: string;
  insight_type: 'pain_point' | 'market_gap' | 'buyer_intent';
  keyword: string;
  content: string;
  evidence_quote: string;
  evidence_source: string;
  evidence_url?: string;
  mentions: number;
  created_at: string;
}
