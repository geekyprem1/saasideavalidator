import { supabase, isSupabaseConfigured } from './supabase';
import { Search, ResearchSource, PainPoint, Competitor, Opportunity, Report, GlobalOpportunityMoat } from './types';

// In-memory Database Mock for Demo Mode
class MemoryDatabase {
  searches: Search[] = [];
  researchSources: ResearchSource[] = [];
  painPoints: PainPoint[] = [];
  competitors: Competitor[] = [];
  opportunities: Opportunity[] = [];
  reports: Report[] = [];
  moat: GlobalOpportunityMoat[] = [];

  constructor() {
    this.initializeSeeds();
  }

  private initializeSeeds() {
    // 1. Indian Calorie Counter Search
    const searchId1 = '11111111-1111-1111-1111-111111111111';
    this.searches.push({
      id: searchId1,
      keyword: 'Indian Calorie Counter',
      status: 'completed',
      opportunity_score: 88,
      confidence_score: 92,
      revenue_potential: '$15k - $50k/mo MRR',
      market_demand: 'Very High (82,000+ searches/mo, massive Reddit complaints)',
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    });

    this.researchSources.push(
      {
        id: 's1-1',
        search_id: searchId1,
        source: 'reddit',
        title: 'MyFitnessPal is useless for Indian food',
        content: 'Seriously, trying to log homemade roti, subzi, or specific regional dishes like upma is a nightmare. Everything is entered by random users with incorrect calorie details. There is no database validation.',
        author: 'curry_dev',
        url: 'https://reddit.com/r/fitnessindia/comments/12345',
        likes: 142,
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString()
      },
      {
        id: 's1-2',
        search_id: searchId1,
        source: 'play_store',
        title: 'HealthifyMe is too expensive and pushes coaches too hard',
        content: 'The app has become bloated. It keeps locking basic food logging features behind paywalls and spamming me to hire personal trainers or calorie coaches. I just want a simple, clean app that understands Indian home-cooked meals.',
        author: 'Rohan Patel',
        url: 'https://play.google.com/store/apps/details?id=com.healthifyme.basic&reviewId=98765',
        likes: 89,
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString()
      },
      {
        id: 's1-3',
        search_id: searchId1,
        source: 'reddit',
        title: 'Need a calorie counter that counts by grams of dough (atta)',
        content: 'Logging "1 Roti" is useless. Rotis vary in size, thickness, and oil. We need an app designed for Indian cooking methods where we can input raw ingredients (like grams of dry wheat flour) and calculate batch cooking easily.',
        author: 'swasth_bharat',
        url: 'https://reddit.com/r/india/comments/54321',
        likes: 63,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString()
      }
    );

    this.painPoints.push(
      {
        id: 'p1-1',
        search_id: searchId1,
        title: 'Inaccurate Indian Food Database',
        description: 'Existing global databases (MyFitnessPal, LoseIt) fail to represent traditional Indian recipes, leading to wild calorie estimation errors.',
        mentions: 412,
        severity: 'high',
        example_quotes: [{
          quote: 'Trying to log homemade roti, subzi, or specific regional dishes like upma is a nightmare. Everything is entered by random users with incorrect calorie details.',
          source: 'Reddit r/fitnessindia',
          url: 'https://reddit.com/r/fitnessindia/comments/12345',
          confidence: 0.95
        }],
        created_at: new Date().toISOString()
      },
      {
        id: 'p1-2',
        search_id: searchId1,
        title: 'Aggressive Coach Upselling & Bloat',
        description: 'Users feel badgered by apps like HealthifyMe which lock core features and constantly push expensive human-coaching models.',
        mentions: 285,
        severity: 'medium',
        example_quotes: [{
          quote: 'The app has become bloated. It keeps locking basic food logging features behind paywalls and spamming me to hire personal trainers.',
          source: 'Play Store Review',
          url: 'https://play.google.com/store/apps/details?id=com.healthifyme.basic&reviewId=98765',
          confidence: 0.88
        }],
        created_at: new Date().toISOString()
      },
      {
        id: 'p1-3',
        search_id: searchId1,
        title: 'Lack of Batch & Ingredient Weight Tracking',
        description: 'Traditional Indian kitchens prepare batch foods (curries, dal) and variable rotis. Standard apps assume single-portion western items.',
        mentions: 167,
        severity: 'high',
        example_quotes: [{
          quote: 'We need an app designed for Indian cooking methods where we can input raw ingredients (like grams of dry wheat flour) and calculate batch cooking easily.',
          source: 'Reddit r/india',
          url: 'https://reddit.com/r/india/comments/54321',
          confidence: 0.92
        }],
        created_at: new Date().toISOString()
      }
    );

    this.competitors.push(
      {
        id: 'c1-1',
        search_id: searchId1,
        name: 'HealthifyMe',
        mentions: 342,
        strengths: ['Large local database', 'Barcode scanning', 'Brand recognition'],
        weaknesses: [{
          weakness: 'High price, pushy sales calls, feature-gating, slow interface',
          quote: 'spamming me to hire personal trainers or calorie coaches',
          source: 'Play Store',
          url: 'https://play.google.com/store/apps/details?id=com.healthifyme.basic&reviewId=98765'
        }],
        created_at: new Date().toISOString()
      },
      {
        id: 'c1-2',
        search_id: searchId1,
        name: 'MyFitnessPal',
        mentions: 195,
        strengths: ['Global food catalog', 'Huge ecosystem integration'],
        weaknesses: [{
          weakness: 'Unverified user entries for regional Indian foods are highly inaccurate',
          quote: 'Everything is entered by random users with incorrect calorie details.',
          source: 'Reddit',
          url: 'https://reddit.com/r/fitnessindia/comments/12345'
        }],
        created_at: new Date().toISOString()
      }
    );

    this.opportunities.push({
      id: 'o1-1',
      search_id: searchId1,
      recommended_saas: 'GharKaCalorie',
      problem_solved: 'Verified, recipe-focused Indian calorie logging with accurate raw-ingredient weighing algorithms and zero pushy coaches.',
      target_audience: 'Health-conscious Indians cooking at home, young fitness enthusiasts, and diabetics managing glycemic load.',
      core_features: ['Verified Indian ingredients database', 'Raw ingredient to cooked recipe calculator', 'WhatsApp-based logging assistant', 'Sleek, minimalist dark UI'],
      features_to_ignore: ['AI camera logging (low accuracy for mixed curries)', 'Human coach marketplaces', 'Forums and social feeds'],
      tech_stack: ['Next.js 15', 'Supabase', 'Tailwind CSS', 'Gemini API'],
      expected_build_time: '3 weeks',
      pricing_recommendation: '₹199/month ($2.50 USD/mo) for premium verified tracking, or ₹999/year.',
      created_at: new Date().toISOString()
    });

    this.reports.push({
      id: 'r1-1',
      search_id: searchId1,
      founder_verdict: {
        recommendation: 'YES',
        why: [
          'Massive organic pain surrounding database inaccuracy in existing tools.',
          'Strong willingness to pay for subscription to escape aggressive upselling and bloating.',
          'High search interest and lack of lightweight utility competitors targeting Indian home-cooked meals specifically.'
        ],
        biggest_risk: 'Sourcing and verifying a highly accurate regional database (North vs South cuisines).',
        validation_path: 'Launch a free landing page with a Google Sheet calculator; run targeted ads on r/fitnessindia.',
        mvp_timeline: '14-21 days',
        revenue_timeline: 'Less than 30 days post-launch via micro-subscriptions'
      },
      claude_prompt: `Create a comprehensive boilerplate for a Next.js 15 app named "GharKaCalorie". Include an interactive calorie log page where users can input custom weights of raw Indian ingredients (e.g., Atta, Moong Dal) and combine them into custom recipes. Style the app with a dark glassmorphic dashboard inspired by Vercel. Implement simple search capabilities, recipe builder, daily diary log, and payment integration placeholder for Razorpay. Use TypeScript and Tailwind CSS throughout.`,
      market_overview: 'The Indian fitness tech space is highly dominated by expensive corporate platforms. A massive cohort of tech-savvy individuals seeks a simple, distraction-free tracker focused on the realities of Indian domestic kitchens (batch cooking, variable roti sizes, regional spices).',
      market_gaps: [
        {
          gap_name: 'Gram-based Roti & Curry Calculator',
          description: 'Ability to calculate calorie breakdown of custom-portioned home meals rather than generalized database entries.',
          demand_level: 'high',
          evidence: {
            quote: 'We need an app designed for Indian cooking methods where we can input raw ingredients (like grams of dry wheat flour) and calculate batch cooking easily.',
            source: 'Reddit r/india',
            url: 'https://reddit.com/r/india/comments/54321'
          }
        }
      ],
      buyer_intent_signals: [
        {
          signal: 'Exhausted with coach sales pitches',
          quote: 'The app has become bloated. It keeps locking basic food logging features... I just want a simple, clean app',
          source: 'Play Store Review',
          url: 'https://play.google.com/store/apps/details?id=com.healthifyme.basic&reviewId=98765',
          strength: 'high'
        }
      ],
      created_at: new Date().toISOString()
    });

    // 2. AI Habit Tracker
    const searchId2 = '22222222-2222-2222-2222-222222222222';
    this.searches.push({
      id: searchId2,
      keyword: 'AI Habit Tracker',
      status: 'completed',
      opportunity_score: 64,
      confidence_score: 75,
      revenue_potential: '$2k - $8k/mo MRR',
      market_demand: 'Moderate (High competition, low retention rates)',
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    });

    this.researchSources.push(
      {
        id: 's2-1',
        search_id: searchId2,
        source: 'reddit',
        title: 'Every habit tracker is the same checklist',
        content: 'I have downloaded 10 different apps. They are all just checklists with calendar grid streaks. The streak system actually stresses me out. If I miss one day, I lose motivation and delete the app.',
        author: 'habits_junkie',
        url: 'https://reddit.com/r/getdisciplined/comments/9999',
        likes: 312,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString()
      },
      {
        id: 's2-2',
        search_id: searchId2,
        source: 'play_store',
        title: 'Too manual, I forget to log my habits',
        content: 'Logging is boring. If I have to open the app, find the habit, and tap complete, I will stop doing it after 3 days. It needs auto-tracking or integration with my calendar.',
        author: 'Devon S.',
        url: 'https://play.google.com/store/apps/details?id=com.habit.tracker&reviewId=1111',
        likes: 74,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString()
      }
    );

    this.painPoints.push(
      {
        id: 'p2-1',
        search_id: searchId2,
        title: 'Demotivating Streak Penalties',
        description: 'Strict calendar streaks trigger stress and demotivation upon a single missed day, leading users to abandon trackers.',
        mentions: 312,
        severity: 'medium',
        example_quotes: [{
          quote: 'The streak system actually stresses me out. If I miss one day, I lose motivation and delete the app.',
          source: 'Reddit r/getdisciplined',
          url: 'https://reddit.com/r/getdisciplined/comments/9999',
          confidence: 0.85
        }],
        created_at: new Date().toISOString()
      },
      {
        id: 'p2-2',
        search_id: searchId2,
        title: 'Friction in Manual Logging',
        description: 'High friction of manual check-ins causes rapid user dropoff within the first week.',
        mentions: 215,
        severity: 'high',
        example_quotes: [{
          quote: 'Logging is boring. If I have to open the app, find the habit, and tap complete, I will stop doing it after 3 days.',
          source: 'Play Store',
          url: 'https://play.google.com/store/apps/details?id=com.habit.tracker&reviewId=1111',
          confidence: 0.90
        }],
        created_at: new Date().toISOString()
      }
    );

    this.competitors.push(
      {
        id: 'c2-1',
        search_id: searchId2,
        name: 'Habitica',
        mentions: 188,
        strengths: ['Gamified RPG components', 'Highly engaging for gamers'],
        weaknesses: [{
          weakness: 'Visual style too retro for professional users, setup is overly complex',
          quote: 'All just checklists with calendar grids... setup is too much',
          source: 'Reddit',
          url: 'https://reddit.com/r/getdisciplined/comments/9999'
        }],
        created_at: new Date().toISOString()
      },
      {
        id: 'c2-2',
        search_id: searchId2,
        name: 'Streaks',
        mentions: 145,
        strengths: ['Beautiful iOS integration', 'Simple interactions'],
        weaknesses: [{
          weakness: 'Sticking strictly to rigid checklists creates guilt and fatigue',
          quote: 'The streak system actually stresses me out.',
          source: 'Reddit',
          url: 'https://reddit.com/r/getdisciplined/comments/9999'
        }],
        created_at: new Date().toISOString()
      }
    );

    this.opportunities.push({
      id: 'o2-1',
      search_id: searchId2,
      recommended_saas: 'ElasticHabits AI',
      problem_solved: 'A flexible habit assistant that integrates with calendars/API feeds to auto-track habits and adapts streaks based on life busyness.',
      target_audience: 'Busy remote workers, software developers, and productivity enthusiasts who hate standard rigid checkboxes.',
      core_features: ['API integrations (GitHub, RescueTime, Google Calendar)', 'Dynamic difficulty adjustment (elastic habit goals)', 'Forgiving streak algorithms (grace days)', 'AI wellness coach summaries'],
      features_to_ignore: ['Social feed/competitions', 'Manual checklist (keep it automated)', 'Complex pixel art gamification'],
      tech_stack: ['Next.js 15', 'Supabase', 'Tailwind CSS', 'Resend API'],
      expected_build_time: '2 weeks',
      pricing_recommendation: '$4/month ($29/year) to unlock premium integrations and advanced elasticity configurations.',
      created_at: new Date().toISOString()
    });

    this.reports.push({
      id: 'r2-1',
      search_id: searchId2,
      founder_verdict: {
        recommendation: 'MAYBE',
        why: [
          'Extremely crowded market. Acquiring users cost-effectively is highly challenging.',
          'Strong consumer fatigue around manual checklists, but high demand for automated tracking (integrations).',
          'Monetization potential is modest; users are hesitant to pay high subscription prices for basic tracker apps.'
        ],
        biggest_risk: 'Extremely low retention rates; users download and uninstall apps within 7 days.',
        validation_path: 'Build a simple browser extension tracking coding hours automatically; offer it to developers on Product Hunt.',
        mvp_timeline: '10-14 days',
        revenue_timeline: '45-60 days post-launch'
      },
      claude_prompt: `Build a Next.js 15 landing page and basic user dashboard for "ElasticHabits AI". Allow users to connect their GitHub username to automatically track their coding habit (e.g. at least one commit). If they commit, the habit logs automatically. Provide a visual streak graph that does not reset completely for a single missed day but utilizes a health bar instead. Add Stripe/Razorpay pricing cards.`,
      market_overview: 'Habit tracking is a saturated market, but is undergoing a shift from active manual logging to passive background tracking. Products succeeding now integrate into existing browser and calendar activities.',
      market_gaps: [
        {
          gap_name: 'Forgiving Streak/Health bar',
          description: 'Streak systems that support life volatility and prevent total discouragement on day misses.',
          demand_level: 'medium',
          evidence: {
            quote: 'If I miss one day, I lose motivation and delete the app.',
            source: 'Reddit r/getdisciplined',
            url: 'https://reddit.com/r/getdisciplined/comments/9999'
          }
        }
      ],
      buyer_intent_signals: [
        {
          signal: 'Want passive calendar sync',
          quote: 'It needs auto-tracking or integration with my calendar.',
          source: 'Play Store Review',
          url: 'https://play.google.com/store/apps/details?id=com.habit.tracker&reviewId=1111',
          strength: 'medium'
        }
      ],
      created_at: new Date().toISOString()
    });

    // Populate Moat database
    this.moat.push(
      {
        id: 'm1',
        category: 'health',
        insight_type: 'pain_point',
        keyword: 'Indian Calorie Counter',
        content: 'Inaccurate Indian database in calorie tracker apps.',
        evidence_quote: 'Everything is entered by random users with incorrect calorie details.',
        evidence_source: 'Reddit',
        evidence_url: 'https://reddit.com/r/fitnessindia/comments/12345',
        mentions: 412,
        created_at: new Date().toISOString()
      },
      {
        id: 'm2',
        category: 'health',
        insight_type: 'buyer_intent',
        keyword: 'Indian Calorie Counter',
        content: 'Willingness to pay subscription to bypass aggressive coaches.',
        evidence_quote: 'I just want a simple, clean app that understands Indian home-cooked meals.',
        evidence_source: 'Play Store',
        evidence_url: 'https://play.google.com/store/apps/details?id=com.healthifyme.basic&reviewId=98765',
        mentions: 89,
        created_at: new Date().toISOString()
      },
      {
        id: 'm3',
        category: 'productivity',
        insight_type: 'pain_point',
        keyword: 'AI Habit Tracker',
        content: 'Strict streak rules lead to demotivation and uninstallation.',
        evidence_quote: 'The streak system actually stresses me out. If I miss one day, I lose motivation.',
        evidence_source: 'Reddit',
        evidence_url: 'https://reddit.com/r/getdisciplined/comments/9999',
        mentions: 312,
        created_at: new Date().toISOString()
      },
      {
        id: 'm4',
        category: 'productivity',
        insight_type: 'market_gap',
        keyword: 'AI Habit Tracker',
        content: 'Lack of passive auto-tracking integrations.',
        evidence_quote: 'If I have to open the app and tap complete, I will stop... It needs auto-tracking.',
        evidence_source: 'Play Store',
        evidence_url: 'https://play.google.com/store/apps/details?id=com.habit.tracker&reviewId=1111',
        mentions: 74,
        created_at: new Date().toISOString()
      }
    );
  }
}

