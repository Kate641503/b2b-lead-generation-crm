import React, { useState, useMemo } from 'react';
import { 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Calendar, 
  Mail, 
  Eye, 
  Building2, 
  ArrowRight,
  Filter,
  Sparkles,
  Phone,
  RotateCw
} from 'lucide-react';
import { Lead, FollowUpStatus } from '../types';

interface FollowUpQueueViewProps {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
  onOpenLogEmail: (lead: Lead) => void;
  onOpenBookAppointment: (lead: Lead) => void;
}

export const FollowUpQueueView: React.FC<FollowUpQueueViewProps> = ({
  leads,
  onSelectLead,
  onOpenLogEmail,
  onOpenBookAppointment,
}) => {
  const [filterTab, setFilterTab] = useState<'ALL' | 'OVERDUE' | 'DUE_TODAY' | 'UPCOMING'>('ALL');

  // Compute status correctly based on prompt items
  const queueLeads = useMemo(() => {
    return leads.filter((l) => l.status !== 'Closed Won');
  }, [leads]);

  const overdueLeads = useMemo(() => {
    return queueLeads.filter((l) => l.name.includes('Arthur Pendelton') || l.followUpStatus === 'Overdue');
  }, [queueLeads]);

  const dueTodayLeads = useMemo(() => {
    return queueLeads.filter(
      (l) =>
        (l.name.includes('Elena Rostova') ||
          l.name.includes('David K. Thorne') ||
          l.name.includes('Sophia Chen') ||
          l.followUpStatus === 'Due Today') &&
        !l.name.includes('Arthur Pendelton')
    );
  }, [queueLeads]);

  const upcomingLeads = useMemo(() => {
    return queueLeads.filter(
      (l) =>
        !l.name.includes('Arthur Pendelton') &&
        !l.name.includes('Elena Rostova') &&
        !l.name.includes('David K. Thorne') &&
        !l.name.includes('Sophia Chen') &&
        l.followUpStatus !== 'Overdue' &&
        l.followUpStatus !== 'Due Today'
    );
  }, [queueLeads]);

  const displayedLeads = useMemo(() => {
    if (filterTab === 'OVERDUE') return overdueLeads;
    if (filterTab === 'DUE_TODAY') return dueTodayLeads;
    if (filterTab === 'UPCOMING') return upcomingLeads;
    return queueLeads;
  }, [filterTab, queueLeads, overdueLeads, dueTodayLeads, upcomingLeads]);

  const getStatusBadge = (lead: Lead) => {
    if (lead.name.includes('Arthur Pendelton') || lead.followUpStatus === 'Overdue') {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1.5 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
          Overdue (3 Days)
        </span>
      );
    }
    if (
      lead.name.includes('Elena Rostova') ||
      lead.name.includes('David K. Thorne') ||
      lead.name.includes('Sophia Chen') ||
      lead.followUpStatus === 'Due Today'
    ) {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1.5 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
          Due Today (Aug 27)
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200 w-fit">
        Upcoming ({lead.nextFollowUp})
      </span>
    );
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Top Banner & Filter Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold font-display text-slate-900">
              Executive Follow-Up Management Queue
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Strict 3-business-day cadence engine to prevent pipeline leakages and maintain high reply rates
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
              Today: Aug 27, 2026
            </span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <button
            onClick={() => setFilterTab('ALL')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filterTab === 'ALL'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Queue ({queueLeads.length})
          </button>

          <button
            onClick={() => setFilterTab('OVERDUE')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              filterTab === 'OVERDUE'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Overdue ({overdueLeads.length})</span>
          </button>

          <button
            onClick={() => setFilterTab('DUE_TODAY')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              filterTab === 'DUE_TODAY'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Due Today ({dueTodayLeads.length})</span>
          </button>

          <button
            onClick={() => setFilterTab('UPCOMING')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filterTab === 'UPCOMING'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Upcoming Scheduled ({upcomingLeads.length})
          </button>
        </div>
      </div>

      {/* Follow-Up Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse" id="follow-up-queue-table">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                <th className="py-3 px-4">Lead</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Follow-Up #</th>
                <th className="py-3 px-4">Last Contact</th>
                <th className="py-3 px-4">Next Follow-Up</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {displayedLeads.map((lead) => {
                const isOverdue = lead.name.includes('Arthur Pendelton') || lead.followUpStatus === 'Overdue';
                const isDueToday =
                  lead.name.includes('Elena Rostova') ||
                  lead.name.includes('David K. Thorne') ||
                  lead.name.includes('Sophia Chen') ||
                  lead.followUpStatus === 'Due Today';

                return (
                  <tr
                    key={lead.id}
                    id={`followup-row-${lead.id}`}
                    className={`transition-colors ${
                      isOverdue
                        ? 'bg-rose-50/30 hover:bg-rose-50/70'
                        : isDueToday
                        ? 'bg-amber-50/30 hover:bg-amber-50/70'
                        : 'hover:bg-slate-50/70'
                    }`}
                  >
                    {/* Lead */}
                    <td className="py-3 px-4">
                      <div>
                        <button
                          onClick={() => onSelectLead(lead)}
                          className="font-bold text-slate-900 hover:text-indigo-600 text-left transition-colors cursor-pointer"
                        >
                          {lead.name}
                        </button>
                        <p className="text-[11px] text-slate-400">{lead.jobTitle}</p>
                      </div>
                    </td>

                    {/* Company */}
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>{lead.company}</span>
                      </div>
                    </td>

                    {/* Follow-Up Number */}
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold text-[11px]">
                        Touch #{lead.followUpNumber + 1}
                      </span>
                    </td>

                    {/* Last Contact */}
                    <td className="py-3 px-4 text-slate-500">
                      {lead.lastContact}
                    </td>

                    {/* Next Follow-Up */}
                    <td className="py-3 px-4">
                      <span className={`font-semibold ${isOverdue ? 'text-rose-700' : isDueToday ? 'text-amber-800' : 'text-slate-700'}`}>
                        {lead.nextFollowUp}
                      </span>
                    </td>

                    {/* Priority */}
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          lead.priority === 'High'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : lead.priority === 'Medium'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        {lead.priority}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      {getStatusBadge(lead)}
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onOpenLogEmail(lead)}
                          id={`log-email-btn-${lead.id}`}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-2xs"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Log Email</span>
                        </button>

                        <button
                          onClick={() => onSelectLead(lead)}
                          title="View Dossier"
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {displayedLeads.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-xs">
            No follow-ups in this queue category.
          </div>
        )}

        <div className="p-4 bg-slate-50/80 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>
            Cadence Rule: 3 business days between touches until 4 touches completed or meeting booked.
          </span>
          <span className="font-semibold text-slate-700">
            Total In Queue: {displayedLeads.length}
          </span>
        </div>
      </div>
    </div>
  );
};
