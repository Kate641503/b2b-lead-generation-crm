import { Lead, Campaign, EmailTemplate, Appointment, VASettings } from '../types';

export const INITIAL_VA_SETTINGS: VASettings = {
  campaignName: 'Q3 B2B SaaS Outreach & Expansion',
  assignedVA: 'Catherine Ngina',
  role: 'Virtual Assistant & Administrative Support Specialist',
  email: 'catherine.ngina@operations-support.io',
  timeZone: 'EST (Eastern Standard Time)',
  defaultCadence: '3 business days between outreach touches',
  emailSignature: `Best regards,

Catherine Ngina
Virtual Assistant & Administrative Support Specialist
Executive Outreach & Operations Team
Email: catherine.ngina@operations-support.io | Phone: (555) 234-8900
Portfolio: Catherine Ngina Operations & CRM Case Study`,
  dailyLeadGoal: 10,
  dailyOutreachGoal: 25,
  notificationPreferences: {
    overdueAlerts: true,
    appointmentReminders: true,
    dailyDigest: true,
    replyAlerts: true,
  }
};

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-01',
    name: 'Tariq Al-Mansoor',
    company: 'CyberShield Defenses',
    jobTitle: 'Head of Information Security Sales',
    industry: 'Cybersecurity & InfoSec',
    location: 'Austin, TX',
    leadSource: 'LinkedIn Sales Nav',
    status: 'Interested',
    priority: 'High',
    dateAdded: '2026-08-14',
    nextFollowUp: '2026-08-28',
    followUpStatus: 'Upcoming',
    followUpNumber: 2,
    lastContact: '2026-08-25',
    estimatedAnnualValue: 22000,
    email: 't.almansoor@cybershielddefenses.demo',
    phone: '+1 (512) 555-0143',
    linkedInUrl: 'https://linkedin.com/in/tariq-almansoor-demo',
    companySize: '150 - 300 employees',
    website: 'https://cybershielddefenses.demo',
    campaignId: 'camp-01',
    qualificationScore: 92,
    notes: 'Expressed strong interest in automated compliance and VA-supported client intake workflows. Requested proposal overview deck prior to scheduled demo.',
    activities: [
      {
        id: 'act-01-1',
        type: 'email',
        title: 'Follow-Up #2 Sent',
        description: 'Sent tailored case study on SaaS security audit acceleration.',
        timestamp: '2026-08-25 10:15 AM',
        author: 'Catherine Ngina'
      },
      {
        id: 'act-01-2',
        type: 'note',
        title: 'Prospect Replied via Email',
        description: 'Replied: "This looks aligned with our Q4 operational goals. Please send the slide deck."',
        timestamp: '2026-08-25 02:40 PM',
        author: 'Catherine Ngina'
      }
    ]
  },
  {
    id: 'lead-02',
    name: 'Elena Rostova',
    company: 'Vanguard Logistics Tech',
    jobTitle: 'VP of Global Supply Operations',
    industry: 'Logistics & Fleet Tech',
    location: 'Chicago, IL',
    leadSource: 'Apollo.io',
    status: 'Follow-Up',
    priority: 'High',
    dateAdded: '2026-08-10',
    nextFollowUp: '2026-08-27',
    followUpStatus: 'Due Today',
    followUpNumber: 3,
    lastContact: '2026-08-22',
    estimatedAnnualValue: 36000,
    email: 'elena.rostova@vanguardlogistics.demo',
    phone: '+1 (312) 555-0198',
    linkedInUrl: 'https://linkedin.com/in/elena-rostova-demo',
    companySize: '500+ employees',
    website: 'https://vanguardlogisticstech.demo',
    campaignId: 'camp-01',
    qualificationScore: 88,
    notes: 'Reviewed fleet dispatch case study. Discovery call scheduled for Aug 31. Need to send brief pre-meeting agenda today.',
    activities: [
      {
        id: 'act-02-1',
        type: 'email',
        title: 'Follow-Up #1 Sent',
        description: 'Shared benchmark report on freight routing efficiency.',
        timestamp: '2026-08-22 09:30 AM',
        author: 'Catherine Ngina'
      },
      {
        id: 'act-02-2',
        type: 'meeting',
        title: 'Discovery Call Booked',
        description: 'Scheduled for Aug 31, 2026 at 3:30 PM EST.',
        timestamp: '2026-08-24 11:20 AM',
        author: 'Catherine Ngina'
      }
    ]
  },
  {
    id: 'lead-03',
    name: 'Marcus Vance',
    company: 'Apex Cloud Solutions',
    jobTitle: 'Chief Technology Officer',
    industry: 'Cloud Infrastructure',
    location: 'San Francisco, CA',
    leadSource: 'Referral',
    status: 'Appointment Booked',
    priority: 'High',
    dateAdded: '2026-08-05',
    nextFollowUp: '2026-08-28',
    followUpStatus: 'Upcoming',
    followUpNumber: 2,
    lastContact: '2026-08-24',
    estimatedAnnualValue: 48000,
    email: 'm.vance@apexcloudsolutions.demo',
    phone: '+1 (415) 555-0812',
    linkedInUrl: 'https://linkedin.com/in/marcus-vance-demo',
    companySize: '250 - 500 employees',
    website: 'https://apexcloudsolutions.demo',
    campaignId: 'camp-01',
    qualificationScore: 96,
    notes: 'High-value executive prospect. Scheduled 30-min discovery call for tomorrow morning. Pre-meeting dossier and CRM background ready.',
    activities: [
      {
        id: 'act-03-1',
        type: 'meeting',
        title: 'Discovery Call Confirmed',
        description: 'Calendar invite accepted for Aug 28, 11:00 AM EST.',
        timestamp: '2026-08-24 04:15 PM',
        author: 'Catherine Ngina'
      },
      {
        id: 'act-03-2',
        type: 'note',
        title: 'Executive Brief Prepared',
        description: 'Compiled tech stack overview (AWS + Kubernetes) and competitor comparison.',
        timestamp: '2026-08-26 03:00 PM',
        author: 'Catherine Ngina'
      }
    ]
  },
  {
    id: 'lead-04',
    name: 'Rachel Sterling',
    company: 'Nexoria Software Corp',
    jobTitle: 'Director of Enterprise IT',
    industry: 'Enterprise SaaS',
    location: 'Boston, MA',
    leadSource: 'LinkedIn Sales Nav',
    status: 'Appointment Booked',
    priority: 'High',
    dateAdded: '2026-08-08',
    nextFollowUp: '2026-08-29',
    followUpStatus: 'Upcoming',
    followUpNumber: 2,
    lastContact: '2026-08-23',
    estimatedAnnualValue: 32000,
    email: 'rsterling@nexoriasoftware.demo',
    phone: '+1 (617) 555-0144',
    linkedInUrl: 'https://linkedin.com/in/rachel-sterling-demo',
    companySize: '400 employees',
    website: 'https://nexoriasoftware.demo',
    campaignId: 'camp-01',
    qualificationScore: 90,
    notes: 'Interested in admin workflow optimization and automated CRM data enrichment. 45-min Product Demo locked in for Aug 29.',
    activities: [
      {
        id: 'act-04-1',
        type: 'email',
        title: 'Initial Cold Email Sent',
        description: 'Personalized pitch mentioning their recent IT expansion announcement.',
        timestamp: '2026-08-15 08:45 AM',
        author: 'Catherine Ngina'
      },
      {
        id: 'act-04-2',
        type: 'meeting',
        title: 'Product Demo Scheduled',
        description: 'Calendar invite confirmed for Aug 29 at 2:00 PM EST.',
        timestamp: '2026-08-23 01:15 PM',
        author: 'Catherine Ngina'
      }
    ]
  },
  {
    id: 'lead-05',
    name: 'Arthur Pendelton',
    company: 'BlueWave Digital Media',
    jobTitle: 'Managing Director',
    industry: 'Digital Media & MarTech',
    location: 'New York, NY',
    leadSource: 'Industry Conference',
    status: 'Follow-Up',
    priority: 'Medium',
    dateAdded: '2026-07-28',
    nextFollowUp: '2026-08-24',
    followUpStatus: 'Overdue',
    followUpNumber: 3,
    lastContact: '2026-08-18',
    estimatedAnnualValue: 18000,
    email: 'a.pendelton@bluewavedigital.demo',
    phone: '+1 (212) 555-0187',
    linkedInUrl: 'https://linkedin.com/in/arthur-pendelton-demo',
    companySize: '80 employees',
    website: 'https://bluewavedigitalmedia.demo',
    campaignId: 'camp-02',
    qualificationScore: 78,
    notes: 'Met during virtual summit. Follow-Up #3 is overdue by 3 days. Send friendly re-engagement nudge.',
    activities: [
      {
        id: 'act-05-1',
        type: 'email',
        title: 'Follow-Up #2 Sent',
        description: 'Sent follow-up checking if agency scaling bottlenecks were still a priority.',
        timestamp: '2026-08-18 11:00 AM',
        author: 'Catherine Ngina'
      }
    ]
  },
  {
    id: 'lead-06',
    name: 'David K. Thorne',
    company: 'ProFormance Financial',
    jobTitle: 'VP of Strategic Operations',
    industry: 'FinTech & Banking',
    location: 'Charlotte, NC',
    leadSource: 'Apollo.io',
    status: 'Follow-Up',
    priority: 'High',
    dateAdded: '2026-08-12',
    nextFollowUp: '2026-08-27',
    followUpStatus: 'Due Today',
    followUpNumber: 2,
    lastContact: '2026-08-21',
    estimatedAnnualValue: 28000,
    email: 'david.thorne@proformancefin.demo',
    phone: '+1 (704) 555-0162',
    linkedInUrl: 'https://linkedin.com/in/david-thorne-demo',
    companySize: '320 employees',
    website: 'https://proformancefinancial.demo',
    campaignId: 'camp-01',
    qualificationScore: 85,
    notes: 'Opened previous email 3 times. Follow-Up #2 is due today with FinTech compliance executive summary.',
    activities: [
      {
        id: 'act-06-1',
        type: 'email',
        title: 'Cold Outreach Dispatched',
        description: 'Sent initial message tailored to operational risk reduction.',
        timestamp: '2026-08-14 09:10 AM',
        author: 'Catherine Ngina'
      }
    ]
  },
  {
    id: 'lead-07',
    name: 'Sophia Chen',
    company: 'PeakMetrics Consulting',
    jobTitle: 'Head of Business Intelligence',
    industry: 'Analytics SaaS',
    location: 'Seattle, WA',
    leadSource: 'LinkedIn Sales Nav',
    status: 'Interested',
    priority: 'High',
    dateAdded: '2026-08-15',
    nextFollowUp: '2026-08-27',
    followUpStatus: 'Due Today',
    followUpNumber: 1,
    lastContact: '2026-08-24',
    estimatedAnnualValue: 25000,
    email: 'sophia.chen@peakmetrics.demo',
    phone: '+1 (206) 555-0177',
    linkedInUrl: 'https://linkedin.com/in/sophia-chen-demo',
    companySize: '110 employees',
    website: 'https://peakmetricsconsulting.demo',
    campaignId: 'camp-01',
    qualificationScore: 89,
    notes: 'Replied on LinkedIn asking for availability next week for a discovery session. Action: Send scheduling link today.',
    activities: [
      {
        id: 'act-07-1',
        type: 'linkedin',
        title: 'LinkedIn Message Received',
        description: 'Prospect requested 20-min intro chat to discuss BI reporting automation.',
        timestamp: '2026-08-24 04:50 PM',
        author: 'Catherine Ngina'
      }
    ]
  },
  {
    id: 'lead-08',
    name: 'Julian Mercer',
    company: 'BrightPath E-Learning',
    jobTitle: 'Director of Corporate Training',
    industry: 'EdTech & Corporate Learning',
    location: 'Atlanta, GA',
    leadSource: 'Apollo.io',
    status: 'Contacted',
    priority: 'Medium',
    dateAdded: '2026-08-20',
    nextFollowUp: '2026-09-01',
    followUpStatus: 'Upcoming',
    followUpNumber: 1,
    lastContact: '2026-08-24',
    estimatedAnnualValue: 15000,
    email: 'jmercer@brightpathelearning.demo',
    phone: '+1 (404) 555-0138',
    linkedInUrl: 'https://linkedin.com/in/julian-mercer-demo',
    companySize: '95 employees',
    website: 'https://brightpathelearning.demo',
    campaignId: 'camp-02',
    qualificationScore: 74,
    notes: 'Initial cold outreach sent Aug 24. Standard 3-business-day follow-up cadence scheduled.',
    activities: [
      {
        id: 'act-08-1',
        type: 'email',
        title: 'Initial Cold Email Sent',
        description: 'Targeted message regarding automated learner onboarding pipelines.',
        timestamp: '2026-08-24 09:00 AM',
        author: 'Catherine Ngina'
      }
    ]
  },
  {
    id: 'lead-09',
    name: 'Kendra Washington',
    company: 'OmniHealth Analytics',
    jobTitle: 'VP of Clinical Systems',
    industry: 'HealthTech & Healthcare',
    location: 'Denver, CO',
    leadSource: 'Crunchbase / BuiltIn',
    status: 'Contacted',
    priority: 'High',
    dateAdded: '2026-08-21',
    nextFollowUp: '2026-09-02',
    followUpStatus: 'Upcoming',
    followUpNumber: 1,
    lastContact: '2026-08-25',
    estimatedAnnualValue: 42000,
    email: 'k.washington@omnihealthanalytics.demo',
    phone: '+1 (303) 555-0155',
    linkedInUrl: 'https://linkedin.com/in/kendra-washington-demo',
    companySize: '650 employees',
    website: 'https://omnihealthanalytics.demo',
    campaignId: 'camp-01',
    qualificationScore: 94,
    notes: 'Enterprise account. Initial cold email dispatched with HIPAA-compliant VA operational framework.',
    activities: [
      {
        id: 'act-09-1',
        type: 'email',
        title: 'Initial Cold Email Sent',
        description: 'Sent enterprise healthtech intro pitch.',
        timestamp: '2026-08-25 11:30 AM',
        author: 'Catherine Ngina'
      }
    ]
  },
  {
    id: 'lead-10',
    name: 'Liam Gallagher',
    company: 'Summit Industrial Supplies',
    jobTitle: 'Chief Operating Officer',
    industry: 'Industrial Supply Tech',
    location: 'Dallas, TX',
    leadSource: 'Trade Directory',
    status: 'Qualified',
    priority: 'Medium',
    dateAdded: '2026-08-23',
    nextFollowUp: '2026-09-03',
    followUpStatus: 'Upcoming',
    followUpNumber: 0,
    lastContact: '2026-08-23',
    estimatedAnnualValue: 20000,
    email: 'lgallagher@summitindustrial.demo',
    phone: '+1 (214) 555-0129',
    linkedInUrl: 'https://linkedin.com/in/liam-gallagher-demo',
    companySize: '220 employees',
    website: 'https://summitindustrialsupplies.demo',
    campaignId: 'camp-02',
    qualificationScore: 80,
    notes: 'Prospect qualified based on company revenue (>$20M) and expanding regional warehouse hub.',
    activities: [
      {
        id: 'act-10-1',
        type: 'note',
        title: 'Lead Qualified & Enriched',
        description: 'Verified decision maker role, direct phone number, and verified email via ZeroBounce.',
        timestamp: '2026-08-23 02:15 PM',
        author: 'Catherine Ngina'
      }
    ]
  },
  {
    id: 'lead-11',
    name: 'Priya Patel',
    company: 'Aura Health Tech',
    jobTitle: 'Head of Product Innovation',
    industry: 'Digital Health & Biotech',
    location: 'San Diego, CA',
    leadSource: 'LinkedIn Sales Nav',
    status: 'Qualified',
    priority: 'High',
    dateAdded: '2026-08-24',
    nextFollowUp: '2026-09-04',
    followUpStatus: 'Upcoming',
    followUpNumber: 0,
    lastContact: '2026-08-24',
    estimatedAnnualValue: 30000,
    email: 'priya.patel@aurahealthtech.demo',
    phone: '+1 (619) 555-0164',
    linkedInUrl: 'https://linkedin.com/in/priya-patel-demo',
    companySize: '180 employees',
    website: 'https://aurahealthtech.demo',
    campaignId: 'camp-01',
    qualificationScore: 86,
    notes: 'High fit score. Recently closed Series B funding. Preparing tailored outreach batch.',
    activities: [
      {
        id: 'act-11-1',
        type: 'note',
        title: 'Prospect Researched & Scored',
        description: 'Verified Series B announcement and hiring momentum on LinkedIn.',
        timestamp: '2026-08-24 10:00 AM',
        author: 'Catherine Ngina'
      }
    ]
  },
  {
    id: 'lead-12',
    name: 'Gregory Vance',
    company: 'StrataPoint Security',
    jobTitle: 'VP of Infrastructure',
    industry: 'Cyber Infrastructure',
    location: 'Reston, VA',
    leadSource: 'Apollo.io',
    status: 'New Research',
    priority: 'Low',
    dateAdded: '2026-08-26',
    nextFollowUp: '2026-09-08',
    followUpStatus: 'Upcoming',
    followUpNumber: 0,
    lastContact: '2026-08-26',
    estimatedAnnualValue: 16000,
    email: 'g.vance@stratapointsec.demo',
    phone: '+1 (703) 555-0112',
    linkedInUrl: 'https://linkedin.com/in/gregory-vance-demo',
    companySize: '60 employees',
    website: 'https://stratapointsecurity.demo',
    campaignId: 'camp-01',
    qualificationScore: 68,
    notes: 'Recently added to prospect backlog. Awaiting validation of direct phone and department headcount.',
    activities: [
      {
        id: 'act-12-1',
        type: 'note',
        title: 'Prospect Record Created',
        description: 'Scraped basic firmographics from Apollo.io export.',
        timestamp: '2026-08-26 09:30 AM',
        author: 'Catherine Ngina'
      }
    ]
  },
  {
    id: 'lead-13',
    name: 'Chloe Davenport',
    company: 'Veridian HR Technologies',
    jobTitle: 'Chief People Officer',
    industry: 'HR Tech & People Ops',
    location: 'Minneapolis, MN',
    leadSource: 'Crunchbase / BuiltIn',
    status: 'New Research',
    priority: 'Medium',
    dateAdded: '2026-08-26',
    nextFollowUp: '2026-09-09',
    followUpStatus: 'Upcoming',
    followUpNumber: 0,
    lastContact: '2026-08-26',
    estimatedAnnualValue: 19000,
    email: 'chloe.d@veridianhr.demo',
    phone: '+1 (612) 555-0189',
    linkedInUrl: 'https://linkedin.com/in/chloe-davenport-demo',
    companySize: '140 employees',
    website: 'https://veridianhrtech.demo',
    campaignId: 'camp-02',
    qualificationScore: 72,
    notes: 'Under research. Target for Small Business Operations campaign batch starting early September.',
    activities: [
      {
        id: 'act-13-1',
        type: 'note',
        title: 'Target Identified',
        description: 'Company listed in Top 50 fast-growing Midwest tech companies.',
        timestamp: '2026-08-26 02:45 PM',
        author: 'Catherine Ngina'
      }
    ]
  },
  {
    id: 'lead-14',
    name: 'Harrison Forde',
    company: 'Novus Energy Systems',
    jobTitle: 'VP of Commercial Operations',
    industry: 'CleanTech & Energy',
    location: 'Houston, TX',
    leadSource: 'Trade Directory',
    status: 'Closed Won',
    priority: 'High',
    dateAdded: '2026-07-15',
    nextFollowUp: '2026-08-20',
    followUpStatus: 'Completed',
    followUpNumber: 4,
    lastContact: '2026-08-19',
    estimatedAnnualValue: 54000,
    email: 'h.forde@novusenergy.demo',
    phone: '+1 (713) 555-0176',
    linkedInUrl: 'https://linkedin.com/in/harrison-forde-demo',
    companySize: '850 employees',
    website: 'https://novusenergysystems.demo',
    campaignId: 'camp-01',
    qualificationScore: 98,
    notes: 'Successful outreach cycle! Signed annual contract after 2 discovery calls and executive proposal. Client onboarding initiated.',
    activities: [
      {
        id: 'act-14-1',
        type: 'stage_change',
        title: 'Stage Updated to Closed Won',
        description: 'Contract executed for $54,000 Annual Value.',
        timestamp: '2026-08-19 03:30 PM',
        author: 'Catherine Ngina'
      }
    ]
  },
  {
    id: 'lead-15',
    name: 'Miranda Bailey',
    company: 'Horizon Scale Partners',
    jobTitle: 'Managing Partner',
    industry: 'FinTech & Capital Advisory',
    location: 'Salt Lake City, UT',
    leadSource: 'LinkedIn Sales Nav',
    status: 'Follow-Up',
    priority: 'Medium',
    dateAdded: '2026-08-16',
    nextFollowUp: '2026-08-30',
    followUpStatus: 'Upcoming',
    followUpNumber: 1,
    lastContact: '2026-08-23',
    estimatedAnnualValue: 21000,
    email: 'mbailey@horizonscale.demo',
    phone: '+1 (801) 555-0149',
    linkedInUrl: 'https://linkedin.com/in/miranda-bailey-demo',
    companySize: '75 employees',
    website: 'https://horizonscalepartners.demo',
    campaignId: 'camp-01',
    qualificationScore: 81,
    notes: 'Follow-up #1 scheduled. Expressed curiosity about executive VA calendar and pipeline hygiene support.',
    activities: [
      {
        id: 'act-15-1',
        type: 'email',
        title: 'Cold Outreach Dispatched',
        description: 'Introduced executive support case study for boutique advisory firms.',
        timestamp: '2026-08-23 10:45 AM',
        author: 'Catherine Ngina'
      }
    ]
  }
];

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-01',
    name: 'Q3 B2B SaaS Outreach',
    audience: 'VP & C-Level Tech Leaders (Series A-C SaaS)',
    targetIndustry: 'B2B SaaS, CyberSecurity & Cloud Tech',
    leadsCount: 10,
    emailsSent: 28,
    replies: 7,
    interested: 2,
    appointments: 2,
    conversionRate: 14.3,
    status: 'Active',
    startDate: '2026-08-01',
    description: 'Targeted multi-touch outreach campaign focused on fast-scaling B2B SaaS founders and VPs to offer executive pipeline support and workflow automation.',
    cadenceDescription: 'Day 1: Cold Email -> Day 4: Value Follow-Up -> Day 8: Case Study Nudge -> Day 12: Final Breakup Email'
  },
  {
    id: 'camp-02',
    name: 'Small Business Operations Outreach',
    audience: 'COOs, Managing Directors & Operations Leaders',
    targetIndustry: 'Digital Agencies, Logistics & Industrial Tech',
    leadsCount: 5,
    emailsSent: 14,
    replies: 3,
    interested: 1,
    appointments: 1,
    conversionRate: 11.1,
    status: 'Active',
    startDate: '2026-08-10',
    description: 'Specialized outreach campaign addressing operational bottlenecks, manual CRM maintenance, and executive calendar overload in growing SMBs.',
    cadenceDescription: 'Day 1: Industry Cold Pitch -> Day 5: Operational Framework PDF -> Day 10: Brief Video/Resource -> Day 15: Soft Touchpoint'
  }
];

