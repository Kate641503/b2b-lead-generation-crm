import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Bell, 
  Menu, 
  Sparkles, 
  Calendar, 
  Download, 
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { ActiveTab, Lead } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  setSearchQuery?: (query: string) => void;
  onOpenAddLead?: () => void;
  onOpenAddLeadModal?: () => void;
  onOpenContextModal?: () => void;
  onResetData?: () => void;
  onExportCSV?: () => void;
  setIsMobileOpen?: (open: boolean) => void;
  dueTodayLeads?: Lead[];
  overdueLeads?: Lead[];
  onSelectLead?: (lead: Lead) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  searchQuery = '',
  onSearchChange,
  setSearchQuery,
  onOpenAddLead,
  onOpenAddLeadModal,
  onOpenContextModal,
  onResetData,
  onExportCSV,
  setIsMobileOpen,
  dueTodayLeads = [],
  overdueLeads = [],
  onSelectLead,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearchInput = (val: string) => {
    if (onSearchChange) onSearchChange(val);
    if (setSearchQuery) setSearchQuery(val);
  };

  const handleAddLeadClick = () => {
    if (onOpenAddLead) onOpenAddLead();
    else if (onOpenAddLeadModal) onOpenAddLeadModal();
  };

  const safeDueToday = Array.isArray(dueTodayLeads) ? dueTodayLeads : [];
  const safeOverdue = Array.isArray(overdueLeads) ? overdueLeads : [];
  const urgentCount = safeDueToday.length + safeOverdue.length;

  const getTabTitle = (tab: ActiveTab) => {
    switch (tab) {
      case 'dashboard':
        return {
          title: 'Executive Operations Dashboard',
          subtitle: 'Full-cycle prospect research, qualification, outreach & appointment setting'
        };
      case 'leads':
        return {
          title: 'B2B Lead Database',
          subtitle: 'Enriched ICP target accounts with verified decision makers and status tracking'
        };
      case 'pipeline':
        return {
          title: 'CRM Sales Pipeline',
          subtitle: '7-Stage visual Kanban management from initial research to Closed Won'
        };
      case 'campaigns':
        return {
          title: 'Outreach Campaigns',
          subtitle: 'Active multi-touch cadences, audience segmentation and response rates'
        };
      case 'templates':
        return {
          title: 'Email Templates & Copy Playbook',
          subtitle: 'Battle-tested cold outreach, value follow-ups, and meeting confirmation scripts'
        };
      case 'followup':
        return {
          title: 'Priority Follow-Up Queue',
          subtitle: 'Time-sensitive touchpoint scheduler with strict 3-day SLA compliance'
        };
      case 'appointments':
        return {
          title: 'Discovery Calls & Appointments',
          subtitle: 'Scheduled prospect meetings with pre-call research briefs and agenda dossiers'
        };
      case 'report':
        return {
          title: 'Campaign Analytics & Report',
          subtitle: 'End-to-end conversion funnel metrics, lead source attribution & VA time ROI'
        };
      case 'settings':
        return {
          title: 'Operations & VA Settings',
          subtitle: 'Outreach cadence configuration, email signatures and workflow automation rules'
        };
      default:
        return { title: 'CRM Operations', subtitle: 'Overview' };
    }
  };

  const { title, subtitle } = getTabTitle(activeTab);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      {/* Left Title & Mobile Menu */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button
          onClick={() => setIsMobileOpen && setIsMobileOpen(true)}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 tracking-tight">
              {title}
            </h2>
            <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/70">
              Q3 2026
            </span>
          </div>
          <p className="text-xs text-slate-500 hidden sm:block truncate max-w-lg">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
        {/* Search Bar */}
        <div className="relative flex-1 sm:w-60 md:w-68">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            id="global-search-input"
            value={searchQuery}
            onChange={(e) => handleSearchInput(e.target.value)}
            placeholder="Search leads, companies, titles..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchInput('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-600 bg-slate-200/80 rounded px-1"
            >
              Clear
            </button>
          )}
        </div>

        {/* Date context indicator */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100/70 border border-slate-200 text-slate-600 text-xs font-medium shrink-0">
          <Calendar className="w-3.5 h-3.5 text-indigo-600" />
          <span>Demo Date: Aug 27, 2026</span>
        </div>

        {/* Notifications Popover Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            id="notifications-bell-btn"
            className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
            title="Follow-Up Notifications"
          >
            <Bell className="w-4 h-4" />
            {urgentCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center animate-pulse">
                {urgentCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900">Follow-Up Action Queue</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                  {urgentCount} Action Items
                </span>
              </div>

              <div className="py-2 space-y-2 max-h-60 overflow-y-auto">
                {safeOverdue.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => {
                      if (onSelectLead) onSelectLead(lead);
                      setShowNotifications(false);
                    }}
                    className="p-2 rounded-lg bg-rose-50/70 border border-rose-100 hover:bg-rose-100/70 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-950">{lead.name}</span>
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-100 px-1.5 py-0.5 rounded">
                        Overdue
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5">{lead.company} &bull; {lead.jobTitle}</p>
                  </div>
                ))}

                {safeDueToday.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => {
                      if (onSelectLead) onSelectLead(lead);
                      setShowNotifications(false);
                    }}
                    className="p-2 rounded-lg bg-amber-50/70 border border-amber-100 hover:bg-amber-100/70 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-950">{lead.name}</span>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                        Due Today
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5">{lead.company} &bull; {lead.jobTitle}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowNotifications(false)}
                className="w-full text-center text-xs text-indigo-600 font-semibold pt-2 border-t border-slate-100 hover:text-indigo-800"
              >
                Close Queue
              </button>
            </div>
          )}
        </div>

        {/* Case Study Context Button */}
        <button
          onClick={onOpenContextModal}
          id="header-case-study-btn"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors border border-slate-200"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Case Study Brief</span>
        </button>

        {/* Add Lead Primary CTA */}
        <button
          onClick={handleAddLeadClick}
          id="header-add-lead-btn"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Lead</span>
        </button>
      </div>
    </header>
  );
};
