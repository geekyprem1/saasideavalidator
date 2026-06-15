import React from 'react';
import Link from 'next/link';
import { db } from '../../../lib/db';
import { GlassCard } from '../../../components/ui/glass-card';
import { 
  FileText, 
  ArrowRight, 
  Search,
  TrendingUp,
  DollarSign
} from 'lucide-react';

export const revalidate = 0;

export default async function ReportsPage() {
  const searches = await db.getRecentSearches();
  const completedReports = searches.filter(s => s.status === 'completed');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#1A1A1A]">SaaS Opportunity Reports</h2>
          <p className="text-xs text-[#6B6B6B]">Directory of compiled market intelligence blueprints and validation scores.</p>
        </div>
        <Link
          href="/dashboard/search"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4A017] hover:bg-[#C58B0F] text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
        >
          <Search className="h-4 w-4" />
          <span>New Analysis</span>
        </Link>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {completedReports.length > 0 ? (
          completedReports.map((report) => {
            const score = report.opportunity_score;
            
            // Verdict mapping
            let verdictLabel: 'YES' | 'NO' | 'MAYBE' = 'MAYBE';
            let badgeStyle = 'bg-[#C58B0F]/10 text-[#C58B0F] border-[#C58B0F]/20';
            let scoreStyle = 'text-[#C58B0F]';
            if (score >= 80) {
              verdictLabel = 'YES';
              badgeStyle = 'bg-[#4C8C4A]/10 text-[#4C8C4A] border-[#4C8C4A]/20';
              scoreStyle = 'text-[#4C8C4A]';
            } else if (score < 60) {
              verdictLabel = 'NO';
              badgeStyle = 'bg-[#B44C4C]/10 text-[#B44C4C] border-[#B44C4C]/20';
              scoreStyle = 'text-[#B44C4C]';
            }

            return (
              <GlassCard key={report.id} className="p-6 border-[#E8DFD0] space-y-4 hover:border-[#D4A017]/30 transition-all group">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-[#1A1A1A] group-hover:text-[#C58B0F] transition-colors">
                      {report.keyword}
                    </h3>
                    <p className="text-[10px] text-[#6B6B6B]">
                      Validated: {new Date(report.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                    </p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${badgeStyle}`}>
                    Verdict: {verdictLabel}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-3 border-t border-[#E8DFD0]/60 text-xs">
                  <div>
                    <span className="text-[8px] uppercase font-bold text-[#6B6B6B] block">Viability Score</span>
                    <span className={`font-bold ${scoreStyle} text-sm mt-0.5 block`}>{score}/100</span>
                  </div>
                  <div>
                    <span className="text-[8px] uppercase font-bold text-[#6B6B6B] block">Revenue Potential</span>
                    <span className="font-semibold text-[#1A1A1A] mt-0.5 block truncate">{report.revenue_potential.split(' ')[0]}</span>
                  </div>
                  <div>
                    <span className="text-[8px] uppercase font-bold text-[#6B6B6B] block">Confidence Level</span>
                    <span className="font-semibold text-gray-700 mt-0.5 block">{report.confidence_score}%</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Link 
                    href={`/dashboard/reports/${report.id}`}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C58B0F] group-hover:text-[#D4A017] transition-colors"
                  >
                    <span>Read Blueprint Report</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </GlassCard>
            );
          })
        ) : (
          <GlassCard className="col-span-2 p-12 text-center border-[#E8DFD0] space-y-3">
            <FileText className="h-8 w-8 text-gray-400 mx-auto" />
            <h3 className="font-bold text-[#1A1A1A]">No Reports Compiled</h3>
            <p className="text-xs text-[#6B6B6B] max-w-sm mx-auto">
              Run your first validation search to trigger adapters and generate opportunity blueprints.
            </p>
            <Link
              href="/dashboard/search"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#D4A017] hover:bg-[#C58B0F] text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer mt-2"
            >
              <span>Analyze SaaS Idea</span>
            </Link>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
