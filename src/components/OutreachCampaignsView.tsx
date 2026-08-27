import React, { useState } from 'react';
import { 
  Send, 
  Users, 
  Mail, 
  MessageSquare, 
  CalendarCheck, 
  TrendingUp, 
  Play, 
  Pause, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Sparkles,
  BarChart3,
  Layers,
  FileCheck
} from 'lucide-react';
import { Campaign, Lead } from '../types';

interface OutreachCampaignsViewProps {
  campaigns: Campaign[];
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
  onNavigateToTemplates: () => void;
}

export const OutreachCampaignsView: React.FC<OutreachCampaignsViewProps> = ({
  campaigns = [],
  leads = [],
  onSelectLead,
  onNavigateToTemplates,
}) => {
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(campaigns[0]?.id || '');

  const activeCampaign = campaigns.find((c) => c.id === selectedCampaignId) || campaigns[0] || ({} as Campaign);
  const campaignLeads = activeCampaign?.id ? leads.filter((l) => l.campaignId === activeCampaign.id) : [];

  return (
    <div className="space-y-6 pb-12">
      {/* Campaign Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {campaigns.map((camp) => {
          const isSelected = camp.id === selectedCampaignId;
          return (
            <div
              key={camp.id}
              onClick={() => setSelectedCampaignId(camp.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-xs ${
                isSelected
                  ? 'bg-white border-indigo-500 ring-2 ring-indigo-500/20 shadow-md'
                  : 'bg-white border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {camp.status}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-2 font-display">
                    {camp.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{camp.audience}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-indigo-600 font-display">
                    {camp.conversionRate}%
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">Conversion Rate</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-2">
                {camp.description}
              </p>

              {/* Campaign KPI Grid */}
              <div className="grid grid-cols-5 gap-2 mt-4 pt-4 border-t border-slate-100 text-center">
                <div className="p-2 rounded-lg bg-slate-50">
                  <div className="text-xs font-bold text-slate-900">{camp.leadsCount}</div>
                  <div className="text-[10px] text-slate-400 font-medium">Leads</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-50">
                  <div className="text-xs font-bold text-indigo-600">{camp.emailsSent}</div>
                  <div className="text-[10px] text-slate-400 font-medium">Sent</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-50">
                  <div className="text-xs font-bold text-purple-600">{camp.replies}</div>
                  <div className="text-[10px] text-slate-400 font-medium">Replies</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-50">
                  <div className="text-xs font-bold text-blue-600">{camp.interested}</div>
                  <div className="text-[10px] text-slate-400 font-medium">Interested</div>
                </div>
                <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-100">
                  <div className="text-xs font-bold text-emerald-700">{camp.appointments}</div>
                  <div className="text-[10px] text-emerald-800 font-medium">Booked</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">Started {camp.startDate}</span>
                <span className="text-indigo-600 font-semibold text-[11px] flex items-center gap-1">
                  {isSelected ? 'Viewing Analytics' : 'Click to inspect'} &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Campaign Detailed Performance Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold font-display text-slate-900">
                Performance Analytics: {activeCampaign.name}
              </h3>
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-indigo-50 text-indigo-700">
                Target: {activeCampaign.targetIndustry}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{activeCampaign.description}</p>
          </div>

          <button
            onClick={onNavigateToTemplates}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>View Email Copy Playbook</span>
          </button>
        </div>

        {/* Visual Outreach Performance Chart & Funnel Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Funnel Flow Chart (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50/70 p-5 rounded-xl border border-slate-200/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-600" />
              Campaign Conversion Step-Down Funnel
            </h4>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Target Leads Enriched</span>
                  <span>{activeCampaign.leadsCount} Prospects (100%)</span>
                </div>
                <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-700 rounded-full w-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Outreach Touches Delivered</span>
                  <span>{activeCampaign.emailsSent} Emails Sent</span>
                </div>
                <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full w-[85%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Executive Responses / Replies</span>
                  <span>{activeCampaign.replies} Replies ({((activeCampaign.replies / activeCampaign.leadsCount) * 100).toFixed(0)}%)</span>
                </div>
                <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full w-[60%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Qualified / High Interest</span>
                  <span>{activeCampaign.interested} Positive ({((activeCampaign.interested / activeCampaign.leadsCount) * 100).toFixed(0)}%)</span>
                </div>
                <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full w-[40%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-emerald-800 mb-1">
                  <span>Discovery Calls Scheduled</span>
                  <span>{activeCampaign.appointments} Booked ({activeCampaign.conversionRate}%)</span>
                </div>
                <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[25%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Cadence Step-by-Step Diagram (5 cols) */}
          <div className="lg:col-span-5 bg-indigo-50/40 p-5 rounded-xl border border-indigo-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-950 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              Standard Multi-Touch Cadence SLA
            </h4>

            <div className="relative pl-6 space-y-3.5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-200 text-xs">
              <div className="relative">
                <div className="absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full bg-indigo-600 border-2 border-white shadow-2xs" />
                <span className="font-bold text-slate-900 block">Touch 1: Day 1</span>
                <span className="text-[11px] text-slate-600">Personalized cold outreach referencing company growth or tech stack.</span>
              </div>

              <div className="relative">
                <div className="absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full bg-indigo-500 border-2 border-white shadow-2xs" />
                <span className="font-bold text-slate-900 block">Touch 2: Day 4 (+3 Days)</span>
                <span className="text-[11px] text-slate-600">Value-add followup with 1-page operational benchmark PDF.</span>
              </div>

              <div className="relative">
                <div className="absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full bg-indigo-400 border-2 border-white shadow-2xs" />
                <span className="font-bold text-slate-900 block">Touch 3: Day 8 (+4 Days)</span>
                <span className="text-[11px] text-slate-600">Social proof case study with measured client hours saved.</span>
              </div>

              <div className="relative">
                <div className="absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full bg-slate-400 border-2 border-white shadow-2xs" />
                <span className="font-bold text-slate-900 block">Touch 4: Day 12 (+4 Days)</span>
                <span className="text-[11px] text-slate-600">Polite breakup email giving permission to close file for now.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Leads in This Campaign Table */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Assigned Leads in {activeCampaign.name} ({campaignLeads.length})
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                  <th className="py-2.5 px-3">Lead</th>
                  <th className="py-2.5 px-3">Company</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Follow-Ups Sent</th>
                  <th className="py-2.5 px-3">Est. Value</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {campaignLeads.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50/60">
                    <td className="py-2.5 px-3 font-bold text-slate-900">{l.name}</td>
                    <td className="py-2.5 px-3 text-slate-600">{l.company}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">
                        {l.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">{l.followUpNumber} touches</td>
                    <td className="py-2.5 px-3 font-semibold text-indigo-700">${l.estimatedAnnualValue.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => onSelectLead(l)}
                        className="text-indigo-600 hover:text-indigo-800 font-semibold"
                      >
                        Inspect Dossier &rarr;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
