'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Radar, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle,
  TrendingUp,
  Flame,
  Award,
  Terminal,
  Activity,
  Layers,
  ChevronDown,
  Building,
  Check
} from 'lucide-react';
import { GlassCard } from '../components/ui/glass-card';

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const steps = [
    { num: '01', title: 'Enter Idea', desc: 'Type your SaaS category or target opportunity keyword.' },
    { num: '02', title: 'Analyze Customer Pain', desc: 'Social listening adapters parse real-world Reddit threads and App Store reviews.' },
    { num: '03', title: 'Identify Market Gaps', desc: 'Extract unfulfilled customer demands and competitor SWOT weaknesses.' },
    { num: '04', title: 'Generate SaaS Blueprint', desc: 'Receive build scoping, pricing, and copy-ready prompts for Claude Code.' },
    { num: '05', title: 'Launch Faster', desc: 'Get your GTM timeline and outreach playbook to secure your first 100 users.' }
  ];

  const features = [
    { title: 'Opportunity Scoring', desc: 'A six-factor algorithm weighting pain severity and buyer intent to calculate a final score.' },
    { title: 'Market Gap Detection', desc: 'Highlights what users are actively asking for that existing solutions fail to provide.' },
    { title: 'SaaS Blueprint Generator', desc: 'Delivers target audience profiles, core feature sets, and pricing recommendations.' },
    { title: 'Launch Strategy Generator', desc: 'Custom playbooks outlining target subreddits, SEO keywords, and lead magnets.' },
    { title: 'Claude Code Prompt', desc: 'An executive markdown prompt to feed into Claude Code to generate the codebase.' },
    { title: 'Evidence-Based Research', desc: 'Every pain point links directly to a verbatim quote transcript and source URL.' }
  ];

  const faqs = [
    { q: 'How does LaunchDNA scrape data?', a: 'LaunchDNA utilizes public adapters reading DuckDuckGo search indexes (restricted to Reddit discussions) and the Google Play reviews database via play scrapers.' },
    { q: 'Can I test it without API keys?', a: 'Yes! The platform features an offline Sandbox Heuristic mode. If API credentials are not set, it uses advanced parsing matching your keyword to generate reports.' },
    { q: 'Is the billing live?', a: 'No, this is currently in validation mode. Billing features are prepared but not active.' }
  ];

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] bg-grid overflow-hidden flex flex-col justify-between text-[#1A1A1A]">
      {/* Background ambient accents */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#D4A017]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#D4A017]/3 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-[#E8DFD0] bg-[#FAF7F2]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#D4A017]/10 border border-[#D4A017]/20 text-[#C58B0F]">
              <Radar className="h-5 w-5" />
            </div>
            <span className="font-bold text-sm tracking-wide text-[#1A1A1A]">
              LaunchDNA
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-xs font-bold text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/dashboard" 
              className="text-xs font-bold bg-[#D4A017] hover:bg-[#C58B0F] text-white px-4 py-2 rounded-xl transition-all shadow-sm"
            >
              Launch Platform
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto w-full px-6 py-12 space-y-24 z-10">
        
        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-6">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D4A017]/20 bg-[#D4A017]/5 text-[9px] font-bold text-[#C58B0F] tracking-widest uppercase">
              AI Founder Decision Platform
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#1A1A1A] leading-tight">
              Discover SaaS Opportunities <br />
              <span className="text-[#C58B0F]">Worth Building</span>
            </h1>
            
            <p className="text-xs md:text-sm text-[#6B6B6B] leading-relaxed max-w-xl font-medium">
              LaunchDNA analyzes real customer conversations and market signals to help founders decide what to build next.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/dashboard/search"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[#D4A017] hover:bg-[#C58B0F] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-[#D4A017]/10"
              >
                Analyze an Idea
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/dashboard/reports/11111111-1111-1111-1111-111111111111"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#E8DFD0] bg-white hover:bg-[#FAF7F2] rounded-xl text-xs font-bold text-[#1A1A1A] transition-all shadow-sm"
              >
                View Sample Report
              </Link>
            </div>
          </div>

          {/* Right Hero: McKinsey-Style Preview card */}
          <div className="lg:col-span-5">
            <GlassCard className="p-6 border-[#E8DFD0] space-y-5 shadow-lg border-t-4 border-t-[#D4A017]">
              <div className="flex justify-between items-start border-b border-[#E8DFD0]/60 pb-3">
                <div>
                  <span className="text-[8px] uppercase tracking-wider font-extrabold text-[#6B6B6B]">Vetted Opportunity</span>
                  <h4 className="text-xs font-bold text-[#1A1A1A]">Indian Calorie Counter</h4>
                </div>
                <span className="px-2.5 py-0.5 rounded bg-[#4C8C4A]/10 text-[#4C8C4A] border border-[#4C8C4A]/20 text-[9px] font-extrabold uppercase">
                  Verdict: YES
                </span>
              </div>

              <div className="space-y-3.5 text-xs text-[#6B6B6B]">
                <div className="flex justify-between">
                  <span>LaunchDNA Score</span>
                  <span className="font-bold text-[#1A1A1A]">88/100</span>
                </div>
                <div className="flex justify-between">
                  <span>Revenue Potential</span>
                  <span className="font-bold text-[#1A1A1A]">$15k - $50k/mo</span>
                </div>
                <div className="flex justify-between">
                  <span>Market Demand</span>
                  <span className="font-bold text-[#1A1A1A]">Very High</span>
                </div>
              </div>

              <div className="p-3 bg-[#FAF7F2] border border-[#E8DFD0] rounded-xl space-y-1.5">
                <span className="text-[8px] uppercase font-bold text-[#C58B0F] block">Primary Insight</span>
                <p className="text-[10px] text-[#6B6B6B] leading-relaxed">
                  "Existing calorie counter databases fail on regional Indian dishes. Users are looking for raw-ingredient batch trackers."
                </p>
              </div>
              
              <div className="text-[8px] text-center font-bold text-[#C58B0F]/80 uppercase tracking-widest pt-1 border-t border-[#E8DFD0]/40">
                Powered by LaunchDNA™ Engine
              </div>
            </GlassCard>
          </div>
        </div>

        {/* TRUST SECTION: 4 CARDS */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <GlassCard className="p-5 space-y-2">
              <span className="text-xs font-bold text-[#C58B0F] block">01 / Founder Focused</span>
              <p className="text-[11px] text-[#6B6B6B] leading-relaxed">Built to answer the build viability question before coding starts.</p>
            </GlassCard>
            <GlassCard className="p-5 space-y-2">
              <span className="text-xs font-bold text-[#C58B0F] block">02 / Evidence Based</span>
              <p className="text-[11px] text-[#6B6B6B] leading-relaxed">No AI hallucinations. Every report contains verbatim user quotes.</p>
            </GlassCard>
            <GlassCard className="p-5 space-y-2">
              <span className="text-xs font-bold text-[#C58B0F] block">03 / AI Powered</span>
              <p className="text-[11px] text-[#6B6B6B] leading-relaxed">DeepSeek V3 structure extraction and Gemini Flash compilers via LaunchDNA™ Engine.</p>
            </GlassCard>
            <GlassCard className="p-5 space-y-2">
              <span className="text-xs font-bold text-[#C58B0F] block">04 / Fast Validation</span>
              <p className="text-[11px] text-[#6B6B6B] leading-relaxed">Execute social adapters and scoring filters in less than 5 seconds.</p>
            </GlassCard>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="space-y-8">
          <div className="text-center">
            <span className="text-[9px] uppercase font-bold text-[#C58B0F] tracking-widest block">Workflow</span>
            <h2 className="text-2xl font-black text-[#1A1A1A] mt-1">Timeline to Validation</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {steps.map((step, idx) => (
              <GlassCard key={idx} className="p-5 space-y-3 relative group hover:border-[#D4A017]/30 transition-all">
                <span className="text-3xl font-black text-[#E8DFD0] group-hover:text-[#C58B0F] transition-colors block leading-none">
                  {step.num}
                </span>
                <h4 className="text-xs font-bold text-[#1A1A1A]">{step.title}</h4>
                <p className="text-[10px] text-[#6B6B6B] leading-relaxed">{step.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* FEATURES GRID */}
        <div className="space-y-8">
          <div className="text-center">
            <span className="text-[9px] uppercase font-bold text-[#C58B0F] tracking-widest block">Capabilities</span>
            <h2 className="text-2xl font-black text-[#1A1A1A] mt-1">Platform Features</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feat, idx) => (
              <GlassCard key={idx} className="p-6 border-[#E8DFD0] space-y-2 hover:border-[#D4A017]/30 transition-all">
                <h3 className="text-xs font-bold text-[#1A1A1A]">{feat.title}</h3>
                <p className="text-[11px] text-[#6B6B6B] leading-relaxed">{feat.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* SAAS BLUEPRINT PREVIEW */}
        <div className="space-y-6">
          <div className="text-center">
            <span className="text-[9px] uppercase font-bold text-[#C58B0F] tracking-widest block">Execution Blueprint</span>
            <h2 className="text-2xl font-black text-[#1A1A1A] mt-1">Product Blueprint Preview</h2>
          </div>

          <GlassCard className="p-8 border-[#E8DFD0] max-w-4xl mx-auto space-y-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#6B6B6B]">
              <div className="space-y-3">
                <div>
                  <span className="text-[9px] uppercase font-bold text-gray-400">Recommended SaaS</span>
                  <p className="text-xs font-bold text-[#1A1A1A] mt-0.5">ElasticHabits AI</p>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-gray-400">Target Audience</span>
                  <p className="text-xs text-[#6B6B6B] mt-0.5 leading-relaxed">Busy creators and software developers hating manual checklist check-ins.</p>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-gray-400">Pricing Strategy</span>
                  <p className="text-xs text-[#C58B0F] font-bold mt-0.5">$4/month (Elastic features paywall)</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[9px] uppercase font-bold text-gray-400">Core Features</span>
                  <p className="text-xs text-[#6B6B6B] mt-0.5 leading-relaxed">GitHub commit auto-tracker, Grace day configuration streaks.</p>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-gray-400">Vetted Tech Stack</span>
                  <p className="text-xs text-[#6B6B6B] mt-0.5">Next.js 15, Tailwind CSS, Supabase, Resend</p>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-gray-400">Build Time</span>
                  <p className="text-xs text-[#1A1A1A] font-bold mt-0.5">10-14 Days</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* PRICING PLANS */}
        <div className="space-y-8">
          <div className="text-center">
            <span className="text-[9px] uppercase font-bold text-[#C58B0F] tracking-widest block">Pricing</span>
            <h2 className="text-2xl font-black text-[#1A1A1A] mt-1">Venture Access Plans</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Starter */}
            <GlassCard className="p-6 border-[#E8DFD0] flex flex-col justify-between h-80 bg-[#FAF7F2]/40 opacity-70">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-[#1A1A1A]">Starter</h3>
                <p className="text-[#6B6B6B] text-xs">For side-project validation</p>
                <h4 className="text-xl font-black text-[#1A1A1A] pt-2">$19<span className="text-xs text-gray-400 font-normal"> / mo</span></h4>
              </div>
              <ul className="text-[10px] text-gray-500 space-y-1.5 py-4 border-t border-[#E8DFD0]/60">
                <li>5 Search opportunities / month</li>
                <li>Reddit & Play Store scrapers</li>
                <li>Claude code prompt download</li>
              </ul>
              <Link href="/login" className="py-2 bg-white border border-[#E8DFD0] rounded-xl text-[10px] font-bold text-center hover:bg-[#F5EFE4] transition-all">
                Get Started
              </Link>
            </GlassCard>

            {/* Pro */}
            <GlassCard className="p-6 border-[#D4A017] bg-[#D4A017]/5 flex flex-col justify-between h-80 relative shadow-md">
              <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-[#D4A017] text-[8px] font-extrabold text-white tracking-widest uppercase">
                Popular
              </span>
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-[#1A1A1A]">Professional</h3>
                <p className="text-[#C58B0F] text-xs">For serial builders & founders</p>
                <h4 className="text-xl font-black text-[#1A1A1A] pt-2">$49<span className="text-xs text-[#C58B0F] font-normal"> / mo</span></h4>
              </div>
              <ul className="text-[10px] text-[#6B6B6B] space-y-1.5 py-4 border-t border-[#D4A017]/20">
                <li className="font-bold text-[#1A1A1A]">100 Search opportunities / month</li>
                <li>Access to Global Moat Category Database</li>
                <li>Verified Evidence Quote Layer</li>
              </ul>
              <Link href="/login" className="py-2 bg-[#D4A017] hover:bg-[#C58B0F] text-white rounded-xl text-[10px] font-bold text-center transition-all shadow-sm">
                Get Started
              </Link>
            </GlassCard>

            {/* Agency */}
            <GlassCard className="p-6 border-[#E8DFD0] flex flex-col justify-between h-80 bg-[#FAF7F2]/40 opacity-70">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-[#1A1A1A]">Agency</h3>
                <p className="text-[#6B6B6B] text-xs">For venture studios & agencies</p>
                <h4 className="text-xl font-black text-[#1A1A1A] pt-2">$149<span className="text-xs text-gray-400 font-normal"> / mo</span></h4>
              </div>
              <ul className="text-[10px] text-gray-500 space-y-1.5 py-4 border-t border-[#E8DFD0]/60">
                <li>Unlimited validation searches</li>
                <li>Dedicated API endpoint client</li>
                <li>Razorpay payments integration ready</li>
              </ul>
              <Link href="/login" className="py-2 bg-white border border-[#E8DFD0] rounded-xl text-[10px] font-bold text-center hover:bg-[#F5EFE4] transition-all">
                Get Started
              </Link>
            </GlassCard>
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div className="space-y-8">
          <div className="text-center">
            <span className="text-[9px] uppercase font-bold text-[#C58B0F] tracking-widest block">Reviews</span>
            <h2 className="text-2xl font-black text-[#1A1A1A] mt-1">Founder Testimonials</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <GlassCard className="p-6 space-y-3">
              <blockquote className="text-xs text-[#6B6B6B] leading-relaxed italic">
                "LaunchDNA saved us at least 3 weeks of custom database setup. The Indian Calorie Counter report clearly mapped the exact pain points. The Claude Code Prompt generated the core weight recipe builder in 10 minutes."
              </blockquote>
              <div className="text-[10px] font-bold text-[#1A1A1A]">
                — Rohan S., Solo Founder of GharKaCalorie
              </div>
            </GlassCard>
            
            <GlassCard className="p-6 space-y-3">
              <blockquote className="text-xs text-[#6B6B6B] leading-relaxed italic">
                "Finding customer quotes that prove why existing competitor apps are failing is the ultimate validation tool. Highly research-oriented."
              </blockquote>
              <div className="text-[10px] font-bold text-[#1A1A1A]">
                — Alexis G., Venture Operator
              </div>
            </GlassCard>
          </div>
        </div>

        {/* FAQ ACCORDION */}
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-[#1A1A1A]">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-2.5">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="border border-[#E8DFD0] rounded-xl bg-white overflow-hidden">
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 flex justify-between items-center text-left text-xs font-bold text-[#1A1A1A] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 text-[#6B6B6B] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 border-t border-[#E8DFD0] bg-[#FAF7F2]/30 text-xs text-[#6B6B6B] leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="max-w-3xl mx-auto text-center space-y-6 py-12">
          <h2 className="text-3xl font-black text-[#1A1A1A]">Stop Guessing What To Build</h2>
          <p className="text-xs text-[#6B6B6B] max-w-md mx-auto">Build products people actually want. Validate customer complaints before coding.</p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4A017] hover:bg-[#C58B0F] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-[#D4A017]/10"
          >
            <span>Start Free Analysis</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#E8DFD0] bg-white py-6 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} LaunchDNA. McKinsey & Linear consulting aesthetics.</p>
      </footer>
    </div>
  );
}
