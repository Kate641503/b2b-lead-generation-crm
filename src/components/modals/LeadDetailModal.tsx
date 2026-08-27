import React from 'react';
import { 
  X, 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  Linkedin, 
  Calendar, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle, 
  Edit3, 
  Send, 
  CalendarCheck2, 
  ExternalLink,
  ShieldCheck,
  UserCheck,
  TrendingUp,
  Tag
} from 'lucide-react';
import { Lead, PipelineStage, PriorityLevel } from '../../types';

interface LeadDetailModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (lead: Lead) => void;
  onOpenLogEmail: (lead: Lead) => void;
  onOpenBookAppointment: (lead: Lead) => void;
  onUpdateStatus: (leadId: string, status: PipelineStage) => void;
}

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({
  lead,
  isOpen,
  onClose,
  onEdit,
  onOpenLogEmail,
  onOpenBookAppointment,
  onUpdateStatus,
}) => {
  if (!isOpen || !lead) return null;

  const stages: PipelineStage[] = [
    'New Research',
    'Qualified',
    'Contacted',
    'Follow-Up',
    'Interested',
    'Appointment Booked',
    'Closed Won'
  ];

  const getPriorityBadge = (priority: PriorityLevel) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'Medium':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Low':
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        id="lead-detail-modal"
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto"
      >
        {/* Header with Lead Profile */}
        <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-t-2xl flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 border border-indigo-400/40 text-white font-bold text-xl flex items-center justify-center shadow-md">
              {lead.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-xl font-bold font-display text-white">{lead.name}</h3>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getPriorityBadge(lead.priority)}`}>
                  {lead.priority} Priority
                </span>
              </div>
              <p className="text-xs text-indigo-200 font-medium mt-0.5">
                {lead.jobTitle} &bull; <span className="text-white font-semibold">{lead.company}</span>
              </p>
              <div className="flex items-center gap-3 text-[11px] text-slate-300 mt-2">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-indigo-400" /> {lead.location}</span>
                <span>&bull;</span>
                <span className="flex items-center gap-1"><Tag className="w-3 h-3 text-indigo-400" /> {lead.industry}</span>
                <span>&bull;</span>
                <span className="text-emerald-400 font-bold">${lead.estimatedAnnualValue.toLocaleString()}/yr</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Current Pipeline Stage:</span>
            <select
              value={lead.status}
              onChange={(e) => onUpdateStatus(lead.id, e.target.value as PipelineStage)}
              className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg font-bold text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              {stages.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenLogEmail(lead)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Log Email</span>
            </button>

            <button
              onClick={() => onOpenBookAppointment(lead)}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <CalendarCheck2 className="w-3.5 h-3.5" />
              <span>Book Meeting</span>
            </button>

            <button
              onClick={() => onEdit(lead)}
              className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Lead</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 text-slate-700 text-xs">
          {/* Contact & Firmographics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Contact Details */}
            <div className="p-4 rounded-xl border border-slate-200/80 bg-white space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Verified Contact Details
              </h4>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Direct Email:</span>
                  <span className="font-semibold text-indigo-600">{lead.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Phone Number:</span>
                  <span className="font-semibold text-slate-900">{lead.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Lead Source:</span>
                  <span className="font-semibold text-slate-800">{lead.leadSource}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">LinkedIn Profile:</span>
                  <span className="text-indigo-600 font-medium">Verified Profile</span>
                </div>
              </div>
            </div>

            {/* Account & Company Data */}
            <div className="p-4 rounded-xl border border-slate-200/80 bg-white space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Company Firmographics
              </h4>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Company Name:</span>
                  <span className="font-semibold text-slate-900">{lead.company}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Headcount / Size:</span>
                  <span className="font-semibold text-slate-800">{lead.companySize}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Website:</span>
                  <span className="font-semibold text-slate-700">{lead.website}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">ICP Fit Score:</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {lead.qualificationScore} / 100
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Research & Qualification Notes */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              VA Research Dossier & Qualification Notes
            </h4>
            <p className="text-slate-800 leading-relaxed font-medium">
              {lead.notes}
            </p>
          </div>

          {/* Activity Log / Timeline */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Outreach & Activity Timeline
            </h4>

            <div className="space-y-2.5">
              {lead.activities && lead.activities.length > 0 ? (
                lead.activities.map((act) => (
                  <div key={act.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-slate-900">{act.title}</h5>
                        <span className="text-[10px] text-slate-400 font-medium">{act.timestamp}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] mt-0.5">{act.description}</p>
                      <span className="text-[10px] text-slate-400 block mt-1">Logged by: {act.author}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 rounded-xl bg-slate-50 text-slate-400 text-center">
                  Initial prospect record established. No custom events logged yet.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 rounded-b-2xl flex items-center justify-between text-xs">
          <span className="text-slate-500">Date Added: {lead.dateAdded} &bull; Next Follow-Up: <strong>{lead.nextFollowUp}</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-semibold transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
