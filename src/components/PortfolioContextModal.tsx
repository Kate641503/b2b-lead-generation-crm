import React from 'react';
import { X, Award, CheckCircle2, FileText, UserCheck, Calendar, BarChart3, Database, ShieldCheck, Mail, ExternalLink } from 'lucide-react';

interface PortfolioContextModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PortfolioContextModal: React.FC<PortfolioContextModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        id="portfolio-context-modal"
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-display text-white">Portfolio Case Study Context</h3>
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 rounded-md">
                  DEMO DATA
                </span>
              </div>
              <p className="text-xs text-indigo-200/80 mt-0.5">
                B2B Lead Generation & CRM Operations Framework
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            id="close-context-modal-btn"
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 text-slate-700 text-sm leading-relaxed">
          {/* Main Statement */}
          <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 text-indigo-950">
            <p className="font-medium">
              &ldquo;This fictional portfolio project demonstrates a structured B2B lead-generation workflow managed by a Virtual Assistant, covering prospect research, data organization, lead qualification, cold outreach, follow-up management, appointment setting and campaign reporting.&rdquo;
            </p>
          </div>

          {/* VA Profile & Role */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200/80 bg-slate-50/80">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                CN
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Catherine Ngina</h4>
                <p className="text-xs text-slate-500 font-medium">Virtual Assistant & Administrative Support Specialist</p>
                <p className="text-[11px] text-indigo-600 font-medium mt-0.5">Specialization: B2B Lead Gen, Pipeline Hygiene & Executive Admin</p>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" /> Ready for Hire
              </span>
            </div>
          </div>

          {/* Workflow Modules Displayed */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Core Competencies Demonstrated in This System
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg border border-slate-100 bg-white hover:border-indigo-100 transition-colors flex items-start gap-2.5">
                <Database className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-xs text-slate-900 block">Prospect Research & Data Hygiene</span>
                  <span className="text-[11px] text-slate-500">15 enriched B2B leads with ICP scoring & verified contacts.</span>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-slate-100 bg-white hover:border-indigo-100 transition-colors flex items-start gap-2.5">
                <BarChart3 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-xs text-slate-900 block">7-Stage CRM Kanban Pipeline</span>
                  <span className="text-[11px] text-slate-500">Systematic stage progression from New Research to Closed Won.</span>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-slate-100 bg-white hover:border-indigo-100 transition-colors flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-xs text-slate-900 block">Multi-Touch Cadence Management</span>
                  <span className="text-[11px] text-slate-500">Tested copy templates with recommended 3-day follow-up timings.</span>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-slate-100 bg-white hover:border-indigo-100 transition-colors flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-xs text-slate-900 block">Executive Appointment Setting</span>
                  <span className="text-[11px] text-slate-500">Discovery calls & product demos with pre-meeting briefings.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50/60 border border-amber-200/60 text-amber-900 text-xs">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong>Notice:</strong> All lead names, company titles, email addresses, and phone numbers are purely fictional sample data created specifically for portfolio presentation on GitHub and Notion.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/60 rounded-b-2xl flex items-center justify-between">
          <span className="text-xs text-slate-500">Portfolio Demo &copy; 2026 Catherine Ngina</span>
          <button
            onClick={onClose}
            id="acknowledge-context-btn"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
          >
            Explore Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
