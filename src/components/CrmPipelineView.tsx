import React from 'react';
import { 
  Plus, 
  Building2, 
  DollarSign, 
  Clock, 
  Calendar, 
  ChevronRight, 
  ChevronLeft,
  Mail, 
  Eye, 
  MoveRight,
  Sparkles,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { Lead, PipelineStage, PriorityLevel, FollowUpStatus } from '../types';

interface CrmPipelineViewProps {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
  onOpenLogEmail: (lead: Lead) => void;
  onOpenBookAppointment: (lead: Lead) => void;
  onUpdateLeadStatus: (leadId: string, newStatus: PipelineStage) => void;
  onOpenAddLead?: () => void;
  onOpenAddLeadModal?: () => void;
}

export const CrmPipelineView: React.FC<CrmPipelineViewProps> = ({
  leads = [],
  onSelectLead,
  onOpenLogEmail,
  onOpenBookAppointment,
  onUpdateLeadStatus,
  onOpenAddLead,
  onOpenAddLeadModal,
}) => {
  const handleAddLead = () => {
    if (onOpenAddLead) onOpenAddLead();
    else if (onOpenAddLeadModal) onOpenAddLeadModal();
  };
  const stages: { stage: PipelineStage; label: string; headerColor: string; badgeColor: string }[] = [
    { stage: 'New Research', label: 'New Research', headerColor: 'border-slate-300 text-slate-800', badgeColor: 'bg-slate-100 text-slate-700' },
    { stage: 'Qualified', label: 'Qualified', headerColor: 'border-blue-300 text-blue-900', badgeColor: 'bg-blue-100 text-blue-800' },
    { stage: 'Contacted', label: 'Contacted', headerColor: 'border-indigo-300 text-indigo-900', badgeColor: 'bg-indigo-100 text-indigo-800' },
    { stage: 'Follow-Up', label: 'Follow-Up', headerColor: 'border-amber-300 text-amber-900', badgeColor: 'bg-amber-100 text-amber-800' },
    { stage: 'Interested', label: 'Interested', headerColor: 'border-purple-300 text-purple-900', badgeColor: 'bg-purple-100 text-purple-800' },
    { stage: 'Appointment Booked', label: 'Appointment Booked', headerColor: 'border-emerald-300 text-emerald-900', badgeColor: 'bg-emerald-100 text-emerald-800' },
    { stage: 'Closed Won', label: 'Closed Won', headerColor: 'border-teal-400 text-teal-900', badgeColor: 'bg-teal-100 text-teal-900' },
  ];

  const getPriorityStyle = (priority: PriorityLevel) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low':
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getStatusIndicator = (lead: Lead) => {
    if (lead.status === 'Closed Won') {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800 border border-teal-200">
          Won & Active
        </span>
      );
    }
    if (lead.name.includes('Arthur Pendelton') || lead.followUpStatus === 'Overdue') {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
          Overdue
        </span>
      );
    }
    if (lead.name.includes('Elena Rostova') || lead.name.includes('David K. Thorne') || lead.name.includes('Sophia Chen') || lead.followUpStatus === 'Due Today') {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
          Due Today
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
        Upcoming
      </span>
    );
  };

  const formatCurrency = (val: number) => {
    return `$${val.toLocaleString()}/yr`;
  };

  // Helper to advance stage
  const stageOrder: PipelineStage[] = [
    'New Research',
    'Qualified',
    'Contacted',
    'Follow-Up',
    'Interested',
    'Appointment Booked',
    'Closed Won'
  ];

  const moveStage = (lead: Lead, direction: 'next' | 'prev') => {
    const currentIndex = stageOrder.indexOf(lead.status);
    if (direction === 'next' && currentIndex < stageOrder.length - 1) {
      onUpdateLeadStatus(lead.id, stageOrder[currentIndex + 1]);
    } else if (direction === 'prev' && currentIndex > 0) {
      onUpdateLeadStatus(lead.id, stageOrder[currentIndex - 1]);
    }
  };

  const totalPipelineValue = leads.reduce((sum, l) => sum + l.estimatedAnnualValue, 0);

  return (
    <div className="space-y-4 pb-12">
      {/* Pipeline Header Summary */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold font-display text-slate-900">CRM Opportunity Pipeline</h3>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md">
              7 Active Stages
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            15 Qualified B2B prospects &bull; Total Pipeline Value: <strong className="text-slate-900 font-bold">${totalPipelineValue.toLocaleString()}/yr</strong>
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleAddLead}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Prospect</span>
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Kanban Board */}
      <div className="overflow-x-auto pb-4 pt-1">
        <div className="flex items-start gap-4 min-w-[1380px]">
          {stages.map(({ stage, label, headerColor, badgeColor }) => {
            const stageLeads = leads.filter((l) => l.status === stage);
            const stageValue = stageLeads.reduce((sum, l) => sum + l.estimatedAnnualValue, 0);

            return (
              <div
                key={stage}
                id={`stage-column-${stage.toLowerCase().replace(/\s+/g, '-')}`}
                className="w-72 shrink-0 bg-slate-100/70 rounded-2xl p-3 border border-slate-200/70 flex flex-col max-h-[78vh]"
              >
                {/* Column Header */}
                <div className={`p-2.5 bg-white rounded-xl border-t-2 shadow-2xs mb-3 border-slate-200 ${headerColor}`}>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-slate-900 truncate">{label}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${badgeColor}`}>
                      {stageLeads.length}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Est. Value:</span>
                    <span className="font-bold text-slate-700">${stageValue.toLocaleString()}</span>
                  </div>
                </div>

                {/* Cards Container */}
                <div className="space-y-3 overflow-y-auto pr-0.5 flex-1 min-h-[140px]">
                  {stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      id={`kanban-card-${lead.id}`}
                      className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all group relative"
                    >
                      {/* Priority and Status Indicators */}
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getPriorityStyle(lead.priority)}`}>
                          {lead.priority}
                        </span>
                        {getStatusIndicator(lead)}
                      </div>

                      {/* Lead Name & Title */}
                      <div className="cursor-pointer" onClick={() => onSelectLead(lead)}>
                        <h5 className="font-bold text-sm text-slate-900 hover:text-indigo-600 transition-colors">
                          {lead.name}
                        </h5>
                        <p className="text-xs text-slate-600 font-medium line-clamp-1 mt-0.5">
                          {lead.jobTitle}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-slate-500 font-normal mt-1">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{lead.company}</span>
                        </div>
                      </div>

                      {/* Annual Value & Next Follow-Up */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                        <div className="text-[11px] text-slate-500">
                          <div className="flex items-center gap-1 font-medium text-slate-600">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{lead.nextFollowUp}</span>
                          </div>
                        </div>

                        <div className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-xs">
                          {formatCurrency(lead.estimatedAnnualValue)}
                        </div>
                      </div>

                      {/* Quick stage advance buttons (Prev / Next stage) */}
                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between opacity-80 group-hover:opacity-100 transition-opacity text-[11px]">
                        <button
                          onClick={() => moveStage(lead, 'prev')}
                          disabled={stageOrder.indexOf(lead.status) === 0}
                          title="Move to Previous Stage"
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20 disabled:hover:text-slate-400 rounded hover:bg-slate-100 transition-colors"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => onSelectLead(lead)}
                            className="px-2 py-0.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 rounded text-[10px] font-semibold text-slate-600 transition-colors"
                          >
                            View
                          </button>
                          <button
                            onClick={() => onOpenLogEmail(lead)}
                            className="px-2 py-0.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 rounded text-[10px] font-semibold text-slate-600 transition-colors"
                          >
                            Log
                          </button>
                        </div>

                        <button
                          onClick={() => moveStage(lead, 'next')}
                          disabled={stageOrder.indexOf(lead.status) === stageOrder.length - 1}
                          title="Move to Next Stage"
                          className="p-1 text-slate-400 hover:text-indigo-600 disabled:opacity-20 disabled:hover:text-slate-400 rounded hover:bg-slate-100 transition-colors"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {stageLeads.length === 0 && (
                    <div className="text-center py-8 px-2 border-2 border-dashed border-slate-200 rounded-xl text-xs text-slate-400">
                      No leads in this stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
