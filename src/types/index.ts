export type PipelineStage = 
  | 'New Research'
  | 'Qualified'
  | 'Contacted'
  | 'Follow-Up'
  | 'Interested'
  | 'Appointment Booked'
  | 'Closed Won';

export type PriorityLevel = 'High' | 'Medium' | 'Low';

export type FollowUpStatus = 'Overdue' | 'Due Today' | 'Upcoming' | 'Completed';

export type MeetingType = 'Discovery Call' | 'Product Demo' | 'Follow-Up Call' | 'Technical Q&A';

export interface ActivityItem {
  id: string;
  type: 'email' | 'call' | 'linkedin' | 'meeting' | 'note' | 'stage_change';
  title: string;
  description: string;
  timestamp: string;
  author: string;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  jobTitle: string;
  industry: string;
  location: string;
  leadSource: 'LinkedIn Sales Nav' | 'Apollo.io' | 'Industry Conference' | 'Trade Directory' | 'Referral' | 'Crunchbase / BuiltIn';
  status: PipelineStage;
  priority: PriorityLevel;
  dateAdded: string;
  nextFollowUp: string;
  followUpStatus: FollowUpStatus;
  followUpNumber: number;
  lastContact: string;
  estimatedAnnualValue: number;
  email: string;
  phone: string;
  linkedInUrl: string;
  companySize: string;
  website: string;
  campaignId: string;
  qualificationScore: number; // e.g., 85/100
  notes: string;
  activities: ActivityItem[];
}

export interface Campaign {
  id: string;
  name: string;
  audience: string;
  targetIndustry: string;
  leadsCount: number;
  emailsSent: number;
  replies: number;
  interested: number;
  appointments: number;
  conversionRate: number;
  status: 'Active' | 'Optimizing' | 'Completed';
  startDate: string;
  description: string;
  cadenceDescription: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  purpose: string;
  callToAction: string;
  category: 'Cold Outreach' | 'Follow-Up' | 'Closing' | 'Scheduling';
  recommendedWaitDays: number;
  openRateEstimate: string;
  replyRateEstimate: string;
}

export interface Appointment {
  id: string;
  leadId: string;
  prospectName: string;
  company: string;
  meetingDate: string; // e.g. "Aug 28, 2026"
  time: string; // e.g. "11:00 AM"
  timezone: string; // e.g. "EST"
  duration: string; // e.g. "30 min"
  meetingType: MeetingType;
  status: 'Confirmed' | 'Pending Prep' | 'Completed' | 'Rescheduled';
  location: string; // e.g. "Google Meet / Zoom"
  attendees: string[];
  meetingGoals: string;
  preparationNotes: string;
}

export interface VASettings {
  campaignName: string;
  assignedVA: string;
  role: string;
  email: string;
  timeZone: string;
  defaultCadence: string;
  emailSignature: string;
  dailyLeadGoal: number;
  dailyOutreachGoal: number;
  notificationPreferences: {
    overdueAlerts: boolean;
    appointmentReminders: boolean;
    dailyDigest: boolean;
    replyAlerts: boolean;
  };
}

export type Activity = ActivityItem;

export type NavigationTab = 
  | 'dashboard'
  | 'leads'
  | 'pipeline'
  | 'campaigns'
  | 'templates'
  | 'followup'
  | 'appointments'
  | 'report'
  | 'settings';

export type ActiveTab = NavigationTab;
