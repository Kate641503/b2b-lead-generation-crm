import React, { useState, useMemo } from 'react';
import { 
  NavigationTab, 
  Lead, 
  PipelineStage, 
  Appointment, 
  EmailTemplate, 
  VASettings,
  Activity
} from './types';
import { 
  INITIAL_LEADS, 
  INITIAL_CAMPAIGNS, 
  INITIAL_TEMPLATES, 
  INITIAL_APPOINTMENTS, 
  INITIAL_SETTINGS 
} from './data/initialData';
import { ToastProvider, useToast } from './components/Toast';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { LeadDatabaseView } from './components/LeadDatabaseView';
import { CrmPipelineView } from './components/CrmPipelineView';
import { OutreachCampaignsView } from './components/OutreachCampaignsView';
import { EmailTemplatesView } from './components/EmailTemplatesView';
import { FollowUpQueueView } from './components/FollowUpQueueView';
import { AppointmentsView } from './components/AppointmentsView';
import { CampaignReportView } from './components/CampaignReportView';
import { SettingsView } from './components/SettingsView';

// Modals
import { PortfolioContextModal } from './components/PortfolioContextModal';
import { LeadDetailModal } from './components/modals/LeadDetailModal';
import { LeadFormModal } from './components/modals/LeadFormModal';
import { LogEmailModal } from './components/modals/LogEmailModal';
import { BookAppointmentModal } from './components/modals/BookAppointmentModal';