const globalForDb = globalThis as unknown as {
  memoryDb: MemoryDatabase | undefined;
};

const memoryDb = globalForDb.memoryDb ?? new MemoryDatabase();

if (process.env.NODE_ENV !== 'production') globalForDb.memoryDb = memoryDb;

// Consolidated Database Service Wrapper
export const db = {
  // --- Searches ---
  async getRecentSearches(): Promise<Search[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('searches')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return data as Search[];
    }
    return [...memoryDb.searches].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  async getSearchById(id: string): Promise<Search | null> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('searches')
        .select('*')
        .eq('id', id)
        .single();
      if (!error && data) return data as Search;
    }
    return memoryDb.searches.find(s => s.id === id) || null;
  },

  async saveSearch(search: Partial<Search> & { keyword: string }): Promise<Search> {
    const id = search.id || crypto.randomUUID();
    const newSearch: Search = {
      id,
      keyword: search.keyword,
      status: search.status || 'pending',
      opportunity_score: search.opportunity_score || 0,
      confidence_score: search.confidence_score || 0,
      revenue_potential: search.revenue_potential || 'Calculating...',
      market_demand: search.market_demand || 'Analyzing...',
      created_at: search.created_at || new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('searches')
        .upsert(newSearch)
        .select()
        .single();
      if (!error && data) return data as Search;
    }

    // Update or insert in memory
    const idx = memoryDb.searches.findIndex(s => s.id === id);
    if (idx !== -1) {
      memoryDb.searches[idx] = { ...memoryDb.searches[idx], ...newSearch };
    } else {
      memoryDb.searches.push(newSearch);
    }
    return newSearch;
  },

  // --- Research Sources ---
  async getResearchSources(searchId: string): Promise<ResearchSource[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('research_sources')
        .select('*')
        .eq('search_id', searchId);
      if (!error && data) return data as ResearchSource[];
    }
    return memoryDb.researchSources.filter(src => src.search_id === searchId);
  },

  async saveResearchSource(source: Omit<ResearchSource, 'id' | 'created_at'>): Promise<ResearchSource> {
    const newSource: ResearchSource = {
      ...source,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString()
    };
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('research_sources')
        .insert(newSource)
        .select()
        .single();
      if (!error && data) return data as ResearchSource;
    }
    memoryDb.researchSources.push(newSource);
    return newSource;
  },

  // --- Pain Points ---
  async getPainPoints(searchId: string): Promise<PainPoint[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('pain_points')
        .select('*')
        .eq('search_id', searchId);
      if (!error && data) return data as PainPoint[];
    }
    return memoryDb.painPoints.filter(p => p.search_id === searchId);
  },

  async savePainPoint(pain: Omit<PainPoint, 'id' | 'created_at'>): Promise<PainPoint> {
    const newPain: PainPoint = {
      ...pain,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString()
    };
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('pain_points')
        .insert(newPain)
        .select()
        .single();
      if (!error && data) return data as PainPoint;
    }
    memoryDb.painPoints.push(newPain);
    return newPain;
  },

  // --- Competitors ---
  async getCompetitors(searchId: string): Promise<Competitor[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('competitors')
        .select('*')
        .eq('search_id', searchId);
      if (!error && data) return data as Competitor[];
    }
    return memoryDb.competitors.filter(c => c.search_id === searchId);
  },

  async saveCompetitor(comp: Omit<Competitor, 'id' | 'created_at'>): Promise<Competitor> {
    const newComp: Competitor = {
      ...comp,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString()
    };
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('competitors')
        .insert(newComp)
        .select()
        .single();
      if (!error && data) return data as Competitor;
    }
    memoryDb.competitors.push(newComp);
    return newComp;
  },

  // --- Opportunities ---
  async getOpportunity(searchId: string): Promise<Opportunity | null> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .eq('search_id', searchId)
        .single();
      if (!error && data) return data as Opportunity;
    }
    return memoryDb.opportunities.find(o => o.search_id === searchId) || null;
  },

  async saveOpportunity(opp: Omit<Opportunity, 'id' | 'created_at'>): Promise<Opportunity> {
    const newOpp: Opportunity = {
      ...opp,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString()
    };
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('opportunities')
        .insert(newOpp)
        .select()
        .single();
      if (!error && data) return data as Opportunity;
    }
    memoryDb.opportunities.push(newOpp);
    return newOpp;
  },

  // --- Reports ---
  async getReport(searchId: string): Promise<Report | null> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('search_id', searchId)
        .single();
      if (!error && data) return data as Report;
    }
    return memoryDb.reports.find(r => r.search_id === searchId) || null;
  },

  async saveReport(rep: Omit<Report, 'id' | 'created_at'>): Promise<Report> {
    const newRep: Report = {
      ...rep,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString()
    };
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('reports')
        .insert(newRep)
        .select()
        .single();
      if (!error && data) return data as Report;
    }
    memoryDb.reports.push(newRep);
    return newRep;
  },

  // --- Global Moat (Opportunity Database) ---
  async getMoatInsights(category?: string): Promise<GlobalOpportunityMoat[]> {
    if (isSupabaseConfigured && supabase) {
      let query = supabase.from('global_opportunity_moat').select('*');
      if (category) query = query.eq('category', category.toLowerCase());
      const { data, error } = await query;
      if (!error && data) return data as GlobalOpportunityMoat[];
    }
    if (category) {
      return memoryDb.moat.filter(m => m.category.toLowerCase() === category.toLowerCase());
    }
    return memoryDb.moat;
  },

  async saveMoatInsight(insight: Omit<GlobalOpportunityMoat, 'id' | 'created_at'>): Promise<GlobalOpportunityMoat> {
    const newInsight: GlobalOpportunityMoat = {
      ...insight,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString()
    };
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('global_opportunity_moat')
        .insert(newInsight)
        .select()
        .single();
      if (!error && data) return data as GlobalOpportunityMoat;
    }
    memoryDb.moat.push(newInsight);
    return newInsight;
  }
};
