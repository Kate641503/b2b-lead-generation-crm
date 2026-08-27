import React from 'react';
import { 
  Users, 
  UserPlus, 
  Send, 
  HeartHandshake, 
  Clock, 
  CalendarCheck2, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  ArrowUpRight, 
  Calendar, 
  Building2, 
  Mail, 
  Phone, 
  ChevronRight, 
  ExternalLink,
  Kanban,
  Sparkles,
  Info,
  Layers
} from 'lucide-react';
import { Lead, Appointment, Campaign, PipelineStage } from '../types';

interface DashboardViewProps {
  leads: Lead[];
  appointments: Appointment[];
  campaigns: Campaign[];
  onSelectLead: (lead: Lead) => void;
  onOpenLogEmail: (lead: Lead) => void;
  onOpenBookAppointment: (lead?: Lead) => void;
  onNavigateToTab: (tab: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  leads,
  appointments,
  campaigns,
  onSelectLead,
  onOpenLogEmail,
  onOpenBookAppointment,
  onNavigateToTab,
}) => {
  // KPI Metrics matching prompt requirements exactly
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'New Research').length;
  const contactedLeads = leads.filter(l => l.status === 'Contacted').length;
  const interestedLeads = leads.filter(l => l.status === 'Interested').length;
  const followUpLeads = leads.filter(l => l.status === 'Follow-Up').length;
  const bookedAppointments = leads.filter(l => l.status === 'Appointment Booked').length;
  const conversionRate = totalLeads > 0 ? ((bookedAppointments / totalLeads) * 100).toFixed(1) : '13.3';

  // Pipeline stage counts dynamically computed
  const pipelineStages: { stage: PipelineStage; count: number; color: string; bg: string; barColor: string }[] = [
    { stage: 'New Research', count: leads.filter(l => l.status === 'New Research').length, color: 'text-slate-700', bg: 'bg-slate-100', barColor: 'bg-slate-400' },
    { stage: 'Qualified', count: leads.filter(l => l.status === 'Qualified').length, color: 'text-blue-700', bg: 'bg-blue-50', barColor: 'bg-blue-500' },
    { stage: 'Contacted', count: leads.filter(l => l.status === 'Contacted').length, color: 'text-indigo-700', bg: 'bg-indigo-50', barColor: 'bg-indigo-500' },
    { stage: 'Follow-Up', count: leads.filter(l => l.status === 'Follow-Up').length, color: 'text-amber-700', bg: 'bg-amber-50', barColor: 'bg-amber-500' },
    { stage: 'Interested', count: leads.filter(l => l.status === 'Interested').length, color: 'text-purple-700', bg: 'bg-purple-50', barColor: 'bg-purple-500' },
    { stage: 'Appointment Booked', count: leads.filter(l => l.status === 'Appointment Booked').length, color: 'text-emerald-700', bg: 'bg-emerald-50', barColor: 'bg-emerald-500' },
    { stage: 'Closed Won', count: leads.filter(l => l.status === 'Closed Won').length, color: 'text-teal-700', bg: 'bg-teal-50', barColor: 'bg-teal-600' },
  ];

  // Specific Priority Follow-Up items requested:
  // Arthur Pendelton — Overdue, Elena Rostova — Due Today, David K. Thorne — Due Today, Sophia Chen — Due Today
  const priorityQueueLeads = [
    leads.find(l => l.name.includes('Arthur Pendelton')) || leads[4],
    leads.find(l => l.name.includes('Elena Rostova')) || leads[1],
    leads.find(l => l.name.includes('David K. Thorne')) || leads[5],
    leads.find(l => l.name.includes('Sophia Chen')) || leads[6],
  ].filter(Boolean) as Lead[];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 md:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PORTFOLIO DEMO — SAMPLE DATA</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-white">
            B2B Lead Generation & CRM Operations
          </h1>

          <p className="mt-2 text-sm md:text-base text-slate-300 font-normal leading-relaxed">
            &ldquo;Full-cycle prospect research, lead qualification, outreach, follow-up management and appointment setting.&rdquo;
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Assigned VA: <strong className="text-white font-semibold">Catherine Ngina</strong></span>
            </div>
            <span className="text-slate-600 hidden sm:inline">&bull;</span>
            <div>Role: <span className="text-slate-300">Virtual Assistant & Administrative Support Specialist</span></div>
            <span className="text-slate-600 hidden sm:inline">&bull;</span>
            <div>Cadence: <span className="text-slate-300">3 Business Days SLA</span></div>
          </div>
        </div>

        {/* Subtle decorative background graphic */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
          <Layers className="w-96 h-96 text-white transform rotate-12 translate-x-20" />
        </div>
      </div>

      {/* KPI Cards (7 required KPI cards + Demo Tag) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Executive KPI Overview <span className="text-[10px] text-indigo-600 font-semibold normal-case ml-1.5">(Sample Data)</span>
          </h3>
          <span className="text-xs text-slate-400">Target Range: Q3 2026</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {/* Card 1: Total Leads */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">Total Leads</span>
              <Users className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-display">15</div>
            <div className="mt-1 text-[10px] text-slate-500 font-medium">Enriched B2B accounts</div>
          </div>

          {/* Card 2: New Leads */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">New Leads</span>
              <UserPlus className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-600 font-display">2</div>
            <div className="mt-1 text-[10px] text-slate-500 font-medium">In research backlog</div>
          </div>

          {/* Card 3: Contacted */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">Contacted</span>
              <Send className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-2xl font-bold text-indigo-600 font-display">2</div>
            <div className="mt-1 text-[10px] text-slate-500 font-medium">Touchpoint #1 dispatched</div>
          </div>

          {/* Card 4: Interested */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">Interested</span>
              <HeartHandshake className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-purple-600 font-display">2</div>
            <div className="mt-1 text-[10px] text-slate-500 font-medium">Positive prospect replies</div>
          </div>

          {/* Card 5: Follow-Up Required */}
          <div className="bg-white p-4 rounded-xl border border-amber-200/80 bg-amber-50/20 shadow-xs hover:border-amber-300 transition-all">
            <div className="flex items-center justify-between text-amber-700 mb-2">
              <span className="text-xs font-semibold">Follow-Up Req.</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-bold text-amber-700 font-display">3</div>
            <div className="mt-1 text-[10px] text-amber-800 font-medium">1 Overdue &bull; 2 Due Today</div>
          </div>

          {/* Card 6: Appointments */}
          <div className="bg-white p-4 rounded-xl border border-emerald-200/80 bg-emerald-50/20 shadow-xs hover:border-emerald-300 transition-all">
            <div className="flex items-center justify-between text-emerald-700 mb-2">
              <span className="text-xs font-semibold">Appointments</span>
              <CalendarCheck2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-emerald-700 font-display">2</div>
            <div className="mt-1 text-[10px] text-emerald-800 font-medium">Discovery calls booked</div>
          </div>

          {/* Card 7: Conversion Rate */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">Conversion</span>
              <TrendingUp className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-2xl font-bold text-teal-700 font-display">13.3%</div>
            <div className="mt-1 text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> +4.2% vs baseline
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Pipeline Overview & Priority Follow-Up Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Lead Pipeline Overview (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-display">Lead Pipeline Overview</h3>
                <p className="text-xs text-slate-500">Distribution across 7 structured qualification stages</p>
              </div>
              <button
                onClick={() => onNavigateToTab('pipeline')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <span>View Kanban</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Visual Funnel Bar Chart */}
            <div className="mt-5 space-y-3.5">
              {pipelineStages.map((stage) => {
                const percentage = (stage.count / 15) * 100;
                return (
                  <div key={stage.stage} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700">{stage.stage}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-[11px]">{percentage.toFixed(0)}%</span>
                        <span className={`px-2 py-0.5 rounded-md font-bold text-xs ${stage.bg} ${stage.color}`}>
                          {stage.count} {stage.count === 1 ? 'lead' : 'leads'}
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${stage.barColor}`}
                        style={{ width: `${Math.max(percentage, 8)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/70 p-3 rounded-xl">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Total Pipeline Estimated Value: <strong>$390,000/yr</strong></span>
            </div>
            <button
              onClick={() => onNavigateToTab('leads')}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Open Lead Database &rarr;
            </button>
          </div>
        </div>

        {/* Right: Priority Follow-Up Queue (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-display">Priority Follow-Up Queue</h3>
                <p className="text-xs text-slate-500">Action items requiring immediate VA touchpoint</p>
              </div>
              <button
                onClick={() => onNavigateToTab('followups')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                View All Queue
              </button>
            </div>

            {/* List of 4 Priority Leads */}
            <div className="mt-4 space-y-3">
              {priorityQueueLeads.map((lead) => {
                const isOverdue = lead.name.includes('Arthur Pendelton') || lead.followUpStatus === 'Overdue';
                return (
                  <div
                    key={lead.id}
                    className={`p-3 rounded-xl border transition-all hover:shadow-xs ${
                      isOverdue
                        ? 'bg-rose-50/50 border-rose-200/80'
                        : 'bg-amber-50/40 border-amber-200/80'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 
                            onClick={() => onSelectLead(lead)}
                            className="text-xs font-bold text-slate-900 hover:text-indigo-600 cursor-pointer"
                          >
                            {lead.name}
                          </h4>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              isOverdue
                                ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                : 'bg-amber-100 text-amber-800 border border-amber-200'
                            }`}
                          >
                            {isOverdue ? 'Overdue' : 'Due Today'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          {lead.company} &bull; <span className="text-slate-500">{lead.jobTitle}</span>
                        </p>
                      </div>

                      <button
                        onClick={() => onOpenLogEmail(lead)}
                        className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-lg text-xs font-semibold shadow-2xs hover:text-indigo-600 transition-colors shrink-0"
                      >
                        Log Email
                      </button>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-200/50 flex items-center justify-between text-[10px] text-slate-500">
                      <span>Last Contact: {lead.lastContact}</span>
                      <span>Next Touch: <strong className={isOverdue ? 'text-rose-700' : 'text-amber-800'}>{lead.nextFollowUp}</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-500">
              VA Standard: All overdue touches resolved within 2 hours of morning shift.
            </span>
          </div>
        </div>
      </div>

      {/* Upcoming Meetings Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900 font-display">Upcoming Meetings & Discovery Calls</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Confirmed appointments scheduled for account executive team</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenBookAppointment()}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-2xs"
            >
              + Book Meeting
            </button>
            <button
              onClick={() => onNavigateToTab('appointments')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
            >
              View Calendar
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {appointments.map((apt) => (
            <div
              key={apt.id}
              className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-indigo-200 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {apt.meetingType}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {apt.duration}
                  </span>
                </div>

                <h4 className="mt-2.5 text-sm font-bold text-slate-900">
                  {apt.prospectName}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium mt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{apt.company}</span>
                </div>

                <div className="mt-3 p-2.5 rounded-lg bg-white border border-slate-200/70 text-xs text-slate-700 space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-indigo-950">
                    <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{apt.meetingDate} &bull; {apt.time} {apt.timezone}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">
                    Platform: {apt.location}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="text-[11px] text-emerald-700 font-medium">✓ Pre-Call Brief Ready</span>
                <button
                  onClick={() => onNavigateToTab('appointments')}
                  className="text-indigo-600 hover:text-indigo-800 font-semibold text-[11px]"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campaigns Snapshot & Operational Value */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campaigns.map((camp) => (
          <div key={camp.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Active Campaign
                </span>
                <span className="text-xs text-slate-400">Started {camp.startDate}</span>
              </div>
              <h4 className="text-base font-bold text-slate-900 mt-2">{camp.name}</h4>
              <p className="text-xs text-slate-500 mt-1">{camp.audience}</p>

              <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-slate-100 text-center">
                <div className="p-2 rounded-lg bg-slate-50">
                  <div className="text-xs font-bold text-slate-900">{camp.leadsCount}</div>
                  <div className="text-[10px] text-slate-500">Leads</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-50">
                  <div className="text-xs font-bold text-indigo-600">{camp.emailsSent}</div>
                  <div className="text-[10px] text-slate-500">Sent</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-50">
                  <div className="text-xs font-bold text-purple-600">{camp.replies}</div>
                  <div className="text-[10px] text-slate-500">Replies</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-50">
                  <div className="text-xs font-bold text-emerald-600">{camp.appointments}</div>
                  <div className="text-[10px] text-slate-500">Booked</div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 text-[11px] truncate max-w-xs">{camp.cadenceDescription}</span>
              <button
                onClick={() => onNavigateToTab('campaigns')}
                className="text-indigo-600 font-semibold hover:underline shrink-0"
              >
                Campaign Details &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
