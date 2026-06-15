'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { getReportDetailsAction } from '../../../actions/research';
import { GlassCard } from '../../../../components/ui/glass-card';
import { 
  ArrowLeft, 
  Radar, 
  Terminal, 
  Copy, 
  Check, 
  ExternalLink,
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  TrendingUp, 
  DollarSign, 
  Flame,
  AlertTriangle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  TrendingDown,
  Award,
  Layers,
  ChevronRight,
  TrendingUp as TrendUp
} from 'lucide-react';
import { Search, ResearchSource, PainPoint, Competitor, Opportunity, Report } from '../../../../lib/types';

type TabType = 'verdict' | 'blueprint' | 'gaps' | 'competitors' | 'launch';

export default function ReportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Data State
  const [search, setSearch] = useState<Search | null>(null);
  const [sources, setSources] = useState<ResearchSource[]>([]);
  const [painPoints, setPainPoints] = useState<PainPoint[]>([]);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [report, setReport] = useState<Report | null>(null);

  // UI Interactive States
  const [activeTab, setActiveTab] = useState<TabType>('verdict');
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [expandedPains, setExpandedPains] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function loadData() {
      try {
        const response = await getReportDetailsAction(searchId);
        if (response.success && response.data) {
          setSearch(response.data.search);
          setSources(response.data.sources);
          setPainPoints(response.data.painPoints);
          setCompetitors(response.data.competitors);
          setOpportunity(response.data.opportunity);
          setReport(response.data.report);
        } else {
          setError(response.error || 'Failed to fetch report data.');
        }
      } catch (e: any) {
        setError(e?.message || 'Failed to connect to database.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [searchId]);

  const handleCopyPrompt = () => {
    if (!report?.claude_prompt) return;
    navigator.clipboard.writeText(report.claude_prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const togglePainExpansion = (id: string) => {
    setExpandedPains(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <Radar className="h-8 w-8 text-[#C58B0F] animate-spin" />
        <p className="text-xs text-[#6B6B6B] font-semibold">Compiling LaunchDNA Report...</p>
      </div>
    );
  }

  if (error || !search || !report || !opportunity) {
    return (
      <div className="space-y-4 max-w-xl mx-auto py-12">
        <div className="p-8 rounded-2xl border border-rose-500/15 bg-rose-500/5 text-center space-y-3 shadow-sm">
          <AlertCircle className="h-8 w-8 text-[#B44C4C] mx-auto" />
          <h3 className="font-bold text-white">Report Inaccessible</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            {error || 'The requested SaaS validation details are unavailable or missing from database.'}
          </p>
          <Link
            href="/dashboard/reports"
            className="inline-flex items-center gap-1.5 text-xs text-[#C58B0F] hover:text-[#D4A017] font-bold mt-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  // Verdict style mapping
  const verdict = report.founder_verdict.recommendation;
  const verdictConfig = {
    YES: {
      badge: 'bg-[#4C8C4A]/10 text-[#4C8C4A] border-[#4C8C4A]/20 shadow-sm shadow-[#4C8C4A]/5',
      icon: CheckCircle2,
      color: 'text-[#4C8C4A]'
    },
    MAYBE: {
      badge: 'bg-[#C58B0F]/10 text-[#C58B0F] border-[#C58B0F]/20 shadow-sm shadow-[#C58B0F]/5',
      icon: HelpCircle,
      color: 'text-[#C58B0F]'
    },
    NO: {
      badge: 'bg-[#B44C4C]/10 text-[#B44C4C] border-[#B44C4C]/20 shadow-sm shadow-[#B44C4C]/5',
      icon: XCircle,
      color: 'text-[#B44C4C]'
    }
  }[verdict];

  const VerdictIcon = verdictConfig.icon;

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb */}
      <div className="flex justify-between items-center text-xs">
        <Link 
          href="/dashboard"
          className="inline-flex items-center gap-2 text-[#6B6B6B] hover:text-[#1A1A1A] font-semibold transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Control Dashboard</span>
        </Link>
        <span className="text-[10px] text-[#6B6B6B] font-bold font-mono tracking-wider">DOSSIER REF: #{searchId.slice(0,8).toUpperCase()}</span>
      </div>

      {/* Report Header */}
      <div>
        <h2 className="text-2xl font-black text-[#1A1A1A] tracking-tight flex items-center gap-2 flex-wrap">
          <span>LaunchDNA Report:</span>
          <span className="text-[#C58B0F]">
            {search.keyword}
          </span>
        </h2>
        <p className="text-xs text-[#6B6B6B]">Vetted on {new Date(search.created_at).toLocaleDateString(undefined, { dateStyle: 'full' })}</p>
      </div>

      {/* HERO SECTION: FOUNDER VERDICT (Consulting style) */}
      <GlassCard className="p-8 border-[#E8DFD0] relative overflow-hidden" glowColor={verdict === 'YES' ? 'emerald' : verdict === 'MAYBE' ? 'amber' : 'rose'}>
        <div className="absolute top-0 right-0 p-6 flex flex-col items-end gap-2">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] font-extrabold tracking-widest ${verdictConfig.badge}`}>
            <VerdictIcon className="h-4 w-4" />
            <span>FOUNDER VERDICT: {verdict}</span>
          </div>
          <span className="text-[8px] font-bold text-[#C58B0F]/80 uppercase tracking-widest">
            Powered by LaunchDNA™ Engine
          </span>
        </div>

        <div className="max-w-3xl space-y-6">
          <div className="space-y-1">
            <h3 className="text-[10px] uppercase tracking-widest font-extrabold text-[#6B6B6B]">Decision Rationale</h3>
            <p className="text-base text-[#1A1A1A] font-extrabold leading-relaxed mt-2">
              Should you build this SaaS?
            </p>
            <ul className="space-y-3 mt-3">
              {report.founder_verdict.why.map((reason, idx) => (
                <li key={idx} className="flex gap-3 items-start text-xs text-[#6B6B6B] leading-relaxed">
                  <CheckCircle2 className="h-4.5 w-4.5 text-[#C58B0F] flex-shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5 border-t border-[#E8DFD0]/60">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#6B6B6B] tracking-wider inline-flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5 text-[#C58B0F]" />
                Biggest Risk
              </span>
              <p className="text-xs text-[#6B6B6B] leading-relaxed mt-1">{report.founder_verdict.biggest_risk}</p>
            </div>
            
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#6B6B6B] tracking-wider inline-flex items-center gap-1.5">
                <Lightbulb className="h-3.5 w-3.5 text-[#C58B0F]" />
                Fastest Path to Validation
              </span>
              <p className="text-xs text-[#6B6B6B] leading-relaxed mt-1">{report.founder_verdict.validation_path}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5 border-t border-[#E8DFD0]/60">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#6B6B6B] tracking-wider block">Estimated MVP Build Timeline</span>
              <p className="text-sm font-extrabold text-[#1A1A1A] mt-1">{report.founder_verdict.mvp_timeline}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#6B6B6B] tracking-wider block">Estimated First Revenue Timeline</span>
              <p className="text-sm font-extrabold text-[#1A1A1A] mt-1">{report.founder_verdict.revenue_timeline}</p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* METRIC SCORE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <GlassCard className="p-5">
          <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#6B6B6B]">LaunchDNA Score</span>
          <div className="flex items-center gap-3 mt-1.5">
            <h4 className={`text-2xl font-black ${verdictConfig.color}`}>{search.opportunity_score}/100</h4>
            <div className="flex-1 h-1.5 bg-[#FAF7F2] border border-[#E8DFD0] rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-[#D4A017]" style={{ width: `${search.opportunity_score}%` }} />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#6B6B6B]">Confidence Index</span>
          <div className="flex items-center gap-3 mt-1.5">
            <h4 className="text-2xl font-black text-[#1A1A1A]">{search.confidence_score}%</h4>
            <div className="flex-1 h-1.5 bg-[#FAF7F2] border border-[#E8DFD0] rounded-full overflow-hidden">
              <div className="h-full bg-[#4C8C4A] rounded-full" style={{ width: `${search.confidence_score}%` }} />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#6B6B6B]">Revenue Potential</span>
          <div className="flex items-center gap-2 mt-1.5">
            <DollarSign className="h-5 w-5 text-[#C58B0F]" />
            <h4 className="text-sm font-extrabold text-[#1A1A1A] truncate">{search.revenue_potential.split('/')[0]}</h4>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#6B6B6B]">Market Demand Level</span>
          <div className="flex items-center gap-2 mt-1.5">
            <Flame className="h-5 w-5 text-[#C58B0F]" />
            <h4 className="text-xs font-extrabold text-[#1A1A1A] truncate">{search.market_demand.split(' ')[0]}</h4>
          </div>
        </GlassCard>
      </div>

      {/* EDITORIAL TAB SELECTOR */}
      <div className="flex border-b border-[#E8DFD0] gap-2 pb-px overflow-x-auto">
        {(['verdict', 'blueprint', 'gaps', 'competitors', 'launch'] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 -mb-px transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab 
                ? 'border-[#D4A017] text-[#1A1A1A] bg-white' 
                : 'border-transparent text-[#6B6B6B] hover:text-[#1A1A1A]'
            }`}
          >
            {tab === 'verdict' && 'Executive Rationale'}
            {tab === 'blueprint' && 'SaaS Blueprint'}
            {tab === 'gaps' && 'Gaps & Pain Points'}
            {tab === 'competitors' && 'SWOT & Competitors'}
            {tab === 'launch' && 'Launch Strategy'}
          </button>
        ))}
      </div>

      {/* TAB CONTENT VIEWS */}
      <div className="space-y-6">
        
        {/* TAB 1: EXECUTIVE RATIONALE */}
        {activeTab === 'verdict' && (
          <div className="space-y-6 animate-fadeIn">
            <GlassCard className="space-y-4">
              <h3 className="text-sm font-bold text-[#1A1A1A] border-b border-[#E8DFD0]/60 pb-2">LaunchDNA Opportunity Synthesis</h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed font-normal whitespace-pre-line">
                {report.market_overview}
              </p>
            </GlassCard>

            {/* Buyer Intent Panel */}
            <GlassCard className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#1A1A1A]">Buyer Intent Signals</h3>
                <p className="text-[10px] text-[#6B6B6B] mt-0.5">Expressed transaction motivation from consumer records</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {report.buyer_intent_signals.map((sig, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-[#E8DFD0] bg-[#FAF7F2]/50 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-[#C58B0F] truncate pr-2">{sig.signal}</span>
                      <span className="px-2.5 py-0.5 rounded text-[8px] font-extrabold uppercase bg-[#D4A017]/10 text-[#C58B0F] border border-[#D4A017]/10">
                        Intent: {sig.strength}
                      </span>
                    </div>
                    <blockquote className="text-xs text-[#6B6B6B] italic border-l-2 border-[#D4A017]/30 pl-2.5 leading-relaxed">
                      "{sig.quote}"
                    </blockquote>
                    <div className="flex justify-between items-center text-[10px] text-[#6B6B6B]/80 pt-1">
                      <span>Source: {sig.source}</span>
                      {sig.url && (
                        <a href={sig.url} target="_blank" className="hover:text-[#C58B0F] inline-flex items-center gap-0.5 font-bold">
                          <span>Verify</span>
                          <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        )}

        {/* TAB 2: SAAS BLUEPRINT & CLAUDE CODE PROMPT */}
        {activeTab === 'blueprint' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Blueprint grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <GlassCard className="space-y-4">
                <h3 className="text-xs uppercase tracking-wider font-extrabold text-[#C58B0F] border-b border-[#E8DFD0]/60 pb-2">Product Architecture</h3>
                
                <div className="space-y-3.5">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#6B6B6B] block">Recommended SaaS Name</span>
                    <p className="text-sm font-bold text-[#1A1A1A] mt-0.5">{opportunity.recommended_saas}</p>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#6B6B6B] block">Problem Solved</span>
                    <p className="text-xs text-[#6B6B6B] leading-relaxed mt-0.5">{opportunity.problem_solved}</p>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#6B6B6B] block">Target Audience</span>
                    <p className="text-xs text-[#6B6B6B] leading-relaxed mt-0.5">{opportunity.target_audience}</p>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#6B6B6B] block">Pricing Strategy Recommendation</span>
                    <p className="text-xs text-[#C58B0F] font-bold mt-0.5">{opportunity.pricing_recommendation}</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="space-y-4">
                <h3 className="text-xs uppercase tracking-wider font-extrabold text-[#C58B0F] border-b border-[#E8DFD0]/60 pb-2">Scope & Execution</h3>
                
                <div className="space-y-3.5">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#6B6B6B] block">Core Features (Build These)</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {opportunity.core_features.map((f, i) => (
                        <span key={i} className="px-2.5 py-0.5 rounded-lg bg-[#D4A017]/5 border border-[#D4A017]/10 text-[10px] font-bold text-[#C58B0F]">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#6B6B6B] block">Features to Ignore (Avoid These)</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {opportunity.features_to_ignore.map((f, i) => (
                        <span key={i} className="px-2.5 py-0.5 rounded-lg bg-[#B44C4C]/5 border border-[#B44C4C]/10 text-[10px] font-bold text-[#B44C4C]">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#6B6B6B] block">Vetted Tech Stack</span>
                    <p className="text-xs text-[#6B6B6B] mt-0.5">{opportunity.tech_stack.join(', ')}</p>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Claude Code Prompt Card */}
            <GlassCard className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-[#C58B0F]" />
                  <div>
                    <h3 className="text-sm font-bold text-[#1A1A1A]">Generate Build Prompt</h3>
                    <p className="text-[10px] text-[#6B6B6B] mt-0.5">Feed this prompt into Claude Code to scaffold the SaaS application</p>
                  </div>
                </div>
                <button
                  onClick={handleCopyPrompt}
                  className="px-4 py-2 rounded-xl border border-[#E8DFD0] bg-[#FAF7F2] hover:bg-[#F5EFE4] text-xs font-bold text-[#1A1A1A] inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  {copiedPrompt ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#4C8C4A]" />
                      <span className="text-[#4C8C4A]">Copied Prompt</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Build Prompt</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative">
                <pre className="p-4 bg-[#FAF7F2] border border-[#E8DFD0] rounded-xl text-[11px] text-[#6B6B6B] overflow-x-auto whitespace-pre-wrap font-mono max-h-80 leading-relaxed">
                  {report.claude_prompt}
                </pre>
              </div>
            </GlassCard>
          </div>
        )}

        {/* TAB 3: GAPS & PAIN POINTS WITH SOURCE EVIDENCE */}
        {activeTab === 'gaps' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Market Gaps */}
            <GlassCard className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#1A1A1A]">Market Gap Diagnostics</h3>
                <p className="text-[10px] text-[#6B6B6B] mt-0.5">Unmet demands identified from user discussions</p>
              </div>
              
              <div className="space-y-4">
                {report.market_gaps.map((gap, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-[#E8DFD0] bg-[#FAF7F2]/50 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-bold text-[#1A1A1A]">{gap.gap_name}</h4>
                      <span className="px-2.5 py-0.5 rounded-lg text-[9px] font-bold uppercase bg-[#B44C4C]/5 text-[#B44C4C] border border-[#B44C4C]/10">
                        Demand Level: {gap.demand_level}
                      </span>
                    </div>
                    <p className="text-xs text-[#6B6B6B] leading-relaxed">{gap.description}</p>
                    
                    {/* Embedded evidence transcript */}
                    <div className="p-3 bg-white border border-[#E8DFD0] rounded-xl space-y-2">
                      <span className="text-[9px] uppercase font-bold text-[#6B6B6B] block">Evidence Quote:</span>
                      <blockquote className="text-xs text-[#6B6B6B] italic leading-relaxed">
                        "{gap.evidence.quote}"
                      </blockquote>
                      <div className="flex justify-between items-center text-[9px] text-[#6B6B6B] pt-1">
                        <span>Source: {gap.evidence.source}</span>
                        {gap.evidence.url && (
                          <a href={gap.evidence.url} target="_blank" className="hover:text-[#C58B0F] inline-flex items-center gap-0.5 font-bold">
                            <span>Verify Source</span>
                            <ExternalLink className="h-2 w-2" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Pain Points with Expandable Evidence Accordion */}
            <GlassCard className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#1A1A1A]">Validated Pain Points</h3>
                <p className="text-[10px] text-[#6B6B6B] mt-0.5">Scraped user frustration groups</p>
              </div>

              <div className="space-y-3">
                {painPoints.map((pain) => {
                  const isExpanded = !!expandedPains[pain.id];
                  
                  return (
                    <div key={pain.id} className="border border-[#E8DFD0] rounded-xl bg-[#FAF7F2]/30 overflow-hidden">
                      <button
                        onClick={() => togglePainExpansion(pain.id)}
                        className="w-full p-4 flex justify-between items-center text-left hover:bg-[#F5EFE4]/20 transition-colors cursor-pointer"
                      >
                        <div className="space-y-1 pr-4">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <h4 className="text-xs font-bold text-[#1A1A1A]">{pain.title}</h4>
                            <span className={`px-2 py-0.5 rounded-lg text-[8px] font-extrabold uppercase border ${
                              pain.severity === 'high' 
                                ? 'bg-[#B44C4C]/5 text-[#B44C4C] border-[#B44C4C]/10' 
                                : pain.severity === 'medium' 
                                  ? 'bg-[#C58B0F]/5 text-[#C58B0F] border-[#C58B0F]/10' 
                                  : 'bg-[#D4A017]/5 text-[#C58B0F] border-[#D4A017]/10'
                            }`}>
                              {pain.severity} Severity
                            </span>
                          </div>
                          <p className="text-[11px] text-[#6B6B6B] leading-relaxed">{pain.description}</p>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-bold text-[#6B6B6B] flex-shrink-0">
                          <span>{pain.mentions} Mentions</span>
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </div>
                      </button>

                      {/* Expandable Evidence Layer */}
                      {isExpanded && (
                        <div className="p-4 border-t border-[#E8DFD0] bg-white space-y-4">
                          <span className="text-[9px] uppercase font-bold text-[#6B6B6B] block">Verbatim Customer Evidence ({pain.example_quotes.length})</span>
                          {pain.example_quotes.map((q, qidx) => (
                            <div key={qidx} className="p-3 bg-[#FAF7F2] border border-[#E8DFD0] rounded-xl space-y-2">
                              <blockquote className="text-xs text-[#6B6B6B] italic leading-relaxed">
                                "{q.quote}"
                              </blockquote>
                              <div className="flex justify-between items-center text-[9px] text-[#6B6B6B] pt-1 border-t border-[#E8DFD0]/60">
                                <span>Source: {q.source}</span>
                                <div className="flex gap-4">
                                  <span>Confidence: {Math.round(q.confidence * 100)}%</span>
                                  {q.url && (
                                    <a href={q.url} target="_blank" className="hover:text-[#C58B0F] inline-flex items-center gap-0.5 font-bold">
                                      <span>Verify Link</span>
                                      <ExternalLink className="h-2 w-2" />
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </div>
        )}

        {/* TAB 4: SWOT & COMPETITORS */}
        {activeTab === 'competitors' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {competitors.map((comp) => (
                <GlassCard key={comp.id} className="space-y-4">
                  <div className="flex justify-between items-start border-b border-[#E8DFD0]/60 pb-2">
                    <h3 className="text-sm font-bold text-[#1A1A1A]">{comp.name}</h3>
                    <span className="text-[10px] text-[#6B6B6B] font-bold">{comp.mentions} Mentions in Logs</span>
                  </div>

                  {/* Strengths */}
                  <div className="space-y-1.5">
                    <span className="text-[9px] uppercase font-bold text-[#4C8C4A] block">Competitor Strengths</span>
                    <ul className="space-y-1">
                      {comp.strengths.map((str, idx) => (
                        <li key={idx} className="text-xs text-[#6B6B6B] flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#4C8C4A]" />
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses & Quotes */}
                  <div className="space-y-2.5 pt-3 border-t border-[#E8DFD0]/60">
                    <span className="text-[9px] uppercase font-bold text-[#B44C4C] block">Weaknesses & Evidence</span>
                    {comp.weaknesses.map((weak, idx) => (
                      <div key={idx} className="p-3 bg-[#FAF7F2] border border-[#E8DFD0] rounded-xl space-y-2">
                        <p className="text-xs font-bold text-[#1A1A1A]">{weak.weakness}</p>
                        <blockquote className="text-[11px] text-[#6B6B6B] italic leading-relaxed border-l-2 border-[#B44C4C]/20 pl-2">
                          "{weak.quote}"
                        </blockquote>
                        <div className="flex justify-between items-center text-[9px] text-[#6B6B6B]">
                          <span>Source: {weak.source}</span>
                          {weak.url && (
                            <a href={weak.url} target="_blank" className="hover:text-[#C58B0F] inline-flex items-center gap-0.5 font-bold">
                              <span>Verify Link</span>
                              <ExternalLink className="h-2 w-2" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: LAUNCH STRATEGY */}
        {activeTab === 'launch' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            <GlassCard className="space-y-4">
              <h3 className="text-xs uppercase tracking-wider font-bold text-[#C58B0F] border-b border-[#E8DFD0]/60 pb-2">First 100 Users Strategy</h3>
              
              <div className="space-y-3">
                <div className="p-3 bg-[#FAF7F2] border border-[#E8DFD0] rounded-xl">
                  <h4 className="text-xs font-bold text-[#1A1A1A]">Cold Outreach Strategy</h4>
                  <p className="text-xs text-[#6B6B6B] mt-1 leading-relaxed">
                    Identify users who wrote the source posts scraped in this report. Send personalized messages referencing their specific complaints, presenting a free alpha link solving their exact issue.
                  </p>
                </div>
                
                <div className="p-3 bg-[#FAF7F2] border border-[#E8DFD0] rounded-xl">
                  <h4 className="text-xs font-bold text-[#1A1A1A]">Subreddit GTM Targets</h4>
                  <p className="text-xs text-[#6B6B6B] mt-1 leading-relaxed">
                    Target subreddits related to the keywords (e.g. {opportunity.target_audience.includes('fitness') ? 'r/fitnessindia, r/india' : 'r/getdisciplined, r/SaaS'}). Share validation calculators or data databases rather than direct signup links to build initial trust.
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="space-y-4">
              <h3 className="text-xs uppercase tracking-wider font-bold text-[#C58B0F] border-b border-[#E8DFD0]/60 pb-2">SEO & Lead Magnet Ideation</h3>
              
              <div className="space-y-3">
                <div className="p-3 bg-[#FAF7F2] border border-[#E8DFD0] rounded-xl">
                  <h4 className="text-xs font-bold text-[#1A1A1A]">High-Intent Keywords</h4>
                  <p className="text-xs text-[#6B6B6B] mt-1 leading-relaxed">
                    "{search.keyword} free alternative", "cheapest {search.keyword} client", "flexible {search.keyword} API"
                  </p>
                </div>

                <div className="p-3 bg-[#FAF7F2] border border-[#E8DFD0] rounded-xl">
                  <h4 className="text-xs font-bold text-[#1A1A1A]">Recommended Lead Magnet</h4>
                  <p className="text-xs text-[#6B6B6B] mt-1 leading-relaxed">
                    A free JSON data spreadsheet or single-purpose calculator tool resolving the primary database/complexity pain point. Offer this tool to collect initial user emails.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
}
