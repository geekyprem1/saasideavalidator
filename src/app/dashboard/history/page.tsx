'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getRecentSearchesAction } from '../../actions/research';
import { GlassCard } from '../../../components/ui/glass-card';
import { 
  History, 
  ArrowRight, 
  Search, 
  Activity, 
  Filter, 
  Calendar,
  Award,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { Search as SearchType } from '../../../lib/types';

export default function HistoryPage() {
  const [loading, setLoading] = useState(true);
  const [searches, setSearches] = useState<SearchType[]>([]);
  const [filteredSearches, setFilteredSearches] = useState<SearchType[]>([]);
  
  // Filters state
  const [query, setQuery] = useState('');
  const [verdictFilter, setVerdictFilter] = useState<'ALL' | 'YES' | 'MAYBE' | 'NO'>('ALL');
  const [scoreFilter, setScoreFilter] = useState<'ALL' | 'HIGH' | 'MED' | 'LOW'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'HEALTH' | 'PRODUCTIVITY' | 'FINANCE' | 'GENERAL'>('ALL');

  useEffect(() => {
    async function loadData() {
      try {
        const response = await getRecentSearchesAction();
        if (response.success && response.data) {
          setSearches(response.data);
          setFilteredSearches(response.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter application trigger
  useEffect(() => {
    let result = [...searches];

    // Search query match
    if (query.trim()) {
      result = result.filter(s => s.keyword.toLowerCase().includes(query.toLowerCase()));
    }

    // Verdict match
    if (verdictFilter !== 'ALL') {
      result = result.filter(s => {
        const score = s.opportunity_score;
        if (verdictFilter === 'YES') return score >= 80;
        if (verdictFilter === 'MAYBE') return score >= 60 && score < 80;
        return score < 60;
      });
    }

    // Score Range match
    if (scoreFilter !== 'ALL') {
      result = result.filter(s => {
        const score = s.opportunity_score;
        if (scoreFilter === 'HIGH') return score >= 80;
        if (scoreFilter === 'MED') return score >= 60 && score < 80;
        return score < 60;
      });
    }

    // Category match
    if (categoryFilter !== 'ALL') {
      result = result.filter(s => {
        const kw = s.keyword.toLowerCase();
        const detected = detectCategory(kw);
        return detected.toUpperCase() === categoryFilter;
      });
    }

    setFilteredSearches(result);
  }, [query, verdictFilter, scoreFilter, categoryFilter, searches]);

  function detectCategory(keyword: string): string {
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
    return 'general';
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#1A1A1A]">Venture Archive Catalog</h2>
          <p className="text-xs text-[#6B6B6B]">Search and filter past SaaS idea validation logs and opportunity scores.</p>
        </div>
        <Link
          href="/dashboard/search"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4A017] hover:bg-[#C58B0F] text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
        >
          <Search className="h-4 w-4" />
          <span>New Analysis</span>
        </Link>
      </div>

      {/* Filter Controls Pane */}
      <GlassCard className="p-5 border-[#E8DFD0] space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search keyword archives..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#FAF7F2] border border-[#E8DFD0] rounded-xl text-xs text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#D4A017] transition-all"
            />
            <Search className="absolute left-3.5 top-3 h-3.5 w-3.5 text-gray-400" />
          </div>

          {/* Filters Selector triggers */}
          <div className="flex flex-wrap gap-3 w-full md:w-auto items-center justify-end">
            
            {/* Verdict Filter */}
            <div className="flex items-center gap-1.5 bg-[#FAF7F2] border border-[#E8DFD0] px-3 py-1.5 rounded-xl text-[10px] font-semibold text-[#6B6B6B]">
              <span>Verdict:</span>
              <select 
                value={verdictFilter} 
                onChange={(e) => setVerdictFilter(e.target.value as any)}
                className="bg-transparent focus:outline-none font-bold text-[#1A1A1A] cursor-pointer"
              >
                <option value="ALL">All</option>
                <option value="YES">YES</option>
                <option value="MAYBE">MAYBE</option>
                <option value="NO">NO</option>
              </select>
            </div>

            {/* Score Filter */}
            <div className="flex items-center gap-1.5 bg-[#FAF7F2] border border-[#E8DFD0] px-3 py-1.5 rounded-xl text-[10px] font-semibold text-[#6B6B6B]">
              <span>Score:</span>
              <select 
                value={scoreFilter} 
                onChange={(e) => setScoreFilter(e.target.value as any)}
                className="bg-transparent focus:outline-none font-bold text-[#1A1A1A] cursor-pointer"
              >
                <option value="ALL">All</option>
                <option value="HIGH">80+ (High)</option>
                <option value="MED">60-80 (Medium)</option>
                <option value="LOW">&lt;60 (Low)</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5 bg-[#FAF7F2] border border-[#E8DFD0] px-3 py-1.5 rounded-xl text-[10px] font-semibold text-[#6B6B6B]">
              <span>Category:</span>
              <select 
                value={categoryFilter} 
                onChange={(e) => setCategoryFilter(e.target.value as any)}
                className="bg-transparent focus:outline-none font-bold text-[#1A1A1A] cursor-pointer"
              >
                <option value="ALL">All</option>
                <option value="HEALTH">Health & Diet</option>
                <option value="PRODUCTIVITY">Productivity</option>
                <option value="FINANCE">Finance</option>
                <option value="GENERAL">General</option>
              </select>
            </div>

          </div>
        </div>
      </GlassCard>

      {/* Logs Table List */}
      <GlassCard className="border-[#E8DFD0] space-y-4">
        {loading ? (
          <div className="py-12 text-center text-xs text-gray-400">Loading catalog...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E8DFD0] text-[9px] font-bold tracking-wider text-[#6B6B6B] uppercase">
                  <th className="py-3 px-4">Search Keyword</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Verdict</th>
                  <th className="py-3 px-4">Date Logged</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DFD0]/60 text-xs">
                {filteredSearches.length > 0 ? (
                  filteredSearches.map((search) => {
                    const score = search.opportunity_score;
                    const detectedCat = detectCategory(search.keyword);
                    
                    const scoreColor = score >= 80 
                      ? 'text-[#4C8C4A] bg-[#4C8C4A]/10' 
                      : score >= 60 
                        ? 'text-[#C58B0F] bg-[#C58B0F]/10' 
                        : 'text-[#B44C4C] bg-[#B44C4C]/10';

                    let verdictLabel = 'MAYBE';
                    let verdictBadge = 'bg-[#C58B0F]/10 text-[#C58B0F] border-[#C58B0F]/20';
                    if (score >= 80) {
                      verdictLabel = 'YES';
                      verdictBadge = 'bg-[#4C8C4A]/10 text-[#4C8C4A] border-[#4C8C4A]/20';
                    } else if (score < 60) {
                      verdictLabel = 'NO';
                      verdictBadge = 'bg-[#B44C4C]/10 text-[#B44C4C] border-[#B44C4C]/20';
                    }

                    return (
                      <tr key={search.id} className="hover:bg-[#F5EFE4]/30 transition-colors group">
                        <td className="py-3.5 px-4 font-semibold text-[#1A1A1A]">{search.keyword}</td>
                        <td className="py-3.5 px-4 text-[#6B6B6B] capitalize font-medium">{detectedCat}</td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${
                            search.status === 'completed' 
                              ? 'bg-[#4C8C4A]/5 text-[#4C8C4A] border border-[#4C8C4A]/10' 
                              : search.status === 'failed' 
                                ? 'bg-[#B44C4C]/5 text-[#B44C4C] border border-[#B44C4C]/10' 
                                : 'bg-[#D4A017]/5 text-[#C58B0F] border border-[#D4A017]/10 animate-pulse'
                          }`}>
                            {search.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          {search.status === 'completed' ? (
                            <span className={`px-2 py-0.5 rounded-md font-bold ${scoreColor}`}>
                              {score}%
                            </span>
                          ) : '--'}
                        </td>
                        <td className="py-3.5 px-4">
                          {search.status === 'completed' ? (
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${verdictBadge}`}>
                              {verdictLabel}
                            </span>
                          ) : '--'}
                        </td>
                        <td className="py-3.5 px-4 text-[#6B6B6B]">
                          {new Date(search.created_at).toLocaleDateString(undefined, { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {search.status === 'completed' ? (
                            <Link 
                              href={`/dashboard/reports/${search.id}`}
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C58B0F] hover:text-[#D4A017] transition-colors"
                            >
                              <span>Dossier</span>
                              <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                          ) : (
                            <span className="text-[10px] text-gray-400">Processing</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-[#6B6B6B] font-semibold">
                      No matching records found in this search archive.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
