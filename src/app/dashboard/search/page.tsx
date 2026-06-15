'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { triggerResearchAction } from '../../actions/research';
import { GlassCard } from '../../../components/ui/glass-card';
import { 
  Radar, 
  Search, 
  ArrowRight, 
  CheckCircle,
  Clock,
  AlertCircle,
  Cpu,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const SUGGESTIONS = [
  'AI Habit Tracker',
  'Creator CRM',
  'Temple Management Software',
  'Study Planner',
  'Indian Calorie Counter'
];

interface AnalysisStep {
  label: string;
  status: 'idle' | 'running' | 'completed';
}

export default function SearchPage() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Model selection states
  const [extractionModel, setExtractionModel] = useState('deepseek/deepseek-chat');
  const [synthesisModel, setSynthesisModel] = useState('google/gemini-2.5-flash');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedExtraction = localStorage.getItem('launchdna_extraction_model');
    const savedSynthesis = localStorage.getItem('launchdna_synthesis_model');
    if (savedExtraction) setExtractionModel(savedExtraction);
    if (savedSynthesis) setSynthesisModel(savedSynthesis);

    const userEmail = localStorage.getItem('launchdna_user_email');
    setIsAdmin(userEmail === 'admin@launchdna.app');
  }, []);

  const handleExtractionChange = (val: string) => {
    setExtractionModel(val);
    localStorage.setItem('launchdna_extraction_model', val);
  };

  const handleSynthesisChange = (val: string) => {
    setSynthesisModel(val);
    localStorage.setItem('launchdna_synthesis_model', val);
  };
  
  // Design system progress checklist steps
  const [steps, setSteps] = useState<AnalysisStep[]>([
    { label: 'Collecting Reddit Discussions', status: 'idle' },
    { label: 'Collecting App Reviews', status: 'idle' },
    { label: 'Extracting Pain Points', status: 'idle' },
    { label: 'Detecting Buyer Intent', status: 'idle' },
    { label: 'Finding Market Gaps', status: 'idle' },
    { label: 'Calculating LaunchDNA Score', status: 'idle' },
    { label: 'Generating SaaS Blueprint', status: 'idle' },
    { label: 'Creating Founder Verdict', status: 'idle' },
    { label: 'Generating Claude Code Prompt', status: 'idle' }
  ]);
  
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Animate progress checklist steps
  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setSteps(prev => {
        const next = [...prev];
        if (next[activeStepIndex]) {
          next[activeStepIndex].status = 'completed';
        }
        
        const nextIndex = activeStepIndex + 1;
        if (next[nextIndex]) {
          next[nextIndex].status = 'running';
          setActiveStepIndex(nextIndex);
        } else {
          clearInterval(interval);
        }
        return next;
      });
    }, 450); // fast, snappy transitions (about 4s total)

    return () => clearInterval(interval);
  }, [loading, activeStepIndex]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim() || keyword.trim().length < 3) {
      setError('Idea name must be at least 3 characters.');
      return;
    }

    setError(null);
    setLoading(true);
    setActiveStepIndex(0);
    setSteps([
      { label: 'Collecting Reddit Discussions', status: 'running' },
      { label: 'Collecting App Reviews', status: 'idle' },
      { label: 'Extracting Pain Points', status: 'idle' },
      { label: 'Detecting Buyer Intent', status: 'idle' },
      { label: 'Finding Market Gaps', status: 'idle' },
      { label: 'Calculating LaunchDNA Score', status: 'idle' },
      { label: 'Generating SaaS Blueprint', status: 'idle' },
      { label: 'Creating Founder Verdict', status: 'idle' },
      { label: 'Generating Claude Code Prompt', status: 'idle' }
    ]);

    const openrouterApiKey = localStorage.getItem('launchdna_openrouter_key') || undefined;
    const deepseekApiKey = localStorage.getItem('launchdna_deepseek_key') || undefined;
    const geminiApiKey = localStorage.getItem('launchdna_gemini_key') || undefined;

    try {
      const response = await triggerResearchAction(keyword, { 
        extractionModel, 
        synthesisModel,
        openrouterApiKey,
        deepseekApiKey,
        geminiApiKey
      });
      if (response.success && response.searchId) {
        setTimeout(() => {
          router.push(`/dashboard/reports/${response.searchId}`);
        }, 300);
      } else {
        setError(response.error || 'Failed to complete venture analysis.');
        setLoading(false);
      }
    } catch (e: any) {
      setError(e?.message || 'Server connection failed.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col justify-center max-w-2xl mx-auto w-full">
      {!loading ? (
        <div className="space-y-8 animate-fadeIn">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-[#1A1A1A]">Opportunity Validation</h2>
            <p className="text-xs text-[#6B6B6B]">Enter your SaaS keyword to query forums, extract complaints, and calculate viability.</p>
          </div>

          <GlassCard className="p-8 border-[#E8DFD0] space-y-6 shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest block">
                  What SaaS idea are you thinking about?
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. AI Habit Tracker, Creator CRM, Study Planner..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full pl-12 pr-36 py-4 bg-[#FAF7F2] border border-[#E8DFD0] rounded-2xl text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#D4A017] transition-all shadow-inner"
                  />
                  <Search className="absolute left-4.5 top-4.5 h-4.5 w-4.5 text-gray-400" />
                  
                  <button
                    type="submit"
                    className="absolute right-2 top-2 px-5 py-2.5 bg-[#D4A017] hover:bg-[#C58B0F] text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Analyze</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Advanced Model Configuration Toggle (Only visible to Admin) */}
              {isAdmin && (
                <div className="space-y-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex items-center gap-2 text-[10px] font-bold text-[#6B6B6B] hover:text-[#D4A017] transition-colors cursor-pointer uppercase tracking-wider"
                  >
                    <Cpu className="h-3.5 w-3.5 text-[#C58B0F]" />
                    <span>Configure AI Models (Admin)</span>
                    {showAdvanced ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  </button>

                  {showAdvanced && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD0] animate-fadeIn">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-wider block">
                          Extraction Model
                        </label>
                        <select
                          value={extractionModel}
                          onChange={(e) => handleExtractionChange(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-[#E8DFD0] rounded-xl text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4A017] transition-all cursor-pointer"
                        >
                          <option value="deepseek/deepseek-chat">DeepSeek V3 (Default)</option>
                          <option value="openai/gpt-4o-mini">GPT-4o Mini (Fast)</option>
                          <option value="anthropic/claude-3.5-haiku">Claude 3.5 Haiku</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-wider block">
                          Synthesis Model
                        </label>
                        <select
                          value={synthesisModel}
                          onChange={(e) => handleSynthesisChange(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-[#E8DFD0] rounded-xl text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4A017] transition-all cursor-pointer"
                        >
                          <option value="google/gemini-2.5-flash">Gemini 2.5 Flash (Default)</option>
                          <option value="anthropic/claude-3.5-sonnet">Claude 3.5 Sonnet</option>
                          <option value="openai/gpt-4o">GPT-4o (Reasoning)</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </form>

            {/* Suggestions */}
            <div className="space-y-2">
              <span className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-widest block">
                Suggested Ideas
              </span>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((sug) => (
                  <button
                    key={sug}
                    onClick={() => setKeyword(sug)}
                    className="px-3 py-1.5 rounded-lg border border-[#E8DFD0] bg-[#FAF7F2] hover:bg-[#F5EFE4] text-[11px] text-[#6B6B6B] hover:text-[#1A1A1A] font-semibold transition-all cursor-pointer"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>

          {error && (
            <div className="p-4 rounded-xl border border-rose-500/15 bg-rose-500/5 flex items-center gap-3 text-rose-700 text-xs">
              <AlertCircle className="h-4.5 w-4.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
      ) : (
        /* Executive Progress Timeline Stepper */
        <GlassCard className="p-8 border-[#E8DFD0] space-y-8 shadow-md relative overflow-hidden">
          {/* Top subtle gold progress bar */}
          <div className="absolute top-0 left-0 h-1 bg-[#D4A017] transition-all duration-300" style={{ width: `${((activeStepIndex + 1) / steps.length) * 100}%` }} />
          
          <div className="text-center py-4 space-y-2 border-b border-[#E8DFD0]/60">
            <Radar className="h-8 w-8 text-[#C58B0F] animate-spin mx-auto" />
            <h3 className="font-bold text-base text-[#1A1A1A]">Assembling LaunchDNA Dossier</h3>
            <p className="text-xs text-[#6B6B6B]">Querying consumer channels for "{keyword}"</p>
          </div>

          <div className="space-y-3.5 max-w-sm mx-auto">
            {steps.map((step, idx) => {
              const isRunning = step.status === 'running';
              const isCompleted = step.status === 'completed';
              
              return (
                <div 
                  key={idx} 
                  className={`flex gap-3.5 items-center transition-all duration-300 text-xs ${
                    isRunning 
                      ? 'text-[#1A1A1A] font-bold' 
                      : isCompleted 
                        ? 'text-[#6B6B6B] opacity-60' 
                        : 'text-gray-300 opacity-40'
                  }`}
                >
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <CheckCircle className="h-4 w-4 text-[#4C8C4A]" />
                    ) : isRunning ? (
                      <Clock className="h-4 w-4 text-[#C58B0F] animate-pulse" />
                    ) : (
                      <span className="h-4 w-4 rounded-full border border-gray-200 block" />
                    )}
                  </div>
                  <span>{step.label}</span>
                </div>
              );
            })}
          </div>
        </GlassCard>
      )}
    </div>
  );
}
