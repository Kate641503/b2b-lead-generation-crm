import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Mail, 
  MessageSquare, 
  CalendarCheck, 
  Download, 
  Printer, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Clock,
  ArrowUpRight,
  PieChart,
  Layers,
  Award
} from 'lucide-react';
import { Lead, Campaign } from '../types';

interface CampaignReportViewProps {
  leads: Lead[];
  campaigns: Campaign[];
}

export const CampaignReportView: React.FC<CampaignReportViewProps> = ({
  leads = [],
  campaigns = [],
}) => {
  // Aggregate Metrics
  const leadsResearched = 15;
  const qualifiedLeads = 13;
  const emailsSent = 42; // Aggregate across active cadences
  const replies = 10;
  const interestedProspects = 3;
  const appointmentsBooked = 2;
  const conversionRate = '13.3%';

  // Lead Source counts
  const sourceBreakdown = [
    { name: 'LinkedIn Sales Nav', count: 5, percentage: 33.3, color: 'bg-indigo-600' },
    { name: 'Apollo.io', count: 4, percentage: 26.7, color: 'bg-blue-500' },
    { name: 'Trade / Industry Directory', count: 3, percentage: 20.0, color: 'bg-amber-500' },
    { name: 'Conference List', count: 2, percentage: 13.3, color: 'bg-purple-500' },
    { name: 'Warm Referral', count: 1, percentage: 6.7, color: 'bg-emerald-500' },
  ];

  // Priority counts
  const priorityBreakdown = [
    { priority: 'High', count: leads.filter(l => l.priority === 'High').length, percentage: 60, color: 'bg-rose-500' },
    { priority: 'Medium', count: leads.filter(l => l.priority === 'Medium').length, percentage: 33, color: 'bg-amber-500' },
    { priority: 'Low', count: leads.filter(l => l.priority === 'Low').length, percentage: 7, color: 'bg-slate-400' },
  ];

  return (
    <div className="space-y-6 pb-12" id="printable-campaign-report">
      {/* Report Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider mb-2 border border-indigo-200">
            <Sparkles className="w-3 h-3" />
            <span>EXECUTIVE CAMPAIGN REPORT &bull; DEMO / SAMPLE DATA</span>
          </div>
          <h3 className="text-xl font-bold font-display text-slate-900">
            Q3 B2B Outreach & Lead Operations Summary
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Prepared by <strong>Catherine Ngina</strong> &bull; Virtual Assistant & Administrative Support Specialist &bull; Reporting Period: Aug 2026
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 border border-slate-200"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* 7 Key Headline Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 block">Leads Researched</span>
          <div className="text-2xl font-bold text-slate-900 font-display mt-1">{leadsResearched}</div>
          <span className="text-[10px] text-slate-400">100% ICP Verified</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 block">Qualified Leads</span>
          <div className="text-2xl font-bold text-blue-600 font-display mt-1">{qualifiedLeads}</div>
          <span className="text-[10px] text-blue-700 font-medium">86.7% Fit Score</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 block">Emails Sent</span>
          <div className="text-2xl font-bold text-indigo-600 font-display mt-1">{emailsSent}</div>
          <span className="text-[10px] text-indigo-700 font-medium">4-Touch Cadence</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 block">Replies</span>
          <div className="text-2xl font-bold text-purple-600 font-display mt-1">{replies}</div>
          <span className="text-[10px] text-purple-700 font-medium">23.8% Response</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 block">Interested</span>
          <div className="text-2xl font-bold text-blue-700 font-display mt-1">{interestedProspects}</div>
          <span className="text-[10px] text-blue-800 font-medium">High Intent</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-200 bg-emerald-50/20 shadow-2xs">
          <span className="text-[11px] font-semibold text-emerald-800 block">Appointments</span>
          <div className="text-2xl font-bold text-emerald-700 font-display mt-1">{appointmentsBooked}</div>
          <span className="text-[10px] text-emerald-800 font-medium">Pre-briefed calls</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-indigo-200 bg-indigo-50/20 shadow-2xs">
          <span className="text-[11px] font-semibold text-indigo-900 block">Conversion</span>
          <div className="text-2xl font-bold text-indigo-700 font-display mt-1">{conversionRate}</div>
          <span className="text-[10px] text-indigo-700 font-semibold flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" /> Exceeds 8% SLA
          </span>
        </div>
      </div>

      {/* Visual Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Lead Funnel Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h4 className="text-sm font-bold text-slate-900 font-display">End-to-End Lead Funnel Waterfall</h4>
              <p className="text-xs text-slate-500">Conversion efficiency at each qualification gate</p>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
              High Pipeline Health
            </span>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">1. Total Targeted & Researched Accounts</span>
                <span className="font-bold text-slate-900">15 Leads (100%)</span>
              </div>
              <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-800 rounded-full w-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">2. ICP Qualified & Enriched (Decision Makers Identified)</span>
                <span className="font-bold text-blue-700">13 Leads (86.7%)</span>
              </div>
              <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full w-[86.7%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">3. Engaged via Multi-Touch Email Cadence</span>
                <span className="font-bold text-indigo-700">11 Leads (73.3%)</span>
              </div>
              <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full w-[73.3%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">4. Executive Responses & Positive Intent</span>
                <span className="font-bold text-purple-700">5 Prospects (33.3%)</span>
              </div>
              <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full w-[33.3%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-emerald-800 mb-1">
                <span className="text-emerald-900">5. Confirmed Discovery Meetings Booked</span>
                <span className="font-bold text-emerald-700">2 Booked (13.3% Overall Conversion)</span>
              </div>
              <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[13.3%]" />
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600 leading-relaxed">
            <strong>Key Insight:</strong> Personalizing the cold outreach subject lines with recent company milestones boosted open rates from a 42% industry baseline to <strong>64.5%</strong>.
          </div>
        </div>

        {/* Lead Source Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h4 className="text-sm font-bold text-slate-900 font-display">Lead Source Attribution</h4>
              <p className="text-xs text-slate-500">Volume and conversion by acquisition channel</p>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            {sourceBreakdown.map((src) => (
              <div key={src.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">{src.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-[11px]">{src.percentage}%</span>
                    <span className="font-bold text-slate-900">{src.count} leads</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${src.color}`}
                    style={{ width: `${src.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Priority Distribution */}
          <div className="pt-4 border-t border-slate-100">
            <h5 className="text-xs font-bold text-slate-700 mb-2">Priority Tier Distribution</h5>
            <div className="flex gap-2">
              {priorityBreakdown.map((p) => (
                <div key={p.priority} className="flex-1 p-2 rounded-lg bg-slate-50 text-center border border-slate-100">
                  <div className="text-xs font-bold text-slate-900">{p.count}</div>
                  <div className="text-[10px] text-slate-500">{p.priority} ({p.percentage}%)</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* VA Operational Performance & ROI Box */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-indigo-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-indigo-300">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold font-display text-white">
                Virtual Assistant Operational Impact: Catherine Ngina
              </h4>
              <p className="text-xs text-indigo-200">
                Summary of executive time saved and administrative leverage delivered
              </p>
            </div>
          </div>

          <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 rounded-full text-xs font-semibold">
            100% Cadence Compliance
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5 text-xs">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-indigo-300 font-semibold block mb-1">Executive Hours Reclaimed</span>
            <div className="text-xl font-bold font-display text-white">18.5 Hours/Week</div>
            <p className="text-[11px] text-slate-300 mt-1">Saved on prospect scraping, CRM data entry, and follow-up tracking.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-indigo-300 font-semibold block mb-1">Follow-Up SLA Adherence</span>
            <div className="text-xl font-bold font-display text-emerald-400">96.8% On-Time</div>
            <p className="text-[11px] text-slate-300 mt-1">Zero dropped leads; all touchpoints executed within 3 business days.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-indigo-300 font-semibold block mb-1">Pre-Call Brief Readiness</span>
            <div className="text-xl font-bold font-display text-indigo-200">100% Complete</div>
            <p className="text-[11px] text-slate-300 mt-1">All discovery calls delivered with attendee bios and tech stack overviews.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
