// Research Pipeline Orchestrator
// Collects -> Indexes -> Analyzes -> Stores -> Enriches with Moat

import { db } from '../lib/db';
import { RedditAdapter, PlayStoreAdapter, SocialSourceResult } from './adapters';
import { AIService, AISynthesisOptions } from './ai';
import { Search } from '../lib/types';

export class ResearchPipelineService {
  /**
   * Orchestrates the complete research process for a keyword.
   * Updates the search status as it progresses.
   */
  static async run(keyword: string, userId?: string, options?: AISynthesisOptions): Promise<string> {
    const cleanKW = keyword.trim();
    
    // 1. Create a pending search record
    const search = await db.saveSearch({
      keyword: cleanKW,
      status: 'pending',
      user_id: userId || '00000000-0000-0000-0000-000000000000'
    });

    try {
      // Step 1: Collect Data
      await db.saveSearch({ ...search, status: 'collecting' as any });
      const redditAdapter = new RedditAdapter();
      const playStoreAdapter = new PlayStoreAdapter();

      const [redditResults, playStoreResults] = await Promise.all([
        redditAdapter.fetch(cleanKW),
        playStoreAdapter.fetch(cleanKW)
      ]);

      const allSources: SocialSourceResult[] = [...redditResults, ...playStoreResults];

      // Step 2: Store Raw Data
      for (const src of allSources) {
        await db.saveResearchSource({
          search_id: search.id,
          source: src.source,
          title: src.title,
          content: src.content,
          author: src.author,
          url: src.url,
          likes: src.likes,
          date: src.date
        });
      }

      // Step 3: Categorize and query Moat (Future Moat Architecture)
      const category = this.detectCategory(cleanKW);
      const pastMoatInsights = await db.getMoatInsights(category);

      // Step 4: AI Analysis & Extraction
      await db.saveSearch({ ...search, status: 'analyzing' as any });
      const aiResult = await AIService.analyzeOpportunity(cleanKW, allSources, options);

      // Step 5: Save Extracted Data
      for (const pain of aiResult.painPoints) {
        await db.savePainPoint({
          search_id: search.id,
          title: pain.title,
          description: pain.description,
          mentions: pain.mentions,
          severity: pain.severity,
          example_quotes: pain.example_quotes
        });
      }

      for (const comp of aiResult.competitors) {
        await db.saveCompetitor({
          search_id: search.id,
          name: comp.name,
          mentions: comp.mentions,
          strengths: comp.strengths,
          weaknesses: comp.weaknesses
        });
      }

      await db.saveOpportunity({
        search_id: search.id,
        recommended_saas: aiResult.opportunity.recommended_saas,
        problem_solved: aiResult.opportunity.problem_solved,
        target_audience: aiResult.opportunity.target_audience,
        core_features: aiResult.opportunity.core_features,
        features_to_ignore: aiResult.opportunity.features_to_ignore,
        tech_stack: aiResult.opportunity.tech_stack,
        expected_build_time: aiResult.opportunity.expected_build_time,
        pricing_recommendation: aiResult.opportunity.pricing_recommendation
      });

      // Enrich final report content if there was moat data
      if (pastMoatInsights.length > 0) {
        aiResult.report.market_overview += ` (Note: Historical records in the ${category} category show recurring user complaints about similar items, reinforcing these insights.)`;
      }

      await db.saveReport({
        search_id: search.id,
        founder_verdict: aiResult.report.founder_verdict,
        claude_prompt: aiResult.report.claude_prompt,
        market_overview: aiResult.report.market_overview,
        market_gaps: aiResult.report.market_gaps,
        buyer_intent_signals: aiResult.report.buyer_intent_signals
      });

      // Step 6: Update Moat Database with the newly extracted insights
      for (const pain of aiResult.painPoints) {
        const quote = pain.example_quotes[0];
        await db.saveMoatInsight({
          category,
          insight_type: 'pain_point',
          keyword: cleanKW,
          content: pain.title,
          evidence_quote: quote?.quote || pain.description,
          evidence_source: quote?.source || 'AI Analysis',
          evidence_url: quote?.url || '',
          mentions: pain.mentions
        });
      }

      for (const gap of aiResult.report.market_gaps) {
        await db.saveMoatInsight({
          category,
          insight_type: 'market_gap',
          keyword: cleanKW,
          content: gap.gap_name,
          evidence_quote: gap.evidence.quote,
          evidence_source: gap.evidence.source,
          evidence_url: gap.evidence.url,
          mentions: 10
        });
      }

      for (const signal of aiResult.report.buyer_intent_signals) {
        await db.saveMoatInsight({
          category,
          insight_type: 'buyer_intent',
          keyword: cleanKW,
          content: signal.signal,
          evidence_quote: signal.quote,
          evidence_source: signal.source,
          evidence_url: signal.url,
          mentions: 5
        });
      }

      // Step 7: Finalize search status and scores
      await db.saveSearch({
        id: search.id,
        keyword: cleanKW,
        status: 'completed',
        opportunity_score: aiResult.opportunityScore,
        confidence_score: aiResult.confidenceScore,
        revenue_potential: aiResult.revenuePotential,
        market_demand: aiResult.marketDemand
      });

      return search.id;

    } catch (error) {
      console.error(`Pipeline failure for keyword: ${cleanKW}`, error);
      await db.saveSearch({
        id: search.id,
        keyword: cleanKW,
        status: 'failed'
      });
      throw error;
    }
  }

  /**
   * Helper to map search keywords to general categories
   */
  private static detectCategory(keyword: string): string {
    const kw = keyword.toLowerCase();
    if (kw.includes('fit') || kw.includes('health') || kw.includes('calorie') || kw.includes('diet') || kw.includes('food') || kw.includes('gym')) {
      return 'health';
    }
    if (kw.includes('habit') || kw.includes('productivity') || kw.includes('task') || kw.includes('focus') || kw.includes('note') || kw.includes('study')) {
      return 'productivity';
    }
    if (kw.includes('finance') || kw.includes('money') || kw.includes('budget') || kw.includes('crypto') || kw.includes('spend')) {
      return 'finance';
    }
    if (kw.includes('social') || kw.includes('meet') || kw.includes('chat') || kw.includes('community') || kw.includes('dating')) {
      return 'social';
    }
    return 'general';
  }
}
