import React from 'react';
import { 
  LayoutDashboard, 
  Database, 
  Kanban, 
  Send, 
  FileText, 
  Clock, 
  Calendar, 
  BarChart3, 
  Settings, 
  Sparkles,
  Info,
  ChevronRight,
  User,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { ActiveTab } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab?: (tab: ActiveTab) => void;
  onSelectTab?: (tab: ActiveTab) => void;
  leadsCount?: number;
  followUpCount?: number;
  followUpsCount?: number;
  appointmentCount?: number;
  appointmentsCount?: number;
  onOpenContextModal?: () => void;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onSelectTab,
  leadsCount = 15,
  followUpCount,
  followUpsCount,
  appointmentCount,
  appointmentsCount,
  onOpenContextModal,
  isMobileOpen = false,
  setIsMobileOpen
}) => {
  const actualFollowUpCount = followUpsCount ?? followUpCount ?? 0;
  const actualAppointmentCount = appointmentsCount ?? appointmentCount ?? 0;

  const handleTabClick = (tabId: ActiveTab) => {
    if (onSelectTab) onSelectTab(tabId);
    if (setActiveTab) setActiveTab(tabId);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  const navItems = [
    { id: 'dashboard' as ActiveTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads' as ActiveTab, label: 'Lead Database', icon: Database, badge: `${leadsCount}` },
    { id: 'pipeline' as ActiveTab, label: 'CRM Pipeline', icon: Kanban },
    { id: 'campaigns' as ActiveTab, label: 'Outreach Campaigns', icon: Send },
    { id: 'templates' as ActiveTab, label: 'Email Templates', icon: FileText, badge: '5' },
    { id: 'followup' as ActiveTab, label: 'Follow-Up Queue', icon: Clock, badge: actualFollowUpCount > 0 ? `${actualFollowUpCount}` : undefined, badgeColor: 'bg-amber-100 text-amber-800' },
    { id: 'appointments' as ActiveTab, label: 'Appointments', icon: Calendar, badge: `${actualAppointmentCount}`, badgeColor: 'bg-emerald-100 text-emerald-800' },
    { id: 'report' as ActiveTab, label: 'Campaign Report', icon: BarChart3 },
    { id: 'settings' as ActiveTab, label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        id="app-sidebar"
        className={`fixed top-0 left-0 bottom-0 z-40 w-72 bg-white border-r border-slate-200/90 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center text-white shadow-sm shrink-0">
              <Database className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-slate-900 leading-snug">
                B2B Lead Generation & CRM Operations
              </h1>
              <p className="text-[11px] font-medium text-indigo-600 truncate">
                Q3 B2B SaaS Outreach & Expansion
              </p>
            </div>
          </div>

          {/* Portfolio demo banner badge */}
          <div className="mt-3.5 flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
              PORTFOLIO DEMO — SAMPLE DATA
            </span>
            <button
              onClick={onOpenContextModal}
              title="View Case Study Details"
              className="text-slate-400 hover:text-indigo-600 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Main Operations
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.badgeColor || 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Project Context Callout Box */}
        <div className="p-3 mx-3 mb-3 rounded-xl bg-indigo-50/60 border border-indigo-100/80">
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] font-bold text-indigo-950">
                Virtual Assistant Portfolio
              </p>
              <p className="text-[10px] text-indigo-800/80 leading-relaxed mt-0.5 line-clamp-2">
                Full-cycle prospect research, qualification, multi-touch cadences & appointment setting.
              </p>
              <button
                onClick={onOpenContextModal}
                id="sidebar-case-study-btn"
                className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <span>Read Case Study Brief</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Portfolio Owner Profile */}
        <div className="p-3.5 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs shadow-xs shrink-0 ring-2 ring-indigo-500/30">
              CN
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-slate-900 truncate">
                Catherine Ngina
              </h4>
              <p className="text-[10px] text-slate-500 truncate leading-tight">
                Virtual Assistant & Administrative Support Specialist
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