export const INITIAL_EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'tmpl-01',
    name: 'Initial Cold Email',
    category: 'Cold Outreach',
    recommendedWaitDays: 0,
    openRateEstimate: '64.5%',
    replyRateEstimate: '18.2%',
    purpose: 'Introduce value proposition, demonstrate company research, and initiate low-friction engagement with executive decision makers.',
    subject: 'Quick question regarding {{Company}}\'s Q3 operational scaling',
    body: `Hi {{FirstName}},

I noticed {{Company}}\'s recent expansion in {{Industry}} and wanted to reach out.

As growing teams scale, executive leaders often lose 10-15+ hours weekly managing CRM data hygiene, manual follow-up queues, and fragmented calendar logistics.

We provide dedicated executive administrative support and structured B2B lead operations that help leadership teams maintain clean pipelines and accelerate qualified appointment booking.

Would you be open to a brief 15-minute introductory conversation this Thursday or Friday to see how we could support {{Company}}\'s pipeline?

Best regards,

{{Signature}}`,
    callToAction: '15-minute low-commitment intro call'
  },
  {
    id: 'tmpl-02',
    name: 'Follow-Up #1 (Value-Add Nudge)',
    category: 'Follow-Up',
    recommendedWaitDays: 3,
    openRateEstimate: '58.0%',
    replyRateEstimate: '14.5%',
    purpose: 'Re-engage prospect after 3 business days by providing relevant industry context and tangible workflow benefits without being pushy.',
    subject: 'Re: Quick question regarding {{Company}}\'s Q3 operational scaling',
    body: `Hi {{FirstName}},

Following up on my note from earlier this week. I know executive schedules get packed quickly.

I put together a 1-page operational breakdown showing how similar {{Industry}} organizations cut lead response latency by 45% while keeping CRM contact records 100% enriched.

Here is a quick overview of what our structured support covers:
- Prospect qualification and data verification
- Multi-touch follow-up cadence execution
- Calendar prep and meeting agenda coordination

Would you like me to send over the brief case summary, or would 10 minutes next Tuesday work better for a quick chat?

Best,

{{Signature}}`,
    callToAction: 'Offer 1-page case summary or 10-min chat'
  },
  {
    id: 'tmpl-03',
    name: 'Follow-Up #2 (Social Proof & Case Study)',
    category: 'Follow-Up',
    recommendedWaitDays: 4,
    openRateEstimate: '52.3%',
    replyRateEstimate: '11.8%',
    purpose: 'Provide concrete social proof and case study evidence demonstrating measured ROI and time savings.',
    subject: 'Operational efficiency benchmark for {{Company}}',
    body: `Hi {{FirstName}},

Thought you might find this relevant—we recently helped an operations team in your sector reclaim 14 hours per week while doubling their qualified discovery call rate within 6 weeks.

Given {{Company}}\'s current growth trajectory, having a dedicated specialist manage your CRM workflow and prospect research could free up your key team members to focus entirely on closing.

If you have 15 minutes next week, I would love to share how we can implement this exact playbook for {{Company}}.

Let me know if Wednesday at 2:00 PM works for your calendar.

Warm regards,

{{Signature}}`,
    callToAction: 'Suggest specific time slot with case study proof'
  },
  {
    id: 'tmpl-04',
    name: 'Final Follow-Up (Polite Breakup)',
    category: 'Closing',
    recommendedWaitDays: 5,
    openRateEstimate: '49.1%',
    replyRateEstimate: '9.4%',
    purpose: 'Professional, respectful close-out message that creates scarcity and gives the prospect an easy out while leaving the door open for future needs.',
    subject: 'Permission to close {{Company}}\'s file for now?',
    body: `Hi {{FirstName}},

I haven't heard back, so I assume operational and CRM support isn't a priority for {{Company}} right now—and that's completely understandable.

I'll go ahead and close your file so I don't clutter your inbox.

If your team ever needs structured administrative support, CRM pipeline hygiene, or dedicated outreach coordination down the road, feel free to reach back out anytime.

Wishing you and {{Company}} continued success!

Best regards,

{{Signature}}`,
    callToAction: 'Low-pressure permission to close file'
  },
  {
    id: 'tmpl-05',
    name: 'Appointment Confirmation & Pre-Meeting Brief',
    category: 'Scheduling',
    recommendedWaitDays: 0,
    openRateEstimate: '94.0%',
    replyRateEstimate: '38.0%',
    purpose: 'Confirm meeting time, provide video conference link, outline the agenda, and reinforce professionalism.',
    subject: 'Confirmed: Discovery Call — {{Company}} + Operations Team ({{MeetingDate}})',
    body: `Hi {{FirstName}},

Thank you for scheduling our upcoming discussion!

Here are the confirmed details for our session:

📅 Date: {{MeetingDate}}
⏰ Time: {{MeetingTime}} {{Timezone}}
🔗 Meeting Link: {{MeetingLink}}
⏱️ Duration: 30 Minutes

Agenda:
1. Quick overview of {{Company}}\'s current pipeline workflow
2. Identifying bottleneck areas in prospect qualification & follow-up
3. Tailored support roadmap and next steps

If there are any specific topics or colleagues you'd like to include, please feel free to forward this invite. Looking forward to speaking!

Best regards,

{{Signature}}`,
    callToAction: 'Meeting confirmation with agenda and prep checklist'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-01',
    leadId: 'lead-03',
    prospectName: 'Marcus Vance',
    company: 'Apex Cloud Solutions',
    meetingDate: 'Aug 28, 2026',
    time: '11:00 AM',
    timezone: 'EST',
    duration: '30 min',
    meetingType: 'Discovery Call',
    status: 'Confirmed',
    location: 'Google Meet (meet.google.com/apx-cld-vnc)',
    attendees: ['Marcus Vance (CTO)', 'Catherine Ngina (Lead Support VA)', 'Account Executive Team'],
    meetingGoals: 'Understand AWS multi-tenant infrastructure support requirements and determine VA pipeline enrichment scope.',
    preparationNotes: 'Reviewed CTO profile, verified recent Series C funding round, compiled 1-page cloud integration brief.'
  },
  {
    id: 'apt-02',
    leadId: 'lead-04',
    prospectName: 'Rachel Sterling',
    company: 'Nexoria Software Corp',
    meetingDate: 'Aug 29, 2026',
    time: '2:00 PM',
    timezone: 'EST',
    duration: '45 min',
    meetingType: 'Product Demo',
    status: 'Confirmed',
    location: 'Zoom (zoom.us/j/9842103847)',
    attendees: ['Rachel Sterling (Dir. Enterprise IT)', 'Technical Solutions Architect', 'Catherine Ngina'],
    meetingGoals: 'Demonstrate automated CRM workflow integration, HubSpot/Salesforce sync, and email cadence dispatching.',
    preparationNotes: 'Customized demo instance with enterprise IT sample fields; prepped slide deck 4 through 12.'
  },
  {
    id: 'apt-03',
    leadId: 'lead-02',
    prospectName: 'Elena Rostova',
    company: 'Vanguard Logistics Tech',
    meetingDate: 'Aug 31, 2026',
    time: '3:30 PM',
    timezone: 'EST',
    duration: '30 min',
    meetingType: 'Discovery Call',
    status: 'Confirmed',
    location: 'Microsoft Teams',
    attendees: ['Elena Rostova (VP Supply Ops)', 'Operations Lead', 'Catherine Ngina'],
    meetingGoals: 'Explore logistics dispatch admin support and prospect database enrichment for 500+ regional carrier partners.',
    preparationNotes: 'Prepared benchmark case study on dispatch administrative velocity; verified time zone confirmation.'
  }
];

export const INITIAL_TEMPLATES: EmailTemplate[] = INITIAL_EMAIL_TEMPLATES;
export const INITIAL_SETTINGS: VASettings = INITIAL_VA_SETTINGS;