const AppContent: React.FC = () => {
  const { showToast } = useToast();

  // Navigation State
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Domain State
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);
  const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [settings, setSettings] = useState<VASettings>(INITIAL_SETTINGS);

  // Modals State
  const [isPortfolioContextOpen, setIsPortfolioContextOpen] = useState(false);
  const [selectedLeadForDetail, setSelectedLeadForDetail] = useState<Lead | null>(null);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [leadToEdit, setLeadToEdit] = useState<Lead | null>(null);
  const [isLogEmailOpen, setIsLogEmailOpen] = useState(false);
  const [leadForLogEmail, setLeadForLogEmail] = useState<Lead | null>(null);
  const [templateForLogEmail, setTemplateForLogEmail] = useState<EmailTemplate | null>(null);
  const [isBookAppointmentOpen, setIsBookAppointmentOpen] = useState(false);
  const [leadForAppointment, setLeadForAppointment] = useState<Lead | null>(null);

  // Compute Badge Counts & Queues
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const dueTodayLeads = useMemo(() => {
    return leads.filter((l) => l.followUpStatus === 'Due Today');
  }, [leads]);

  const overdueLeads = useMemo(() => {
    return leads.filter((l) => l.followUpStatus === 'Overdue');
  }, [leads]);

  const overdueFollowUpsCount = useMemo(() => {
    return leads.filter((l) => l.followUpStatus === 'Overdue' || l.name.includes('Arthur Pendelton')).length;
  }, [leads]);

  const appointmentsCount = appointments.length;

  // Handlers for Leads
  const handleUpdateLeadStatus = (leadId: string, newStatus: PipelineStage) => {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id === leadId) {
          const newActivity: Activity = {
            id: `act-${Date.now()}`,
            type: 'stage_change',
            title: `Stage Changed: ${newStatus}`,
            description: `Moved lead from "${l.status}" to "${newStatus}".`,
            timestamp: '2026-08-27 10:15 AM',
            author: 'Catherine Ngina',
          };
          return {
            ...l,
            status: newStatus,
            activities: [newActivity, ...(l.activities || [])],
          };
        }
        return l;
      })
    );

    if (selectedLeadForDetail && selectedLeadForDetail.id === leadId) {
      setSelectedLeadForDetail((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    showToast('info', 'Pipeline Stage Updated', `Lead status moved to "${newStatus}".`);
  };

  const handleSaveLead = (savedLead: Lead) => {
    setLeads((prev) => {
      const exists = prev.some((l) => l.id === savedLead.id);
      if (exists) {
        return prev.map((l) => (l.id === savedLead.id ? savedLead : l));
      }
      return [savedLead, ...prev];
    });

    if (selectedLeadForDetail && selectedLeadForDetail.id === savedLead.id) {
      setSelectedLeadForDetail(savedLead);
    }
  };

  const handleDeleteLead = (leadId: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== leadId));
    if (selectedLeadForDetail?.id === leadId) {
      setSelectedLeadForDetail(null);
    }
    showToast('info', 'Lead Record Removed', 'Prospect removed from active CRM dataset.');
  };

  // Handlers for Log Email
  const handleOpenLogEmail = (lead?: Lead, template?: EmailTemplate) => {
    setLeadForLogEmail(lead || leads[0]);
    setTemplateForLogEmail(template || null);
    setIsLogEmailOpen(true);
  };

  const handleLogEmailSuccess = (
    leadId: string,
    activityDesc: string,
    updatedStage?: PipelineStage
  ) => {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id === leadId) {
          const newActivity: Activity = {
            id: `act-${Date.now()}`,
            type: 'email',
            title: 'Outreach Email Dispatched',
            description: activityDesc,
            timestamp: '2026-08-27 11:30 AM',
            author: 'Catherine Ngina',
          };

          return {
            ...l,
            status: updatedStage || l.status,
            followUpNumber: l.followUpNumber + 1,
            lastContact: '2026-08-27',
            nextFollowUp: '2026-08-30',
            followUpStatus: 'Upcoming',
            activities: [newActivity, ...(l.activities || [])],
          };
        }
        return l;
      })
    );

    if (selectedLeadForDetail && selectedLeadForDetail.id === leadId) {
      setSelectedLeadForDetail((prev) =>
        prev
          ? {
              ...prev,
              status: updatedStage || prev.status,
              followUpNumber: prev.followUpNumber + 1,
              lastContact: '2026-08-27',
              nextFollowUp: '2026-08-30',
            }
          : null
      );
    }
  };

  // Handlers for Appointments
  const handleOpenBookAppointment = (lead?: Lead) => {
    setLeadForAppointment(lead || leads[0]);
    setIsBookAppointmentOpen(true);
  };

  const handleBookAppointmentSuccess = (newAppointment: Appointment, leadId: string) => {
    setAppointments((prev) => [newAppointment, ...prev]);

    setLeads((prev) =>
      prev.map((l) => {
        if (l.id === leadId) {
          const newActivity: Activity = {
            id: `act-${Date.now()}`,
            type: 'meeting',
            title: `Meeting Booked: ${newAppointment.meetingType}`,
            description: `Scheduled for ${newAppointment.meetingDate} at ${newAppointment.time} ${newAppointment.timezone}. Link: ${newAppointment.location}`,
            timestamp: '2026-08-27 11:45 AM',
            author: 'Catherine Ngina',
          };

          return {
            ...l,
            status: 'Appointment Booked',
            activities: [newActivity, ...(l.activities || [])],
          };
        }
        return l;
      })
    );

    if (selectedLeadForDetail && selectedLeadForDetail.id === leadId) {
      setSelectedLeadForDetail((prev) =>
        prev ? { ...prev, status: 'Appointment Booked' } : null
      );
    }
  };

  // Reset demo data
  const handleResetData = () => {
    setLeads(INITIAL_LEADS);
    setCampaigns(INITIAL_CAMPAIGNS);
    setTemplates(INITIAL_TEMPLATES);
    setAppointments(INITIAL_APPOINTMENTS);
    setSettings(INITIAL_SETTINGS);
    showToast('info', 'Demo Data Restored', 'Reset leads, campaigns, and appointments to default portfolio state.');
  };

  // Switch to Lead Detail modal
  const handleSelectLead = (lead: Lead) => {
    setSelectedLeadForDetail(lead);
  };

  const handleSelectLeadById = (leadId: string) => {
    const found = leads.find((l) => l.id === leadId);
    if (found) {
      setSelectedLeadForDetail(found);
    }
  };

  const handleEditLead = (lead: Lead) => {
    setLeadToEdit(lead);
    setIsLeadFormOpen(true);
  };

  const handleAddNewLead = () => {
    setLeadToEdit(null);
    setIsLeadFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col antialiased text-slate-900 font-sans">
      <div className="flex flex-1 overflow-hidden">
        {/* Persistent Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          leadsCount={leads.length}
          followUpsCount={overdueFollowUpsCount}
          appointmentsCount={appointmentsCount}
          onOpenContextModal={() => setIsPortfolioContextOpen(true)}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Header */}
          <Header
            activeTab={activeTab}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOpenAddLead={handleAddNewLead}
            onOpenContextModal={() => setIsPortfolioContextOpen(true)}
            dueTodayLeads={dueTodayLeads}
            overdueLeads={overdueLeads}
            onSelectLead={handleSelectLead}
            setIsMobileOpen={setIsMobileOpen}
          />

          {/* Page View Router */}
          <main className="flex-1 px-4 sm:px-6 lg:px-8 pt-6 max-w-7xl w-full mx-auto">
            {activeTab === 'dashboard' && (
              <DashboardView
                leads={leads}
                appointments={appointments}
                campaigns={campaigns}
                onSelectLead={handleSelectLead}
                onNavigateToTab={setActiveTab}
                onOpenBookAppointment={handleOpenBookAppointment}
                onOpenLogEmail={handleOpenLogEmail}
              />
            )}

            {activeTab === 'leads' && (
              <LeadDatabaseView
                leads={leads}
                onSelectLead={handleSelectLead}
                onOpenAddLead={handleAddNewLead}
                onOpenEditLead={handleEditLead}
                onOpenLogEmail={handleOpenLogEmail}
                onOpenBookAppointment={handleOpenBookAppointment}
                onUpdateLeadStatus={handleUpdateLeadStatus}
              />
            )}

            {activeTab === 'pipeline' && (
              <CrmPipelineView
                leads={leads}
                onSelectLead={handleSelectLead}
                onUpdateLeadStatus={handleUpdateLeadStatus}
                onOpenAddLead={handleAddNewLead}
                onOpenLogEmail={handleOpenLogEmail}
                onOpenBookAppointment={handleOpenBookAppointment}
              />
            )}

            {activeTab === 'campaigns' && (
              <OutreachCampaignsView
                campaigns={campaigns}
                leads={leads}
                onSelectLead={handleSelectLead}
                onNavigateToTemplates={() => setActiveTab('templates')}
              />
            )}

            {activeTab === 'templates' && (
              <EmailTemplatesView
                templates={templates}
                leads={leads}
                settings={settings}
                onOpenLogEmailWithTemplate={(t, l) => handleOpenLogEmail(l, t)}
              />
            )}

            {activeTab === 'followup' && (
              <FollowUpQueueView
                leads={leads}
                onSelectLead={handleSelectLead}
                onOpenLogEmail={handleOpenLogEmail}
                onOpenBookAppointment={handleOpenBookAppointment}
              />
            )}

            {activeTab === 'appointments' && (
              <AppointmentsView
                appointments={appointments}
                leads={leads}
                onOpenBookAppointment={handleOpenBookAppointment}
                onSelectLeadById={handleSelectLeadById}
              />
            )}

            {activeTab === 'report' && (
              <CampaignReportView
                leads={leads}
                campaigns={campaigns}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsView
                settings={settings}
                onSaveSettings={setSettings}
                onResetData={handleResetData}
              />
            )}
          </main>
        </div>
      </div>

      {/* Global Interactive Modals */}
      <PortfolioContextModal
        isOpen={isPortfolioContextOpen}
        onClose={() => setIsPortfolioContextOpen(false)}
      />

      <LeadDetailModal
        lead={selectedLeadForDetail}
        isOpen={!!selectedLeadForDetail}
        onClose={() => setSelectedLeadForDetail(null)}
        onEdit={handleEditLead}
        onOpenLogEmail={(lead) => handleOpenLogEmail(lead)}
        onOpenBookAppointment={(lead) => handleOpenBookAppointment(lead)}
        onUpdateStatus={handleUpdateLeadStatus}
      />

      <LeadFormModal
        isOpen={isLeadFormOpen}
        onClose={() => {
          setIsLeadFormOpen(false);
          setLeadToEdit(null);
        }}
        onSave={handleSaveLead}
        initialLead={leadToEdit}
      />

      <LogEmailModal
        isOpen={isLogEmailOpen}
        onClose={() => setIsLogEmailOpen(false)}
        lead={leadForLogEmail}
        leads={leads}
        templates={templates}
        settings={settings}
        initialTemplate={templateForLogEmail}
        onLogEmailSuccess={handleLogEmailSuccess}
      />

      <BookAppointmentModal
        isOpen={isBookAppointmentOpen}
        onClose={() => setIsBookAppointmentOpen(false)}
        lead={leadForAppointment}
        leads={leads}
        onBookSuccess={handleBookAppointmentSuccess}
      />
    </div>
  );
};

export function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;
