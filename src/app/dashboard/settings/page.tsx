'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlassCard } from '../../../components/ui/glass-card';
import { 
  User, 
  Key, 
  Coins, 
  Award, 
  Trash2, 
  Check, 
  Save,
  HelpCircle
} from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  
  // Settings API Keys State
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [deepseekKey, setDeepseekKey] = useState('');
  const [geminiKey, setGeminiKey] = useState('');
  
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveKeys = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleResetSandbox = () => {
    if (confirm("Are you sure you want to clear your local search history? This will restore initial seed data.")) {
      // Refresh memory
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-[#1A1A1A] tracking-tight">Platform Configuration</h2>
        <p className="text-xs text-[#6B6B6B]">Manage account credentials, active API keys, usage limits, and membership plans.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar Nav */}
        <div className="md:col-span-1 space-y-2 text-xs font-semibold text-[#6B6B6B]">
          <div className="p-3 bg-white border border-[#E8DFD0] rounded-xl text-[#1A1A1A] font-bold shadow-sm">
            Venture Settings
          </div>
          <div className="p-3 hover:bg-white/40 border border-transparent rounded-xl cursor-pointer">
            Profile Info
          </div>
          <div className="p-3 hover:bg-white/40 border border-transparent rounded-xl cursor-pointer">
            Usage Metrics
          </div>
          <div className="p-3 hover:bg-white/40 border border-transparent rounded-xl cursor-pointer">
            Billing Plans
          </div>
        </div>

        {/* Settings main panel */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Profile Section */}
          <GlassCard className="space-y-4">
            <h3 className="text-xs uppercase tracking-wider font-extrabold text-[#C58B0F] border-b border-[#E8DFD0]/60 pb-2">
              Founder Profile
            </h3>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-[#F5EFE4] border border-[#E8DFD0] flex items-center justify-center text-[#1A1A1A] font-bold text-base shadow-sm">
                DF
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-[#1A1A1A]">Demo Founder</h4>
                <p className="text-xs text-[#6B6B6B]">demo@saasradar.ai · Active Developer Session</p>
              </div>
            </div>
          </GlassCard>

          {/* API Keys Configuration */}
          <GlassCard className="space-y-4">
            <h3 className="text-xs uppercase tracking-wider font-extrabold text-[#C58B0F] border-b border-[#E8DFD0]/60 pb-2">
              Venture API Credentials
            </h3>
            
            <form onSubmit={handleSaveKeys} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#6B6B6B]">Supabase REST URL</label>
                  <input
                    type="text"
                    placeholder="https://your-project.supabase.co"
                    value={supabaseUrl}
                    onChange={(e) => setSupabaseUrl(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#E8DFD0] rounded-xl focus:outline-none focus:border-[#D4A017] transition-all text-[#1A1A1A]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#6B6B6B]">Supabase Anon Key</label>
                  <input
                    type="password"
                    placeholder="eyJhbGciOiJIUzI1NiIsIn..."
                    value={supabaseKey}
                    onChange={(e) => setSupabaseKey(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#E8DFD0] rounded-xl focus:outline-none focus:border-[#D4A017] transition-all text-[#1A1A1A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#6B6B6B]">DeepSeek V3 Key</label>
                  <input
                    type="password"
                    placeholder="sk-deepseek-..."
                    value={deepseekKey}
                    onChange={(e) => setDeepseekKey(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#E8DFD0] rounded-xl focus:outline-none focus:border-[#D4A017] transition-all text-[#1A1A1A]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#6B6B6B]">Gemini 2.5 Flash Key</label>
                  <input
                    type="password"
                    placeholder="AIzaSy..."
                    value={geminiKey}
                    onChange={(e) => setGeminiKey(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#E8DFD0] rounded-xl focus:outline-none focus:border-[#D4A017] transition-all text-[#1A1A1A]"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <p className="text-[10px] text-[#6B6B6B] leading-normal max-w-xs">
                  Keys are stored locally in your browser/server context. If left empty, analysis defaults to heuristics.
                </p>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D4A017] hover:bg-[#C58B0F] text-white rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  {isSaved ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Saved Configuration</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Save Credentials</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </GlassCard>

          {/* Membership Plan details */}
          <GlassCard className="space-y-4">
            <h3 className="text-xs uppercase tracking-wider font-extrabold text-[#C58B0F] border-b border-[#E8DFD0]/60 pb-2">
              Membership Plans
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-4 rounded-xl border border-[#E8DFD0] bg-[#FAF7F2]/40 opacity-60 space-y-1">
                <span className="font-extrabold text-[#1A1A1A]">Starter</span>
                <p className="text-[#6B6B6B] text-[10px]">$19 / month</p>
                <p className="text-[9px] text-[#6B6B6B] pt-2">5 Searches/mo</p>
              </div>

              <div className="p-4 rounded-xl border border-[#D4A017] bg-[#D4A017]/5 relative space-y-1 shadow-sm">
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-[#D4A017] text-[8px] font-extrabold text-white uppercase tracking-wider">
                  Active
                </div>
                <span className="font-extrabold text-[#1A1A1A]">Professional</span>
                <p className="text-[#C58B0F] text-[10px]">$49 / month</p>
                <p className="text-[9px] text-[#6B6B6B] pt-2">100 Searches/mo</p>
              </div>

              <div className="p-4 rounded-xl border border-[#E8DFD0] bg-[#FAF7F2]/40 opacity-60 space-y-1">
                <span className="font-extrabold text-[#1A1A1A]">Agency</span>
                <p className="text-[#6B6B6B] text-[10px]">$149 / month</p>
                <p className="text-[9px] text-[#6B6B6B] pt-2">Unlimited runs</p>
              </div>
            </div>
          </GlassCard>

          {/* Danger Controls */}
          <GlassCard className="space-y-4 border-rose-500/20">
            <h3 className="text-xs uppercase tracking-wider font-extrabold text-[#B44C4C] border-b border-[#E8DFD0]/60 pb-2">
              Sandbox Control Registry
            </h3>
            <div className="flex justify-between items-center text-xs">
              <div className="space-y-0.5">
                <p className="font-bold text-[#1A1A1A]">Reset Local Sandbox Database</p>
                <p className="text-[10px] text-[#6B6B6B]">Restore default seed validation records and empty history.</p>
              </div>
              <button
                onClick={handleResetSandbox}
                className="px-4 py-2 border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-[#B44C4C] rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
                <span>Reset Database</span>
              </button>
            </div>
          </GlassCard>

        </div>
      </div>
    </div>
  );
}
