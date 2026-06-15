import React from 'react';
import Link from 'next/link';
import { db } from '../../lib/db';
import { GlassCard } from '../../components/ui/glass-card';
import { 
  Radar, 
  TrendingUp, 
  Lightbulb, 
  ArrowRight,
  FileText,
  Activity,
  Award,
  Layers,
  Flame,
  AlertCircle
} from 'lucide-react';

export const revalidate = 0;

export default async function DashboardPage() {
  const searches = await db.getRecentSearches();
  
  // Calculate basic metrics
  const totalSearches = searches.length;
  const completedReports = searches.filter(s => s.status === 'completed');
  const totalReportsGenerated = completedReports.length;
  
  const averageOpportunityScore = completedReports.length > 0
    ? Math.round(completedReports.reduce((acc, s) => acc + s.opportunity_score, 0) / completedReports.length)
    : 0;

  const highPotentialCount = completedReports.filter(s => s.opportunity_score >= 80).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1A1A1A]">Good Morning, Founder</h1>
          <p className="text-xs text-[#6B6B6B] mt-0.5">Discover your next SaaS opportunity.</p>
        </div>
        <Link
          href="/dashboard/search"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D4A017] hover:bg-[#C58B0F] text-white rounded-xl text-xs font-bold shadow-md shadow-[#D4A017]/10 transition-all cursor-pointer"
        >
          <Radar className="h-4 w-4" />
          <span>Analyze SaaS Idea</span>
        </Link>
      </div>

      {/* KPI Cards (Executive Grade) */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <GlassCard>
          <p className="text-[10px] uppercase tracking-wider font-bold text-[#6B6B6B]">Reports Generated</p>
          <h3 className="text-3xl font-extrabold text-[#1A1A1A] mt-1">{totalReportsGenerated}</h3>
          <p className="text-[9px] text-[#6B6B6B] mt-2.5">Validated SaaS opportunity blueprints</p>
        </GlassCard>

        <GlassCard>
          <p className="text-[10px] uppercase tracking-wider font-bold text-[#6B6B6B]">Opportunities Found</p>
          <h3 className="text-3xl font-extrabold text-[#1A1A1A] mt-1">{totalSearches}</h3>
          <p className="text-[9px] text-[#6B6B6B] mt-2.5">Searched and indexed ideas</p>
        </GlassCard>

        <GlassCard>
          <p className="text-[10px] uppercase tracking-wider font-bold text-[#6B6B6B]">Average Score</p>
          <h3 className="text-3xl font-extrabold text-[#1A1A1A] mt-1">{averageOpportunityScore}%</h3>
          <p className="text-[9px] text-[#6B6B6B] mt-2.5">Platform-wide average viability index</p>
        </GlassCard>

        <GlassCard>
          <p className="text-[10px] uppercase tracking-wider font-bold text-[#4C8C4A]">High Potential Ideas</p>
          <h3 className="text-3xl font-extrabold text-[#4C8C4A] mt-1">{highPotentialCount}</h3>
          <p className="text-[9px] text-[#6B6B6B] mt-2.5">Opportunities rating 80+ points</p>
        </GlassCard>
      </div>

      {/* Main Grid: Trending Opportunities & Recent Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Trending & Recent Table */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Trending Opportunities */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-widest font-extrabold text-[#6B6B6B]">Trending Opportunities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card 1: AI Diet Planner */}
              <GlassCard hoverEffect className="p-5 flex flex-col justify-between h-40 border-l-4 border-l-[#D4A017]">
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-[#1A1A1A]">AI Diet Planner</h4>
                    <span className="px-2 py-0.5 rounded bg-[#FAF7F2] text-[10px] font-extrabold text-[#C58B0F] border border-[#E8DFD0]">Score: 92</span>
                  </div>
                  <p className="text-[11px] text-[#6B6B6B] leading-relaxed">
                    Customized diet structures tracking regional cuisines and raw weight ingredients.
                  </p>
                </div>
                <div className="flex justify-between text-[9px] text-[#6B6B6B] uppercase font-bold pt-2 border-t border-[#E8DFD0]/40">
                  <span>Demand: High</span>
                  <span>Revenue: High</span>
                </div>
              </GlassCard>

              {/* Card 2: Micro SaaS Analytics */}
              <GlassCard hoverEffect className="p-5 flex flex-col justify-between h-40 border-l-4 border-l-[#4C8C4A]">
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-[#1A1A1A]">Indian Calorie Counter</h4>
                    <span className="px-2 py-0.5 rounded bg-[#FAF7F2] text-[10px] font-extrabold text-[#4C8C4A] border border-[#E8DFD0]">Score: 88</span>
                  </div>
                  <p className="text-[11px] text-[#6B6B6B] leading-relaxed">
                    Verified local recipe weighing tools with zero coaching up-sells or ads.
                  </p>
                </div>
                <div className="flex justify-between text-[9px] text-[#6B6B6B] uppercase font-bold pt-2 border-t border-[#E8DFD0]/40">
                  <span>Demand: Very High</span>
                  <span>Revenue: High</span>
                </div>
              </GlassCard>

            </div>
          </div>

          {/* Recent Reports Table */}
          <GlassCard className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-[#1A1A1A]">Recent Intelligence Reports</h3>
                <p className="text-[10px] text-[#6B6B6B]">Dossier analysis records compiled by AI</p>
              </div>
              <Link href="/dashboard/reports" className="text-xs text-[#C58B0F] hover:text-[#D4A017] font-bold inline-flex items-center gap-1">
                <span>View Archives</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E8DFD0] text-[9px] font-bold tracking-wider text-[#6B6B6B] uppercase">
                    <th className="py-2.5 px-3">SaaS Idea</th>
                    <th className="py-2.5 px-3">Verdict</th>
                    <th className="py-2.5 px-3">Score</th>
                    <th className="py-2.5 px-3">Validation Date</th>
                    <th className="py-2.5 px-3 text-right">Dossier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DFD0]/60 text-xs">
                  {completedReports.length > 0 ? (
                    completedReports.slice(0, 4).map((search) => {
                      const verdict = search.opportunity_score >= 80 ? 'YES' : search.opportunity_score >= 60 ? 'MAYBE' : 'NO';
                      const badgeStyle = verdict === 'YES'
                        ? 'bg-[#4C8C4A]/10 text-[#4C8C4A] border-[#4C8C4A]/20'
                        : verdict === 'MAYBE'
                          ? 'bg-[#C58B0F]/10 text-[#C58B0F] border-[#C58B0F]/20'
                          : 'bg-[#B44C4C]/10 text-[#B44C4C] border-[#B44C4C]/20';

                      return (
                        <tr key={search.id} className="hover:bg-[#F5EFE4]/30 transition-colors group">
                          <td className="py-3 px-3 font-semibold text-[#1A1A1A]">{search.keyword}</td>
                          <td className="py-3 px-3">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${badgeStyle}`}>
                              {verdict}
                            </span>
                          </td>
                          <td className="py-3 px-3 font-bold text-[#1A1A1A]">{search.opportunity_score}%</td>
                          <td className="py-3 px-3 text-[#6B6B6B]">
                            {new Date(search.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                          </td>
                          <td className="py-3 px-3 text-right">
                            <Link 
                              href={`/dashboard/reports/${search.id}`}
                              className="text-[11px] font-bold text-[#C58B0F] hover:text-[#D4A017] inline-flex items-center gap-0.5"
                            >
                              <span>Read</span>
                              <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-[#6B6B6B] font-medium">
                        No reports validated yet. Use "Analyze SaaS Idea" to start.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </GlassCard>

        </div>

        {/* Right Column: Founder Insights Feed */}
        <div className="space-y-4">
          <h3 className="text-xs uppercase tracking-widest font-extrabold text-[#6B6B6B]">Founder Insights Feed</h3>
          
          <GlassCard className="space-y-6">
            
            {/* Emerging Pain Points */}
            <div className="space-y-2.5">
              <span className="text-[9px] uppercase font-bold text-[#C58B0F] tracking-widest block">Emerging Pain Points</span>
              <div className="space-y-2">
                <div className="p-3 bg-[#FAF7F2] border border-[#E8DFD0] rounded-xl text-xs space-y-1">
                  <p className="font-bold text-[#1A1A1A]">Calendar/Streak fatigue</p>
                  <p className="text-[11px] text-[#6B6B6B] leading-relaxed">
                    Users delete trackers when a single day miss resets their streak, causing guilt.
                  </p>
                </div>
                <div className="p-3 bg-[#FAF7F2] border border-[#E8DFD0] rounded-xl text-xs space-y-1">
                  <p className="font-bold text-[#1A1A1A]">Bloat paywalls in food diaries</p>
                  <p className="text-[11px] text-[#6B6B6B] leading-relaxed">
                    Existing trackers locking standard export and weighing logs behind coaching tiers.
                  </p>
                </div>
              </div>
            </div>

            {/* New Market Gaps */}
            <div className="space-y-2.5 pt-4 border-t border-[#E8DFD0]/60">
              <span className="text-[9px] uppercase font-bold text-[#C58B0F] tracking-widest block">New Market Gaps</span>
              <div className="space-y-2">
                <div className="p-3 bg-[#FAF7F2] border border-[#E8DFD0] rounded-xl text-xs space-y-1">
                  <p className="font-bold text-[#1A1A1A]">Gram-level ingredient weighing</p>
                  <p className="text-[11px] text-[#6B6B6B] leading-relaxed">
                    Absence of custom recipe builders supporting raw weights (e.g. raw flour to batch bread).
                  </p>
                </div>
              </div>
            </div>

            {/* Trending Categories */}
            <div className="space-y-2.5 pt-4 border-t border-[#E8DFD0]/60">
              <span className="text-[9px] uppercase font-bold text-[#C58B0F] tracking-widest block">Trending Categories</span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded bg-[#FAF7F2] border border-[#E8DFD0] text-[10px] font-bold text-[#1A1A1A]">
                  Health & Wellness (4)
                </span>
                <span className="px-2 py-0.5 rounded bg-[#FAF7F2] border border-[#E8DFD0] text-[10px] font-bold text-[#1A1A1A]">
                  Productivity (3)
                </span>
                <span className="px-2 py-0.5 rounded bg-[#FAF7F2] border border-[#E8DFD0] text-[10px] font-bold text-[#1A1A1A]">
                  Dev Utility (2)
                </span>
              </div>
            </div>

          </GlassCard>
        </div>

      </div>
    </div>
  );
}
